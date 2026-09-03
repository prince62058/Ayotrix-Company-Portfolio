import mongoose from "mongoose";
import { z } from "zod";

export const DEFAULT_PRIVACY_POLICY = `1. Who We Are
Ayotrix Infotech ("we", "us", "our") is an end-to-end digital solutions agency based in Bhopal, Madhya Pradesh, India. We operate ayotrix.com and specialize in software development, mobile apps, digital marketing, RCS & WhatsApp communication products, and AI solutions.

2. Information We Collect
We collect personal information when you fill out contact or inquiry forms on our site:
- Contact Information: Full name, email address, phone number, company name.
- Project Details: Service requirements, budget estimates, and inquiry messages.
- Technical Data: IP address, browser type, device information, and website usage data for security and performance optimization.

3. How We Use Your Information
Your information is used strictly to:
- Respond to your inquiries and provide service quotes.
- Deliver customized app development, digital marketing, and messaging services.
- Improve our website features, performance, and user experience.
- Maintain operational security and prevent unauthorized activity.

4. Data Sharing & Disclosure
We value your trust and do not sell, rent, or lease your personal information. Data may be shared only with:
- Authorized Cloud & IT Infrastructure Providers: Trusted partners who assist in website hosting and email processing under strict confidentiality terms.
- Legal Compliance: When required by law or judicial proceedings in India.

5. Data Security & Storage
We implement industry-standard encryption, firewalls, and security measures to protect your data from unauthorized access, alteration, or loss.

6. Your Data Rights
You have the right to request access to your personal data, request corrections, or ask for data deletion by contacting info@ayotrix.com.

7. Contact Information
If you have any questions or concerns regarding this Privacy Policy, please contact us:
Ayotrix Infotech
Bhopal, Madhya Pradesh, India
Email: info@ayotrix.com | Phone: +91 97520 45356`;

export const DEFAULT_TERMS_OF_SERVICE = `1. Agreement
By accessing ayotrix.com or engaging Ayotrix Infotech for digital services, you agree to comply with these terms. Detailed deliverables and timelines are defined in project proposals.

2. Services Provided
Ayotrix Infotech provides application development, performance digital marketing, communication APIs (WhatsApp, RCS, OTP), and AI solutions.

3. Client Responsibilities
Clients agree to provide required assets, project inputs, and feedback in a timely manner to avoid delivery delays.

4. Intellectual Property
Upon full payment, custom software deliverables transfer to the client as specified in individual contract agreements. Pre-existing frameworks and third-party tools remain protected under their respective licenses.

5. Contact Us
For questions regarding these terms, reach us at info@ayotrix.com or +91 97520 45356.`;

export const siteSettingsSchema = new mongoose.Schema({
  key: { type: String, default: "main", unique: true },
  password: { type: String, default: "525252" },
  logoUrl: { type: String, default: "" },
  companyName: { type: String, default: "Ayotrix Infotech" },
  contactPerson: { type: String, default: "Subham Pandey, CEO" },
  phone: { type: String, default: "+91 97520 45356" },
  email: { type: String, default: "info@ayotrix.com" },
  address: { type: String, default: "Bhopal, Madhya Pradesh" },
  privacyPolicyContent: { type: String, default: DEFAULT_PRIVACY_POLICY },
  privacyPolicyLastUpdated: { type: String, default: "July 29, 2026" },
  termsOfServiceContent: { type: String, default: DEFAULT_TERMS_OF_SERVICE },
  termsOfServiceLastUpdated: { type: String, default: "July 29, 2026" },
}, { timestamps: true });

export const SiteSettingsModel =
  mongoose.models.SiteSettings ||
  mongoose.model("SiteSettings", siteSettingsSchema);

export const updateSiteSettingsSchema = z.object({
  logoUrl: z.string().optional(),
  companyName: z.string().optional(),
  contactPerson: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  privacyPolicyContent: z.string().optional(),
  privacyPolicyLastUpdated: z.string().optional(),
  termsOfServiceContent: z.string().optional(),
  termsOfServiceLastUpdated: z.string().optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(4),
});

export type SiteSettings = {
  key: string;
  password: string;
  logoUrl: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  email: string;
  address: string;
  privacyPolicyContent?: string;
  privacyPolicyLastUpdated?: string;
  termsOfServiceContent?: string;
  termsOfServiceLastUpdated?: string;
};
