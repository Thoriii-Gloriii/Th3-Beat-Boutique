'use client';
import { createContext, useCallback, useContext, useEffect, useRef, useState, ReactNode } from 'react';
import type { Beat } from '@/types';
import { BEATS } from '@/lib/data';

const secs = (d: string) => { const [m, s] = d.split(':').map(Number); return m * 60 + s; };

interface Ctx {
  crate: string[]; has: (id: string) => boolean; add: (id: string) => void; remove: (id: string) => void;
  current: Beat | null; playing: boolean; elapsed: number; total: number;
  play: (b: Beat) => void; toggle: () => void; step: (dir: 1 | -1) => void; seek: (pct: number) => void;
  toast: (m: string) => void;
}
const C = createContext<Ctx | null>(null);
export const useApp = () => { const c = useContext(C); if (!c) throw new Error('AppProvider missing'); return c; };

export function AppProvider({ children }: { children: ReactNode }) {
  const [crate, setCrate] = useState<string[]>([]);
  const [current, setCurrent] = useState<Beat | null>(null);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [msg, setMsg] = useState('');
  const ctxRef = useRef<AudioContext | null>(null);
  const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = current ? secs(current.duration) : 0;

  useEffect(() => { try { const v = localStorage.getItem('b3-crate'); if (v) setCrate(JSON.parse(v)); } catch {} }, []);
  const save = (n: string[]) => { try { localStorage.setItem('b3-crate', JSON.stringify(n)); } catch {} return n; };

  const toast = useCallback((m: string) => {
    setMsg(m); if (tRef.current) clearTimeout(tRef.current);
    tRef.current = setTimeout(() => setMsg(''), 2200);
  }, []);
  const add = (id: string) => { if (!crate.includes(id)) { setCrate((c) => save([...c, id])); toast('Added to crate'); } else toast('Already in your crate'); };
  const remove = (id: string) => setCrate((c) => save(c.filter((x) => x !== id)));

  const play = (b: Beat) => {
    if (current?.id === b.id) return setPlaying((p) => !p);
    setCurrent(b); setElapsed(0); setPlaying(true);
  };
  const step = (dir: 1 | -1) => {
    const i = BEATS.findIndex((b) => b.id === current?.id);
    setCurrent(BEATS[(i + dir + BEATS.length) % BEATS.length]); setElapsed(0); setPlaying(true);
  };

  // Previews are a synthesized drum loop at the beat's BPM (no audio files are hosted yet).
  useEffect(() => {
    if (!playing || !current) return;
    const ctx = ctxRef.current ?? (ctxRef.current = new AudioContext());
    ctx.resume?.();
    let n = 0;
    const hit = (kick: boolean) => {
      const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = kick ? 'sine' : 'triangle';
      o.frequency.setValueAtTime(kick ? 150 : 240, t);
      o.frequency.exponentialRampToValueAtTime(kick ? 45 : 110, t + 0.12);
      g.gain.setValueAtTime(kick ? 0.6 : 0.25, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + (kick ? 0.28 : 0.14));
      o.connect(g).connect(ctx.destination); o.start(t); o.stop(t + 0.3);
    };
    const beat = setInterval(() => hit(n++ % 2 === 0), 60000 / current.bpm);
    const clock = setInterval(() => setElapsed((e) => e + 0.5), 500);
    return () => { clearInterval(beat); clearInterval(clock); };
  }, [playing, current]);

  useEffect(() => { if (current && elapsed >= total) { setPlaying(false); setElapsed(0); } }, [elapsed, total, current]);

  return (
    <C.Provider value={{
      crate, has: (id) => crate.includes(id), add, remove, current, playing, elapsed, total, play,
      toggle: () => setPlaying((p) => !p), step, seek: (pct) => setElapsed((pct / 100) * total), toast,
    }}>
      {children}
      <div role="status" aria-live="polite" className={`fixed top-16 left-1/2 -translate-x-1/2 z-[60] px-4 py-2 rounded-full bg-[var(--primary-red)] text-white text-xs font-bold neon-glow transition-opacity ${msg ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>{msg}</div>
    </C.Provider>
  );
}
