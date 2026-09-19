import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Section({ title, sub, href, cta = 'See all', children }: { title: string; sub?: string; href?: string; cta?: string; children: React.ReactNode }) {
  return (
    <section className="px-4 py-6">
      <div className="flex items-end justify-between mb-4 gap-4">
        <div>
          <h2 className="text-white font-black text-lg uppercase tracking-widest">{title}</h2>
          {sub && <p className="text-xs text-[var(--muted-text)] mt-1">{sub}</p>}
        </div>
        {href && <Link href={href} className="shrink-0 flex items-center text-[var(--primary-red)] text-xs font-bold hover:underline">{cta}<ChevronRight className="w-4 h-4" /></Link>}
      </div>
      {children}
    </section>
  );
}

export const grid = 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3';
