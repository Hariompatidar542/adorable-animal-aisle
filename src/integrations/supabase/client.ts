// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://abklfsjfugptlnzlcerk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFia2xmc2pmdWdwdGxuemxjZXJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0NzQ3MTQsImV4cCI6MjA2NTA1MDcxNH0.gWFJudXCqQe5kNZRSzukhPY97BlFF49xThA4n3QqJp8";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);