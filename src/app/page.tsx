import FilterBar from '@/components/store/FilterBar';
import BeatGrid from '@/components/store/BeatGrid';
import { Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_BEATS } from '@/components/store/BeatGrid';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full pb-20">
      
      {/* 1. HERO SECTION */}
      <div className="relative w-full h-[50vh] min-h-[400px] flex flex-col items-center justify-center text-center px-4 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
        
        <div className="relative z-10 flex flex-col items-center gap-4">
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none neon-text-glow">
            Find Your Sound.<br />Build Your Future.
          </h1>
          <p className="text-[var(--muted-text)] max-w-md text-sm">
            Premium beats, sounds, and production tools for artists, creators, and producers.
          </p>
          <div className="flex gap-3 mt-2">
            <button className="px-6 py-3 bg-[var(--primary-red)] text-white font-bold text-xs uppercase tracking-widest rounded-full neon-glow hover:brightness-110 transition-all">
              Explore Beats
            </button>
            <Link href="/kits" className="px-6 py-3 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
              Explore Kits
            </Link>
          </div>
        </div>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="px-4 mt-6 mb-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
          <input
            type="text"
            placeholder="Search beats, artists, genres..."
            className="w-full bg-[var(--surface)] border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--primary-red)] transition-colors"
          />
        </div>
      </div>

      {/* 3 & 4. EXPLORE BY GENRE & MOOD (via FilterBar) */}
      <FilterBar />

      {/* 5. FEATURED BEATS */}
      <BeatGrid title="Featured Beats" beats={MOCK_BEATS.slice(0, 4)} />

      {/* 6. NEW IN THE BOUTIQUE */}
      <BeatGrid title="New In The Boutique" beats={MOCK_BEATS.slice(4, 6)} />

      {/* 7. LIVE AUCTIONS (Ending Soon) */}
      <BeatGrid title="Live Auctions" limit={4} />

      {/* 8. TRENDING NOW */}
      <BeatGrid title="Trending Now" limit={3} showRank={true} />

      {/* 9. SOUND KITS PREVIEW */}
      <div className="px-4 py-8 my-4 bg-gradient-to-r from-[var(--surface)] to-black border-y border-white/5">
        <h2 className="text-white font-black text-xl uppercase tracking-widest mb-4">Production Tools</h2>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">🥁</div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase">Drum Kits</h4>
              <p className="text-[10px] text-[var(--muted-text)]">Punchy drums & percussion</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center border border-white/10">🎹</div>
            <div>
              <h4 className="text-white font-bold text-sm uppercase">Loops</h4>
              <p className="text-[10px] text-[var(--muted-text)]">Melodies, textures & musical loops</p>
            </div>
          </div>
        </div>
        <Link href="/kits" className="inline-flex items-center gap-2 mt-6 text-[var(--primary-red)] text-xs font-bold uppercase tracking-widest hover:underline">
          Explore Sound Kits <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 10. PRODUCER SPOTLIGHT */}
      <div className="px-4 py-8 flex flex-col items-center text-center border-b border-white/5">
        <h2 className="text-[10px] text-[var(--muted-text)] uppercase tracking-widest mb-4">Producer Spotlight</h2>
        <div className="w-20 h-20 rounded-full bg-[var(--surface-highlight)] border-2 border-[var(--primary-red)] flex items-center justify-center text-2xl mb-3 shadow-[0_0_15px_var(--primary-red-glow)]">
          ✨
        </div>
        <h3 className="text-white font-black text-xl uppercase tracking-widest">Imagine It</h3>
        <p className="text-xs text-[var(--primary-red)] font-bold mb-4">The Future / Rock / Hip Hop</p>
        <Link href="/about" className="px-5 py-2 bg-white/10 border border-white/20 rounded-full text-white text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition-all">
          View Profile
        </Link>
      </div>

      {/* 11. FINAL CTA */}
      <div className="px-4 py-16 flex flex-col items-center text-center">
        <h2 className="text-2xl font-black text-white uppercase tracking-widest mb-2 neon-text-glow">
          Your Next Record<br />Starts Here.
        </h2>
        <p className="text-xs text-[var(--muted-text)] mb-8">
          Find the beat. Build the record. Create your sound.
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-[var(--primary-red)] text-white font-bold text-xs uppercase tracking-widest rounded-full neon-glow hover:brightness-110 transition-all">
            Explore Beats
          </button>
          <Link href="/services" className="px-6 py-3 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all">
            Custom Work
          </Link>
        </div>
      </div>

    </div>
  );
}
