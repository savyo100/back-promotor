import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = 'https://fonwtnxbxyursbmafqsu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey) {
  throw new Error('A variável de ambiente SUPABASE_KEY não está definida.');
}

const supabase = createClient(SUPABASE_URL, supabaseKey);

export default supabase;
