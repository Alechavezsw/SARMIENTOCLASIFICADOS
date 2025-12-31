import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { EnvWarning } from '../EnvWarning';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-white via-gray-50 to-white text-gray-900 font-sans">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
                <EnvWarning />
                {children}
            </main>
            <Footer />
        </div>
    );
};
