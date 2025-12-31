import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Menu, PlusCircle, User, X } from 'lucide-react';
import logo1 from '../../assets/1.png';

export const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-indigo-100 transition-all">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="flex items-center justify-center p-1 rounded-lg group-hover:bg-gray-50 transition-colors">
                            <img 
                                src={logo1} 
                                alt="Sarmiento Clasificados" 
                                className="h-14 md:h-16 w-auto object-contain max-w-[180px] group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="hidden lg:flex flex-col">
                            <span className="text-xl font-bold text-gray-900 leading-none tracking-tight group-hover:text-indigo-600 transition-colors">
                                Sarmiento
                            </span>
                            <span className="text-sm font-medium text-indigo-600 tracking-wide">
                                Clasificados
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Search & Nav */}
                    <div className="hidden md:flex items-center space-x-6 flex-1 justify-end">
                        <div className="max-w-md w-full relative">
                            <input
                                type="text"
                                placeholder="Buscar en Sarmiento..."
                                className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
                        </div>

                        <div className="h-8 w-px bg-gray-200 mx-2"></div>

                        <Link to="/publicar" className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-5 py-2.5 rounded-full font-semibold hover:bg-indigo-100 transition-colors">
                            <PlusCircle className="w-5 h-5" />
                            <span>Publicar</span>
                        </Link>

                        <Link to="/login" className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium transition-colors px-3 py-2">
                            <User className="w-5 h-5" />
                            <span>Ingresar</span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        {/* Mobile Search Icon (optional simplified) */}
                        <div className="md:hidden text-gray-500">
                            <Search className="w-6 h-6" />
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden pb-6 pt-2 border-t border-gray-100 animate-in slide-in-from-top-2">
                        <div className="flex flex-col space-y-4 font-medium px-2">
                            <input
                                type="text"
                                placeholder="¿Qué buscas hoy?"
                                className="w-full pl-4 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                            />
                            <Link
                                to="/publicar"
                                className="flex items-center gap-3 text-white bg-indigo-600 p-3 rounded-xl justify-center"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <PlusCircle className="w-5 h-5" />
                                Publicar Anuncio
                            </Link>
                            <Link
                                to="/login"
                                className="flex items-center gap-3 text-gray-700 hover:bg-gray-50 p-3 rounded-xl"
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
