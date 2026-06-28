import mongoose from "mongoose";
import { z } from "zod";

export const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  company: { type: String, required: true },
  review: { type: String, required: true },
  rating: { type: Number, default: 5 },
  imageUrl: { type: String, default: null },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

export const TestimonialModel = mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);

export const insertTestimonialSchema = z.object({
  clientName: z.string(),
  company: z.string(),
  review: z.string(),
  rating: z.number().optional().default(5),
  imageUrl: z.string().nullable().optional(),
  isActive: z.boolean().optional().default(true),
});

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type Testimonial = {
  id: string;
  clientName: string;
  company: string;
  review: string;
  rating: number;
  imageUrl: string | null;
  isActive: boolean;
};
