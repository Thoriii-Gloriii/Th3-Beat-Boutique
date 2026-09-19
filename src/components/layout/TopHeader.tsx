'use client';
import Link from 'next/link';
import { ShoppingCart, User, Bell } from 'lucide-react';
import { useApp } from '@/lib/store';
import { BASE } from '@/lib/data';

export default function TopHeader() {
  const { crate } = useApp();
  const icon = 'relative text-white hover:text-[var(--primary-red)] transition-colors';
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-4 py-2 flex items-center justify-between">
      <Link href="/" className="flex items-center" aria-label="TH3 B3ATZ BOUTIQ3 home">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`${BASE}/logo.png`} alt="TH3 B3ATZ BOUTIQ3" width={52} height={52} className="object-contain" />
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/beats/?sort=new" className={icon} aria-label="New beats"><Bell className="w-5 h-5" /><span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--primary-red)] rounded-full" /></Link>
        <Link href="/crate/" className={icon} aria-label={`Crate, ${crate.length} items`}>
          <ShoppingCart className="w-5 h-5" />
          {crate.length > 0 && <span className="absolute -top-2 -right-2 min-w-4 h-4 px-1 rounded-full bg-[var(--primary-red)] text-[10px] font-bold flex items-center justify-center">{crate.length}</span>}
        </Link>
        <Link href="/sell/" className={icon} aria-label="Sell your beats"><User className="w-5 h-5" /></Link>
      </div>
    </header>
  );
}
