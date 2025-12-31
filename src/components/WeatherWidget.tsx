import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Loader } from 'lucide-react';

interface WeatherData {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    description: string;
    icon: string;
}

interface WeatherWidgetProps {
    city: string;
    lat?: number;
    lon?: number;
    compact?: boolean;
}

// Coordenadas aproximadas de los distritos de Sarmiento
const DISTRICTS_COORDS: Record<string, { lat: number; lon: number }> = {
    'Media Agua': { lat: -31.9833, lon: -68.4167 },
    'Los Berros': { lat: -32.0167, lon: -68.3833 },
    'Pedernal': { lat: -32.0333, lon: -68.4500 },
    '25 de Mayo': { lat: -32.0000, lon: -68.4000 },
    'Cañada': { lat: -31.9500, lon: -68.4000 },
    'Carpintería': { lat: -32.0500, lon: -68.4333 },
    'Cienaguita': { lat: -31.9667, lon: -68.4167 },
    'Cochagual': { lat: -32.0000, lon: -68.3833 },
    'Colonia Fiscal': { lat: -31.9833, lon: -68.4333 },
    'Divisadero': { lat: -32.0167, lon: -68.4500 },
    'Guanacache': { lat: -31.9500, lon: -68.3833 },
    'Las Lagunas': { lat: -32.0333, lon: -68.4167 },
    'Punta del Médano': { lat: -32.0000, lon: -68.4500 },
    'Retamito': { lat: -31.9667, lon: -68.4000 },
    'San Carlos': { lat: -32.0500, lon: -68.4000 },
};

const getWeatherIcon = (iconCode: string) => {
    if (iconCode.includes('01')) return Sun; // clear sky
    if (iconCode.includes('02') || iconCode.includes('03') || iconCode.includes('04')) return Cloud; // clouds
    if (iconCode.includes('09') || iconCode.includes('10')) return CloudRain; // rain
    return Cloud;
};

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, lat, lon, compact = false }) => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                setLoading(true);
                setError(null);

                // Usar coordenadas si están disponibles, sino buscar por nombre
                const coords = lat && lon ? { lat, lon } : DISTRICTS_COORDS[city];
                
                if (!coords) {
                    throw new Error('Coordenadas no disponibles');
                }

                // OpenWeatherMap API (necesitarás una API key)
                // Por ahora usamos datos mock, pero la estructura está lista para la API real
                const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || '';
                const url = API_KEY 
                    ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=es`
                    : null;

                if (url) {
                    const response = await fetch(url);
                    if (!response.ok) throw new Error('Error al obtener el clima');
                    const data = await response.json();
                    
                    setWeather({
                        temp: Math.round(data.main.temp),
                        feelsLike: Math.round(data.main.feels_like),
                        humidity: data.main.humidity,
                        windSpeed: Math.round(data.wind.speed * 3.6), // convertir m/s a km/h
                        description: data.weather[0].description,
                        icon: data.weather[0].icon,
                    });
                } else {
                    // Datos mock para desarrollo
                    setWeather({
                        temp: 28,
                        feelsLike: 30,
                        humidity: 45,
                        windSpeed: 15,
                        description: 'Parcialmente nublado',
                        icon: '02d',
                    });
                }
            } catch (err: any) {
                console.error('Error fetching weather:', err);
                setError(err.message || 'Error al cargar el clima');
                // Datos mock en caso de error
                setWeather({
                    temp: 28,
                    feelsLike: 30,
                    humidity: 45,
                    windSpeed: 15,
                    description: 'Parcialmente nublado',
                    icon: '02d',
                });
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [city, lat, lon]);

    if (loading) {
        return (
            <div className={`bg-white rounded-2xl border border-gray-100 p-${compact ? '4' : '6'} shadow-sm`}>
                <div className="flex items-center justify-center">
                    <Loader className="w-5 h-5 animate-spin text-green-600" />
                </div>
            </div>
        );
    }

    if (error && !weather) {
        return (
            <div className={`bg-white rounded-2xl border border-gray-100 p-${compact ? '4' : '6'} shadow-sm`}>
                <p className="text-sm text-gray-500 text-center">Clima no disponible</p>
            </div>
        );
    }

    if (!weather) return null;

    const IconComponent = getWeatherIcon(weather.icon);

    if (compact) {
        return (
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 p-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs font-medium text-gray-600 mb-1">{city}</p>
                        <p className="text-2xl font-bold text-gray-900">{weather.temp}°</p>
                        <p className="text-xs text-gray-500 capitalize">{weather.description}</p>
                    </div>
                    <IconComponent className="w-12 h-12 text-blue-500" />
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold mb-1">{city}</h3>
                    <p className="text-sm text-blue-100 capitalize">{weather.description}</p>
                </div>
                <IconComponent className="w-16 h-16 text-white/90" />
            </div>
            
            <div className="flex items-baseline gap-2 mb-6">
                <span className="text-5xl font-black">{weather.temp}°</span>
                <span className="text-xl text-blue-100">C</span>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Sensación</p>
                        <p className="text-sm font-semibold">{weather.feelsLike}°</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Humedad</p>
                        <p className="text-sm font-semibold">{weather.humidity}%</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-blue-100" />
                    <div>
                        <p className="text-xs text-blue-100">Viento</p>
                        <p className="text-sm font-semibold">{weather.windSpeed} km/h</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

