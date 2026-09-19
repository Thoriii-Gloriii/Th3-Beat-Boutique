'use client';
import { useState } from 'react';
import BeatCard from '@/components/store/BeatCard';
import { AUCTIONS } from '@/lib/data';
import { useNow, nextEnd } from '@/lib/time';
import { grid } from './Section';

export default function AuctionsSection() {
  const [soon, setSoon] = useState(false);
  const now = useNow(30000);
  const list = soon && now !== null
    ? [...AUCTIONS].sort((a, b) => nextEnd(a.auction!.hours, now) - nextEnd(b.auction!.hours, now)).slice(0, 2)
    : AUCTIONS;
  const tab = (on: boolean) => `px-4 py-1.5 rounded-full text-xs font-bold border ${on ? 'bg-[var(--primary-red)] border-[var(--primary-red)] text-white neon-glow' : 'border-white/20 text-[var(--muted-text)] hover:text-white'}`;
  return (
    <>
      <div className="flex gap-2 mb-4" role="tablist">
        <button role="tab" aria-selected={!soon} className={tab(!soon)} onClick={() => setSoon(false)}>All auctions</button>
        <button role="tab" aria-selected={soon} className={tab(soon)} onClick={() => setSoon(true)}>Ending soon</button>
      </div>
      <div className={grid}>{list.map((b) => <BeatCard key={b.id} beat={b} auction />)}</div>
    </>
  );
}
