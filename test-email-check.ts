import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function main() {
    console.log("Checking email...");
    const { data, error } = await supabase
        .from("gaming_profiles")
        .select("email")
        .eq("email", "test@example.com")
        .maybeSingle();

    console.log("Data:", data);
    console.log("Error:", error);
}

main();
