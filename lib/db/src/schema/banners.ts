import mongoose from "mongoose";
import { z } from "zod";

export const bannerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaLink: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

// Export the Mongoose model
export const BannerModel = mongoose.models.Banner || mongoose.model("Banner", bannerSchema);

// Zod schemas for API validation
export const insertBannerSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  ctaText: z.string(),
  ctaLink: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

export type InsertBanner = z.infer<typeof insertBannerSchema>;

export type Banner = {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
};
