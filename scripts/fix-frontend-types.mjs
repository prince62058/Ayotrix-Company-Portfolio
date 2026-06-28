import fs from "fs";
import path from "path";

const adminDir = path.resolve(process.cwd(), "artifacts/ayotrix/src/pages/admin");
const files = fs.readdirSync(adminDir);

for (const file of files) {
  if (file.endsWith(".tsx") || file.endsWith(".ts")) {
    const filePath = path.join(adminDir, file);
    let content = fs.readFileSync(filePath, "utf-8");

    // Fix id: Date.now() -> id: Date.now().toString()
    content = content.replace(/id: Date\.now\(\)/g, "id: Date.now().toString()");

    // Fix useState<number | null> -> useState<string | null>
    content = content.replace(/useState<number \| null>/g, "useState<string | null>");

    // If there is any parseInt(item.id) or similar, remove it. (Already checked we only have parseInt for rating)

    fs.writeFileSync(filePath, content, "utf-8");
  }
}

// Fix card-3d.tsx error
const card3dPath = path.resolve(process.cwd(), "artifacts/ayotrix/src/components/ui/card-3d.tsx");
if (fs.existsSync(card3dPath)) {
  let cardContent = fs.readFileSync(card3dPath, "utf-8");
  // The error is Type 'Record<string, unknown> | undefined' is not assignable to type 'TargetAndTransition | VariantLabels | undefined'.
  // This usually happens when passing `animate={...}` and `framer-motion` types mismatch.
  // A quick fix is to cast it `animate={animations as any}` or just remove the type error by casting.
  cardContent = cardContent.replace(/animate=\{animations\}/g, "animate={animations as any}");
  fs.writeFileSync(card3dPath, cardContent, "utf-8");
}

console.log("Fixed frontend type errors");
