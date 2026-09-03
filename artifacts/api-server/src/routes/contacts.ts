import { Router, type Request, type Response } from "express";
import { ContactModel, BannedUserModel } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string") {
    return forwarded.split(",")[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded.length > 0) {
    return forwarded[0].trim();
  }
  return req.socket.remoteAddress || req.ip || "";
}

// Handle GET on both /contact and /contacts
const getContacts = async (_req: Request, res: Response): Promise<void> => {
  try {
    const contacts = await ContactModel.find().sort({ createdAt: -1 });
    res.json(
      contacts.map((c) => ({
        ...c.toObject(),
        id: c._id.toString(),
        createdAt: c.createdAt.toISOString(),
        ip: c.ip || "",
      }))
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch contacts" });
  }
};
router.get("/contact", getContacts);
router.get("/contacts", getContacts);

// Handle POST on both /contact and /contacts with Ban check
const postContact = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, phone, subject = null, message } = req.body;

    if (!name || !email || !message) {
      res.status(400).json({ error: "Name, email, and message are required" });
      return;
    }

    const clientIp = getClientIp(req);
    const normalizedEmail = (email || "").trim().toLowerCase();
    const normalizedPhone = (phone || "").trim();
    const normalizedIp = clientIp.trim().toLowerCase();

    // Check for active bans matching email, phone, or IP
    const orConditions: any[] = [];
    if (normalizedEmail) {
      orConditions.push({ type: "email", value: normalizedEmail });
      orConditions.push({ email: normalizedEmail });
      orConditions.push({ type: "all", value: normalizedEmail });
    }
    if (normalizedPhone) {
      orConditions.push({ type: "phone", value: normalizedPhone });
      orConditions.push({ phone: normalizedPhone });
      orConditions.push({ type: "all", value: normalizedPhone });
    }
    if (normalizedIp) {
      orConditions.push({ type: "ip", value: normalizedIp });
      orConditions.push({ ip: normalizedIp });
      orConditions.push({ type: "all", value: normalizedIp });
    }

    if (orConditions.length > 0) {
      const activeBans = await BannedUserModel.find({
        isActive: true,
        $or: orConditions,
      });

      const now = new Date();
      const validBan = activeBans.find((b) => !b.expiresAt || new Date(b.expiresAt) > now);

      if (validBan) {
        res.status(403).json({
          error: `Your submission could not be processed. Reason: ${validBan.reason || "Policy restriction"}`,
          reason: validBan.reason,
          banned: true,
        });
        return;
      }
    }

    const contact = await ContactModel.create({
      name,
      email: normalizedEmail,
      phone: normalizedPhone,
      subject,
      message,
      ip: clientIp,
    });

    res.status(201).json({ success: true, id: contact._id.toString() });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to submit contact inquiry" });
  }
};
router.post("/contact", postContact);
router.post("/contacts", postContact);

// DELETE /contacts/:id - Admin can delete contact inquiry
router.delete("/contacts/:id", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await ContactModel.findByIdAndDelete(req.params.id);
    if (!contact) {
      res.status(404).json({ error: "Contact inquiry not found" });
      return;
    }
    res.json({ success: true, message: "Contact deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete contact" });
  }
});

// POST /contacts/:id/ban - Quick ban from contact inquiry
router.post("/contacts/:id/ban", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const contact = await ContactModel.findById(req.params.id);
    if (!contact) {
      res.status(404).json({ error: "Contact inquiry not found" });
      return;
    }

    const {
      banEmail = true,
      banPhone = false,
      banIp = false,
      reason = "Spam contact form submissions",
    } = req.body;

    const bannedBy = (req.session as any)?.ayotrix_admin?.username || "admin";
    const bansCreated: any[] = [];

    if (banEmail && contact.email) {
      const emailVal = contact.email.trim().toLowerCase();
      const ban = await BannedUserModel.findOneAndUpdate(
        { type: "email", value: emailVal },
        {
          name: contact.name,
          email: emailVal,
          phone: contact.phone || "",
          ip: contact.ip || "",
          reason,
          bannedBy,
          isActive: true,
        },
        { upsert: true, new: true }
      );
      bansCreated.push(ban);
    }

    if (banPhone && contact.phone) {
      const phoneVal = contact.phone.trim();
      const ban = await BannedUserModel.findOneAndUpdate(
        { type: "phone", value: phoneVal },
        {
          name: contact.name,
          email: contact.email || "",
          phone: phoneVal,
          ip: contact.ip || "",
          reason,
          bannedBy,
          isActive: true,
        },
        { upsert: true, new: true }
      );
      bansCreated.push(ban);
    }

    if (banIp && contact.ip) {
      const ipVal = contact.ip.trim().toLowerCase();
      const ban = await BannedUserModel.findOneAndUpdate(
        { type: "ip", value: ipVal },
        {
          name: contact.name,
          email: contact.email || "",
          phone: contact.phone || "",
          ip: ipVal,
          reason,
          bannedBy,
          isActive: true,
        },
        { upsert: true, new: true }
      );
      bansCreated.push(ban);
    }

    res.json({
      success: true,
      message: `Successfully banned ${bansCreated.length} identifiers for ${contact.name}`,
      bans: bansCreated.map((b) => ({ ...b.toObject(), id: b._id.toString() })),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to ban user from contact" });
  }
});

export default router;
