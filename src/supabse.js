import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABSE_URL;
const key = import.meta.env.VITE_SUPABSE_KEY;
const supabase = createClient(url, key);
export default supabase;
