import mongoose from "mongoose";
import { z } from "zod";

export const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  slug: { type: String, required: true },
  shortName: { type: String },
  color: { type: String },
  gradient: { type: String },
  bgLight: { type: String },
  icon: { type: String },
  tagline: { type: String },
  longDescription: { type: String },
  features: { type: mongoose.Schema.Types.Mixed, default: [] },
  stats: { type: mongoose.Schema.Types.Mixed, default: [] },
  useCases: { type: [String], default: [] },
  formType: { type: String },
  category: { type: String, default: "Communication Suite" },
}, { timestamps: true });

export const ProductModel = mongoose.models.Product || mongoose.model("Product", productSchema);

export const insertProductSchema = z.object({
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  category: z.string(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  sortOrder: number;
};
