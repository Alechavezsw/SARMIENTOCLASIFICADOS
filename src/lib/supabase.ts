import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Faltan variables de entorno de Supabase. Verifica tu archivo .env o configuración de Vercel');
    console.error('Variables necesarias:');
    console.error('- VITE_SUPABASE_URL');
    console.error('- VITE_SUPABASE_ANON_KEY');
}

// Crear cliente con valores por defecto para evitar errores
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
