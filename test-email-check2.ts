import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function main() {
    const res = await supabase.from("gaming_profiles").select("email").limit(1);
    console.log("Existing profile:", res.data);
    
    if (res.data && res.data.length > 0) {
        const existEmail = res.data[0].email;
        console.log("Checking existing email: ", existEmail);
        const { data, error } = await supabase
            .from("gaming_profiles")
            .select("email")
            .eq("email", existEmail)
            .maybeSingle();

        console.log("Data:", data);
        console.log("Error:", error);
    }
}

main();
