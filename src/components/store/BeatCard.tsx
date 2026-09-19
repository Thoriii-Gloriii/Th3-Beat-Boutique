'use client';
import Link from 'next/link';
import { Play, Pause, Plus, Check } from 'lucide-react';
import type { Beat } from '@/types';
import { useApp } from '@/lib/store';
import { useNow, nextEnd, fmtLeft } from '@/lib/time';

export function Cover({ beat, className = '' }: { beat: Beat; className?: string }) {
  const n = Number(beat.id);
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: `radial-gradient(circle at ${20 + ((n * 23) % 60)}% ${25 + ((n * 17) % 50)}%, hsl(0 85% ${16 + ((n * 3) % 12)}%), #000 72%)` }}
    >
      <span className="absolute inset-0 flex items-center justify-center text-5xl font-black text-white/10 select-none">{beat.title[0]}</span>
    </div>
  );
}

export function Countdown({ hours, className = '' }: { hours: number; className?: string }) {
  const now = useNow();
  return <span className={className}>{now === null ? '--' : fmtLeft(nextEnd(hours, now) - now)}</span>;
}

function PlayButton({ beat, small = false }: { beat: Beat; small?: boolean }) {
  const { play, current, playing } = useApp();
  const on = current?.id === beat.id && playing;
  return (
    <button
      onClick={() => play(beat)}
      aria-label={`${on ? 'Pause' : 'Preview'} ${beat.title}`}
      className={`flex items-center gap-1 rounded-full bg-[var(--primary-red)] text-white font-bold neon-glow hover:brightness-110 ${small ? 'w-9 h-9 justify-center' : 'pl-2.5 pr-3 py-1.5 text-[11px]'}`}
    >
      {on ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
      {!small && (on ? 'Pause' : 'Preview')}
    </button>
  );
}

function AddButton({ beat }: { beat: Beat }) {
  const { add, has } = useApp();
  const inCrate = has('b' + beat.id);
  return (
    <button
      onClick={() => add('b' + beat.id)}
      className={`flex items-center gap-1 px-3 py-1.5 rounded-full border text-[11px] font-bold transition-colors ${inCrate ? 'border-[var(--primary-red)] bg-[var(--primary-red)] text-white' : 'border-white/25 text-white hover:border-[var(--primary-red)]'}`}
    >
      {inCrate ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
      {inCrate ? 'In crate' : 'Add to Crate'}
    </button>
  );
}

const chip = 'font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--muted-text)]';

export default function BeatCard({ beat, auction = false }: { beat: Beat; auction?: boolean }) {
  const a = beat.auction;
  return (
    <article className="glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--primary-red)]/50 transition-colors flex flex-col">
      <div className="relative">
        <Link href={`/beat/${beat.id}/`} aria-label={`Open ${beat.title}`}><Cover beat={beat} className="aspect-square" /></Link>
        <span className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 border border-white/10 rounded-full text-[10px] font-semibold text-[var(--primary-red)]">{beat.genre}</span>
        {beat.isNew && <span className="absolute top-2 right-2 px-2 py-0.5 bg-[var(--primary-red)] rounded-full text-[10px] font-black text-white">NEW</span>}
        <div className="absolute bottom-2 left-2"><PlayButton beat={beat} /></div>
      </div>
      <div className="p-3 flex flex-col gap-2 flex-1">
        <div>
          <Link href={`/beat/${beat.id}/`}><h3 className="font-bold text-white text-sm leading-tight truncate hover:text-[var(--primary-red)]">{beat.title}</h3></Link>
          <p className="text-[var(--muted-text)] text-xs mt-0.5">{beat.artist}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span className={chip}>{beat.bpm} BPM</span><span className={chip}>{beat.musicKey}</span><span className={chip}>{beat.duration}</span>
          {a && !auction && <span className={`${chip} !text-[var(--primary-red)] !border-[var(--primary-red)]/40`}>Auction</span>}
        </div>
        <div className="mt-auto pt-2 border-t border-white/5">
          {auction && a ? (
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="text-[10px] text-[var(--muted-text)]">Current bid · {a.bids} bids</p>
                <p className="text-base font-black text-white">${a.currentBid}</p>
                <Countdown hours={a.hours} className="text-[10px] font-mono font-bold text-[var(--primary-red)]" />
              </div>
              <Link href={`/beat/${beat.id}/`} className="px-3 py-1.5 bg-[var(--primary-red)] rounded-full text-white text-[11px] font-black neon-glow hover:brightness-110">BID NOW</Link>
            </div>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <p className="text-base font-black text-white">${beat.price}</p>
              <AddButton beat={beat} />
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function BeatRow({ beat, rank }: { beat: Beat; rank: number }) {
  const { plays, saves } = beat.stats;
  return (
    <div className="flex items-center gap-3 glass rounded-2xl p-3 border border-white/5">
      <span className={`w-10 text-center font-black ${rank === 1 ? 'text-3xl text-[var(--primary-red)] neon-text-glow' : 'text-2xl text-white/70'}`}>#{rank}</span>
      <Link href={`/beat/${beat.id}/`} className="shrink-0"><Cover beat={beat} className="w-14 h-14 rounded-lg" /></Link>
      <div className="min-w-0 flex-1">
        <Link href={`/beat/${beat.id}/`}><h3 className="text-white font-bold text-sm truncate hover:text-[var(--primary-red)]">{beat.title}</h3></Link>
        <p className="text-[var(--muted-text)] text-xs truncate">{beat.artist} · {beat.bpm} BPM · {beat.musicKey}</p>
        <p className="text-[10px] text-[var(--muted-text)] font-mono">{plays.toLocaleString('en-US')} plays · {saves} saves</p>
      </div>
      <PlayButton beat={beat} small />
    </div>
  );
}
