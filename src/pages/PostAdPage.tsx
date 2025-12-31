import React, { useState } from 'react';
import { Camera, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { CATEGORIES } from '../data/mockData';

export const PostAdPage: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        currency: 'ARS',
        categoryId: '',
        description: '',
        location: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Funcionalidad de publicación próximamente (requiere backend real)');
        // Here we would upload image to Bucket and insert row to Supabase
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Publicar Anuncio</h1>
                    <p className="text-indigo-100 mt-1">Llega a miles de compradores en Sarmiento</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Image Upload Area */}
                        <div className="space-y-4">
                            <label className="block text-sm font-semibold text-gray-700">Fotos del producto</label>
                            <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-indigo-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <Camera className="w-6 h-6" />
                                    </div>
                                    <div className="text-gray-500">
                                        <span className="font-semibold text-indigo-600">Subir fotos</span> o arrastrar y soltar
                                    </div>
                                    <p className="text-xs text-gray-400">PNG, JPG hasta 5MB</p>
                                </div>
                                {/* Pseudo hidden input */}
                                <input type="file" className="hidden" multiple accept="image/*" />
                            </div>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Categoría</label>
                                    <select
                                        name="categoryId"
                                        value={formData.categoryId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="">Seleccionar...</option>
                                        {CATEGORIES.map(cat => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Ubicación</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Ej. Media Agua"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Título del anuncio</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ej. Vendo Bicicleta Mountain Bike R29"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Precio</label>
                                <div className="flex gap-2">
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-24 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    >
                                        <option value="ARS">ARS $</option>
                                        <option value="USD">USD u$s</option>
                                    </select>
                                    <input
                                        type="number"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="0"
                                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Descripción</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe tu producto con detalle..."
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button fullWidth size="lg">Publicar Anuncio</Button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                <span>Revisamos todos los anuncios antes de publicarlos.</span>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
