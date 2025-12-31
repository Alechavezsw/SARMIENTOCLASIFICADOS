import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Navigation } from 'lucide-react';
import { Link } from 'react-router-dom';

type DayType = 'weekday' | 'saturday' | 'sunday';
type TabType = 'terminal' | 'distritos' | 'distvuelta' | 'retorno';

interface BusSchedule {
    time: string;
    line?: string;
    detail?: string;
    via?: string;
    dest?: string;
    lb?: string;
    ped?: string;
    cie?: string;
    ot?: string;
    loc?: string;
    berros?: string;
    canada?: string;
    llegada?: string;
    cruce?: string;
    nota?: string;
}

export const BusSchedulePage: React.FC = () => {
    const [currentDay, setCurrentDay] = useState<DayType>('weekday');
    const [activeTab, setActiveTab] = useState<TabType>('terminal');
    const [searchTerm, setSearchTerm] = useState('');
    const [showRouteModal, setShowRouteModal] = useState(false);
    const [showPlannerModal, setShowPlannerModal] = useState(false);

    // Datos de horarios
    const dataTerminalWeekday: BusSchedule[] = [
        { time: "05:30", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "06:10", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "06:20", line: "262", detail: "Cochagual", via: "Mendoza" },
        { time: "07:05", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "08:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "09:00", line: "262", detail: "Directo Media Agua", via: "Mdza - C14 - R40" },
        { time: "09:30", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "10:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "10:30", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "11:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "11:25", line: "262", detail: "Cochagual", via: "Mendoza" },
        { time: "11:45", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "12:15", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "13:00", line: "262", detail: "Directo", via: "Mendoza" },
        { time: "13:30", line: "262", detail: "Directo Media Agua", via: "Mdza - C14 - R40" },
        { time: "14:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "15:00", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "15:30", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "16:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "17:00", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "17:15", line: "262", detail: "Directo", via: "Mendoza" },
        { time: "17:45", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "18:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "18:45", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "19:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "19:30", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "20:00", line: "262", detail: "Directo Media Agua", via: "Mdza - C14 - R40" },
        { time: "21:00", line: "262", detail: "Directo Media Agua", via: "Mendoza" },
        { time: "21:30", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "22:30", line: "262", detail: "Directo Media Agua", via: "Mendoza" }
    ];

    const dataTerminalSaturday: BusSchedule[] = [
        { time: "06:10", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "06:30", line: "262", detail: "Cochagual", via: "Mendoza" },
        { time: "08:10", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "09:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "09:30", line: "262", detail: "Directo MA", via: "Mdza-C14-R40" },
        { time: "10:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "11:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "11:25", line: "262", detail: "Cochagual", via: "Mendoza" },
        { time: "12:15", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "13:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "13:30", line: "262", detail: "Directo MA", via: "Mdza-C14-R40" },
        { time: "15:00", line: "262", detail: "Cochagual", via: "Mendoza" },
        { time: "15:15", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "16:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "17:00", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "17:30", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "18:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "18:45", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "19:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "20:00", line: "262", detail: "Directo MA", via: "Mdza-C14-R40" },
        { time: "21:00", line: "262", detail: "Directo MA", via: "Mendoza" },
        { time: "21:30", line: "262", detail: "Colonia Fiscal", via: "Mendoza" },
        { time: "22:30", line: "262", detail: "Directo MA", via: "Mendoza" }
    ];

    const dataTerminalSunday: BusSchedule[] = [
        { time: "06:30", line: "262", detail: "Por Colonia Fiscal", via: "Mendoza" },
        { time: "07:30", line: "262", detail: "Por Cochagual", via: "Mendoza" },
        { time: "09:00", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "11:00", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "11:30", line: "262", detail: "Por Cochagual", via: "Mendoza" },
        { time: "12:30", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "14:00", line: "262", detail: "Por Colonia Fiscal", via: "Mendoza" },
        { time: "15:00", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "16:00", line: "262", detail: "Por Colonia Fiscal", via: "Mendoza" },
        { time: "17:00", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "18:30", line: "262", detail: "Por Cochagual", via: "Mendoza" },
        { time: "19:15", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "20:00", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" },
        { time: "21:30", line: "262", detail: "Por Colonia Fiscal", via: "Mendoza" },
        { time: "22:30", line: "262", detail: "Directo a Villa Media Agua", via: "Mendoza" }
    ];

    // Datos de distritos (simplificados para el ejemplo)
    const dataDistritosWeekday: BusSchedule[] = [
        { time: "06:00", dest: "Los Berros", lb: "06:35", ped: "--", cie: "--", ot: "Cañada 06:20" },
        { time: "07:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 07:50" },
        { time: "08:30", dest: "Los Berros", lb: "09:05", ped: "--", cie: "--", ot: "Cañada 08:50" },
        { time: "10:05", dest: "Cienaguita", lb: "10:40", ped: "--", cie: "11:07", ot: "Divisadero 10:56" },
        { time: "12:30", dest: "Los Berros", lb: "13:05", ped: "--", cie: "--", ot: "Cañada 12:50" },
        { time: "15:00", dest: "Los Berros", lb: "15:35", ped: "--", cie: "--", ot: "Cañada 15:20" },
        { time: "17:10", dest: "Los Berros", lb: "17:45", ped: "--", cie: "--", ot: "Cañada 17:30" },
        { time: "19:30", dest: "Los Berros", lb: "20:05", ped: "--", cie: "--", ot: "Cañada 19:50" }
    ];

    const getCurrentData = () => {
        if (activeTab === 'terminal') {
            if (currentDay === 'weekday') return dataTerminalWeekday;
            if (currentDay === 'saturday') return dataTerminalSaturday;
            return dataTerminalSunday;
        }
        if (activeTab === 'distritos') {
            return dataDistritosWeekday;
        }
        return [];
    };

    const filteredData = getCurrentData().filter(item => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase();
        return (
            item.time?.toLowerCase().includes(search) ||
            item.detail?.toLowerCase().includes(search) ||
            item.via?.toLowerCase().includes(search) ||
            item.dest?.toLowerCase().includes(search) ||
            item.nota?.toLowerCase().includes(search)
        );
    });

    const formatCell = (val?: string) => {
        if (!val || val === '--' || val === '-') return <span className="text-gray-300">-</span>;
        return val;
    };

    const getWhatsAppLink = (schedule: BusSchedule) => {
        const text = encodeURIComponent(
            `Hola! Te aviso que el colectivo de la Línea 262 sale a las ${schedule.time}. ` +
            `Info: ${schedule.detail || schedule.dest || schedule.nota || ''}. ` +
            `Provista por www.swdiario.com.ar`
        );
        return `https://wa.me/?text=${text}`;
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
                    <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white shadow-xl">
                        <h1 className="text-3xl md:text-4xl font-black mb-2">Horarios Red Tulum</h1>
                        <p className="text-red-100 font-semibold">VERANO • SARMIENTO / MEDIA AGUA</p>
                    </div>
                </div>

                {/* Botones de Utilidades */}
                <div className="flex justify-center gap-4 mb-6 flex-wrap">
                    <button
                        onClick={() => setShowRouteModal(true)}
                        className="flex items-center gap-2 bg-white text-red-600 border-2 border-red-600 px-5 py-2.5 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all"
                    >
                        <MapPin className="w-5 h-5" />
                        Ver Recorridos
                    </button>
                    <button
                        onClick={() => setShowPlannerModal(true)}
                        className="flex items-center gap-2 bg-white text-red-600 border-2 border-red-600 px-5 py-2.5 rounded-full font-bold hover:bg-red-600 hover:text-white transition-all"
                    >
                        <Navigation className="w-5 h-5" />
                        Planificar Viaje
                    </button>
                </div>

                {/* Selector de Día */}
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {(['weekday', 'saturday', 'sunday'] as DayType[]).map((day) => (
                        <button
                            key={day}
                            onClick={() => setCurrentDay(day)}
                            className={`px-6 py-3 rounded-full font-bold transition-all ${
                                currentDay === day
                                    ? 'bg-gray-800 text-white shadow-lg'
                                    : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                            }`}
                        >
                            {day === 'weekday' ? 'Lunes a Viernes' : day === 'saturday' ? 'Sábado' : 'Dom/Feriado'}
                        </button>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-3 mb-6 flex-wrap">
                    {([
                        { id: 'terminal', label: 'Terminal → M.Agua' },
                        { id: 'distritos', label: 'M.Agua → Distritos' },
                        { id: 'distvuelta', label: 'Distritos → M.Agua' },
                        { id: 'retorno', label: 'M.Agua → Terminal' }
                    ] as { id: TabType; label: string }[]).map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => {
                                setActiveTab(tab.id);
                                setSearchTerm('');
                            }}
                            className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${
                                activeTab === tab.id
                                    ? 'bg-red-600 text-white shadow-lg'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Buscador */}
                <div className="mb-6">
                    <div className="relative max-w-md mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar horario..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border-2 border-gray-200 rounded-full focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all"
                        />
                    </div>
                </div>

                {/* Tabla */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-red-600 text-white">
                                <tr>
                                    {activeTab === 'terminal' && (
                                        <>
                                            <th className="px-4 py-3 text-left font-bold">Salida</th>
                                            <th className="px-4 py-3 text-left font-bold">Línea</th>
                                            <th className="px-4 py-3 text-left font-bold">Recorrido</th>
                                            <th className="px-4 py-3 text-left font-bold">Viaja por</th>
                                            <th className="px-4 py-3 text-center font-bold">Compartir</th>
                                        </>
                                    )}
                                    {activeTab === 'distritos' && (
                                        <>
                                            <th className="px-4 py-3 text-left font-bold">Salida (M.A)</th>
                                            <th className="px-4 py-3 text-left font-bold">Destino</th>
                                            <th className="px-4 py-3 text-left font-bold">Los Berros</th>
                                            <th className="px-4 py-3 text-left font-bold">Pedernal</th>
                                            <th className="px-4 py-3 text-left font-bold">Cienaguita</th>
                                            <th className="px-4 py-3 text-left font-bold">Otras</th>
                                            <th className="px-4 py-3 text-center font-bold">Compartir</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={activeTab === 'terminal' ? 5 : 7} className="px-4 py-8 text-center text-gray-500">
                                            No se encontraron horarios
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            {activeTab === 'terminal' && (
                                                <>
                                                    <td className="px-4 py-3 font-bold text-red-600 text-lg">{item.time}</td>
                                                    <td className="px-4 py-3">
                                                        <span className="bg-gray-800 text-white px-3 py-1 rounded-lg font-bold text-sm">
                                                            {item.line}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3">{item.detail}</td>
                                                    <td className="px-4 py-3">{item.via}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <a
                                                            href={getWhatsAppLink(item)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                                            </svg>
                                                        </a>
                                                    </td>
                                                </>
                                            )}
                                            {activeTab === 'distritos' && (
                                                <>
                                                    <td className="px-4 py-3 font-bold text-red-600 text-lg">{item.time}</td>
                                                    <td className="px-4 py-3 font-bold">{item.dest}</td>
                                                    <td className="px-4 py-3">{formatCell(item.lb)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.ped)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.cie)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.ot)}</td>
                                                    <td className="px-4 py-3 text-center">
                                                        <a
                                                            href={getWhatsAppLink(item)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
                                                        >
                                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                                                            </svg>
                                                        </a>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    Horarios gentileza de{' '}
                    <a href="https://www.swdiario.com.ar/" target="_blank" rel="noopener noreferrer" className="text-red-600 font-bold hover:underline">
                        SW Diario
                    </a>
                </div>
            </div>

            {/* Modal Recorridos */}
            {showRouteModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowRouteModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowRouteModal(false)} className="float-right text-2xl font-bold text-gray-500 hover:text-gray-700">×</button>
                        <h3 className="text-2xl font-black text-red-600 mb-4">📍 Recorridos Línea 262</h3>
                        <div className="space-y-4">
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">➡️ Sarmiento a Capital (Directo/Mendoza)</h4>
                                <p className="text-gray-700">Media Agua, Rivadavia, 9 de Julio, Juan XXIII, Uruguay, Ruta 40, Mendoza, Av. Joaquín Uñac, Calle 10, Lemos, Calle 7, Mendoza, Rep. del Líbano, Gral. Acha, Santa Fe, Salta, Laprida, Alem, Gral. Paz, Estados Unidos, Terminal.</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">➡️ Capital a Sarmiento (Directo/Mendoza)</h4>
                                <p className="text-gray-700">Terminal, Estados Unidos, Santa Fe, Güemes, 9 de Julio, Mendoza, Calle 7, Lemos, Calle 10, Av. Joaquín Uñac, Mendoza, Ruta 40, Uruguay, 25 de Mayo, Rivadavia (Media Agua).</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2">➡️ Por Colonia Fiscal</h4>
                                <p className="text-gray-700">Similar al directo, pero con desvíos por: Salvador María del Carril, Las Leñas, Estrella, Fray Justo Sta. María de Oro, y retorno a Mendoza.</p>
                            </div>
                            <a
                                href="https://moovitapp.com/tripplan/san_juan-6137/lines/262/41103071/5434596/es-419?customerId=NPIdiV-P9Gcj-pA7yOXVPg"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block bg-red-600 text-white text-center py-3 rounded-lg font-bold hover:bg-red-700 transition-colors mt-6"
                            >
                                🗺️ Ver Mapa Interactivo en Moovit
                            </a>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Planificador */}
            {showPlannerModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowPlannerModal(false)}>
                    <div className="bg-white rounded-2xl p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setShowPlannerModal(false)} className="float-right text-2xl font-bold text-gray-500 hover:text-gray-700">×</button>
                        <h3 className="text-2xl font-black text-red-600 mb-4">🗺️ Planificá tu Viaje</h3>
                        <p className="text-gray-700 mb-4">Escribí tu destino y la app te armará la ruta:</p>
                        <input
                            type="text"
                            id="trip-destination"
                            placeholder="Ej: Plaza 25 de Mayo, Hospital Rawson..."
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-500/20 mb-4"
                        />
                        <div className="space-y-3">
                            <button
                                onClick={() => {
                                    const dest = (document.getElementById('trip-destination') as HTMLInputElement)?.value;
                                    if (dest) {
                                        window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dest + ', San Juan, Argentina')}&travelmode=transit`, '_blank');
                                    }
                                    setShowPlannerModal(false);
                                }}
                                className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                            >
                                Ver en Google Maps
                            </button>
                            <button
                                onClick={() => {
                                    window.open('https://moovitapp.com/index/es-419/transporte_p%C3%BAblico-San_Juan-6137', '_blank');
                                    setShowPlannerModal(false);
                                }}
                                className="w-full bg-orange-500 text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors"
                            >
                                Ver en Moovit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

