import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    children,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variants = {
        primary: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20 hover:shadow-green-500/40 border-transparent',
        secondary: 'bg-teal-500 text-white hover:bg-teal-600 shadow-lg shadow-teal-500/20 border-transparent',
        outline: 'border-2 border-slate-200 bg-white text-slate-700 hover:border-green-600 hover:text-green-600',
        ghost: 'bg-transparent text-slate-600 hover:bg-slate-50 hover:text-green-600',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-5 py-2.5 text-base',
        lg: 'px-8 py-3.5 text-lg',
    };

    const mergedClasses = twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth ? 'w-full' : '',
        className
    );

    return (
        <button className={mergedClasses} {...props}>
            {children}
        </button>
    );
};
