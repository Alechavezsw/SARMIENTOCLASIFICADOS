import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
    LayoutDashboard, 
    Tag, 
    FileText, 
    Building2, 
    TrendingUp,
    CheckCircle,
    Clock,
    Eye
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../components/auth/AuthProvider';

export const DashboardPage: React.FC = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        categories: 0,
        ads: 0,
        adsPending: 0,
        adsApproved: 0,
        businesses: 0,
        businessesActive: 0,
        totalViews: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Categorías
                const { count: categoriesCount } = await supabase
                    .from('categories')
                    .select('*', { count: 'exact', head: true });

                // Anuncios
                const { count: adsCount } = await supabase
                    .from('ads')
                    .select('*', { count: 'exact', head: true });

                const { count: adsPendingCount } = await supabase
                    .from('ads')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'pending');

                const { count: adsApprovedCount } = await supabase
                    .from('ads')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'approved');

                // Vistas totales
                const { data: adsData } = await supabase
                    .from('ads')
                    .select('views');
                const totalViews = adsData?.reduce((sum, ad) => sum + (ad.views || 0), 0) || 0;

                // Negocios
                const { count: businessesCount } = await supabase
                    .from('commercial_directory')
                    .select('*', { count: 'exact', head: true });

                const { count: businessesActiveCount } = await supabase
                    .from('commercial_directory')
                    .select('*', { count: 'exact', head: true })
                    .eq('status', 'active');

                setStats({
                    categories: categoriesCount || 0,
                    ads: adsCount || 0,
                    adsPending: adsPendingCount || 0,
                    adsApproved: adsApprovedCount || 0,
                    businesses: businessesCount || 0,
                    businessesActive: businessesActiveCount || 0,
                    totalViews,
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const menuItems = [
        {
            title: 'Categorías',
            description: 'Gestionar categorías de anuncios',
            icon: Tag,
            link: '/admin/categorias',
            color: 'bg-blue-500',
        },
        {
            title: 'Anuncios',
            description: 'Gestionar y moderar anuncios',
            icon: FileText,
            link: '/admin/anuncios',
            color: 'bg-green-500',
        },
        {
            title: 'Directorio Comercial',
            description: 'Gestionar negocios y empresas',
            icon: Building2,
            link: '/admin/negocios',
            color: 'bg-orange-500',
        },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
                    <p className="mt-4 text-gray-600">Cargando estadísticas...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl p-6 text-white shadow-xl">
                        <div className="flex items-center gap-3 mb-2">
                            <LayoutDashboard className="w-8 h-8" />
                            <h1 className="text-3xl md:text-4xl font-black">Panel de Administración</h1>
                        </div>
                        <p className="text-green-100 font-semibold">
                            Bienvenido, {user?.email}
                        </p>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Categorías"
                        value={stats.categories}
                        icon={Tag}
                        color="bg-blue-500"
                    />
                    <StatCard
                        title="Anuncios"
                        value={stats.ads}
                        icon={FileText}
                        color="bg-green-500"
                        subtitle={`${stats.adsApproved} aprobados`}
                    />
                    <StatCard
                        title="Pendientes"
                        value={stats.adsPending}
                        icon={Clock}
                        color="bg-yellow-500"
                    />
                    <StatCard
                        title="Negocios"
                        value={stats.businessesActive}
                        icon={Building2}
                        color="bg-orange-500"
                        subtitle={`${stats.businesses} totales`}
                    />
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <Eye className="w-6 h-6 text-purple-600" />
                            <h3 className="text-xl font-bold text-gray-900">Vistas Totales</h3>
                        </div>
                        <p className="text-3xl font-black text-purple-600">{stats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
                        <div className="flex items-center gap-3 mb-4">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                            <h3 className="text-xl font-bold text-gray-900">Estado General</h3>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" />
                                <span className="text-gray-700">{stats.adsApproved} Anuncios Aprobados</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-yellow-500" />
                                <span className="text-gray-700">{stats.adsPending} Anuncios Pendientes</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {menuItems.map((item) => (
                        <Link
                            key={item.link}
                            to={item.link}
                            className="bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-green-300 shadow-lg hover:shadow-xl transition-all group"
                        >
                            <div className={`${item.color} w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                                <item.icon className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                            <p className="text-gray-600 text-sm">{item.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ElementType;
    color: string;
    subtitle?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, subtitle }) => {
    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-4">
                <div className={`${color} w-12 h-12 rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
            <p className="text-3xl font-black text-gray-900">{value}</p>
            {subtitle && (
                <p className="text-xs text-gray-500 mt-2">{subtitle}</p>
            )}
        </div>
    );
};

