import mongoose from "mongoose";

const mongoUrl = process.env.MONGO_URI;

if (!mongoUrl) {
  throw new Error(
    "MONGO_URI must be set. Please configure your MongoDB connection string.",
  );
}

// Connect to MongoDB
mongoose.connect(mongoUrl).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

export * from "./schema";
