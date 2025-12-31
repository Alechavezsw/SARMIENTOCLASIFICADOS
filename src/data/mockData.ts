export interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon?: string;
}

export interface Ad {
    id: string;
    title: string;
    price: number;
    currency: 'ARS' | 'USD';
    description: string;
    categoryId: string;
    image: string;
    location: string;
    createdAt: string;
    sellerName: string;
}

export const CATEGORIES: Category[] = [
    { id: '1', name: 'Vehículos', slug: 'vehiculos', color: 'bg-blue-100 text-blue-600', icon: 'Car' },
    { id: '2', name: 'Inmuebles', slug: 'inmuebles', color: 'bg-green-100 text-green-600', icon: 'Home' },
    { id: '3', name: 'Tecnología', slug: 'tecnologia', color: 'bg-purple-100 text-purple-600', icon: 'Smartphone' },
    { id: '4', name: 'Hogar', slug: 'hogar', color: 'bg-orange-100 text-orange-600', icon: 'Armchair' },
    { id: '5', name: 'Moda', slug: 'moda', color: 'bg-pink-100 text-pink-600', icon: 'Shirt' },
    { id: '6', name: 'Servicios', slug: 'servicios', color: 'bg-teal-100 text-teal-600', icon: 'Briefcase' },
];

export const MOCK_ADS: Ad[] = [
    {
        id: '1',
        title: 'Fiat Cronos 2023 Impecable',
        price: 8500000,
        currency: 'ARS',
        description: 'Vendo Fiat Cronos con solo 15.000km. Único dueño, papeles al día. Service oficial.',
        categoryId: '1',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=500',
        location: 'Media Agua, San Juan',
        createdAt: '2025-12-28T10:00:00Z',
        sellerName: 'Juan Pérez'
    },
    {
        id: '2',
        title: 'Alquilo Casa 2 Dormitorios',
        price: 150000,
        currency: 'ARS',
        description: 'Casa céntrica en Sarmiento. 2 habitaciones, cocina comedor, patio amplio. Sin mascotas.',
        categoryId: '2',
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=500',
        location: 'Sarmiento Centro',
        createdAt: '2025-12-29T15:30:00Z',
        sellerName: 'María Gomez'
    },
    {
        id: '3',
        title: 'iPhone 13 128GB',
        price: 600,
        currency: 'USD',
        description: 'iPhone 13 color Midnight. Bateria 90%. Libre de fábrica. Con caja y accesorios.',
        categoryId: '3',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=500',
        location: 'Los Berros',
        createdAt: '2025-12-30T09:00:00Z',
        sellerName: 'TecnoStore'
    },
    {
        id: '4',
        title: 'Juego de Sillones L',
        price: 350000,
        currency: 'ARS',
        description: 'Sillón en L de chenille. Color gris topo. Muy cómodo. 2 años de uso.',
        categoryId: '4',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=500',
        location: 'Media Agua',
        createdAt: '2025-12-25T18:00:00Z',
        sellerName: 'Carlos Ruiz'
    }
];
