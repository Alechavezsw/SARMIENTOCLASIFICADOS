import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false }) => {
    return (
        <div className={twMerge(
            'bg-white rounded-2xl border border-slate-100 p-6',
            hoverEffect && 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-100',
            className
        )}>
            {children}
        </div>
    );
};
