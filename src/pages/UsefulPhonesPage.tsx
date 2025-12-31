import React, { useState } from 'react';
import { ArrowLeft, Phone, Heart, Shield, Building2, GraduationCap, Scale, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PhoneEntry {
    name: string;
    phone: string | string[];
    note?: string;
}

interface PhoneCategory {
    title: string;
    icon: React.ReactNode;
    color: string;
    entries: PhoneEntry[];
}

export const UsefulPhonesPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const categories: PhoneCategory[] = [
        {
            title: 'Salud',
            icon: <Heart className="w-6 h-6" />,
            color: 'bg-red-50 border-red-200 text-red-900',
            entries: [
                { name: 'Emergencias', phone: '911' },
                { name: 'Emergencias Médicas', phone: '107' },
                { name: 'AME Emergencias', phone: '421-7070' },
                { name: 'ECI Emergencias', phone: '420-0911' },
                { name: 'Hospital Marcial Quiroga', phone: ['4330880', '0800-999-9779 (Turnos 7-19h)'] },
                { name: 'Hospital Dr. Guillermo Rawson', phone: ['4222272', '4227404', '4224005', '4294700', '0800-333-0008 (Turnos 7-19h)'] },
                { name: 'Hospital Gral. Dra. Julieta Lanteri', phone: ['4213030', '4212442'] },
                { name: 'Vacunatorio Central', phone: ['4204375', '4204376', '4204048'] },
                { name: 'Hospital Dr. José Giordano (Albardón)', phone: '4911002' },
                { name: 'Hospital Dr. Cesar Aguilar (Caucete)', phone: ['4961110', '4961032'] },
                { name: 'Hospital Dr. Tomás Perón (Rodeo)', phone: '(2647) 493-045' },
                { name: 'Hospital de Barreal', phone: '(2648) 441060' },
                { name: 'Hospital Dr. Aldo Cantoni (Calingasta)', phone: '02648-420112' },
                { name: 'Hospital Buenaventura Luna (Huaco)', phone: ['02647-499933', '499932'] },
                { name: 'Hospital Dr. Ventura Lloveras (Media Agua)', phone: '4941004' },
                { name: 'Hospital Federico Cantoni (Pocito)', phone: ['4921052', '4922136'] },
                { name: 'Hospital Dr. Alfredo Rizo Esparza (Angaco)', phone: '4972018' },
                { name: 'Hospital de Tamberías', phone: '(2648) 492003' },
                { name: 'Hospital Dr. Alejandro Albarracín (Valle Fértil)', phone: ['(2646) 420188', '(2646) 420091'] },
                { name: 'Hospital de San Martín', phone: '4971267' },
                { name: 'C. Adiestramiento René Favaloro (CARF)', phone: ['4240924', '4242610'] },
                { name: 'C.S. Arturo Cabral De La Colina (9 De Julio)', phone: '4977092' },
                { name: 'C.S. Baes Laspiur', phone: '4315416' },
                { name: 'C.S. Monseñor Distéfano', phone: '4343940' },
                { name: 'C.S. Villa Marini', phone: '4214044' },
                { name: 'C.S. Zonda', phone: '4945003' },
                { name: 'INCUCAI', phone: ['4201334', '4201029'] },
                { name: 'Central Mutual Rh', phone: '4228988' },
            ]
        },
        {
            title: 'Seguridad',
            icon: <Shield className="w-6 h-6" />,
            color: 'bg-blue-50 border-blue-200 text-blue-900',
            entries: [
                { name: 'Central CISEM', phone: '911' },
                { name: 'Bomberos', phone: ['100', '4210888', '4213280', '4212781'] },
                { name: 'Policía de San Juan', phone: ['4296800', '4214050'] },
                { name: 'Policía Federal', phone: ['4214521', '4224586'] },
                { name: 'Dirección de Protección Civil', phone: ['103', '4227475', '4218606'] },
                { name: 'Gendarmería Nacional San Juan', phone: ['4273427', '4217510'] },
                { name: 'Policía Ecológica', phone: '4213280' },
                { name: 'Gendarmería Nacional', phone: '0800 888 8804' },
                { name: 'Drogas Ilegales', phone: ['134', '4218330', '4227838', '0800 222 2102'] },
                { name: 'Emergencias Ecológicas', phone: '105' },
                { name: 'Comisaría 8va (Media Agua)', phone: '4941009' },
            ]
        },
        {
            title: 'Servicios Varios',
            icon: <Building2 className="w-6 h-6" />,
            color: 'bg-green-50 border-green-200 text-green-900',
            entries: [
                { name: 'Municipalidad de Sarmiento', phone: ['0264-4941003', '4941134', '4941153', '49411532'] },
                { name: 'Nuevo Sur Línea 24', phone: ['4285687', '4282811'] },
                { name: 'Correo Argentino Suc. Media Agua', phone: '4941177' },
                { name: 'Ayuda al Niño', phone: '102' },
                { name: 'Obra Social Provincia', phone: ['0800 999 6666', '4304300'] },
                { name: 'Defensa del Consumidor', phone: ['4306400', '4306401', '4306403'] },
                { name: 'Defensoría del Pueblo', phone: ['4211992', '4226163'] },
                { name: 'Dirección de la Mujer', phone: ['4222713', '0800-6666-351'] },
                { name: 'Ayuda a la Mujer', phone: '144' },
                { name: 'Energía San Juan', phone: '0800-666-3637' },
                { name: 'Gas Atención Telefónica', phone: '0810-999-8000' },
                { name: 'Gas Emergencias', phone: '0800-999-1600' },
                { name: 'Información Sobre Tarjeta Social', phone: ['4306045', '4306143', '4306144'] },
                { name: 'Información Turística', phone: '4210004' },
                { name: 'Lucha Contra la Droga y el Narcotráfico', phone: ['0800-222-2102', '0800-333-3103'] },
                { name: 'Dirección de Discapacidad', phone: ['4216606', '4216609'] },
                { name: 'AFIP', phone: '0810-999-2347' },
                { name: 'ANSES', phone: '130' },
                { name: 'Dirección General de Rentas', phone: '0800-333-4775' },
                { name: 'EMICAR', phone: ['4280605', '4280521'] },
                { name: 'Dirección de protección y promoción de Derechos Humanos', phone: ['4307250', '4307249'] },
                { name: 'Registro de Estado Civil y Capacidad de las personas', phone: ['4936836', '430826', '430827'] },
                { name: 'Inspección General de Personas Jurídicas', phone: '4936894' },
                { name: 'Dirección de Regularización y consolidación Dominial', phone: ['4204823', '4228268'] },
                { name: 'Secretaría de tránsito y transporte', phone: ['4306300', '4306324'] },
                { name: 'Dirección de Transporte', phone: '4306304' },
                { name: 'EPRE', phone: ['0800-333-6666', '4280521'] },
                { name: 'PAMI Escucha', phone: ['138', '0800-222-7264'] },
                { name: 'OSSE - Denunciar incumplimientos', phone: ['2645064444 (sólo texto)', '0800-222-6773'] },
                { name: 'Servicio Sacerdotal (23:00 a 6:00h)', phone: '4217500' },
                { name: 'Terminal de Ómnibus', phone: '4221604' },
                { name: 'Aeropuerto Domingo F. Sarmiento', phone: '4254133' },
                { name: 'Instituto Provincial de la Vivienda', phone: '4305026' },
            ]
        },
        {
            title: 'Educación',
            icon: <GraduationCap className="w-6 h-6" />,
            color: 'bg-purple-50 border-purple-200 text-purple-900',
            entries: [
                { name: 'Oficina de Registro y Certificación de títulos', phone: '4305852', note: '7:30 a 12:30 horas' },
                { name: 'Junta Inicial y Primaria', phone: '4302206', note: '8 a 13 horas' },
                { name: 'Junta Rama Media y Superior', phone: ['4307982', '4302202'], note: '8 a 16 horas' },
                { name: 'Junta Rama Técnica y Capacitación Laboral', phone: ['4302209', '4302210'], note: '8 a 15 horas' },
                { name: 'Junta Gabinetes Técnicos Interdisciplinarios', phone: '4302345', note: '8 a 13 horas - Consultas sobre sueldos' },
            ]
        },
        {
            title: 'Juzgados de Faltas',
            icon: <Scale className="w-6 h-6" />,
            color: 'bg-yellow-50 border-yellow-200 text-yellow-900',
            entries: [
                { name: '1º Nominación', phone: ['4303334', '4306744'] },
                { name: '2º Nominación', phone: ['4305654', '4305650', '4305651'] },
                { name: '3º Nominación', phone: ['4305641', '4303361', '4305647'] },
            ]
        }
    ];

    const filterEntries = (entries: PhoneEntry[]) => {
        if (!searchTerm) return entries;
        const search = searchTerm.toLowerCase();
        return entries.filter(entry => {
            const nameMatch = entry.name.toLowerCase().includes(search);
            const phoneMatch = Array.isArray(entry.phone)
                ? entry.phone.some(p => p.toLowerCase().includes(search))
                : entry.phone.toLowerCase().includes(search);
            const noteMatch = entry.note?.toLowerCase().includes(search);
            return nameMatch || phoneMatch || noteMatch;
        });
    };

    const filteredCategories = categories.map(cat => ({
        ...cat,
        entries: filterEntries(cat.entries)
    })).filter(cat => cat.entries.length > 0);

    const formatPhone = (phone: string | string[]) => {
        if (Array.isArray(phone)) {
            return phone.map((p, idx) => (
                <span key={idx} className="block">
                    {p}
                </span>
            ));
        }
        return phone;
    };

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
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Teléfonos Útiles</h1>
                        <p className="text-green-100 font-semibold">Media Agua • Sarmiento • San Juan</p>
                        <p className="text-sm text-green-50 mt-2">
                            Información actualizada desde{' '}
                            <a
                                href="https://www.swdiario.com.ar/p/tlefonos-utiles.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white"
                            >
                                SW Diario
                            </a>
                        </p>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Buscar por nombre, teléfono o servicio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-gray-900 placeholder-gray-400"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                    {filteredCategories.map((category, catIdx) => (
                        <div
                            key={catIdx}
                            className={`${category.color} rounded-2xl p-6 border-2 shadow-lg`}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                {category.icon}
                                <h2 className="text-2xl font-black">{category.title}</h2>
                            </div>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {category.entries.map((entry, idx) => (
                                    <div
                                        key={idx}
                                        className="bg-white rounded-xl p-4 border border-gray-200 hover:shadow-md transition-shadow"
                                    >
                                        <h3 className="font-bold text-gray-900 mb-2">{entry.name}</h3>
                                        <div className="flex items-start gap-2">
                                            <Phone className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                                            <div className="text-sm text-gray-700">
                                                {formatPhone(entry.phone)}
                                            </div>
                                        </div>
                                        {entry.note && (
                                            <p className="text-xs text-gray-500 mt-2 italic">{entry.note}</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Footer Info */}
                <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-3">ℹ️ Información</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        Esta información ha sido recopilada de{' '}
                        <a
                            href="https://www.swdiario.com.ar/p/tlefonos-utiles.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:underline font-semibold"
                        >
                            SW Diario
                        </a>
                        . Los números pueden cambiar, por favor verifica antes de llamar.
                    </p>
                    <p className="text-xs text-gray-500 mt-3">
                        <strong>Nota:</strong> Para emergencias médicas, llama al <strong>911</strong> o <strong>107</strong>.
                    </p>
                </div>
            </div>
        </div>
    );
};

