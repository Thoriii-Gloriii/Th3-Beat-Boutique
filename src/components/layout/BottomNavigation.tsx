'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Disc, Briefcase, Info } from 'lucide-react';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Kits', path: '/kits', icon: Disc },
    { name: 'Services', path: '/services', icon: Briefcase },
    { name: 'About', path: '/about', icon: Info },
  ];

  return (
    <nav className="fixed bottom-0 w-full glass border-t border-white/5 z-40 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          
          return (
            <Link 
              key={item.name} 
              href={item.path}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-all ${
                isActive 
                  ? 'text-[var(--primary-red)] neon-text-glow scale-105' 
                  : 'text-[var(--muted-text)] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-semibold uppercase tracking-widest">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
