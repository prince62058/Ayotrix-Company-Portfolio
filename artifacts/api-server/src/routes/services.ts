import { Router } from "express";
import { ServiceModel } from "@workspace/db";

const router = Router();

router.get("/services", async (req, res) => {
  const services = await ServiceModel.find().sort({ sortOrder: 1 });
  res.json(services.map(s => ({ ...s.toObject(), id: s._id.toString() })));
});

router.get("/services/:id", async (req, res) => {
  const id = req.params.id;
  const service = await ServiceModel.findById(id);
  if (!service) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...service.toObject(), id: service._id.toString() });
});

router.post("/services", async (req, res) => {
  const service = await ServiceModel.create(req.body);
  res.status(201).json({ ...service.toObject(), id: service._id.toString() });
});

router.put("/services/:id", async (req, res) => {
  const id = req.params.id;
  const service = await ServiceModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  if (!service) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...service.toObject(), id: service._id.toString() });
});

router.delete("/services/:id", async (req, res) => {
  const id = req.params.id;
  await ServiceModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
