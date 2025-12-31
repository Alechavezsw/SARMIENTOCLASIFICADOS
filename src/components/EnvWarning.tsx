import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const EnvWarning: React.FC = () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    // Solo mostrar en desarrollo o si faltan variables
    if (import.meta.env.PROD && (!supabaseUrl || !supabaseAnonKey)) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            <strong>Configuración requerida:</strong> Las variables de entorno de Supabase no están configuradas. 
                            Por favor, configura VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en Vercel.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

