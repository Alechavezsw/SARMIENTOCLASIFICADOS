import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isSignUp) {
                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                });
                if (error) throw error;
                alert('Revisa tu correo para confirmar tu cuenta');
            } else {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                navigate('/');
            }
        } catch (err: any) {
            setError(err.message || 'Error de autenticación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-140px)]">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                        {isSignUp ? 'Crear Cuenta' : 'Bienvenido de nuevo'}
                    </h1>
                    <p className="text-gray-500">
                        {isSignUp ? 'Únete a Sarmiento Clasificados hoy' : 'Ingresa para publicar y gestionar tus anuncios'}
                    </p>
                </div>

                <form onSubmit={handleAuth} className="space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
                            {error}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Mail className="w-5 h-5" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Tu correo electrónico"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <Lock className="w-5 h-5" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none"
                            />
                        </div>
                    </div>

                    <Button fullWidth size="lg" disabled={loading} className="py-3">
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : (isSignUp ? 'Registrarse' : 'Ingresar')}
                    </Button>

                    <div className="text-center text-sm text-gray-500">
                        <button
                            type="button"
                            onClick={() => setIsSignUp(!isSignUp)}
                            className="text-indigo-600 font-medium hover:underline focus:outline-none"
                        >
                            {isSignUp ? '¿Ya tienes cuenta? Ingresa aquí' : '¿No tienes cuenta? Regístrate gratis'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
