import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"] || "5001";
const port = Number(rawPort);

// Only start the server if we are not running in a Vercel serverless environment
if (!process.env.VERCEL) {
  app.listen(port, (err) => {
    if (err) {
      logger.error({ err }, "Error listening on port");
      process.exit(1);
    }

    logger.info({ port }, "Server listening");
  });
}

// Export the app for Vercel to use as a serverless function
export default app;
