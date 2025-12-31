import React from 'react';
import { WeatherWidget } from '../components/WeatherWidget';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const DISTRICTS = [
    'Media Agua',
    'Los Berros',
    'Pedernal',
    '25 de Mayo',
    'Cañada',
    'Carpintería',
    'Cienaguita',
    'Cochagual',
    'Colonia Fiscal',
    'Divisadero',
    'Guanacache',
    'Las Lagunas',
    'Punta del Médano',
    'Retamito',
    'San Carlos',
];

export const WeatherPage: React.FC = () => {
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
                <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                    Clima en <span className="text-green-600">Sarmiento</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Consulta el clima actual de todos los distritos del departamento
                </p>
            </div>

            {/* Weather Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DISTRICTS.map((district) => (
                    <WeatherWidget key={district} city={district} />
                ))}
            </div>

            {/* Info Section */}
            <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 mt-8">
                <p className="text-sm text-gray-600 text-center">
                    <strong>Nota:</strong> Para obtener datos de clima en tiempo real, configura tu API key de OpenWeatherMap en las variables de entorno.
                </p>
            </div>
        </div>
    );
};

