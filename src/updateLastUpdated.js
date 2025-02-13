import { writeFile } from "node:fs/promises";

await writeFile(
  "public/lastUpdated.json",
  JSON.stringify({ lastUpdated: new Date().toISOString() }, null, 2),
);

console.log("Wrote last updated json");
