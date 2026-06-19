const fs = require("fs");
const js = fs.readFileSync("_legacy/_next/static/chunks/f76800ce667d2cab.js", "utf8");

const marker = "di=[";
const startIdx = js.indexOf(marker);
if (startIdx === -1) {
  console.error("marker not found");
  process.exit(1);
}

let i = startIdx + marker.length - 1; // points to [
let depth = 0;
let endIdx = -1;

for (; i < js.length; i += 1) {
  const ch = js[i];
  if (ch === "[") depth += 1;
  else if (ch === "]") {
    depth -= 1;
    if (depth === 0) {
      endIdx = i;
      break;
    }
  }
}

const raw = js.slice(startIdx + 3, endIdx + 1);
const projects = Function(`"use strict"; return ${raw};`)();

fs.writeFileSync(
  "src/data/projects-full.json",
  JSON.stringify(projects, null, 2),
);
console.log("Extracted", projects.length, "projects");
console.log(Object.keys(projects[0]));
