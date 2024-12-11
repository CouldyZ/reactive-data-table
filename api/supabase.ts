import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://imkuvyxzgikheuyojypl.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlta3V2eXh6Z2lraGV1eW9qeXBsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1NzY0ODIsImV4cCI6MjA0OTE1MjQ4Mn0.FlUuydHBni0CSMwAU_p1HXvbcq2oxpDfhJicvg40wIU'

export default createClient(supabaseUrl, supabaseKey)