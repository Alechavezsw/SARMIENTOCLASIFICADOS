import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Business } from '../types';

export const useBusinesses = (category?: string) => {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBusinesses = async () => {
            try {
                setLoading(true);
                let query = supabase
                    .from('commercial_directory')
                    .select('*')
                    .eq('status', 'active')
                    .order('featured', { ascending: false })
                    .order('name');

                if (category) {
                    query = query.eq('category', category);
                }

                const { data, error: fetchError } = await query;

                if (fetchError) throw fetchError;

                setBusinesses(data || []);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching businesses:', err);
                setError(err.message || 'Error al cargar negocios');
                setBusinesses([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, [category]);

    return { businesses, loading, error };
};

export const useBusinessCategories = () => {
    const [categories, setCategories] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data, error } = await supabase
                    .from('commercial_directory')
                    .select('category')
                    .eq('status', 'active');

                if (error) throw error;

                // Obtener categorías únicas
                const uniqueCategories = Array.from(
                    new Set(data?.map(item => item.category).filter(Boolean) || [])
                ).sort();

                setCategories(uniqueCategories);
            } catch (err: any) {
                console.error('Error fetching business categories:', err);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading };
};

