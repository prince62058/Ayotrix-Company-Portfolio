import { Router, type Request, type Response } from "express";
import { ContactModel } from "@workspace/db";

const router = Router();

// Handle GET on both /contact and /contacts
const getContacts = async (req: Request, res: Response) => {
  const contacts = await ContactModel.find().sort({ createdAt: -1 });
  res.json(contacts.map(c => ({ ...c.toObject(), id: c._id.toString(), createdAt: c.createdAt.toISOString() })));
};
router.get("/contact", getContacts);
router.get("/contacts", getContacts);

// Handle POST on both /contact and /contacts
const postContact = async (req: Request, res: Response) => {
  const { name, email, phone, subject = null, message } = req.body;
  const contact = await ContactModel.create({ name, email, phone, subject, message });
  res.status(201).json({ success: true, id: contact._id.toString() });
};
router.post("/contact", postContact);
router.post("/contacts", postContact);

export default router;
