'use client';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useApp } from '@/lib/store';
import { crateItem } from '@/lib/data';

export default function CrateView() {
  const { crate, remove, toast } = useApp();
  const items = crate.map(crateItem).filter((x): x is NonNullable<ReturnType<typeof crateItem>> => !!x);
  const total = items.reduce((n, i) => n + i.price, 0);
  return (
    <div className="p-4 flex flex-col gap-4 w-full max-w-2xl mx-auto">
      <h1 className="text-2xl font-black text-white uppercase tracking-widest">Your crate</h1>
      {items.length === 0 ? (
        <div className="text-center py-16 text-sm text-[var(--muted-text)]">
          Your crate is empty. <Link href="/beats/" className="text-[var(--primary-red)] font-bold underline">Find a beat</Link> or <Link href="/kits/" className="text-[var(--primary-red)] font-bold underline">browse sound kits</Link>.
        </div>
      ) : (
        <>
          {items.map((i) => (
            <div key={i.id} className="glass rounded-xl p-3 flex items-center gap-3 border border-white/5">
              <div className="flex-1 min-w-0">
                <Link href={i.href} className="text-white font-bold text-sm hover:text-[var(--primary-red)]">{i.title}</Link>
                <p className="text-xs text-[var(--muted-text)] truncate">{i.sub}</p>
              </div>
              <span className="font-black text-white">${i.price}</span>
              <button onClick={() => remove(i.id)} aria-label={`Remove ${i.title}`} className="text-[var(--muted-text)] hover:text-[var(--primary-red)]"><Trash2 className="w-4 h-4" /></button>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <span className="text-white font-black">Total ${total}</span>
            <button onClick={() => toast('Checkout opens once payments are connected')} className="px-6 py-3 bg-[var(--primary-red)] text-white font-bold text-xs uppercase tracking-widest rounded-full neon-glow">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
