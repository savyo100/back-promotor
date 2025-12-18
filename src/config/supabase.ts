import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = 'https://fonwtnxbxyursbmafqsu.supabase.co';
const supabaseRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseRoleKey) {
  throw new Error('A variável de ambiente SUPABASE_SERVICE_ROLE_KEY não está definida.');
}

const supabase = createClient(SUPABASE_URL, supabaseRoleKey);

export default supabase;
