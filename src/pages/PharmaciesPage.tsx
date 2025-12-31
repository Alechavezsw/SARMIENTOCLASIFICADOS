import React, { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Pharmacy {
    name: string;
    date: string;
    status: 'open' | 'closed' | 'vacation';
    note?: string;
    address?: string;
    phone?: string;
}

export const PharmaciesPage: React.FC = () => {
    const [pharmacies, setPharmacies] = useState<Pharmacy[]>([]);
    const [currentDate, setCurrentDate] = useState<string>('');

    useEffect(() => {
        // Actualizar fecha actual
        const updateDate = () => {
            const now = new Date();
            const day = now.getDate().toString().padStart(2, '0');
            const month = (now.getMonth() + 1).toString().padStart(2, '0');
            const year = now.getFullYear();
            setCurrentDate(`${day}/${month}/${year}`);
        };
        updateDate();
        const interval = setInterval(updateDate, 60000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Datos de farmacias de turno
        const pharmaciesData: Pharmacy[] = [
            {
                name: 'Farmacia Alicantina',
                date: '30/12',
                status: 'open',
                address: 'Media Agua',
                phone: '0264-XXXXXXX'
            },
            {
                name: 'Farmacia Padua',
                date: '31/12',
                status: 'open',
                address: 'Media Agua',
                phone: '0264-XXXXXXX'
            },
            {
                name: 'Farmacia Alicantina',
                date: '01/01',
                status: 'open',
                address: 'Media Agua',
                phone: '0264-XXXXXXX'
            },
            {
                name: 'Farmacia Media Agua',
                date: 'CERRADO POR VACACIONES',
                status: 'vacation',
                note: 'Cerrado por vacaciones',
                address: 'Media Agua',
                phone: '0264-XXXXXXX'
            },
            {
                name: 'Farmacia San Antonio',
                date: '02/01',
                status: 'open',
                address: 'Media Agua',
                phone: '0264-XXXXXXX'
            }
        ];
        setPharmacies(pharmaciesData);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open':
                return 'bg-green-100 text-green-800 border-green-300';
            case 'closed':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'vacation':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'open':
                return 'Abierta';
            case 'closed':
                return 'Cerrada';
            case 'vacation':
                return 'Vacaciones';
            default:
                return 'Desconocido';
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al inicio
                    </Link>
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Farmacias de Turno</h1>
                        <p className="text-green-100 font-semibold">Media Agua • Sarmiento</p>
                        {currentDate && (
                            <p className="text-sm text-green-50 mt-2 flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                Hoy: {currentDate}
                            </p>
                        )}
                    </div>
                </div>

                {/* Info Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8">
                    <h2 className="text-lg font-bold text-blue-900 mb-2">ℹ️ Información</h2>
                    <p className="text-blue-800 text-sm">
                        Consulta aquí las farmacias de turno en Media Agua. Los turnos se actualizan periódicamente.
                        En caso de emergencia, contacta directamente con la farmacia.
                    </p>
                </div>

                {/* Pharmacies Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pharmacies.map((pharmacy, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-2xl p-6 border-2 shadow-lg transition-all hover:shadow-xl ${
                                pharmacy.status === 'open'
                                    ? 'border-green-200 hover:border-green-300'
                                    : pharmacy.status === 'vacation'
                                    ? 'border-yellow-200 hover:border-yellow-300'
                                    : 'border-red-200 hover:border-red-300'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <h3 className="text-xl font-bold text-gray-900">{pharmacy.name}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                                        pharmacy.status
                                    )}`}
                                >
                                    {getStatusText(pharmacy.status)}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-5 h-5 text-green-600" />
                                    <span className="font-semibold">{pharmacy.date}</span>
                                </div>

                                {pharmacy.address && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <MapPin className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm">{pharmacy.address}</span>
                                    </div>
                                )}

                                {pharmacy.phone && (
                                    <div className="flex items-center gap-2 text-gray-600">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <span className="text-sm">{pharmacy.phone}</span>
                                    </div>
                                )}

                                {pharmacy.note && (
                                    <div className="mt-3 pt-3 border-t border-gray-200">
                                        <p className="text-sm text-yellow-700 font-medium">{pharmacy.note}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3">📞 Contacto de Emergencia</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        En caso de emergencia médica, contacta con:
                    </p>
                    <ul className="space-y-1 text-sm text-gray-700">
                        <li>• <strong>Emergencias:</strong> 911</li>
                        <li>• <strong>Hospital:</strong> Hospital Ventura Lloveras</li>
                        <li>• <strong>Guardia:</strong> Verifica horarios de guardia en cada farmacia</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

