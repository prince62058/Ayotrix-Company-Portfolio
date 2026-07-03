import express from "express";
import bundledApp from "../dist/index.mjs";

let app;
try {
  // We use the fully bundled output from esbuild instead of raw source files.
  // This completely eliminates any Vercel module resolution errors since 
  // workspace dependencies like @workspace/api-zod are already bundled inside!
  app = bundledApp.default || bundledApp;
} catch (error) {
  console.error("Failed to initialize bundled app:", error);
  app = express();
  app.use((req, res) => {
    res.status(500).json({
      error: "Initialization failed on Vercel via esbuild bundle",
      message: error.message,
      stack: error.stack,
    });
  });
}

export default app;
