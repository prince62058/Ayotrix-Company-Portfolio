import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, "../../.env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
  const uri = dbUrlMatch ? dbUrlMatch[1] : null;
  if (uri) {
    process.env.MONGO_URI = uri;
  }
}

if (!process.env.MONGO_URI) {
  console.error("MONGO_URI is missing from environment/env file!");
  process.exit(1);
}

// Import models
import { 
  ServiceModel, 
  ProductModel, 
  BannerModel, 
  SiteSettingsModel,
  TeamMemberModel,
  TestimonialModel,
  ClientModel
} from "../../lib/db/src/index";

const CLIENTS = [
  { name: "Google", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", isActive: true },
  { name: "Microsoft", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg", isActive: true },
  { name: "Amazon", logoUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg", isActive: true }
];

import { SERVICES, PRODUCTS, DM_SERVICES } from "../../artifacts/ayotrix/src/lib/static-data";

const HERO_SLIDES = [
  {
    title: "Build World-Class Mobile & Web Apps",
    subtitle: "E-Commerce stores, Taxi booking apps, and Service marketplace platforms — custom-built for your exact business requirements.",
    ctaText: "Explore Services",
    ctaLink: "/services",
    imageUrl: "default" // Defaults to hero video loop
  },
  {
    title: "Power Your Business with Smart Communication Tools",
    subtitle: "WhatsApp Marketing, RCS Messaging, AI Agents, OTP Services — all in one platform. Connect with your customers at scale.",
    ctaText: "View Products",
    ctaLink: "/products",
    imageUrl: "default"
  },
  {
    title: "Accelerate Growth with Digital Marketing",
    subtitle: "Google Ads, Social Media, SEO, Graphic Design, UGC Reels — comprehensive digital marketing that drives real results.",
    ctaText: "Start Growing",
    ctaLink: "/digital-marketing",
    imageUrl: "default"
  }
];

const TEAM_MEMBERS = [
  { name: "Prince Kumar", role: "CEO & Founder", bio: "Tech visionary leading digital innovation.", imageUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150" },
  { name: "Amit Sharma", role: "CTO", bio: "System architect and full-stack engineering lead.", imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150" },
  { name: "Neha Verma", role: "Head of Marketing", bio: "Growth marketer specializing in ROI-driven campaigns.", imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150" }
];

const TESTIMONIALS = [
  { clientName: "Rajesh Gupta", company: "Gupta Electronics", review: "Ayotrix built our custom e-commerce store. Our conversion rate tripled in 3 months! Highly professional team.", rating: 5 },
  { clientName: "Sarah D'Souza", company: "Zenith EdTech", review: "The WhatsApp Marketing API was integrated within days. Excellent customer support and reliability.", rating: 5 }
];

async function seed() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.MONGO_URI as string);
  console.log("Connected successfully!");

  // 1. Seed Site Settings
  console.log("Seeding Site Settings...");
  await SiteSettingsModel.deleteMany({});
  await SiteSettingsModel.create({
    key: "main",
    logoUrl: "", // Blank defaults to placeholder png
    companyName: "Ayotrix Infotech",
    phone: "+91 97520 45356",
    email: "info@ayotrix.com",
    address: "Bhopal, Madhya Pradesh",
    password: "525252"
  });

  // 2. Seed Banners
  console.log("Seeding Banners...");
  await BannerModel.deleteMany({});
  for (let i = 0; i < HERO_SLIDES.length; i++) {
    await BannerModel.create({
      ...HERO_SLIDES[i],
      isActive: true,
      sortOrder: i
    });
  }

  // 3. Seed Services
  console.log("Seeding Services...");
  await ServiceModel.deleteMany({});
  for (let i = 0; i < SERVICES.length; i++) {
    const s = SERVICES[i];
    await ServiceModel.create({
      ...s,
      isActive: true,
      sortOrder: i,
      category: "Application Development"
    });
  }
  for (let i = 0; i < DM_SERVICES.length; i++) {
    const s = DM_SERVICES[i];
    await ServiceModel.create({
      ...s,
      isActive: true,
      sortOrder: i,
      category: "Digital Marketing"
    });
  }

  // 4. Seed Products
  console.log("Seeding Products...");
  await ProductModel.deleteMany({});
  for (let i = 0; i < PRODUCTS.length; i++) {
    const p = PRODUCTS[i];
    await ProductModel.create({
      ...p,
      isActive: true,
      sortOrder: i,
      category: "Communication Suite"
    });
  }

  // 5. Seed Team Members
  console.log("Seeding Team Members...");
  await TeamMemberModel.deleteMany({});
  for (let i = 0; i < TEAM_MEMBERS.length; i++) {
    await TeamMemberModel.create({
      ...TEAM_MEMBERS[i],
      isActive: true,
      sortOrder: i
    });
  }

  // 6. Seed Testimonials
  console.log("Seeding Testimonials...");
  await TestimonialModel.deleteMany({});
  for (let i = 0; i < TESTIMONIALS.length; i++) {
    await TestimonialModel.create({
      ...TESTIMONIALS[i],
      isActive: true
    });
  }
  // 7. Seed Clients
  console.log("Seeding Clients...");
  await ClientModel.deleteMany({});
  for (let i = 0; i < CLIENTS.length; i++) {
    await ClientModel.create(CLIENTS[i]);
  }
  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch(err => {
  console.error("Error seeding database:", err);
  process.exit(1);
});
