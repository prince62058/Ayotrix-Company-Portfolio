import { Router, type Request, type Response } from "express";
import { BannedUserModel } from "@workspace/db";
import { requireAdmin } from "../middlewares/auth";

const router = Router();

// GET /bans - List all bans with search and status filtering
router.get("/bans", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const { search, type, status } = req.query;

    const query: Record<string, any> = {};

    if (status === "active") {
      query.isActive = true;
    } else if (status === "inactive") {
      query.isActive = false;
    }

    if (type && type !== "all_types") {
      query.type = type;
    }

    if (search && typeof search === "string" && search.trim().length > 0) {
      const term = search.trim();
      const regex = new RegExp(term, "i");
      query.$or = [
        { value: regex },
        { name: regex },
        { email: regex },
        { phone: regex },
        { ip: regex },
        { reason: regex },
      ];
    }

    const bans = await BannedUserModel.find(query).sort({ createdAt: -1 });
    res.json(
      bans.map((b) => ({
        ...b.toObject(),
        id: b._id.toString(),
        createdAt: b.createdAt.toISOString(),
        updatedAt: b.updatedAt.toISOString(),
        expiresAt: b.expiresAt ? b.expiresAt.toISOString() : null,
      }))
    );
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch banned users" });
  }
});

// GET /bans/stats - Return aggregate stats
router.get("/bans/stats", requireAdmin, async (_req: Request, res: Response): Promise<void> => {
  try {
    const [total, active, emails, ips, phones] = await Promise.all([
      BannedUserModel.countDocuments(),
      BannedUserModel.countDocuments({ isActive: true }),
      BannedUserModel.countDocuments({ isActive: true, type: "email" }),
      BannedUserModel.countDocuments({ isActive: true, type: "ip" }),
      BannedUserModel.countDocuments({ isActive: true, type: "phone" }),
    ]);

    res.json({
      total,
      active,
      bannedEmails: emails,
      bannedIps: ips,
      bannedPhones: phones,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to fetch ban statistics" });
  }
});

// POST /bans - Add a new ban
router.post("/bans", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      type = "email",
      value,
      reason = "Spam or policy violation",
      name = "",
      email = "",
      phone = "",
      ip = "",
      expiresAt = null,
      isActive = true,
    } = req.body;

    if (!value || typeof value !== "string" || !value.trim()) {
      res.status(400).json({ error: "Ban target value is required" });
      return;
    }

    const normalizedValue = value.trim().toLowerCase();

    // Check if an entry already exists for this type and value
    let ban = await BannedUserModel.findOne({
      type,
      value: normalizedValue,
    });

    if (ban) {
      ban.isActive = isActive !== undefined ? isActive : true;
      ban.reason = reason || ban.reason;
      if (name) ban.name = name;
      if (email) ban.email = email.toLowerCase();
      if (phone) ban.phone = phone;
      if (ip) ban.ip = ip;
      if (expiresAt !== undefined) {
        ban.expiresAt = expiresAt ? new Date(expiresAt) : null;
      }
      await ban.save();
      res.json({
        ...ban.toObject(),
        id: ban._id.toString(),
        message: "Existing ban updated and reactivated",
      });
      return;
    }

    ban = await BannedUserModel.create({
      type,
      value: normalizedValue,
      name,
      email: email ? email.toLowerCase() : type === "email" ? normalizedValue : "",
      phone: phone || (type === "phone" ? normalizedValue : ""),
      ip: ip || (type === "ip" ? normalizedValue : ""),
      reason,
      bannedBy: (req.session as any)?.ayotrix_admin?.username || "admin",
      isActive,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
    });

    res.status(201).json({
      ...ban.toObject(),
      id: ban._id.toString(),
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to create ban" });
  }
});

// PATCH /bans/:id/toggle - Toggle active status (Unban / Re-ban)
router.patch("/bans/:id/toggle", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const ban = await BannedUserModel.findById(req.params.id);
    if (!ban) {
      res.status(404).json({ error: "Ban record not found" });
      return;
    }

    ban.isActive = !ban.isActive;
    await ban.save();

    res.json({
      ...ban.toObject(),
      id: ban._id.toString(),
      message: ban.isActive ? "User re-banned successfully" : "User unbanned successfully",
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to toggle ban status" });
  }
});

// DELETE /bans/:id - Permanently delete ban record
router.delete("/bans/:id", requireAdmin, async (req: Request, res: Response): Promise<void> => {
  try {
    const ban = await BannedUserModel.findByIdAndDelete(req.params.id);
    if (!ban) {
      res.status(404).json({ error: "Ban record not found" });
      return;
    }
    res.json({ success: true, message: "Ban record removed completely" });
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Failed to delete ban record" });
  }
});

export default router;
