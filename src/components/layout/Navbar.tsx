import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, PlusCircle, User, X } from 'lucide-react';
import logo1 from '../../assets/1.png';
import { AdminLink } from './AdminLink';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-xl border-b border-green-100/60 shadow-md transition-all">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-24 sm:h-28 md:h-32 lg:h-36">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group flex-shrink-0 min-w-0">
                        <div className="flex items-center justify-center p-1.5 sm:p-2 rounded-xl group-hover:bg-green-50/50 transition-all duration-300">
                            <img 
                                src={logo1} 
                                alt="Sarmiento Clasificados" 
                                className="h-16 sm:h-20 md:h-24 lg:h-28 xl:h-32 w-auto object-contain group-hover:scale-105 transition-transform duration-300 max-w-full"
                            />
                        </div>
                    </Link>

                    {/* Desktop Search & Nav */}
                    <div className="hidden lg:flex items-center space-x-3 xl:space-x-5 flex-1 justify-end ml-6 min-w-0">
                        <Link to="/noticias" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-green-50 rounded-lg">
                            <span>Noticias</span>
                        </Link>
                        
                        <Link to="/clima" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-green-50 rounded-lg">
                            <span>Clima</span>
                        </Link>

                        <Link to="/colectivos" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-green-50 rounded-lg">
                            <span>Colectivos</span>
                        </Link>

                        <Link to="/radio" className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-purple-50 rounded-lg">
                            <span>Radio SW</span>
                        </Link>

                        <Link to="/farmacias" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-green-50 rounded-lg">
                            <span>Farmacias</span>
                        </Link>

                        <Link to="/telefonos-utiles" className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-blue-50 rounded-lg">
                            <span>Teléfonos</span>
                        </Link>

                        <Link to="/directorio-comercial" className="flex items-center gap-2 text-gray-700 hover:text-orange-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-orange-50 rounded-lg">
                            <span>Directorio</span>
                        </Link>

                        <AdminLink />
                        
                        <div className="max-w-xs xl:max-w-md w-full relative">
                            <input
                                type="text"
                                placeholder="Buscar en Sarmiento..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-green-500/30 focus:border-green-500 transition-all text-sm xl:text-base shadow-sm hover:shadow-md"
                            />
                            <Search className="w-4 h-4 xl:w-5 xl:h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        </div>

                        <div className="h-10 w-px bg-gray-200 mx-1"></div>

                        <Link to="/publicar" className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-5 xl:px-6 py-3 rounded-full font-bold hover:from-green-700 hover:to-green-800 transition-all whitespace-nowrap text-sm xl:text-base shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 transform hover:-translate-y-0.5">
                            <PlusCircle className="w-5 h-5" />
                            <span>Publicar</span>
                        </Link>

                        <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-green-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-gray-50 rounded-lg">
                            <User className="w-5 h-5" />
                            <span className="hidden xl:inline">Ingresar</span>
                        </Link>
                    </div>

                    {/* Tablet/Mobile Menu Button */}
                    <div className="lg:hidden flex items-center gap-3 sm:gap-4">
                        {/* Search Icon for mobile */}
                        <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile/Tablet Menu */}
                {isMenuOpen && (
                    <div className="lg:hidden pb-6 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 bg-white/98 backdrop-blur-xl">
                        <div className="flex flex-col space-y-3 font-medium px-2">
                            <input
                                type="text"
                                placeholder="¿Qué buscas hoy?"
                                className="w-full pl-4 pr-4 py-3.5 bg-gray-50 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500/30 focus:border-green-500 text-base shadow-sm"
                            />
                            <Link
                                to="/noticias"
                                className="flex items-center gap-3 text-gray-700 hover:bg-green-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Noticias
                            </Link>
                            <Link
                                to="/clima"
                                className="flex items-center gap-3 text-gray-700 hover:bg-green-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Clima
                            </Link>
                            <Link
                                to="/colectivos"
                                className="flex items-center gap-3 text-gray-700 hover:bg-green-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Colectivos
                            </Link>
                            <Link
                                to="/radio"
                                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Radio SW
                            </Link>
                            <Link
                                to="/farmacias"
                                className="flex items-center gap-3 text-gray-700 hover:bg-green-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Farmacias
                            </Link>
                            <Link
                                to="/telefonos-utiles"
                                className="flex items-center gap-3 text-gray-700 hover:bg-blue-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Teléfonos Útiles
                            </Link>
                            <Link
                                to="/directorio-comercial"
                                className="flex items-center gap-3 text-gray-700 hover:bg-orange-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Directorio Comercial
                            </Link>
                            <div onClick={() => setIsMenuOpen(false)}>
                                <AdminLink mobile />
                            </div>
                            <Link
                                to="/publicar"
                                className="flex items-center gap-3 text-white bg-gradient-to-r from-green-600 to-green-700 p-3.5 rounded-xl justify-center font-bold shadow-lg shadow-green-500/30"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <PlusCircle className="w-5 h-5" />
                                Publicar Anuncio
                            </Link>
                            <Link
                                to="/login"
                                className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-3.5 rounded-xl font-semibold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <User className="w-5 h-5" />
                                Ingresar a mi cuenta
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};
