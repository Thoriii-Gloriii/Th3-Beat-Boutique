'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import BeatCard from './BeatCard';
import { BEATS, GENRES, MOODS } from '@/lib/data';

const pill = (on: boolean) => `whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${on ? 'border-[var(--primary-red)] bg-[var(--primary-red)] text-white' : 'border-white/20 text-[var(--muted-text)] hover:text-white'}`;

export default function BeatsBrowser() {
  const p = useSearchParams();
  const [q, setQ] = useState(p.get('q') ?? '');
  const [genre, setGenre] = useState(p.get('genre') ?? '');
  const [mood, setMood] = useState(p.get('mood') ?? '');
  const [bpm, setBpm] = useState(180);
  const [sort, setSort] = useState(p.get('sort') ?? 'featured');
  const [auctionsOnly, setAuctionsOnly] = useState(p.get('type') === 'auction');

  const list = BEATS
    .filter((b) => (!genre || b.genre === genre) && (!mood || b.mood === mood) && b.bpm <= bpm && (!auctionsOnly || b.auction))
    .filter((b) => `${b.title} ${b.artist} ${b.genre} ${b.mood}`.toLowerCase().includes(q.trim().toLowerCase()))
    .sort((a, b) => sort === 'new' ? Number(b.isNew) - Number(a.isNew) : sort === 'price' ? a.price - b.price : 0);
  const clear = () => { setQ(''); setGenre(''); setMood(''); setBpm(180); setAuctionsOnly(false); };

  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-black text-white uppercase tracking-widest">Beats</h1>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
        <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search beats" placeholder="Search beats, artists, genres..."
          className="w-full bg-[var(--surface)] border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--primary-red)]" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {GENRES.map((g) => <button key={g} aria-pressed={genre === g} onClick={() => setGenre(genre === g ? '' : g)} className={pill(genre === g)}>{g}</button>)}
      </div>
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {MOODS.map((m) => <button key={m} aria-pressed={mood === m} onClick={() => setMood(mood === m ? '' : m)} className={pill(mood === m)}>{m}</button>)}
      </div>
      <div className="flex flex-wrap items-center gap-4 glass rounded-xl p-3">
        <label className="flex items-center gap-3 text-xs text-white font-mono">BPM up to <span className="text-[var(--primary-red)] font-bold w-8">{bpm}</span>
          <input type="range" min={60} max={180} value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="accent-[var(--primary-red)]" />
        </label>
        <label className="flex items-center gap-2 text-xs text-white"><input type="checkbox" checked={auctionsOnly} onChange={(e) => setAuctionsOnly(e.target.checked)} className="accent-[var(--primary-red)]" />Auctions only</label>
        <label className="flex items-center gap-2 text-xs text-white ml-auto">Sort
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="bg-black border border-white/20 rounded px-2 py-1">
            <option value="featured">Featured</option><option value="new">Newest</option><option value="price">Price: low to high</option>
          </select>
        </label>
      </div>
      {list.length ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{list.map((b) => <BeatCard key={b.id} beat={b} />)}</div>
      ) : (
        <div className="text-center py-16 text-sm text-[var(--muted-text)]">No beats match those filters. <button onClick={clear} className="text-[var(--primary-red)] font-bold underline">Clear filters</button></div>
      )}
    </div>
  );
}
