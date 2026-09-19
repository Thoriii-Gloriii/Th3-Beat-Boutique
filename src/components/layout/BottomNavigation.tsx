'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Headphones, Disc, Briefcase, Info } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Beats', path: '/beats', icon: Headphones },
    { name: 'Kits', path: '/kits', icon: Disc },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = (pathname.replace(/\/$/, '') || '/') === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path === '/' ? '/' : `${item.path}/`}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                isActive 
                  ? 'text-[var(--primary-red)] neon-text-glow scale-105' 
                  : 'text-[var(--muted-text)] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-bold uppercase tracking-wider">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
