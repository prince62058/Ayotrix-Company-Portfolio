import mongoose from "mongoose";
import { z } from "zod";

export const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: { type: String, required: true },
  imageUrl: { type: String, required: true },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
}, { timestamps: true });

export const TeamMemberModel = mongoose.models.TeamMember || mongoose.model("TeamMember", teamMemberSchema);

export const insertTeamMemberSchema = z.object({
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  imageUrl: z.string(),
  isActive: z.boolean().optional().default(true),
  sortOrder: z.number().optional().default(0),
});

export type InsertTeamMember = z.infer<typeof insertTeamMemberSchema>;

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  isActive: boolean;
  sortOrder: number;
};
