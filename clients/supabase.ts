import { createClient } from "@supabase/supabase-js";

const SERVICE_KEY = process.env.SUPABASE_PRIVATE_SERVICE_KEY as string;

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseClient = createClient(SUPABASE_URL, SERVICE_KEY, {
  fetch: (...args) => fetch(...args),
});

supabaseClient.auth.api.createUser({});

export const supabase = supabaseClient;
