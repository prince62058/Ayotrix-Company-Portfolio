import mongoose from "mongoose";
import { z } from "zod";

export const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String, default: null },
  message: { type: String, required: true },
}, { timestamps: true });

export const ContactModel = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export const insertContactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  subject: z.string().nullable().optional(),
  message: z.string(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string | null;
  message: string;
  createdAt: Date;
  updatedAt?: Date;
};
