import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { Category } from '../types';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true);
                const { data, error: fetchError } = await supabase
                    .from('categories')
                    .select('*')
                    .order('name');

                if (fetchError) throw fetchError;

                setCategories(data || []);
                setError(null);
            } catch (err: any) {
                console.error('Error fetching categories:', err);
                setError(err.message || 'Error al cargar categorías');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

