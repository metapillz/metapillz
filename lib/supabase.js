import { createClient } from 'https://esm.sh/@supabase/supabase-js'

const supabaseUrl = 'https://zymnpdzqypjxfuksteuq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5bW5wZHpxeXBqeGZ1a3N0ZXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA3NjcxMDEsImV4cCI6MjA0NjM0MzEwMX0.f3IPBzkMwtawrVqkramlKBp5nHSTxSN3M3U4f3qK0EI'

export const supabase = createClient(supabaseUrl, supabaseKey)

