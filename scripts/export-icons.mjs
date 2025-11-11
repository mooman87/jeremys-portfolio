import fs from "node:fs";
import path from "node:path";
import * as SI from "simple-icons"; 

const ICONS = [
  // Frontend
  { slug: "react" },
  { slug: "nextdotjs", out: "nextjs" },
  { slug: "tailwindcss", out: "tailwind" },
  { slug: "bootstrap" },
  { slug: "sass" },
  { slug: "svelte" },
  { slug: "html5", out: "html" },
  { slug: "csswizardry",  out: "css" },
  { slug: "javascript" },
  { slug: "typescript"},

  // Backend
  { slug: "nodedotjs", out: "nodejs" },
  { slug: "express" },
  { slug: "python" },
  { slug: "postgresql", out: "sql" }, 

  // APIs & data
  { slug: "graphql" },
  { slug: "mongodb" },
  { slug: "openapiinitiative", out: "rest" }, 
  { slug: "auth0", out: "oauth" },           

  // Maps & charts
  { slug: "mapbox" },
  { slug: "chartdotjs", out: "chartjs" },

  // Dev tooling
  { slug: "git" },
  { slug: "figma" },
  { slug: "jest" },
  { slug: "postman" },
  { slug: "githubactions", out: "cicd" },    

  // OS

  { slug: "apple", out: "macos" },
  { slug: "linux" },
];

const OUT_DIR = path.join(process.cwd(), "public", "icons");
fs.mkdirSync(OUT_DIR, { recursive: true });


const exportKey = (slug) =>
  "si" + slug.replace(/-([a-z])/g, (_, c) => c.toUpperCase()).replace(/^\w/, s => s.toUpperCase());

const missing = [];

for (const { slug, out } of ICONS) {
  const key = exportKey(slug);
  const icon = SI[key];
  if (!icon) {
    missing.push(slug);
    continue;
  }
  const filename = (out || slug).toLowerCase() + ".svg";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-label="${out || slug}">
  <path d="${icon.path}"/>
</svg>`;
  fs.writeFileSync(path.join(OUT_DIR, filename), svg, "utf8");
}

if (missing.length) {
  console.warn("Missing icons:", missing);
} else {
  console.log(`Exported ${ICONS.length} icons → ${OUT_DIR}`);
}
