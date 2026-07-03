import { Router, type Request, type Response } from "express";
import { TestimonialModel } from "@workspace/db";

const router = Router();

router.get("/testimonials", async (req: Request, res: Response) => {
  const testimonials = await TestimonialModel.find({ isActive: true });
  res.json(testimonials.map(t => ({ ...t.toObject(), id: t._id.toString() })));
});

router.post("/testimonials", async (req: Request, res: Response) => {
  const { clientName, company, review, rating = 5, imageUrl = null, isActive = true } = req.body;
  const testimonial = await TestimonialModel.create({ clientName, company, review, rating, imageUrl, isActive });
  res.status(201).json({ ...testimonial.toObject(), id: testimonial._id.toString() });
});

router.put("/testimonials/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { clientName, company, review, rating, imageUrl, isActive } = req.body;
  const testimonial = await TestimonialModel.findByIdAndUpdate(id, { clientName, company, review, rating, imageUrl, isActive }, { new: true });
  if (!testimonial) { res.status(404).json({ error: "Not found" }); return; }
  res.json({ ...testimonial.toObject(), id: testimonial._id.toString() });
});

router.delete("/testimonials/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await TestimonialModel.findByIdAndDelete(id);
  res.json({ success: true });
});

export default router;
