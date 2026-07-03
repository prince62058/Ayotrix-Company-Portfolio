import express from "express";

let app;
try {
  // Try to load the main app
  app = require("../src/app").default || require("../src/app");
} catch (error: any) {
  // If it crashes on load, create a fallback app to display the error
  console.error("Failed to initialize app:", error);
  app = express();
  app.use((req, res) => {
    res.status(500).json({
      error: "Initialization failed on Vercel",
      message: error.message,
      stack: error.stack,
    });
  });
}

export default app;
