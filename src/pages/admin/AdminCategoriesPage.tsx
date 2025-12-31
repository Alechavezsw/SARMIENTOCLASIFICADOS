import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import type { Category } from '../../types';

export const AdminCategoriesPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        slug: '',
        color: 'bg-gray-100 text-gray-600',
        icon: '',
    });

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('categories')
                .select('*')
                .order('name');

            if (error) throw error;
            setCategories(data || []);
        } catch (error: any) {
            console.error('Error fetching categories:', error);
            alert('Error al cargar categorías: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        try {
            const slug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-');
            const { error } = await supabase
                .from('categories')
                .insert([{
                    name: formData.name,
                    slug,
                    color: formData.color,
                    icon: formData.icon || null,
                }]);

            if (error) throw error;
            setIsCreating(false);
            setFormData({ name: '', slug: '', color: 'bg-gray-100 text-gray-600', icon: '' });
            fetchCategories();
        } catch (error: any) {
            alert('Error al crear categoría: ' + error.message);
        }
    };

    const handleUpdate = async (id: string) => {
        try {
            const { error } = await supabase
                .from('categories')
                .update({
                    name: formData.name,
                    slug: formData.slug,
                    color: formData.color,
                    icon: formData.icon || null,
                })
                .eq('id', id);

            if (error) throw error;
            setEditingId(null);
            setFormData({ name: '', slug: '', color: 'bg-gray-100 text-gray-600', icon: '' });
            fetchCategories();
        } catch (error: any) {
            alert('Error al actualizar categoría: ' + error.message);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar esta categoría?')) return;

        try {
            const { error } = await supabase
                .from('categories')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchCategories();
        } catch (error: any) {
            alert('Error al eliminar categoría: ' + error.message);
        }
    };

    const startEdit = (category: Category) => {
        setEditingId(category.id);
        setFormData({
            name: category.name,
            slug: category.slug,
            color: category.color,
            icon: category.icon || '',
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setIsCreating(false);
        setFormData({ name: '', slug: '', color: 'bg-gray-100 text-gray-600', icon: '' });
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
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <Link to="/admin" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al Dashboard
                    </Link>
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Gestionar Categorías</h1>
                        <p className="text-blue-100">Administra las categorías de anuncios</p>
                    </div>
                </div>

                {/* Create Button */}
                <div className="mb-6">
                    <button
                        onClick={() => setIsCreating(true)}
                        className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Categoría
                    </button>
                </div>

                {/* Create Form */}
                {isCreating && (
                    <div className="bg-white rounded-2xl p-6 border-2 border-green-200 mb-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Nueva Categoría</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="auto-generado si está vacío"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Color (Tailwind)</label>
                                <input
                                    type="text"
                                    value={formData.color}
                                    onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                    placeholder="bg-blue-100 text-blue-600"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Icono (Lucide)</label>
                                <input
                                    type="text"
                                    value={formData.icon}
                                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                    placeholder="Home, Car, etc."
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleCreate}
                                className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                <Save className="w-4 h-4" />
                                Guardar
                            </button>
                            <button
                                onClick={cancelEdit}
                                className="flex items-center gap-2 bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                            >
                                <X className="w-4 h-4" />
                                Cancelar
                            </button>
                        </div>
                    </div>
                )}

                {/* Categories List */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Nombre</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Slug</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Color</th>
                                    <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase">Icono</th>
                                    <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr key={category.id} className="hover:bg-gray-50">
                                        {editingId === category.id ? (
                                            <>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={formData.name}
                                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={formData.slug}
                                                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={formData.color}
                                                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4">
                                                    <input
                                                        type="text"
                                                        value={formData.icon}
                                                        onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                                    />
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleUpdate(category.id)}
                                                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                                                        >
                                                            <Save className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={cancelEdit}
                                                            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        ) : (
                                            <>
                                                <td className="px-6 py-4 font-semibold text-gray-900">{category.name}</td>
                                                <td className="px-6 py-4 text-gray-600">{category.slug}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.color}`}>
                                                        {category.color}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-600">{category.icon || '-'}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => startEdit(category)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(category.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

