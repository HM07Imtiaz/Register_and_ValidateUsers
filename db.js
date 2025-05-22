// db.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eszpqxqohpxkkmlnlbdd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVzenBxeHFvaHB4a2ttbG5sYmRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc5MzcwMjMsImV4cCI6MjA2MzUxMzAyM30.JyoWXYwck9-t77_oAnWRqgNXSlcRFqsfpiCBo4scCXI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
