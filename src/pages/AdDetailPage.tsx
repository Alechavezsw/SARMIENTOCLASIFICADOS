import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Share2, Heart, MessageCircle, ShieldCheck } from 'lucide-react';
import { MOCK_ADS, CATEGORIES } from '../data/mockData';
import { Button } from '../components/ui/Button';

export const AdDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const ad = MOCK_ADS.find(a => a.id === id);

    if (!ad) return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Anuncio no encontrado</h2>
            <Link to="/" className="text-indigo-600 hover:underline">Ir al inicio</Link>
        </div>
    );

    const category = CATEGORIES.find(c => c.id === ad.categoryId);

    return (
        <div className="max-w-6xl mx-auto pb-12 animate-in fade-in duration-500">
            {/* Breadcrumbs */}
            <nav className="mb-6 flex items-center gap-2 text-sm text-gray-500 overflow-x-auto whitespace-nowrap pb-2">
                <Link to="/" className="hover:text-indigo-600 transition-colors">Inicio</Link>
                <span className="text-gray-300">/</span>
                <Link to={`/categoria/${category?.slug}`} className="hover:text-indigo-600 transition-colors">{category?.name}</Link>
                <span className="text-gray-300">/</span>
                <span className="text-gray-900 font-medium truncate">{ad.title}</span>
            </nav>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Images & Description */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Main Image */}
                    <div className="aspect-[4/3] bg-gray-100 rounded-3xl overflow-hidden shadow-sm relative group">
                        <img
                            src={ad.image}
                            alt={ad.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <button className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-500 hover:text-red-500 transition-colors shadow-sm">
                            <Heart className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Description Card */}
                    <div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Descripción</h2>
                        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                            {ad.description}
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-6">
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500">Ubicación</span>
                                <div className="flex items-center font-medium text-gray-900">
                                    <MapPin className="w-4 h-4 mr-1 text-indigo-500" />
                                    {ad.location}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500">Publicado</span>
                                <div className="flex items-center font-medium text-gray-900">
                                    <Calendar className="w-4 h-4 mr-1 text-indigo-500" />
                                    {new Date(ad.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <span className="text-sm text-gray-500">Estado</span>
                                <div className="flex items-center font-medium text-gray-900">
                                    <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
                                    Verificado
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Sticky Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-xl shadow-indigo-100/50 sticky top-24">
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">{ad.title}</h1>
                            <p className="text-4xl font-extrabold text-indigo-600 tracking-tight mt-4">
                                {ad.currency} {ad.price.toLocaleString('es-AR')}
                            </p>
                        </div>

                        {/* Seller Info */}
                        <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl mb-6">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg">
                                {ad.sellerName.charAt(0)}
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Vendido por</p>
                                <p className="font-bold text-gray-900">{ad.sellerName}</p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Button fullWidth size="lg" className="rounded-xl py-4 text-lg shadow-lg shadow-indigo-200">
                                <MessageCircle className="w-5 h-5 mr-2" />
                                Contactar Vendedor
                            </Button>
                            <Button variant="outline" fullWidth className="justify-center rounded-xl py-3 border-gray-200 hover:bg-gray-50">
                                <Share2 className="w-5 h-5 mr-2" />
                                Compartir Anuncio
                            </Button>
                        </div>

                        <p className="text-xs text-center text-gray-400 mt-6">
                            Protege tu seguridad. No envíes dinero sin ver el producto.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
