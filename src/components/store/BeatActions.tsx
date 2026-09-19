'use client';
import { Play, Pause, Plus, Check } from 'lucide-react';
import type { Beat } from '@/types';
import { useApp } from '@/lib/store';

export default function BeatActions({ beat }: { beat: Beat }) {
  const { play, current, playing, add, has } = useApp();
  const on = current?.id === beat.id && playing;
  const inCrate = has('b' + beat.id);
  return (
    <div className="flex items-center gap-3 mt-2">
      <button onClick={() => play(beat)} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--primary-red)] rounded-full text-white text-xs font-bold neon-glow hover:brightness-110">
        {on ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}{on ? 'Pause' : 'Preview'}
      </button>
      <button onClick={() => add('b' + beat.id)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold ${inCrate ? 'bg-[var(--primary-red)] border-[var(--primary-red)] text-white' : 'border-white/30 text-white hover:border-[var(--primary-red)]'}`}>
        {inCrate ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}{inCrate ? 'In crate' : `Add to Crate · $${beat.price}`}
      </button>
    </div>
  );
}
