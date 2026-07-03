import { Router, type Request, type Response } from "express";
import { TeamMemberModel } from "@workspace/db";

const router = Router();

router.get("/team", async (req: Request, res: Response) => {
  const members = await TeamMemberModel.find().sort({ sortOrder: 1 });
  res.json(members.map(m => ({ ...m.toObject(), id: m._id.toString() })));
});

router.post("/team", async (req: Request, res: Response) => {
  const { name, role, bio, imageUrl, isActive = true, sortOrder = 0 } = req.body;
  const member = await TeamMemberModel.create({ name, role, bio, imageUrl, isActive, sortOrder });
  res.status(201).json({ ...member.toObject(), id: member._id.toString() });
});

router.put("/team/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, role, bio, imageUrl, isActive, sortOrder } = req.body;
  const member = await TeamMemberModel.findByIdAndUpdate(id, { name, role, bio, imageUrl, isActive, sortOrder }, { new: true });
  if (!member) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...member.toObject(), id: member._id.toString() });
});

router.delete("/team/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await TeamMemberModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
