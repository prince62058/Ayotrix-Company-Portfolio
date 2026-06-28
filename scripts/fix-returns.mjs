import fs from "fs";
import path from "path";

const routesDir = path.resolve(process.cwd(), "artifacts/api-server/src/routes");
const files = fs.readdirSync(routesDir);

for (const file of files) {
  if (file.endsWith(".ts")) {
    const filePath = path.join(routesDir, file);
    let content = fs.readFileSync(filePath, "utf-8");

    content = content.replace(
      /if \(\!([a-zA-Z0-9_]+)\) return res\.status\(404\)\.json\(\{ error: "Not found" \}\);/g,
      "if (!$1) { res.status(404).json({ error: \"Not found\" }); return; }"
    );

    fs.writeFileSync(filePath, content, "utf-8");
  }
}
console.log("Fixed return statements in routes");
