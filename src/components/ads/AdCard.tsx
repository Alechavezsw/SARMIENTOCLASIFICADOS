import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import type { Ad } from '../../types';

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
        <Link to={`/anuncio/${ad.id}`} className="h-full block">
            <Card hoverEffect className="p-0 overflow-hidden h-full flex flex-col group shadow-md hover:shadow-xl transition-all duration-300">
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                    <img
                        src={ad.image || ad.image_url || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                        alt={ad.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-xs font-bold text-gray-800 shadow-lg border border-white/50">
                        {formatDate(ad.created_at || ad.createdAt || '')}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-5 flex flex-col flex-grow bg-white">
                    <div className="mb-3">
                        <h3 className="font-bold text-gray-900 text-lg line-clamp-2 group-hover:text-green-600 transition-colors leading-tight">
                            {ad.title}
                        </h3>
                        <p className="text-2xl font-extrabold text-green-600 mt-2">
                            {formatPrice(Number(ad.price), ad.currency)}
                        </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-sm text-gray-600 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span className="truncate max-w-[120px] font-medium">{ad.location}</span>
                        </div>
                    </div>
                </div>
            </Card>
        </Link>
    );
};
