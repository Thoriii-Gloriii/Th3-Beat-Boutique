'use client';

import Link from 'next/link';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { useApp } from '@/lib/store';

const mmss = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function StickyPlayer() {
  const { current, playing, elapsed, total, toggle, step, seek } = useApp();
  if (!current) return null;
  const btn = 'text-[var(--muted-text)] hover:text-white transition-colors';
  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 glass border-t border-white/5 px-4 py-2">
      <div className="flex items-center gap-3 max-w-7xl mx-auto">
        <Link href={`/beat/${current.id}/`} className="flex items-center gap-2 shrink-0 w-32 min-w-0">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--primary-red)] to-black shrink-0" />
          <div className="overflow-hidden">
            <p className="text-white text-[11px] font-bold truncate leading-tight">{current.title}</p>
            <p className="text-[var(--muted-text)] text-[10px] truncate">{current.artist}</p>
          </div>
        </Link>
        <div className="flex-1 flex flex-col items-center gap-1.5">
          <div className="flex items-center gap-4">
            <button className={btn} aria-label="Previous beat" onClick={() => step(-1)}><SkipBack className="w-4 h-4" /></button>
            <button onClick={toggle} aria-label={playing ? 'Pause' : 'Play'} className="w-9 h-9 bg-[var(--primary-red)] rounded-full flex items-center justify-center neon-glow hover:brightness-110">
              {playing ? <Pause className="w-4 h-4 text-white fill-white" /> : <Play className="w-4 h-4 text-white fill-white ml-0.5" />}
            </button>
            <button className={btn} aria-label="Next beat" onClick={() => step(1)}><SkipForward className="w-4 h-4" /></button>
          </div>
          <div className="w-full flex items-center gap-2">
            <span className="text-[9px] font-mono text-[var(--muted-text)]">{mmss(elapsed)}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer overflow-hidden" onClick={(e) => { const r = e.currentTarget.getBoundingClientRect(); seek(((e.clientX - r.left) / r.width) * 100); }}>
              <div className="h-full bg-[var(--primary-red)] rounded-full" style={{ width: `${(elapsed / total) * 100}%` }} />
            </div>
            <span className="text-[9px] font-mono text-[var(--muted-text)]">{current.duration}</span>
          </div>
        </div>
        <Link href={`/beat/${current.id}/`} className="shrink-0 px-3 py-1 rounded-full border border-[var(--primary-red)]/40 text-[10px] font-bold text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white">
          {current.auction ? 'Bid' : `$${current.price}`}
        </Link>
      </div>
    </div>
  );
}
