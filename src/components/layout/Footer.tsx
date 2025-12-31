import React from 'react';
import { Link } from 'react-router-dom';
import logo2 from '../../assets/2.png';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-100 py-12 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                            <div className="flex items-center justify-center">
                                <img 
                                    src={logo2} 
                                    alt="Sarmiento Clasificados" 
                                    className="h-12 md:h-14 w-auto object-contain max-w-[200px]"
                                />
                            </div>
                            <span className="text-lg font-bold text-gray-900 hidden sm:inline-block">
                                Sarmiento Clasificados
                            </span>
                        </Link>
                        <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                            La plataforma líder para comprar y vender en Sarmiento. Conectando vecinos, creando oportunidades.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Categorías</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/categoria/vehiculos" className="hover:text-indigo-600 transition-colors">Vehículos</Link></li>
                            <li><Link to="/categoria/inmuebles" className="hover:text-indigo-600 transition-colors">Inmuebles</Link></li>
                            <li><Link to="/categoria/tecnologia" className="hover:text-indigo-600 transition-colors">Tecnología</Link></li>
                            <li><Link to="/categoria/servicios" className="hover:text-indigo-600 transition-colors">Servicios</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-4">Ayuda</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                            <li><Link to="/publicar" className="hover:text-indigo-600 transition-colors">Cómo publicar</Link></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Seguridad</a></li>
                            <li><a href="#" className="hover:text-indigo-600 transition-colors">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Sarmiento Clasificados. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-indigo-600 transition-colors">Términos</a>
                        <a href="#" className="hover:text-indigo-600 transition-colors">Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
