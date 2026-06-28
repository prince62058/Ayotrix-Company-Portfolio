import { Router } from "express";
import { ProductModel } from "@workspace/db";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find().sort({ sortOrder: 1 });
  res.json(products.map(p => ({ ...p.toObject(), id: p._id.toString() })));
});

router.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  if (!product) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...product.toObject(), id: product._id.toString() });
});

router.post("/products", async (req, res) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({ ...product.toObject(), id: product._id.toString() });
});

router.put("/products/:id", async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findByIdAndUpdate(id, { $set: req.body }, { new: true });
  if (!product) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...product.toObject(), id: product._id.toString() });
});

router.delete("/products/:id", async (req, res) => {
  const id = req.params.id;
  await ProductModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
