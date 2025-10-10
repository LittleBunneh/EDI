import { createClient } from '@supabase/supabase-js';


// Initialize Supabase client
// Using direct values from project configuration
const supabaseUrl = 'https://gmxvnzqouuwqvcismixp.supabase.co';
const supabaseKey = 'sb_publishable_gVZLOwnbdC84LdkfjJuX3Q_OBkdH9_p';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };