import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "artifacts/ayotrix/dist/public");
const dest = path.join(root, "artifacts/api-server/dist/public");

if (!existsSync(path.join(src, "index.html"))) {
  console.error(`Frontend build missing at ${src}`);
  console.error("Run the frontend build first (pnpm --filter @workspace/ayotrix run build).");
  process.exit(1);
}

if (!existsSync(path.join(root, "artifacts/api-server/dist/index.mjs"))) {
  console.error("API build missing at artifacts/api-server/dist/index.mjs");
  console.error("Run the API build first (pnpm --filter @workspace/api-server run build).");
  process.exit(1);
}

rmSync(dest, { recursive: true, force: true });
mkdirSync(path.dirname(dest), { recursive: true });
cpSync(src, dest, { recursive: true });
console.log(`Copied frontend → ${dest}`);
