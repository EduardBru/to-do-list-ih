// UseSupabase.js
import { createClient } from '@supabase/supabase-js';
// these can come from an environment variable if desired
// not required however as they are 100% exposed on the client side anyway
// and that's ok, Supabase expects this (security is provided by Row Level Security)
const supabaseUrl = 'https://tmigxpyrydygqcemsgny.supabase.co';
const supabaseAnonToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRtaWd4cHlyeWR5Z3FjZW1zZ255Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4ODAxNDQsImV4cCI6MTk3NzQ1NjE0NH0.9AcZsebrDM0IL25pFKzIgo6QFYSfui8mL7ZdcKe2Yco';
// expose supabase client
export default createClient(supabaseUrl, supabaseAnonToken);
