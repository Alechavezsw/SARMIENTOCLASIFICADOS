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

    // Datos completos de distritos Lunes a Viernes
    const dataDistritosWeekday: BusSchedule[] = [
        { time: "06:00", dest: "Los Berros", lb: "06:35", ped: "--", cie: "--", ot: "Cañada 06:20" },
        { time: "06:00", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 06:20" },
        { time: "06:30", dest: "Pedernal", lb: "07:00", ped: "07:25", cie: "--", ot: "Divisadero 07:10" },
        { time: "06:45", dest: "Cienaguita", lb: "07:21", ped: "--", cie: "07:48", ot: "Divisadero 07:37" },
        { time: "07:05", dest: "Los Berros", lb: "07:43", ped: "--", cie: "--", ot: "Cañada 07:25" },
        { time: "07:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 07:50" },
        { time: "07:45", dest: "Cienaguita", lb: "08:20", ped: "08:45", cie: "09:20", ot: "Divisadero 09:05" },
        { time: "08:30", dest: "Los Berros", lb: "09:05", ped: "--", cie: "--", ot: "Cañada 08:50" },
        { time: "09:30", dest: "Los Berros", lb: "10:12", ped: "--", cie: "--", ot: "Cañada 09:50" },
        { time: "10:05", dest: "Cienaguita", lb: "10:40", ped: "--", cie: "11:07", ot: "Divisadero 10:56" },
        { time: "10:25", dest: "Los Berros", lb: "11:00", ped: "--", cie: "--", ot: "Cañada 10:45" },
        { time: "11:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 11:55" },
        { time: "11:35", dest: "Los Berros", lb: "12:10", ped: "--", cie: "--", ot: "Cañada 11:55" },
        { time: "12:30", dest: "Los Berros", lb: "13:05", ped: "--", cie: "--", ot: "Cañada 12:50" },
        { time: "12:30", dest: "Cienaguita", lb: "13:05", ped: "--", cie: "13:35", ot: "Divisadero 13:15" },
        { time: "13:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "Tres Esq. 14:00" },
        { time: "13:35", dest: "Cienaguita", lb: "14:10", ped: "14:30", cie: "14:50", ot: "-" },
        { time: "15:00", dest: "Los Berros", lb: "15:35", ped: "--", cie: "--", ot: "Cañada 15:20" },
        { time: "16:00", dest: "Los Berros", lb: "16:35", ped: "--", cie: "--", ot: "Cañada 16:20" },
        { time: "16:00", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "Colonia 16:35" },
        { time: "17:10", dest: "Los Berros", lb: "17:45", ped: "--", cie: "--", ot: "Cañada 17:30" },
        { time: "17:30", dest: "Cienaguita", lb: "18:05", ped: "--", cie: "18:30", ot: "Cañada 17:50" },
        { time: "19:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 19:50" },
        { time: "19:30", dest: "Los Berros", lb: "20:05", ped: "--", cie: "--", ot: "Cañada 19:50" },
        { time: "20:35", dest: "Pedernal", lb: "21:10", ped: "21:30", cie: "--", ot: "Cañada 20:55" },
        { time: "21:35", dest: "Pedernal", lb: "22:05", ped: "22:20", cie: "--", ot: "Cañada 21:53" }
    ];

    // Distritos Sábado
    const dataDistritosSaturday: BusSchedule[] = [
        { time: "06:40", dest: "Pedernal", lb: "07:15", ped: "07:30", cie: "--", ot: "Cañada 07:00" },
        { time: "07:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 07:50" },
        { time: "07:50", dest: "Cienaguita", lb: "08:25", ped: "08:45", cie: "09:10", ot: "Cañada 08:10" },
        { time: "08:30", dest: "Los Berros", lb: "09:05", ped: "--", cie: "--", ot: "Cañada 08:50" },
        { time: "10:20", dest: "Los Berros", lb: "10:55", ped: "--", cie: "--", ot: "Cañada 10:40" },
        { time: "11:30", dest: "Los Berros", lb: "12:05", ped: "--", cie: "--", ot: "Cañada 11:50" },
        { time: "11:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 11:50" },
        { time: "12:30", dest: "Los Berros", lb: "13:05", ped: "--", cie: "--", ot: "Cañada 12:50" },
        { time: "13:30", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "Tres Esq 14:00 / Arr 14:20" },
        { time: "13:50", dest: "Cienaguita", lb: "14:25", ped: "14:45", cie: "15:15", ot: "Cañada 14:10" },
        { time: "15:00", dest: "Los Berros", lb: "15:35", ped: "--", cie: "--", ot: "Cañada 15:20" },
        { time: "15:30", dest: "Los Berros", lb: "16:05", ped: "--", cie: "--", ot: "Cañada 15:50" },
        { time: "16:55", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "San Carlos 17:10" },
        { time: "17:40", dest: "Los Berros", lb: "18:15", ped: "--", cie: "--", ot: "Cañada 18:00" },
        { time: "18:45", dest: "Los Berros", lb: "19:20", ped: "--", cie: "--", ot: "Cañada 19:05" },
        { time: "19:10", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "Tres Esq 19:45 / Arr 20:00" },
        { time: "19:30", dest: "Los Berros", lb: "20:05", ped: "--", cie: "--", ot: "Cañada 19:50" },
        { time: "20:30", dest: "Los Berros", lb: "21:10", ped: "--", cie: "--", ot: "Cañada 20:50" },
        { time: "21:00", dest: "San Carlos", lb: "--", ped: "--", cie: "--", ot: "Tres Esq 21:35 / Arr 21:45" },
        { time: "21:30", dest: "Los Berros", lb: "22:05", ped: "--", cie: "--", ot: "Cañada 21:50" },
        { time: "21:30", dest: "Cienaguita", lb: "22:05", ped: "22:25", cie: "22:55", ot: "Cañada 21:50" }
    ];

    // Distritos Domingo/Feriado
    const dataDistritosSunday: BusSchedule[] = [
        { time: "08:10", dest: "Pedernal (L.264)", lb: "--", ped: "Destino", cie: "--", ot: "-" },
        { time: "09:45", dest: "San Carlos (L.265)", lb: "--", ped: "--", cie: "--", ot: "-" },
        { time: "11:00", dest: "Los Berros (L.263)", lb: "Destino", ped: "--", cie: "--", ot: "-" },
        { time: "12:30", dest: "Los Berros (L.263)", lb: "Destino", ped: "--", cie: "--", ot: "-" },
        { time: "14:00", dest: "Cienaguita (L.264)", lb: "--", ped: "--", cie: "Destino", ot: "-" },
        { time: "16:30", dest: "Pedernal (L.264)", lb: "--", ped: "Destino", cie: "--", ot: "-" },
        { time: "17:00", dest: "San Carlos (L.263)", lb: "--", ped: "--", cie: "--", ot: "-" },
        { time: "18:30", dest: "Los Berros (L.263)", lb: "Destino", ped: "--", cie: "--", ot: "-" },
        { time: "20:45", dest: "Pedernal (L.264)", lb: "--", ped: "Destino", cie: "--", ot: "-" },
        { time: "21:30", dest: "Cienaguita (L.264)", lb: "--", ped: "--", cie: "Destino", ot: "-" }
    ];

    // Distritos Vuelta Lunes a Viernes
    const dataDistritosVueltaWeekday: BusSchedule[] = [
        { time: "06:00", loc: "Cienaguita", berros: "06:25", canada: "06:40", llegada: "07:00" },
        { time: "06:20", loc: "San Carlos (x 25)", berros: "-", canada: "-", llegada: "06:50" },
        { time: "06:35", loc: "Los Berros", berros: "06:35", canada: "06:50", llegada: "07:10" },
        { time: "07:25", loc: "Pedernal", berros: "-", canada: "08:10 (Colonia)", llegada: "08:30" },
        { time: "07:43", loc: "Los Berros", berros: "07:43", canada: "07:57", llegada: "08:25" },
        { time: "07:50", loc: "Cienaguita", berros: "08:12", canada: "08:28", llegada: "08:50" },
        { time: "07:50", loc: "San Carlos (x 25)", berros: "-", canada: "-", llegada: "08:20" },
        { time: "09:05", loc: "Los Berros", berros: "09:05", canada: "09:20", llegada: "09:40" },
        { time: "09:25", loc: "Cienaguita", berros: "09:55", canada: "10:10", llegada: "10:30" },
        { time: "10:12", loc: "Los Berros", berros: "10:12", canada: "10:27", llegada: "10:50" },
        { time: "11:00", loc: "Los Berros", berros: "11:00", canada: "11:15", llegada: "11:35" },
        { time: "11:15", loc: "Cienaguita", berros: "12:01", canada: "12:10", llegada: "12:36" },
        { time: "11:55", loc: "San Carlos (x 25)", berros: "-", canada: "-", llegada: "12:30" },
        { time: "12:20", loc: "Los Berros", berros: "12:20", canada: "12:35", llegada: "12:55" },
        { time: "13:05", loc: "Los Berros", berros: "13:05", canada: "13:20", llegada: "13:40" },
        { time: "13:45", loc: "Cienaguita", berros: "14:35", canada: "14:50", llegada: "15:10" },
        { time: "14:10", loc: "San Carlos (R40)", berros: "-", canada: "-", llegada: "14:30" },
        { time: "14:50", loc: "Cienaguita", berros: "15:15", canada: "15:30", llegada: "15:50" },
        { time: "15:35", loc: "Los Berros", berros: "15:35", canada: "15:50", llegada: "16:10" },
        { time: "16:35", loc: "Los Berros", berros: "16:35", canada: "16:50", llegada: "17:10" },
        { time: "16:45", loc: "San Carlos (R40)", berros: "-", canada: "-", llegada: "17:00" },
        { time: "17:45", loc: "Los Berros", berros: "17:45", canada: "18:00", llegada: "18:20" },
        { time: "18:30", loc: "Cienaguita", berros: "19:20", canada: "19:35", llegada: "19:55" },
        { time: "19:50", loc: "San Carlos (x 25)", berros: "-", canada: "-", llegada: "20:30" },
        { time: "20:05", loc: "Los Berros", berros: "20:05", canada: "20:20", llegada: "20:40" },
        { time: "21:30", loc: "Pedernal", berros: "21:50", canada: "22:05", llegada: "22:25" },
        { time: "22:15", loc: "San Carlos (R40)", berros: "-", canada: "-", llegada: "22:30" },
        { time: "22:20", loc: "Pedernal", berros: "22:35", canada: "22:45", llegada: "23:00" }
    ];

    // Distritos Vuelta Sábado
    const dataDistritosVueltaSaturday: BusSchedule[] = [
        { time: "06:30", loc: "Cienaguita", berros: "06:50", canada: "07:05", llegada: "07:25" },
        { time: "07:30", loc: "Pedernal", berros: "07:50", canada: "08:05", llegada: "08:25" },
        { time: "07:50", loc: "San Carlos (x 25)", berros: "--", canada: "--", llegada: "08:20" },
        { time: "09:05", loc: "Los Berros", berros: "09:05", canada: "09:20", llegada: "09:40" },
        { time: "09:25", loc: "Cienaguita", berros: "09:55", canada: "10:10", llegada: "10:30" },
        { time: "10:55", loc: "Los Berros", berros: "10:55", canada: "11:10", llegada: "11:30" },
        { time: "11:50", loc: "San Carlos (x 25)", berros: "--", canada: "--", llegada: "12:20" },
        { time: "12:05", loc: "Los Berros", berros: "12:05", canada: "12:20", llegada: "12:40" },
        { time: "13:10", loc: "Los Berros", berros: "13:10", canada: "13:25", llegada: "13:45" },
        { time: "14:20", loc: "San Carlos (R40)", berros: "--", canada: "--", llegada: "14:30" },
        { time: "15:35", loc: "Los Berros", berros: "15:35", canada: "15:50", llegada: "16:10" },
        { time: "16:10", loc: "Los Berros", berros: "16:10", canada: "16:25", llegada: "16:45" },
        { time: "17:10", loc: "San Carlos (x 25)", berros: "--", canada: "--", llegada: "17:45" },
        { time: "18:00", loc: "Cienaguita", berros: "18:50", canada: "19:05", llegada: "19:25" },
        { time: "18:15", loc: "Los Berros", berros: "18:15", canada: "18:30", llegada: "18:50" },
        { time: "19:20", loc: "Los Berros", berros: "19:20", canada: "19:35", llegada: "19:55" },
        { time: "20:00", loc: "San Carlos (R40)", berros: "--", canada: "--", llegada: "20:15" },
        { time: "20:05", loc: "Los Berros", berros: "20:05", canada: "20:20", llegada: "20:40" },
        { time: "21:10", loc: "Los Berros", berros: "21:10", canada: "21:25", llegada: "21:45" },
        { time: "21:45", loc: "San Carlos (R40)", berros: "--", canada: "--", llegada: "22:00" },
        { time: "22:05", loc: "Los Berros", berros: "22:05", canada: "22:20", llegada: "22:40" }
    ];

    // Distritos Vuelta Domingo/Feriado
    const dataDistritosVueltaSunday: BusSchedule[] = [
        { time: "07:30", loc: "Cienaguita (L.264)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "09:40", loc: "Cienaguita (L.264)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "10:35", loc: "San Carlos (L.265)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "11:30", loc: "Los Berros (L.263)", berros: "Salida", canada: "-", llegada: "M.Agua" },
        { time: "13:05", loc: "Los Berros (L.263)", berros: "Salida", canada: "-", llegada: "M.Agua" },
        { time: "15:30", loc: "Cienaguita (L.264)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "17:50", loc: "San Carlos (L.265)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "18:30", loc: "Cienaguita (L.264)", berros: "-", canada: "-", llegada: "M.Agua" },
        { time: "19:15", loc: "Los Berros (L.263)", berros: "Salida", canada: "-", llegada: "M.Agua" },
        { time: "21:40", loc: "Los Berros (L.263)", berros: "Salida", canada: "-", llegada: "M.Agua" }
    ];

    // Retorno Lunes a Viernes
    const dataRetornoWeekday: BusSchedule[] = [
        { time: "05:50", cruce: "06:00", nota: "-", llegada: "07:10" },
        { time: "06:15", cruce: "06:25", nota: "Por Colonia Fiscal (06:40)", llegada: "08:00" },
        { time: "06:30", cruce: "-", nota: "Por Cochagual (07:00)", llegada: "08:40" },
        { time: "07:00", cruce: "07:10", nota: "-", llegada: "08:20" },
        { time: "08:00", cruce: "08:10", nota: "-", llegada: "09:35" },
        { time: "08:30", cruce: "08:40", nota: "-", llegada: "10:10" },
        { time: "09:00", cruce: "09:10", nota: "-", llegada: "10:40" },
        { time: "09:40", cruce: "09:50", nota: "Por Colonia Fiscal (10:05)", llegada: "11:25" },
        { time: "10:10", cruce: "-", nota: "Por Cochagual. Termina en Esq. Sauce", llegada: "-" },
        { time: "10:30", cruce: "10:40", nota: "-", llegada: "12:10" },
        { time: "11:00", cruce: "11:11", nota: "-", llegada: "12:25" },
        { time: "11:30", cruce: "11:40", nota: "-", llegada: "13:05" },
        { time: "11:35", cruce: "-", nota: "Por Cochagual. Termina en Colonia", llegada: "-" },
        { time: "12:00", cruce: "12:10", nota: "-", llegada: "13:35" },
        { time: "12:40", cruce: "12:50", nota: "Por Colonia Fiscal (13:05)", llegada: "14:25" },
        { time: "13:10", cruce: "13:20", nota: "-", llegada: "14:50" },
        { time: "14:00", cruce: "14:10", nota: "-", llegada: "15:35" },
        { time: "14:40", cruce: "14:50", nota: "-", llegada: "16:11" },
        { time: "15:00", cruce: "15:10", nota: "-", llegada: "16:40" },
        { time: "15:30", cruce: "15:40", nota: "Por Colonia Fiscal (15:55)", llegada: "17:15" },
        { time: "15:30", cruce: "-", nota: "Por Cochagual (16:00)", llegada: "17:40" },
        { time: "15:50", cruce: "16:00", nota: "-", llegada: "17:30" },
        { time: "16:15", cruce: "16:25", nota: "-", llegada: "17:45" },
        { time: "17:00", cruce: "17:10", nota: "-", llegada: "18:40" },
        { time: "17:20", cruce: "-", nota: "Por Cochagual. Recorrido corto", llegada: "-" },
        { time: "17:30", cruce: "17:40", nota: "-", llegada: "19:05" },
        { time: "18:45", cruce: "18:55", nota: "Por Colonia Fiscal (19:00)", llegada: "20:20" },
        { time: "19:30", cruce: "19:40", nota: "-", llegada: "21:06" },
        { time: "20:00", cruce: "20:10", nota: "-", llegada: "21:20" },
        { time: "20:30", cruce: "20:40", nota: "-", llegada: "22:00" },
        { time: "20:30", cruce: "-", nota: "Por Cochagual. Recorrido corto", llegada: "-" },
        { time: "21:00", cruce: "21:10", nota: "-", llegada: "22:45" },
        { time: "21:30", cruce: "21:40", nota: "-", llegada: "23:00" },
        { time: "22:45", cruce: "22:55", nota: "-", llegada: "00:15" }
    ];

    // Retorno Sábado
    const dataRetornoSaturday: BusSchedule[] = [
        { time: "06:15", cruce: "06:25", nota: "Por Colonia Fiscal (06:35)", llegada: "07:50" },
        { time: "07:00", cruce: "07:10", nota: "-", llegada: "08:40" },
        { time: "07:30", cruce: "07:40", nota: "-", llegada: "08:50" },
        { time: "07:30", cruce: "-", nota: "Por Cochagual (08:00) y Esq. Sauce", llegada: "09:35" },
        { time: "08:30", cruce: "08:40", nota: "-", llegada: "10:05" },
        { time: "09:10", cruce: "09:20", nota: "-", llegada: "10:45" },
        { time: "09:35", cruce: "09:40", nota: "-", llegada: "11:00" },
        { time: "10:30", cruce: "10:40", nota: "-", llegada: "12:00" },
        { time: "11:30", cruce: "11:40", nota: "-", llegada: "13:05" },
        { time: "11:30", cruce: "-", nota: "Por Cochagual. Termina en Colonia (12:45)", llegada: "-" },
        { time: "12:40", cruce: "12:50", nota: "Por Colonia Fiscal (13:05)", llegada: "14:25" },
        { time: "13:30", cruce: "13:40", nota: "-", llegada: "15:00" },
        { time: "14:00", cruce: "14:10", nota: "-", llegada: "15:35" },
        { time: "15:00", cruce: "15:10", nota: "Por Colonia Fiscal (15:20)", llegada: "16:35" },
        { time: "16:00", cruce: "-", nota: "Por Cochagual (16:30) y Esq. Sauce", llegada: "18:05" },
        { time: "16:15", cruce: "16:25", nota: "-", llegada: "17:30" },
        { time: "17:00", cruce: "17:10", nota: "-", llegada: "18:30" },
        { time: "18:00", cruce: "18:10", nota: "Por Colonia Fiscal (18:20)", llegada: "19:35" },
        { time: "19:00", cruce: "19:10", nota: "-", llegada: "20:35" },
        { time: "19:30", cruce: "19:40", nota: "-", llegada: "21:05" },
        { time: "20:10", cruce: "20:20", nota: "Por Colonia Fiscal (20:30)", llegada: "21:50" },
        { time: "20:30", cruce: "-", nota: "Por Cochagual (21:00). Recorrido corto", llegada: "-" },
        { time: "20:30", cruce: "20:40", nota: "-", llegada: "22:10" },
        { time: "21:00", cruce: "21:10", nota: "Por Colonia Fiscal (21:20)", llegada: "22:40" },
        { time: "21:45", cruce: "21:55", nota: "-", llegada: "23:15" }
    ];

    // Retorno Domingo/Feriado
    const dataRetornoSunday: BusSchedule[] = [
        { time: "07:00", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "07:30", cruce: "-", nota: "Por Cochagual", llegada: "-" },
        { time: "08:00", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "09:00", cruce: "-", nota: "Por Colonia Fiscal", llegada: "-" },
        { time: "10:45", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "11:30", cruce: "-", nota: "Por Colonia Fiscal", llegada: "-" },
        { time: "12:15", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "15:00", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "15:30", cruce: "-", nota: "Por Cochagual", llegada: "-" },
        { time: "16:30", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "18:00", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "19:00", cruce: "-", nota: "Por Colonia Fiscal", llegada: "-" },
        { time: "19:50", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "20:10", cruce: "-", nota: "Directo a San Juan", llegada: "-" },
        { time: "21:00", cruce: "-", nota: "Directo a San Juan", llegada: "-" }
    ];

    const getCurrentData = () => {
        if (activeTab === 'terminal') {
            if (currentDay === 'weekday') return dataTerminalWeekday;
            if (currentDay === 'saturday') return dataTerminalSaturday;
            return dataTerminalSunday;
        }
        if (activeTab === 'distritos') {
            if (currentDay === 'weekday') return dataDistritosWeekday;
            if (currentDay === 'saturday') return dataDistritosSaturday;
            return dataDistritosSunday;
        }
        if (activeTab === 'distvuelta') {
            if (currentDay === 'weekday') return dataDistritosVueltaWeekday;
            if (currentDay === 'saturday') return dataDistritosVueltaSaturday;
            return dataDistritosVueltaSunday;
        }
        if (activeTab === 'retorno') {
            if (currentDay === 'weekday') return dataRetornoWeekday;
            if (currentDay === 'saturday') return dataRetornoSaturday;
            return dataRetornoSunday;
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
            item.nota?.toLowerCase().includes(search) ||
            item.loc?.toLowerCase().includes(search) ||
            item.berros?.toLowerCase().includes(search) ||
            item.canada?.toLowerCase().includes(search) ||
            item.llegada?.toLowerCase().includes(search) ||
            item.cruce?.toLowerCase().includes(search)
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
                                    {activeTab === 'distvuelta' && (
                                        <>
                                            <th className="px-4 py-3 text-left font-bold">Salida</th>
                                            <th className="px-4 py-3 text-left font-bold">Desde</th>
                                            <th className="px-4 py-3 text-left font-bold">Pasa Los Berros</th>
                                            <th className="px-4 py-3 text-left font-bold">Pasa Cañada</th>
                                            <th className="px-4 py-3 text-left font-bold">Llegada (M.A)</th>
                                            <th className="px-4 py-3 text-center font-bold">Compartir</th>
                                        </>
                                    )}
                                    {activeTab === 'retorno' && (
                                        <>
                                            <th className="px-4 py-3 text-left font-bold">Salida (M.A)</th>
                                            <th className="px-4 py-3 text-left font-bold">Pasa por Cruce</th>
                                            <th className="px-4 py-3 text-left font-bold">Recorrido / Notas</th>
                                            <th className="px-4 py-3 text-left font-bold">Llegada (Term)</th>
                                            <th className="px-4 py-3 text-center font-bold">Compartir</th>
                                        </>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={
                                            activeTab === 'terminal' ? 5 : 
                                            activeTab === 'distritos' ? 7 : 
                                            activeTab === 'distvuelta' ? 6 : 5
                                        } className="px-4 py-8 text-center text-gray-500">
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
                                            {activeTab === 'distvuelta' && (
                                                <>
                                                    <td className="px-4 py-3 font-bold text-red-600 text-lg">{item.time}</td>
                                                    <td className="px-4 py-3 font-bold">{item.loc}</td>
                                                    <td className="px-4 py-3">{formatCell(item.berros)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.canada)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.llegada)}</td>
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
                                            {activeTab === 'retorno' && (
                                                <>
                                                    <td className="px-4 py-3 font-bold text-red-600 text-lg">{item.time}</td>
                                                    <td className="px-4 py-3">{formatCell(item.cruce)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.nota)}</td>
                                                    <td className="px-4 py-3">{formatCell(item.llegada)}</td>
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

