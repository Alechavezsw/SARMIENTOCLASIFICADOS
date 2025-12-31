// Tipos para la base de datos de Supabase
export interface Category {
    id: string;
    name: string;
    slug: string;
    color: string;
    icon?: string | null;
    created_at?: string;
    updated_at?: string;
}

export interface Ad {
    id: string;
    title: string;
    price: number;
    currency: 'ARS' | 'USD';
    description: string;
    category_id: string;
    image_url: string | null;
    location: string;
    seller_name: string | null;
    seller_email: string | null;
    seller_phone: string | null;
    user_id: string | null;
    status: 'pending' | 'approved' | 'rejected' | 'sold';
    views: number;
    created_at: string;
    updated_at: string;
    // Para compatibilidad con el código existente
    categoryId?: string;
    image?: string;
    createdAt?: string;
    sellerName?: string;
}

// Tipo para crear un nuevo anuncio
export interface CreateAdInput {
    title: string;
    price: number;
    currency: 'ARS' | 'USD';
    description: string;
    category_id: string;
    image_url?: string | null;
    location: string;
    seller_name?: string | null;
    seller_email?: string | null;
    seller_phone?: string | null;
}

