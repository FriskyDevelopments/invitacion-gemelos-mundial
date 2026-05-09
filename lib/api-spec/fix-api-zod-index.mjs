import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const dir = dirname(fileURLToPath(import.meta.url));
writeFileSync(
  resolve(dir, "../../lib/api-zod/src/index.ts"),
  "export * from \"./generated/api\";\n",
);
console.log("Fixed lib/api-zod/src/index.ts");
