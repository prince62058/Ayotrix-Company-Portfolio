import mongoose from "mongoose";
import { z } from "zod";

export const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  slug: { type: String, required: true },
  shortName: { type: String },
  color: { type: String },
  gradient: { type: String },
  bgLight: { type: String },
  tagline: { type: String },
  longDescription: { type: String },
  features: { type: mongoose.Schema.Types.Mixed, default: [] },
  stats: { type: mongoose.Schema.Types.Mixed, default: [] },
  process: { type: mongoose.Schema.Types.Mixed, default: [] },
  deliverables: { type: [String], default: [] },
  formType: { type: String },
  category: { type: String, default: "Application Development" },
}, { timestamps: true });

export const ServiceModel = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export const insertServiceSchema = z.object({
  name: z.string(),
  description: z.string(),
  icon: z.string(),
  features: z.array(z.string()).optional().default([]),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

export type InsertService = z.infer<typeof insertServiceSchema>;

export type Service = {
  id: string;
  name: string;
  description: string;
  icon: string;
  features: string[];
  isActive: boolean;
  sortOrder: number;
};
