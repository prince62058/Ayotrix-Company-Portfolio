import { Router, type Request, type Response } from "express";
import { SiteSettingsModel } from "@workspace/db";

const router = Router();
const ADMIN_SESSION_KEY = "ayotrix_admin";

async function getSettings() {
  let settings = await SiteSettingsModel.findOne({ key: "main" });
  if (!settings) {
    settings = await SiteSettingsModel.create({ key: "main", password: "525252" });
  }
  return settings;
}

function requireAdmin(req: any, res: any, next: any) {
  if ((req.session as any)[ADMIN_SESSION_KEY]) return next();
  return res.status(401).json({ error: "Not authenticated" });
}

router.post("/admin/login", async (req: Request, res: Response) => {
  const { password } = req.body;
  const settings = await getSettings();
  if (password === settings.password) {
    (req.session as any)[ADMIN_SESSION_KEY] = { username: "admin" };
    res.json({ success: true, username: "admin" });
  } else {
    res.status(401).json({ error: "Invalid password" });
  }
});

router.post("/admin/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/admin/me", (req, res) => {
  const adminData = (req.session as any)[ADMIN_SESSION_KEY];
  if (adminData) {
    res.json({ username: adminData.username, isAuthenticated: true });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

router.post("/admin/change-password", requireAdmin, async (req: Request, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const settings = await getSettings();
  if (currentPassword !== settings.password) {
    res.status(400).json({ error: "Current password is incorrect" });
    return;
  }
  await SiteSettingsModel.updateOne({ key: "main" }, { password: newPassword });
  res.json({ success: true });
});

router.get("/admin/site-settings", requireAdmin, async (req: Request, res: Response) => {
  const settings = await getSettings();
  res.json({
    logoUrl: settings.logoUrl,
    companyName: settings.companyName,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
  });
});

router.put("/admin/site-settings", requireAdmin, async (req: Request, res: Response) => {
  const { logoUrl, companyName, phone, email, address } = req.body;
  await SiteSettingsModel.updateOne(
    { key: "main" },
    { $set: { logoUrl, companyName, phone, email, address } },
    { upsert: true }
  );
  res.json({ success: true });
});

router.get("/site-settings", async (req: Request, res: Response) => {
  const settings = await getSettings();
  res.json({
    logoUrl: settings.logoUrl,
    companyName: settings.companyName,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
  });
});

export default router;
