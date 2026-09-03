import { Router, type Request, type Response } from "express";
import { SiteSettingsModel, DEFAULT_PRIVACY_POLICY, DEFAULT_TERMS_OF_SERVICE } from "@workspace/db";

const router = Router();
import { requireAdmin, ADMIN_SESSION_KEY } from "../middlewares/auth";

async function getSettings() {
  let settings = await SiteSettingsModel.findOne({ key: "main" });
  if (!settings) {
    settings = await SiteSettingsModel.create({ key: "main", password: "525252" });
  }
  if (!settings.privacyPolicyContent) {
    settings.privacyPolicyContent = DEFAULT_PRIVACY_POLICY;
    settings.privacyPolicyLastUpdated = "July 29, 2026";
    await settings.save();
  }
  if (!settings.termsOfServiceContent) {
    settings.termsOfServiceContent = DEFAULT_TERMS_OF_SERVICE;
    settings.termsOfServiceLastUpdated = "July 29, 2026";
    await settings.save();
  }
  return settings;
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

router.post("/admin/logout", (req: any, res: any) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

router.get("/admin/me", (req: any, res: any) => {
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
    contactPerson: settings.contactPerson,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    privacyPolicyContent: settings.privacyPolicyContent,
    privacyPolicyLastUpdated: settings.privacyPolicyLastUpdated,
    termsOfServiceContent: settings.termsOfServiceContent,
    termsOfServiceLastUpdated: settings.termsOfServiceLastUpdated,
    playStoreUrl: settings.playStoreUrl || "https://play.google.com/store/apps/details?id=com.marketingkart.app",
  });
});

router.put("/admin/site-settings", requireAdmin, async (req: Request, res: Response) => {
  const {
    logoUrl,
    companyName,
    contactPerson,
    phone,
    email,
    address,
    privacyPolicyContent,
    privacyPolicyLastUpdated,
    termsOfServiceContent,
    termsOfServiceLastUpdated,
    playStoreUrl,
  } = req.body;
  await SiteSettingsModel.updateOne(
    { key: "main" },
    {
      $set: {
        logoUrl,
        companyName,
        contactPerson,
        phone,
        email,
        address,
        privacyPolicyContent,
        privacyPolicyLastUpdated,
        termsOfServiceContent,
        termsOfServiceLastUpdated,
        playStoreUrl,
      },
    },
    { upsert: true }
  );
  res.json({ success: true });
});

router.get("/site-settings", async (req: Request, res: Response) => {
  const settings = await getSettings();
  res.json({
    logoUrl: settings.logoUrl,
    companyName: settings.companyName,
    contactPerson: settings.contactPerson,
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
    privacyPolicyContent: settings.privacyPolicyContent,
    privacyPolicyLastUpdated: settings.privacyPolicyLastUpdated,
    termsOfServiceContent: settings.termsOfServiceContent,
    termsOfServiceLastUpdated: settings.termsOfServiceLastUpdated,
    playStoreUrl: settings.playStoreUrl || "https://play.google.com/store/apps/details?id=com.marketingkart.app",
  });
});

export default router;
