'use client';
import { Plus, Check } from 'lucide-react';
import type { Kit } from '@/types';
import { useApp } from '@/lib/store';

export default function KitCard({ kit }: { kit: Kit }) {
  const { add, has } = useApp();
  const inCrate = has(kit.id);
  return (
    <div className="glass rounded-2xl p-4 border border-white/5 flex flex-col gap-2">
      <h3 className="text-white font-black">{kit.name}</h3>
      <p className="text-xs text-[var(--muted-text)]">{kit.desc}</p>
      <p className="font-mono text-[10px] text-[var(--muted-text)]">{kit.items} files</p>
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
        <span className="font-black text-white">${kit.price}</span>
        <button onClick={() => add(kit.id)} className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-bold ${inCrate ? 'bg-[var(--primary-red)] border-[var(--primary-red)] text-white' : 'border-white/25 text-white hover:border-[var(--primary-red)]'}`}>
          {inCrate ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}{inCrate ? 'In crate' : 'Add to Crate'}
        </button>
      </div>
    </div>
  );
}
