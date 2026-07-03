import { Router, type Request, type Response } from "express";
import { ClientModel } from "@workspace/db";

const router = Router();

router.get("/clients", async (req: Request, res: Response) => {
  const filter = req.query.active === "true" ? { isActive: true } : {};
  const clients = await ClientModel.find(filter);
  res.json(clients.map(c => ({ ...c.toObject(), id: c._id.toString() })));
});

router.post("/clients", async (req: Request, res: Response) => {
  const { name, logoUrl, isActive = true } = req.body;
  const client = await ClientModel.create({ name, logoUrl, isActive });
  res.status(201).json({ ...client.toObject(), id: client._id.toString() });
});

router.put("/clients/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, logoUrl, isActive } = req.body;
  const client = await ClientModel.findByIdAndUpdate(id, { name, logoUrl, isActive }, { new: true });
  if (!client) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...client.toObject(), id: client._id.toString() });
});

router.delete("/clients/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await ClientModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
