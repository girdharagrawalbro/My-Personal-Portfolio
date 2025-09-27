import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if Supabase credentials are provided and valid
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables.')
  console.error('Please check your .env file contains:')
  console.error('VITE_SUPABASE_URL=your_supabase_url')
  console.error('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
}

// Validate URL format
let isValidUrl = false
if (supabaseUrl) {
  try {
    new URL(supabaseUrl)
    isValidUrl = true
  } catch (e) {
    console.error('Invalid Supabase URL format:', supabaseUrl)
  }
}

export const supabase = (supabaseUrl && supabaseAnonKey && isValidUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key')

// Database types
