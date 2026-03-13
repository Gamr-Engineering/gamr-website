import fs from "fs";
import path from "path";

const insightsFile = path.join(process.cwd(), "src/data/insightsData.ts");
let content = fs.readFileSync(insightsFile, "utf-8");

// Update Interface
content = content.replace(
  /export interface Insight \{([\s\S]*?)\}/,
  `export interface Insight {
  slug: string;
  title: string;
  category: InsightCategory;
  excerpt: string;
  date: string;
  readTime: string;
  coverImage: string;
  author: string;
  tags: string[];
  featured?: boolean;
  trendingScore?: number;
  content: string;
}`
);

// Replace id: with slug:
content = content.replace(/id:/g, "slug:");

// Define dummy authors and tags to distribute
const authors = ["Emmanuel Oyalabu", "Oladapo Dosekun", "Gamr Editorial"];
const tagPool = ["Esports", "Gaming Culture", "Mobile Gaming", "Infrastructure", "African Tech", "Tournaments", "Community", "Game Dev"];
const images = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
];

let itemIndex = 0;

// Add new fields to each object. We'll look for `content: \`` and append before it closes, or before `content:`
// Actually, it's easier to find `readTime: "...",` and add the fields after it.
content = content.replace(/readTime:\s*"[^"]*",/g, (match) => {
  const author = authors[itemIndex % authors.length];
  const tagsStr = JSON.stringify([tagPool[itemIndex % tagPool.length], tagPool[(itemIndex + 1) % tagPool.length]]);
  const image = images[itemIndex % images.length];
  const featured = itemIndex === 0 ? "featured: true," : "";
  const trending = `trendingScore: ${Math.floor(Math.random() * 100)},`;
  
  itemIndex++;
  
  return `${match}
    coverImage: "${image}",
    author: "${author}",
    tags: ${tagsStr},
    ${featured}
    ${trending}`;
});

fs.writeFileSync(insightsFile, content, "utf-8");
console.log("Successfully migrated insightsData.ts");
