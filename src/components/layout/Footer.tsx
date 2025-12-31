import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from '../../assets/1.png';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 py-16 mt-auto relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-green-100 rounded-full mix-blend-multiply opacity-10 filter blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply opacity-10 filter blur-3xl translate-x-1/3 translate-y-1/3"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <Link to="/" className="flex items-center hover:opacity-90 transition-opacity group">
                            <div className="flex items-center justify-center p-2 rounded-xl group-hover:bg-green-50 transition-colors">
                                <img 
                                    src={logo1} 
                                    alt="Sarmiento Clasificados" 
                                    className="h-24 md:h-32 lg:h-36 w-auto object-contain"
                                />
                            </div>
                        </Link>
                        <p className="text-gray-600 text-base max-w-md leading-relaxed font-medium">
                            La plataforma líder para comprar y vender en Sarmiento. Conectando vecinos, creando oportunidades.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-700 transition-colors">
                                <span className="text-lg font-bold">f</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-700 transition-colors">
                                <span className="text-lg font-bold">@</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-green-100 hover:bg-green-200 rounded-full flex items-center justify-center text-green-700 transition-colors">
                                <span className="text-lg font-bold">in</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Categorías</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link to="/categoria/vehiculos" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Vehículos</Link></li>
                            <li><Link to="/categoria/inmuebles" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Inmuebles</Link></li>
                            <li><Link to="/categoria/tecnologia" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Tecnología</Link></li>
                            <li><Link to="/categoria/servicios" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Servicios</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-gray-900 mb-6 text-lg">Ayuda</h4>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li><Link to="/publicar" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Cómo publicar</Link></li>
                            <li><a href="#" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Seguridad</a></li>
                            <li><a href="#" className="hover:text-green-600 hover:translate-x-1 transition-all inline-block font-medium">Contacto</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 bg-white/50 rounded-2xl p-6 backdrop-blur-sm">
                    <p className="font-medium">© {new Date().getFullYear()} Sarmiento Clasificados. Todos los derechos reservados.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-green-600 transition-colors font-medium">Términos</a>
                        <a href="#" className="hover:text-green-600 transition-colors font-medium">Privacidad</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
