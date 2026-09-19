'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function HomeSearch() {
  const [q, setQ] = useState('');
  const router = useRouter();
  return (
    <form onSubmit={(e) => { e.preventDefault(); router.push(`/beats/?q=${encodeURIComponent(q.trim())}`); }} className="relative w-full max-w-xl">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
      <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search beats" type="search" placeholder="Search beats, artists, genres..."
        className="w-full bg-[var(--surface)] border border-white/10 rounded-full py-3 pl-11 pr-24 text-sm text-white placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--primary-red)]" />
      <button type="submit" className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[var(--primary-red)] rounded-full text-white text-xs font-bold">Search</button>
    </form>
  );
}
