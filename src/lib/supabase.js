import { createClient } from '@supabase/supabase-js'

// These connect your app to your Supabase project
// SUPABASE_URL: The address of your database
// SUPABASE_ANON_KEY: A public key that allows client-side access (with Row Level Security)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Create the Supabase client - this is what we use to query the database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
