import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI || process.env.DATABASE_URL;

if (!mongoUrl) {
  console.warn("WARNING: DATABASE_URL or MONGO_URI is not set. MongoDB will not connect. Please configure your environment variables in Vercel.");
} else {
  // Connect to MongoDB
  mongoose.connect(mongoUrl).then(() => {
    console.log("Connected to MongoDB successfully");
  }).catch((err) => {
    console.error("MongoDB connection error:", err);
  });
}

export * from "./schema";
