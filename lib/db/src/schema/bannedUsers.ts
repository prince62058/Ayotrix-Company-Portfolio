import mongoose from "mongoose";
import { z } from "zod";

export const bannedUserSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["email", "ip", "phone", "all"],
      default: "email",
      required: true,
    },
    value: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    name: { type: String, default: "" },
    email: { type: String, default: "", lowercase: true, trim: true },
    phone: { type: String, default: "", trim: true },
    ip: { type: String, default: "", trim: true },
    reason: { type: String, default: "Spam or policy violation" },
    bannedBy: { type: String, default: "admin" },
    isActive: { type: Boolean, default: true, index: true },
    expiresAt: { type: Date, default: null },
  },
  { timestamps: true }
);

bannedUserSchema.index({ type: 1, value: 1 });
bannedUserSchema.index({ isActive: 1, createdAt: -1 });

export const BannedUserModel =
  mongoose.models.BannedUser ||
  mongoose.model("BannedUser", bannedUserSchema);

export const insertBannedUserSchema = z.object({
  type: z.enum(["email", "ip", "phone", "all"]).default("email"),
  value: z.string().min(1, "Ban target value is required"),
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  ip: z.string().optional(),
  reason: z.string().default("Spam or policy violation"),
  isActive: z.boolean().default(true),
  expiresAt: z.string().nullable().optional(),
});

export type InsertBannedUser = z.infer<typeof insertBannedUserSchema>;

export type BannedUser = {
  id: string;
  type: "email" | "ip" | "phone" | "all";
  value: string;
  name: string;
  email: string;
  phone: string;
  ip: string;
  reason: string;
  bannedBy: string;
  isActive: boolean;
  expiresAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};
