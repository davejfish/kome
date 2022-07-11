const SUPABASE_URL = 'https://lbhcxvyspdaifxljifnq.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaGN4dnlzcGRhaWZ4bGppZm5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY1NDE1OTYsImV4cCI6MTk3MjExNzU5Nn0.CYqr69yW5FRoOjB1MgOtYhQ3GS8oEGzFi8VF0D1tAKw';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
