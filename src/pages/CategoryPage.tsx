import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES, MOCK_ADS } from '../data/mockData';
import { AdCard } from '../components/ads/AdCard';
import { Search, ArrowLeft, PlusCircle } from 'lucide-react';

export const CategoryPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const category = CATEGORIES.find(c => c.slug === slug);

    const categoryAds = MOCK_ADS.filter(ad => {
        if (!category) return false;
        return ad.categoryId === category.id;
    });

    if (!category) {
        return (
            <div className="min-h-[50vh] flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                    <Search className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Categoría no encontrada</h2>
                <Link to="/" className="text-indigo-600 font-semibold hover:underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    // Extraer clases de color para usarlas de forma más flexible si es necesario,
    // o simplemente usarlas como fondo del banner

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header de Categoría */}
            <div className={`
                relative overflow-hidden rounded-3xl p-8 md:p-12 
                ${category.color.includes('bg-') ? category.color.split(' ')[0] : 'bg-gray-100'} 
                bg-opacity-30 border border-gray-100
            `}>
                <div className="relative z-10 max-w-2xl">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-indigo-600 mb-4 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al inicio
                    </Link>
                    <h1 className={`text-3xl md:text-4xl font-extrabold ${category.color.split(' ')[1] || 'text-gray-900'} mb-3`}>
                        {category.name}
                    </h1>
                    <p className="text-gray-700 text-lg md:text-xl opacity-80">
                        Encuentra las mejores ofertas de {category.name.toLowerCase()} en Sarmiento clasificados.
                    </p>
                </div>

                {/* Decoración abstracta */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            </div>

            {/* Grid de Anuncios */}
            <div className="min-h-[400px]">
                {categoryAds.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryAds.map(ad => (
                            <AdCard key={ad.id} ad={ad} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                        <div className="max-w-md mx-auto space-y-6">
                            <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto text-indigo-300">
                                <Search className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">Aún no hay anuncios aquí</h3>
                                <p className="text-gray-500 mt-2">Sé el primero en publicar en la categoría {category.name}. ¡Es gratis y rápido!</p>
                            </div>
                            <Link
                                to="/publicar"
                                className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                            >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Publicar Anuncio Ahora
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
