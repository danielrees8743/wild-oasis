import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://meblzwyruoryeozbvkzi.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYmx6d3lydW9yeWVvemJ2a3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkyOTA2MTMsImV4cCI6MjAyNDg2NjYxM30.wfId26cOCBrT_S-K9oq8afT9MgtsgLBCdaRxbFcT60k';
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
