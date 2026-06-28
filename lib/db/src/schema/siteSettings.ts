import mongoose from "mongoose";
import { z } from "zod";

export const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, default: "main", unique: true },
  password: { type: String, default: "525252" },
  logoUrl: { type: String, default: "" },
  companyName: { type: String, default: "Ayotrix Infotech" },
  phone: { type: String, default: "+91 97520 45356" },
  email: { type: String, default: "info@ayotrix.com" },
  address: { type: String, default: "Bhopal, Madhya Pradesh" },
}, { timestamps: true });

export const SiteSettingsModel =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);

export const updateSiteSettingsSchema = z.object({
  logoUrl: z.string().optional(),
  companyName: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(4),
});

export type SiteSettings = {
  key: string;
  password: string;
  logoUrl: string;
  companyName: string;
  phone: string;
  email: string;
  address: string;
};
