import React, { useState, useEffect } from 'react';
import { ArrowLeft, Trash2, CheckCircle, XCircle, Eye, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Ad } from '../../types';

export const AdminAdsPage: React.FC = () => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    useEffect(() => {
        fetchAds();
    }, [statusFilter]);

    const fetchAds = async () => {
        try {
            setLoading(true);
            let query = supabase
                .from('ads')
                .select('*')
                .order('created_at', { ascending: false });

            if (statusFilter !== 'all') {
                query = query.eq('status', statusFilter);
            }

            const { data, error } = await query;

            if (error) throw error;
            setAds(data || []);
        } catch (error: any) {
            console.error('Error fetching ads:', error);
            alert('Error al cargar anuncios: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: 'approved' | 'rejected' | 'sold') => {
        try {
            const { error } = await supabase
                .from('ads')
                .update({ status })
                .eq('id', id);

            if (error) throw error;
            fetchAds();
        } catch (error: any) {
            alert('Error al actualizar estado: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este anuncio?')) return;

        try {
            const { error } = await supabase
                .from('ads')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchAds();
        } catch (error: any) {
            alert('Error al eliminar anuncio: ' + error.message);
        }
    };

    const filteredAds = ads.filter(ad => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            ad.title.toLowerCase().includes(search) ||
            ad.description.toLowerCase().includes(search) ||
            ad.location.toLowerCase().includes(search)
        );
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'rejected':
                return 'bg-red-100 text-red-800';
            case 'sold':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Cargando...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="mb-8">
                    <Link to="/admin" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al Dashboard
                    </Link>
                    <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-6 text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Gestionar Anuncios</h1>
                        <p className="text-green-100">Modera y gestiona todos los anuncios</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar anuncios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                        <option value="all">Todos los estados</option>
                        <option value="pending">Pendientes</option>
                        <option value="approved">Aprobados</option>
                        <option value="rejected">Rechazados</option>
                        <option value="sold">Vendidos</option>
                    </select>
                </div>

                {/* Ads List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Título</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Precio</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Ubicación</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estado</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Vistas</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredAds.map((ad) => (
                                    <tr key={ad.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-gray-900">{ad.title}</div>
                                            <div className="text-sm text-gray-500 line-clamp-1">{ad.description}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-gray-900">
                                            {ad.currency === 'ARS' ? '$' : 'u$s'} {Number(ad.price).toLocaleString('es-AR')}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{ad.location}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(ad.status)}`}>
                                                {ad.status === 'approved' ? 'Aprobado' : 
                                                 ad.status === 'pending' ? 'Pendiente' :
                                                 ad.status === 'rejected' ? 'Rechazado' : 'Vendido'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{ad.views || 0}</td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                {ad.status === 'pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => updateStatus(ad.id, 'approved')}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                            title="Aprobar"
                                                        >
                                                            <CheckCircle className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => updateStatus(ad.id, 'rejected')}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                            title="Rechazar"
                                                        >
                                                            <XCircle className="w-4 h-4" />
                                                        </button>
                                                    </>
                                                )}
                                                <Link
                                                    to={`/anuncio/${ad.id}`}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                    title="Ver"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(ad.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredAds.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No se encontraron anuncios
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

