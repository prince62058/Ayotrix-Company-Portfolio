import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import session from "express-session";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();
const isProd = process.env.NODE_ENV === "production";

// Hostinger (and similar) terminate TLS at a reverse proxy
if (isProd) {
  app.set("trust proxy", 1);
}

app.use(
  (pinoHttp as any)({
    logger,
    serializers: {
      req(req: any) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0],
        };
      },
      res(res: any) {
        return {
          statusCode: res.statusCode,
        };
      },
    },
  }),
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET ?? "ayotrix-secret-key-2024",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);

app.use("/api", router);

function resolveFrontendPath(): string {
  if (process.env.FRONTEND_DIR) {
    return path.resolve(process.env.FRONTEND_DIR);
  }

  // Bundled production layout: artifacts/api-server/dist/public (next to index.mjs)
  const dirname =
    typeof __dirname !== "undefined"
      ? __dirname
      : path.dirname(fileURLToPath(import.meta.url));
  const besideDist = path.join(dirname, "public");
  if (fs.existsSync(path.join(besideDist, "index.html"))) {
    return besideDist;
  }

  // Local monorepo fallback (dev / incomplete hostinger copy)
  const monorepoFallback = path.join(process.cwd(), "artifacts/ayotrix/dist/public");
  if (fs.existsSync(path.join(monorepoFallback, "index.html"))) {
    return monorepoFallback;
  }

  const relativeFallback = path.join(process.cwd(), "../ayotrix/dist/public");
  return relativeFallback;
}

const frontendPath = resolveFrontendPath();
logger.info({ frontendPath }, "Serving frontend static files");

app.use(express.static(frontendPath));

// Fallback to index.html for React routing (wouter)
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  const indexHtml = path.join(frontendPath, "index.html");
  if (!fs.existsSync(indexHtml)) {
    res.status(500).send("Frontend build not found. Run pnpm run build:hostinger.");
    return;
  }
  res.sendFile(indexHtml);
});

export default app;
