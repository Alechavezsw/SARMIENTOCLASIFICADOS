import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, AlertCircle, Loader, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useCategories } from '../hooks/useCategories';
import { useCreateAd } from '../hooks/useAds';
import { supabase } from '../lib/supabase';

export const PostAdPage: React.FC = () => {
    const navigate = useNavigate();
    const { categories, loading: categoriesLoading } = useCategories();
    const { createAd, loading: creatingAd } = useCreateAd();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        currency: 'ARS' as 'ARS' | 'USD',
        category_id: '',
        description: '',
        location: '',
        seller_name: '',
        seller_email: '',
        seller_phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title || !formData.price || !formData.category_id || !formData.description || !formData.location) {
            alert('Por favor completa todos los campos requeridos');
            return;
        }

        try {
            let imageUrl: string | null = null;

            // Subir imagen si existe
            if (imageFile) {
                try {
                    const fileExt = imageFile.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
                    const filePath = `ads/${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('ads-images')
                        .upload(filePath, imageFile);

                    if (uploadError) {
                        console.error('Error uploading image:', uploadError);
                        // Si el bucket no existe, continuar sin imagen
                        if (uploadError.message.includes('Bucket not found')) {
                            console.warn('Bucket "ads-images" no encontrado. Por favor configúralo en Supabase Storage.');
                        }
                        // Continuar sin imagen si falla la subida
                    } else {
                        const { data } = supabase.storage
                            .from('ads-images')
                            .getPublicUrl(filePath);
                        imageUrl = data.publicUrl;
                    }
                } catch (error) {
                    console.error('Error al subir imagen:', error);
                    // Continuar sin imagen
                }
            }

            // Crear el anuncio
            const result = await createAd({
                title: formData.title,
                price: parseFloat(formData.price),
                currency: formData.currency,
                category_id: formData.category_id,
                description: formData.description,
                location: formData.location,
                image_url: imageUrl,
                seller_name: formData.seller_name || null,
                seller_email: formData.seller_email || null,
                seller_phone: formData.seller_phone || null,
            });

            if (result.error) {
                alert('Error al crear el anuncio: ' + result.error);
            } else {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/');
                }, 2000);
            }
        } catch (error: any) {
            console.error('Error:', error);
            alert('Error al crear el anuncio. Por favor intenta nuevamente.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white text-center">
                    <h1 className="text-2xl font-bold">Publicar Anuncio</h1>
                    <p className="text-green-100 mt-1">Llega a miles de compradores en Sarmiento</p>
                </div>

                <div className="p-8">
                    {success ? (
                        <div className="text-center py-12 space-y-4">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                                <CheckCircle className="w-8 h-8" />
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900">¡Anuncio creado exitosamente!</h2>
                            <p className="text-gray-600">Tu anuncio está siendo revisado y será publicado pronto.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Image Upload Area */}
                            <div className="space-y-4">
                                <label className="block text-sm font-semibold text-gray-700">Fotos del producto</label>
                                <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-100 transition-colors cursor-pointer group relative">
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setImagePreview(null);
                                                    setImageFile(null);
                                                }}
                                                className="mt-4 text-sm text-red-600 hover:text-red-700"
                                            >
                                                Eliminar imagen
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-3">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm group-hover:scale-110 transition-transform">
                                                <Camera className="w-6 h-6" />
                                            </div>
                                            <div className="text-gray-500">
                                                <span className="font-semibold text-green-600">Subir fotos</span> o arrastrar y soltar
                                            </div>
                                            <p className="text-xs text-gray-400">PNG, JPG hasta 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                    />
                                </div>
                            </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Categoría *</label>
                                    {categoriesLoading ? (
                                        <div className="flex items-center justify-center py-4">
                                            <Loader className="w-5 h-5 animate-spin text-green-600" />
                                        </div>
                                    ) : (
                                        <select
                                            name="category_id"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        >
                                            <option value="">Seleccionar...</option>
                                            {categories.map(cat => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-gray-700">Ubicación *</label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        placeholder="Ej. Media Agua"
                                        required
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Título del anuncio *</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Ej. Vendo Bicicleta Mountain Bike R29"
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Precio *</label>
                                <div className="flex gap-2">
                                    <select
                                        name="currency"
                                        value={formData.currency}
                                        onChange={handleChange}
                                        className="w-24 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
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
                                        required
                                        min="0"
                                        step="0.01"
                                        className="flex-1 px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Descripción *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={5}
                                    placeholder="Describe tu producto con detalle..."
                                    required
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none resize-none"
                                />
                            </div>

                            {/* Información del vendedor (opcional) */}
                            <div className="space-y-4 pt-4 border-t border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900">Información de contacto (opcional)</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Nombre</label>
                                        <input
                                            type="text"
                                            name="seller_name"
                                            value={formData.seller_name}
                                            onChange={handleChange}
                                            placeholder="Tu nombre"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="seller_email"
                                            value={formData.seller_email}
                                            onChange={handleChange}
                                            placeholder="tu@email.com"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-sm font-semibold text-gray-700">Teléfono</label>
                                        <input
                                            type="tel"
                                            name="seller_phone"
                                            value={formData.seller_phone}
                                            onChange={handleChange}
                                            placeholder="264 123 4567"
                                            className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button fullWidth size="lg" type="submit" disabled={creatingAd}>
                                {creatingAd ? (
                                    <>
                                        <Loader className="w-5 h-5 mr-2 animate-spin" />
                                        Publicando...
                                    </>
                                ) : (
                                    'Publicar Anuncio'
                                )}
                            </Button>
                            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-yellow-600 bg-yellow-50 p-3 rounded-lg">
                                <AlertCircle className="w-4 h-4" />
                                <span>Revisamos todos los anuncios antes de publicarlos.</span>
                            </div>
                        </div>
                    </form>
                    )}
                </div>
            </div>
        </div>
    );
};
