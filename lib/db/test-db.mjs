import mongoose from "mongoose";
import fs from "fs";

const envContent = fs.readFileSync("../../.env", "utf-8");
const dbUrlMatch = envContent.match(/DATABASE_URL="([^"]+)"/);
const uri = dbUrlMatch ? dbUrlMatch[1] : null;

async function testConnection() {
  if (!uri) {
    console.error("DATABASE_URL is missing from .env");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect(uri);
    console.log("✅ Successfully connected to MongoDB!");
    console.log("Database Name:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    process.exit(0);
  } catch (error) {
    console.error("❌ MongoDB connection failed!");
    console.error(error);
    process.exit(1);
  }
}

testConnection();
