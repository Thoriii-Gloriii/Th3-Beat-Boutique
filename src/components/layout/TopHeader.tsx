import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, User, Bell } from 'lucide-react';

export default function TopHeader() {
  return (
    <header className="sticky top-0 z-50 w-full glass border-b border-white/5 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="TH3 B3ATZ BOUTIQ3"
            width={52}
            height={52}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white hover:text-[var(--primary-red)] transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--primary-red)] rounded-full neon-glow"></span>
        </button>
        <button className="text-white hover:text-[var(--primary-red)] transition-colors">
          <ShoppingCart className="w-5 h-5" />
        </button>
        <button className="text-white hover:text-[var(--primary-red)] transition-colors">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
