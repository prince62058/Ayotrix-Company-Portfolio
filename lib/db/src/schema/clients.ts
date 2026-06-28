import mongoose from "mongoose";
import { z } from "zod";

export const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logoUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const ClientModel = mongoose.models.Client || mongoose.model("Client", clientSchema);

export const insertClientSchema = z.object({
  name: z.string(),
  logoUrl: z.string(),
  isActive: z.boolean().optional().default(true),
});

export type InsertClient = z.infer<typeof insertClientSchema>;

export type Client = {
  id: string;
  name: string;
  logoUrl: string;
  isActive: boolean;
};
