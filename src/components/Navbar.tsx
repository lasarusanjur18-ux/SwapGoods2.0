import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, PlusCircle, User, Repeat, Home } from 'lucide-react';
import { cn } from '../lib/utils';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Beranda' },
    { path: '/my-swaps', icon: Repeat, label: 'Tukar' },
    { path: '/add-item', icon: PlusCircle, label: 'Tambah' },
    { path: '/profile', icon: User, label: 'Profil' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 px-6 py-3 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link to="/" className="hidden md:block text-2xl font-serif font-bold text-brand-olive">
          TukarBarang
        </Link>
        
        <div className="flex justify-around w-full md:w-auto md:gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 transition-colors",
                  isActive ? "text-brand-terracotta" : "text-brand-ink/60 hover:text-brand-ink"
                )}
              >
                <Icon size={24} />
                <span className="text-[10px] uppercase tracking-wider font-medium md:hidden">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
