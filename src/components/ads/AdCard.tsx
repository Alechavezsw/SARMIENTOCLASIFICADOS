import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Ad } from '../../data/mockData';

interface AdCardProps {
    ad: Ad;
}

export const AdCard: React.FC<AdCardProps> = ({ ad }) => {
    const formatPrice = (price: number, currency: string) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: currency,
            maximumFractionDigits: 0
        }).format(price);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(date);
    };

    return (
        <Link to={`/anuncio/${ad.id}`}>
            <Card hoverEffect className="p-0 overflow-hidden h-full flex flex-col group">
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                    <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-semibold text-gray-700 shadow-sm">
                        {formatDate(ad.createdAt)}
                    </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                    <div className="mb-2">
                        <h3 className="font-semibold text-gray-900 text-lg line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {ad.title}
                        </h3>
                        <p className="text-2xl font-bold text-gray-900 mt-1">
                            {formatPrice(ad.price, ad.currency)}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-sm text-gray-500 pt-3 border-t border-gray-50">
                        <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            <span className="truncate max-w-[120px]">{ad.location}</span>
                        </div>
                        {/* Optional: Add seller info or more details */}
                    </div>
                </div>
            </Card>
        </Link>
    );
};
