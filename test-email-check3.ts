import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function main() {
    console.log("Fetching all gaming profiles...");
    const res = await supabase.from("gaming_profiles").select("gamr_tag, email").limit(5);
    console.log("Res:", res);
}

main();
