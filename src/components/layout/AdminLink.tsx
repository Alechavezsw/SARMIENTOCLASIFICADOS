import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { useAdmin } from '../../hooks/useAdmin';

export const AdminLink: React.FC<{ mobile?: boolean }> = ({ mobile = false }) => {
    const { isAdmin, loading } = useAdmin();

    if (loading || !isAdmin) {
        return null;
    }

    if (mobile) {
        return (
            <Link 
                to="/admin" 
                className="flex items-center gap-3 text-gray-700 hover:bg-purple-50 p-3.5 rounded-xl font-semibold transition-colors"
            >
                <LayoutDashboard className="w-5 h-5" />
                Panel Admin
            </Link>
        );
    }

    return (
        <Link 
            to="/admin" 
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-semibold transition-colors px-3 xl:px-4 py-2.5 whitespace-nowrap text-sm xl:text-base hover:bg-purple-50 rounded-lg"
        >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden xl:inline">Admin</span>
        </Link>
    );
};

