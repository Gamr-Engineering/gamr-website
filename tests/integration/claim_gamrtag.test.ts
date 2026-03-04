import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Missing Supabase credentials in .env");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function runTest() {
    console.log("Starting Claim GamrTag Integration Test...");

    const testProfile = {
        gamr_tag: `test_user_${Date.now()}`,
        first_name: "Test",
        last_name: "User",
        display_name: "Test User",
        email: `test_user_${Date.now()}@example.com`,
        bio: "Integration test bio",
        city: "Test City",
        country: "Nigeria",
        favorite_games: ["FIFA / EA FC", "Call of Duty"],
        platform: "PC",
        gaming_region: "West Africa",
        gamer_archetype: "Competitor",
        play_style: "Casual",
        personality_traits: ["Team Player", "Strategist"],
        gamer_archetypes: ["competitor", "socializer"],
        play_styles: ["casual", "streamer"]
    };

    console.log(`Attempting to insert profile with GamrTag: ${testProfile.gamr_tag}...`);
    
    // First attempt: with array columns
    const { error } = await supabase.from("gaming_profiles").insert(testProfile);

    if (error) {
        if (error.code === "PGRST204" || error.message.includes("Could not find the") || error.message.includes("schema cache")) {
            console.log("Caught expected schema cache error:", error.message);
            console.log("Simulating frontend retry fallback logic...");
            
            const { gamer_archetypes, play_styles, ...fallbackData } = testProfile;
            const fallbackResponse = await supabase.from("gaming_profiles").insert(fallbackData);
            
            if (fallbackResponse.error) {
                console.error("Fallback insert failed:", fallbackResponse.error);
                process.exit(1);
            } else {
                console.log("✅ Fallback insert succeeded without schema errors!");
            }
        } else {
            console.error("Unexpected error:", error);
            process.exit(1);
        }
    } else {
        console.log("✅ Main insert succeeded (columns exist or no schema error thrown)!");
    }

    // Cleanup
    console.log("Cleaning up test user...");
    await supabase.from("gaming_profiles").delete().eq("email", testProfile.email);
    console.log("Test finished successfully.");
}

runTest();
