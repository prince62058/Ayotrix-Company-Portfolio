import fs from "fs";
import path from "path";

const openapiPath = path.resolve(process.cwd(), "lib/api-spec/openapi.yaml");
let content = fs.readFileSync(openapiPath, "utf-8");

// Replace parameter ID type
content = content.replace(
  /(- name: id\s*in: path\s*required: true\s*schema:\s*)type: integer/g,
  "$1type: string"
);

// Replace schema ID type
content = content.replace(
  /(id:\s*)type: integer/g,
  "$1type: string"
);

// Replace any id property type that might have spaces
content = content.replace(
  /(id:\n\s*)type: integer/g,
  "$1type: string"
);

// ContactResult schema uses id: type: integer
content = content.replace(
  /id:\s*type: integer/g,
  "id:\n          type: string"
);


fs.writeFileSync(openapiPath, content, "utf-8");
console.log("Updated openapi.yaml");
