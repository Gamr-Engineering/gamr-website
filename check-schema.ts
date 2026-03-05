import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL!, process.env.VITE_SUPABASE_ANON_KEY!);

async function main() {
    console.log("Checking columns of gaming_profiles...");
    const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'gaming_profiles' });
    
    // If RPC doesn't exist, try a simple select with a limit 0
    if (error) {
        process.stdout.write("RPC failed, trying select * limit 0\n");
        const { data: selectData, error: selectError } = await supabase.from('gaming_profiles').select('*').limit(0);
        if (selectError) {
             process.stdout.write("Select failed: " + JSON.stringify(selectError) + "\n");
        } else {
             process.stdout.write("Select success\n");
             // Just list keys of an object if we can get one, but here data is empty array.
        }
    } else {
        process.stdout.write("Columns: " + JSON.stringify(data) + "\n");
    }
}

main();
