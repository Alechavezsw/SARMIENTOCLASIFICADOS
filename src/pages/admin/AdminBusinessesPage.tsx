import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Save, X, Search, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Business } from '../../types';

export const AdminBusinessesPage: React.FC = () => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        logo_url: '',
        featured: false,
        status: 'active' as 'active' | 'inactive' | 'pending',
    });

    useEffect(() => {
        fetchBusinesses();
    }, []);

    const fetchBusinesses = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('commercial_directory')
                .select('*')
                .order('name');

            if (error) throw error;
            setBusinesses(data || []);
        } catch (error: any) {
            console.error('Error fetching businesses:', error);
            alert('Error al cargar negocios: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const { error } = await supabase
                .from('commercial_directory')
                .insert([formData]);

            if (error) throw error;
            setIsCreating(false);
            setFormData({
                name: '',
                description: '',
                category: '',
                phone: '',
                email: '',
                address: '',
                website: '',
                logo_url: '',
                featured: false,
                status: 'active',
            });
            fetchBusinesses();
        } catch (error: any) {
            alert('Error al crear negocio: ' + error.message);
        }
    };

    const handleUpdate = async (id: string) => {
        try {
            const { error } = await supabase
                .from('commercial_directory')
                .update(formData)
                .eq('id', id);

            if (error) throw error;
            setEditingId(null);
            setFormData({
                name: '',
                description: '',
                category: '',
                phone: '',
                email: '',
                address: '',
                website: '',
                logo_url: '',
                featured: false,
                status: 'active',
            });
            fetchBusinesses();
        } catch (error: any) {
            alert('Error al actualizar negocio: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este negocio?')) return;

        try {
            const { error } = await supabase
                .from('commercial_directory')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchBusinesses();
        } catch (error: any) {
            alert('Error al eliminar negocio: ' + error.message);
        }
    };

    const startEdit = (business: Business) => {
        setEditingId(business.id);
        setFormData({
            name: business.name,
            description: business.description || '',
            category: business.category,
            phone: business.phone,
            email: business.email || '',
            address: business.address || '',
            website: business.website || '',
            logo_url: business.logo_url || '',
            featured: business.featured,
            status: business.status,
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData({
            name: '',
            description: '',
            category: '',
            phone: '',
            email: '',
            address: '',
            website: '',
            logo_url: '',
            featured: false,
            status: 'active',
        });
    };

    const filteredBusinesses = businesses.filter(business => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            business.name.toLowerCase().includes(search) ||
            business.category.toLowerCase().includes(search) ||
            business.address?.toLowerCase().includes(search)
        );
    });

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
                    <div className="bg-gradient-to-r from-orange-600 to-orange-700 rounded-2xl p-6 text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Gestionar Directorio Comercial</h1>
                        <p className="text-orange-100">Administra negocios y empresas</p>
                    </div>
                </div>

                {/* Search and Create */}
                <div className="mb-6 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar negocios..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-orange-700 transition-colors whitespace-nowrap"
                    >
                        <Plus className="w-5 h-5" />
                        Nuevo Negocio
                    </button>
                </div>

                {/* Create/Edit Form */}
                {(isCreating || editingId) && (
                    <div className="bg-white rounded-2xl p-6 border-2 border-orange-200 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            {isCreating ? 'Nuevo Negocio' : 'Editar Negocio'}
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Categoría *</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Teléfono *</label>
                                <input
                                    type="text"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Dirección</label>
                                <input
                                    type="text"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Sitio Web</label>
                                <input
                                    type="url"
                                    value={formData.website}
                                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">URL del Logo</label>
                                <input
                                    type="url"
                                    value={formData.logo_url}
                                    onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Estado</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                >
                                    <option value="active">Activo</option>
                                    <option value="inactive">Inactivo</option>
                                    <option value="pending">Pendiente</option>
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Descripción</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.featured}
                                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                        className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500"
                                    />
                                    <span className="text-sm font-semibold text-gray-700">Negocio Destacado</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={isCreating ? handleCreate : () => editingId && handleUpdate(editingId)}
                                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-700"
                            >
                                <Save className="w-4 h-4" />
                                Guardar
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300"
                            >
                                <X className="w-4 h-4" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {/* Businesses List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Negocio</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Categoría</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Teléfono</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Estado</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredBusinesses.map((business) => (
                                    <tr key={business.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {business.featured && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                )}
                                                <span className="font-semibold text-gray-900">{business.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{business.category}</td>
                                        <td className="px-6 py-4 text-gray-600">{business.phone}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                business.status === 'active' ? 'bg-green-100 text-green-800' :
                                                business.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                'bg-red-100 text-red-800'
                                            }`}>
                                                {business.status === 'active' ? 'Activo' :
                                                 business.status === 'pending' ? 'Pendiente' : 'Inactivo'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => startEdit(business)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(business.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredBusinesses.length === 0 && (
                            <div className="text-center py-12 text-gray-500">
                                No se encontraron negocios
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

