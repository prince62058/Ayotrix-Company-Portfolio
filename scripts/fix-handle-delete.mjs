import fs from "fs";
import path from "path";

const adminDir = path.resolve(process.cwd(), "artifacts/ayotrix/src/pages/admin");
const files = fs.readdirSync(adminDir);

for (const file of files) {
  if (file.endsWith(".tsx") || file.endsWith(".ts")) {
    const filePath = path.join(adminDir, file);
    let content = fs.readFileSync(filePath, "utf-8");

    // Fix handleDelete = (id: number) -> handleDelete = (id: string)
    content = content.replace(/handleDelete = \(id: number\)/g, "handleDelete = (id: string)");

    fs.writeFileSync(filePath, content, "utf-8");
  }
}

console.log("Fixed handleDelete parameter type");
