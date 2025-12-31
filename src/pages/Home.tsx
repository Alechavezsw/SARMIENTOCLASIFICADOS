import React from 'react';
import { Link } from 'react-router-dom';
import {
    Car,
    Home as HomeIcon,
    Smartphone,
    Armchair,
    Shirt,
    Briefcase,
    Search,
    ArrowRight,
    Utensils,
    Activity,
    GraduationCap,
    Cpu,
    Tag,
    Gamepad2,
    Heart,
    Building,
    Music,
    Gem,
    ToyBrick,
    Book,
    Wrench,
    Sparkles,
    ShoppingCart,
    Camera,
    Tent,
    Microwave,
    Radio,
    PartyPopper,
    Baby,
    Palette,
    Loader
} from 'lucide-react';
import { useCategories } from '../hooks/useCategories';
import { useAds } from '../hooks/useAds';
import { AdCard } from '../components/ads/AdCard';

// Mapa de iconos dinámico basado en los iconos de la base de datos
const IconMap: Record<string, React.ElementType> = {
    'Car': Car,
    'Home': HomeIcon,
    'Smartphone': Smartphone,
    'Armchair': Armchair,
    'Shirt': Shirt,
    'Briefcase': Briefcase,
    'Utensils': Utensils,
    'Activity': Activity,
    'GraduationCap': GraduationCap,
    'Cpu': Cpu,
    'Tag': Tag,
    'Gamepad2': Gamepad2,
    'Heart': Heart,
    'Building': Building,
    'Music': Music,
    'Gem': Gem,
    'ToyBrick': ToyBrick,
    'Book': Book,
    'Wrench': Wrench,
    'Sparkles': Sparkles,
    'ShoppingCart': ShoppingCart,
    'Camera': Camera,
    'Tent': Tent,
    'Microwave': Microwave,
    'Radio': Radio,
    'PartyPopper': PartyPopper,
    'Baby': Baby,
    'Palette': Palette,
};

export const Home: React.FC = () => {
    const { categories, loading: categoriesLoading } = useCategories();
    const { ads, loading: adsLoading } = useAds();
    return (
        <div className="space-y-16 pb-12">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-blue-800 rounded-3xl text-white shadow-xl isolate">
                {/* Decorative blobs */}
                <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply opacity-20 filter blur-3xl z-[-1]"></div>
                <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply opacity-20 filter blur-3xl z-[-1]"></div>

                <div className="relative px-8 py-20 md:py-28 text-center max-w-4xl mx-auto space-y-8">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                        Todo lo que buscas en <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                            Sarmiento
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto leading-relaxed">
                        Conectamos a la comunidad. Compra, vende y encuentra oportunidades únicas cerca de ti de forma segura y rápida.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            to="/categoria/vehiculos"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-indigo-700 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                            <Search className="w-5 h-5" />
                            Explorar Anuncios
                        </Link>
                        <Link
                            to="/publicar"
                            className="w-full sm:w-auto px-8 py-4 bg-indigo-500/30 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center group"
                        >
                            Publicar Gratis
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Categorías</h2>
                    <span className="text-sm font-medium text-indigo-600 hover:text-indigo-700 cursor-pointer">Ver todas</span>
                </div>

                {categoriesLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader className="w-6 h-6 animate-spin text-indigo-600" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.slice(0, 12).map((cat) => {
                            const IconComponent = (cat.icon && IconMap[cat.icon]) ? IconMap[cat.icon] : Search;
                            return (
                                <Link
                                    key={cat.id}
                                    to={`/categoria/${cat.slug}`}
                                    className={`
                                        group flex flex-col items-center justify-center p-6 rounded-2xl 
                                        bg-white border border-gray-100 shadow-sm 
                                        hover:shadow-md hover:border-indigo-100 transition-all duration-300
                                    `}
                                >
                                    <div className={`
                                        w-14 h-14 rounded-full flex items-center justify-center mb-4 
                                        ${cat.color.split(' ')[0]} 
                                        group-hover:scale-110 transition-transform duration-300
                                    `}>
                                        <div className={`p-3 rounded-full ${cat.color} bg-opacity-50`}>
                                            <IconComponent className="w-6 h-6" />
                                        </div>
                                    </div>
                                    <span className="font-semibold text-gray-700 group-hover:text-indigo-600 transition-colors text-center text-sm">
                                        {cat.name}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Featured Ads Section */}
            <section>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Destacados Recientes</h2>
                        <p className="text-gray-500 mt-1">Las mejores oportunidades de la semana</p>
                    </div>
                    <Link to="/categoria/todos" className="hidden sm:flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                        Ver todo <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>

                {adsLoading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader className="w-6 h-6 animate-spin text-indigo-600" />
                    </div>
                ) : ads.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {ads.slice(0, 4).map((ad) => (
                            <AdCard key={ad.id} ad={ad} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        <p>No hay anuncios disponibles aún.</p>
                    </div>
                )}

                <div className="mt-8 text-center sm:hidden">
                    <Link to="/categoria/todos" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors">
                        Ver todo <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                </div>
            </section>

            {/* Trust/Info Section */}
            <section className="bg-gray-50 rounded-2xl p-8 md:p-12 border border-gray-100">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                            <Search className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">Encuentra de todo</h3>
                        <p className="text-gray-600 text-sm">Desde vehículos hasta servicios, todo lo que necesitas en un solo lugar.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                            <Briefcase className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">Vende rápido</h3>
                        <p className="text-gray-600 text-sm">Publica tus anuncios gratis y llega a miles de personas en Sarmiento.</p>
                    </div>
                    <div className="space-y-3">
                        <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto text-indigo-600">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-gray-900">Contacta directo</h3>
                        <p className="text-gray-600 text-sm">Sin intermediarios. Habla directamente con el vendedor y cierra el trato.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

