import React from 'react';
import { ArrowLeft, Radio as RadioIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RadioPlayer } from '../components/RadioPlayer';

export const RadioPage: React.FC = () => {
    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-green-600 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Volver al inicio
                </Link>
            </div>

            <div className="text-center space-y-4 mb-12">
                <div className="flex items-center justify-center gap-4 mb-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl p-4">
                        <RadioIcon className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                        Radio <span className="text-purple-600">SW</span>
                    </h1>
                </div>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Escuchá la mejor música de rock argentino en vivo, 24 horas al día
                </p>
            </div>

            {/* Radio Player */}
            <div className="max-w-2xl mx-auto">
                <RadioPlayer />
            </div>

            {/* Info Section */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-100 mt-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Sobre Radio SW</h2>
                <div className="grid md:grid-cols-2 gap-6 text-gray-700">
                    <div>
                        <h3 className="font-bold text-purple-600 mb-2">🎵 Programación</h3>
                        <p className="text-sm leading-relaxed">
                            Radio SW transmite las mejores canciones de rock argentino las 24 horas del día. 
                            Desde los clásicos hasta los éxitos más recientes.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-bold text-purple-600 mb-2">📻 En Vivo</h3>
                        <p className="text-sm leading-relaxed">
                            Escuchá nuestra programación en tiempo real desde cualquier dispositivo. 
                            Música sin interrupciones, solo rock argentino.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

