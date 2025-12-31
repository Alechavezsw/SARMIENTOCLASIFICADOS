import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, ArrowRight, Loader } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface NewsItem {
    title: string;
    date: string;
    excerpt: string;
    link: string;
}

export const NewsPage: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carga de noticias
        // En producción, esto podría obtener datos de una API o RSS feed
        const fetchNews = async () => {
            setLoading(true);
            try {
                // Noticias destacadas de SW Diario
                const mockNews: NewsItem[] = [
                    {
                        title: "Pagó $5 millones el abogado falso del municipio para no ir a la cárcel",
                        date: "29 de diciembre, 2025",
                        excerpt: "El funcionario municipal de Sarmiento Martín Fernández Monfort, denunciado por hacerse pasar por abogado...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Recuperaron Motos robadas",
                        date: "28 de diciembre, 2025",
                        excerpt: "La Sección Sustracción Automotores y Autopartes D-5 de la Policía de San Juan ha recuperado una...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Horarios de colectivos en estas fiestas",
                        date: "23 de diciembre, 2025",
                        excerpt: "Horarios Fiestas Red Tulum - Línea 262. Información actualizada sobre los horarios de transporte...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Varios operativos por maltrato animal",
                        date: "22 de diciembre, 2025",
                        excerpt: "UNIDAD RURAL - Operativos en Sarmiento, Caucete y Albardón por maltrato animal y secuestro...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Accidente en Media Agua",
                        date: "20 de diciembre, 2025",
                        excerpt: "El siniestro vial ocurrió en la tarde de este sábado, a metros de calle Barboza...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Grave accidente en Tres Esquinas",
                        date: "19 de diciembre, 2025",
                        excerpt: "El siniestro vial ocurrió en el peligroso cruce de Ruta 40 y calle Aranda...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Sarmiento de luto: profundo dolor por la muerte del camionero Fabián Brizuela Morán",
                        date: "19 de diciembre, 2025",
                        excerpt: "La tragedia golpea al departamento. Fabián, un conocido vecino de la zona, perdió la vida...",
                        link: "https://www.swdiario.com.ar/"
                    },
                    {
                        title: "Profundo pesar en Media Agua por el fallecimiento de Mathias 'Tute' Fullana Cabrera",
                        date: "17 de diciembre, 2025",
                        excerpt: "La comunidad de Sarmiento despide con profunda tristeza a Mathias Nicolas Fullana Cabrera...",
                        link: "https://www.swdiario.com.ar/"
                    }
                ];
                
                // Simular delay de carga
                await new Promise(resolve => setTimeout(resolve, 500));
                setNews(mockNews);
            } catch (error) {
                console.error('Error loading news:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-black text-gray-900">
                    Noticias de <span className="text-green-600">Sarmiento</span>
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Mantente informado con las últimas noticias de tu comunidad
                </p>
                <a
                    href="https://www.swdiario.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                    Ver todas las noticias en SW Diario
                    <ExternalLink className="w-4 h-4" />
                </a>
            </div>

            {/* News Grid */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader className="w-8 h-8 animate-spin text-green-600" />
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news.map((item, index) => (
                        <Card
                            key={index}
                            hoverEffect
                            className="flex flex-col h-full group cursor-pointer"
                            onClick={() => window.open(item.link, '_blank', 'noopener,noreferrer')}
                        >
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>{item.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-green-600 transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 line-clamp-3 leading-relaxed">
                                    {item.excerpt}
                                </p>
                            </div>
                            <div className="pt-4 mt-auto border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-semibold text-green-600 group-hover:text-green-700 transition-colors">
                                        Leer más
                                    </span>
                                    <ArrowRight className="w-4 h-4 text-green-600 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* CTA Section */}
            <div className="bg-gradient-to-br from-green-600 to-teal-700 rounded-3xl p-8 md:p-12 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    ¿Quieres estar siempre informado?
                </h2>
                <p className="text-green-50 mb-6 max-w-2xl mx-auto">
                    Visita SW Diario para leer todas las noticias de Sarmiento y mantenerte al día con lo que pasa en tu comunidad.
                </p>
                <a
                    href="https://www.swdiario.com.ar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    Ir a SW Diario
                    <ExternalLink className="w-5 h-5" />
                </a>
            </div>
        </div>
    );
};

