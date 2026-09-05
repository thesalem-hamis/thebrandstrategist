import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    "[Supabase] Missing VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — data features will be disabled."
  );
}

export const supabase = createClient(
  supabaseUrl ?? "https://qlqbkjnnewaihrbpsiqw.supabase.co",
  supabaseAnonKey ?? "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscWJram5uZXdhaWhyYnBzaXF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgyMDY4NDYsImV4cCI6MjEwMzc4Mjg0Nn0.bgihWabgoaoiZAitiERovhBgyOVXkm2fZjIZ47NWXXAVI",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  }
);