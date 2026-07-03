import { Router, type Request, type Response } from "express";
import { BannerModel } from "@workspace/db";

const router = Router();

router.get("/banners", async (req: Request, res: Response) => {
  const banners = await BannerModel.find({ isActive: true }).sort({ sortOrder: 1 });
  // Map _id to id for API compatibility
  const mapped = banners.map(b => ({ ...b.toObject(), id: b._id.toString() }));
  res.json(mapped);
});

router.post("/banners", async (req: Request, res: Response) => {
  const { title, subtitle, ctaText, ctaLink, imageUrl, isActive = true, sortOrder = 0 } = req.body;
  const banner = await BannerModel.create({ title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder });
  res.status(201).json({ ...banner.toObject(), id: banner._id.toString() });
});

router.put("/banners/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder } = req.body;
  const banner = await BannerModel.findByIdAndUpdate(id, { title, subtitle, ctaText, ctaLink, imageUrl, isActive, sortOrder }, { new: true });
  if (!banner) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...banner.toObject(), id: banner._id.toString() });
});

router.delete("/banners/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await BannerModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
