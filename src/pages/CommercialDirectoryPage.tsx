import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Phone, Mail, Globe, Building2, Star, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useBusinesses, useBusinessCategories } from '../hooks/useBusinesses';

export const CommercialDirectoryPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const { categories, loading: categoriesLoading } = useBusinessCategories();
    const { businesses, loading: businessesLoading } = useBusinesses(selectedCategory || undefined);

    const filteredBusinesses = businesses.filter(business => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            business.name.toLowerCase().includes(search) ||
            business.description?.toLowerCase().includes(search) ||
            business.category.toLowerCase().includes(search) ||
            business.address?.toLowerCase().includes(search) ||
            business.phone.toLowerCase().includes(search)
        );
    });

    const featuredBusinesses = filteredBusinesses.filter(b => b.featured);
    const regularBusinesses = filteredBusinesses.filter(b => !b.featured);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-green-600 transition-colors mb-4">
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Volver al inicio
                    </Link>
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <Building2 className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-black">Directorio Comercial</h1>
                        </div>
                        <p className="text-green-100 font-semibold">Negocios y Empresas de Media Agua • Sarmiento</p>
                        <p className="text-sm text-green-50 mt-2">
                            Encuentra los mejores negocios y servicios locales
                        </p>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="mb-6 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, descripción, categoría o dirección..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>

                    {/* Category Filter */}
                    {!categoriesLoading && categories.length > 0 && (
                        <div className="flex items-center gap-3 flex-wrap">
                            <Filter className="w-5 h-5 text-gray-600" />
                            <button
                                onClick={() => setSelectedCategory('')}
                                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                    selectedCategory === ''
                                        ? 'bg-green-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                            >
                                Todas
                            </button>
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                                        selectedCategory === category
                                            ? 'bg-green-600 text-white'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Loading State */}
                {businessesLoading && (
                    <div className="text-center py-20">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                        <p className="mt-4 text-gray-600">Cargando negocios...</p>
                    </div>
                )}

                {/* Results */}
                {!businessesLoading && (
                    <>
                        {/* Featured Businesses */}
                        {featuredBusinesses.length > 0 && (
                            <div className="mb-8">
                                <div className="flex items-center gap-2 mb-4">
                                    <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    <h2 className="text-2xl font-black text-gray-900">Negocios Destacados</h2>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {featuredBusinesses.map((business) => (
                                        <BusinessCard key={business.id} business={business} featured />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Regular Businesses */}
                        {regularBusinesses.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-black text-gray-900 mb-4">
                                    {selectedCategory ? selectedCategory : 'Todos los Negocios'}
                                    <span className="text-lg font-normal text-gray-600 ml-2">
                                        ({regularBusinesses.length})
                                    </span>
                                </h2>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {regularBusinesses.map((business) => (
                                        <BusinessCard key={business.id} business={business} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* No Results */}
                        {filteredBusinesses.length === 0 && !businessesLoading && (
                            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                                <Building2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron negocios</h3>
                                <p className="text-gray-600">
                                    {searchTerm || selectedCategory
                                        ? 'Intenta con otros términos de búsqueda o categoría'
                                        : 'Aún no hay negocios registrados en el directorio'}
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Info Section */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
                    <h3 className="font-bold text-blue-900 mb-2">💼 ¿Tienes un negocio?</h3>
                    <p className="text-blue-800 text-sm">
                        Si tienes un negocio o empresa en Media Agua y quieres aparecer en nuestro directorio comercial,
                        contáctanos para más información sobre cómo registrarte.
                    </p>
                </div>
            </div>
        </div>
    );
};

interface BusinessCardProps {
    business: {
        id: string;
        name: string;
        description?: string | null;
        category: string;
        phone: string;
        email?: string | null;
        address?: string | null;
        website?: string | null;
        logo_url?: string | null;
        featured: boolean;
    };
    featured?: boolean;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business, featured = false }) => {
    return (
        <div
            className={`bg-white rounded-2xl p-6 border-2 shadow-lg transition-all hover:shadow-xl ${
                featured
                    ? 'border-yellow-300 hover:border-yellow-400'
                    : 'border-gray-200 hover:border-green-300'
            }`}
        >
            {featured && (
                <div className="flex items-center gap-2 mb-3">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
                        Destacado
                    </span>
                </div>)}

            {/* Logo or Icon */}
            {business.logo_url ? (
                <div className="mb-4">
                    <img
                        src={business.logo_url}
                        alt={business.name}
                        className="w-full h-32 object-contain rounded-lg"
                    />
                </div>
            ) : (
                <div className="mb-4 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg p-8 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-green-600" />
                </div>
            )}

            <div className="mb-3">
                <h3 className="text-xl font-black text-gray-900 mb-1">{business.name}</h3>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full inline-block">
                    {business.category}
                </span>
            </div>

            {business.description && (
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{business.description}</p>
            )}

            <div className="space-y-2">
                {business.address && (
                    <div className="flex items-start gap-2 text-gray-700 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <span>{business.address}</span>
                    </div>
                )}

                <div className="flex items-center gap-2 text-gray-700 text-sm">
                    <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <a
                        href={`tel:${business.phone}`}
                        className="hover:text-green-600 hover:underline font-semibold"
                    >
                        {business.phone}
                    </a>
                </div>

                {business.email && (
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a
                            href={`mailto:${business.email}`}
                            className="hover:text-green-600 hover:underline truncate"
                        >
                            {business.email}
                        </a>
                    </div>
                )}

                {business.website && (
                    <div className="flex items-center gap-2 text-gray-700 text-sm">
                        <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        <a
                            href={business.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-green-600 hover:underline truncate"
                        >
                            {business.website.replace(/^https?:\/\//, '')}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

