import { createClient } from "@supabase/supabase-js";
import { allInsights } from "../src/data/insightsData";
import * as fs from "fs";
import * as path from "path";

// 1. Manually resolve .env and parse it, avoiding external `dotenv` dependency
const envPath = path.resolve(process.cwd(), ".env");
const envVars: Record<string, string> = {};

if (fs.existsSync(envPath)) {
  const envFile = fs.readFileSync(envPath, "utf-8");
  envFile.split("\n").forEach(line => {
    // Basic .env parser regex
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      envVars[match[1]] = match[2];
    }
  });
}

const supabaseUrl = envVars["VITE_SUPABASE_URL"];
const supabaseKey = envVars["VITE_SUPABASE_ANON_KEY"];

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

// 2. Init Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// 3. Define the async migration runner
async function runMigration() {
  console.log(`Starting migration of ${allInsights.length} static insights to Supabase...`);
  
  let successCount = 0;
  let errorCount = 0;

  for (const insight of allInsights) {
    const payload = {
      name: insight.author.name,
      email: "editorial@gamr.africa",  // Default email since original author objects don't store it
      title: insight.title,
      category: insight.category,
      content: insight.content,
      status: "approved",
      featured: insight.featured === true,
      slug: insight.slug,
      excerpt: insight.excerpt || "",
      cover_image: insight.coverImage || "",
      read_time: String(insight.readTime) || "",
      tags: insight.tags || [],
      author_slug: insight.author.slug,
      created_at: new Date(insight.publishedAt || new Date()).toISOString(),
    };

    // Use .upsert() so this script is idempotent. It looks for conflict on "slug".
    const { error } = await supabase
      .from("article_submissions")
      .upsert(payload, { onConflict: "slug" });
    
    if (error) {
      console.error(`❌ Failed to migrate [${insight.slug}]:`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Successfully migrated [${insight.slug}]`);
      successCount++;
    }
  }
  
  console.log("\n--------------------------------");
  console.log("Migration Complete!");
  console.log(`Successfully imported: ${successCount}`);
  if (errorCount > 0) console.log(`Failed imports: ${errorCount}`);
  console.log("--------------------------------\n");
}

runMigration();
