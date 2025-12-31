import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'https://placeholder.supabase.co') {
    console.error('❌ Faltan variables de entorno de Supabase. Verifica tu archivo .env o configuración de Vercel');
    console.error('Variables necesarias:');
    console.error('- VITE_SUPABASE_URL');
    console.error('- VITE_SUPABASE_ANON_KEY');
    console.error('Valores actuales:', { 
        url: supabaseUrl ? 'configurado' : 'faltante',
        key: supabaseAnonKey ? 'configurado' : 'faltante'
    });
}

// Crear cliente con valores por defecto para evitar errores
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder-key'
);
