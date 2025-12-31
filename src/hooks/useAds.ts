import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Ad, CreateAdInput } from '../types';

export const useAds = (categorySlug?: string) => {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAds = async () => {
            try {
                setLoading(true);
                
                // Primero obtener la categoría si hay slug
                let categoryId: string | null = null;
                if (categorySlug) {
                    const { data: categoryData } = await supabase
                        .from('categories')
                        .select('id')
                        .eq('slug', categorySlug)
                        .single();
                    
                    if (categoryData) {
                        categoryId = categoryData.id;
                    }
                }

                let query = supabase
                    .from('ads')
                    .select('*')
                    .eq('status', 'approved')
                    .order('created_at', { ascending: false });

                // Si hay un categoryId, filtrar por él
                if (categoryId) {
                    query = query.eq('category_id', categoryId);
                }

                const { data, error: fetchError } = await query;

                if (fetchError) throw fetchError;

                // Transformar los datos para que coincidan con el tipo Ad
                const transformedAds: Ad[] = (data || []).map((ad: any) => ({
                    ...ad,
                    categoryId: ad.category_id,
                    image: ad.image_url || '',
                    createdAt: ad.created_at,
                    sellerName: ad.seller_name || 'Anónimo',
                }));

                setAds(transformedAds);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching ads:', err);
                setError(err.message || 'Error al cargar anuncios');
                // En caso de error, mantener array vacío para que la app no se rompa
                setAds([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, [categorySlug]);

    return { ads, loading, error };
};

export const useAd = (id: string) => {
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('ads')
                    .select('*')
                    .eq('id', id)
                    .eq('status', 'approved')
                    .single();

                if (fetchError) throw fetchError;

                if (data) {
                    const transformedAd: Ad = {
                        ...data,
                        categoryId: data.category_id,
                        image: data.image_url || '',
                        createdAt: data.created_at,
                        sellerName: data.seller_name || 'Anónimo',
                    };
                    setAd(transformedAd);
                }
                setError(null);
            } catch (err: any) {
                console.error('Error fetching ad:', err);
                setError(err.message || 'Error al cargar el anuncio');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAd();
        }
    }, [id]);

    return { ad, loading, error };
};

export const useCreateAd = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createAd = async (input: CreateAdInput) => {
        try {
            setLoading(true);
            setError(null);

            // Obtener el usuario actual
            const { data: { user } } = await supabase.auth.getUser();

            const { data, error: createError } = await supabase
                .from('ads')
                .insert({
                    ...input,
                    user_id: user?.id || null,
                    status: 'pending', // Los anuncios empiezan como pendientes
                })
                .select()
                .single();

            if (createError) throw createError;

            return { data, error: null };
        } catch (err: any) {
            console.error('Error creating ad:', err);
            setError(err.message || 'Error al crear el anuncio');
            return { data: null, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return { createAd, loading, error };
};

