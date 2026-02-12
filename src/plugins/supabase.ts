import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
