import Link from 'next/link';
import BeatCard, { BeatRow } from '@/components/store/BeatCard';
import Section, { grid } from '@/components/home/Section';
import AuctionsSection from '@/components/home/AuctionsSection';
import HomeSearch from '@/components/home/HomeSearch';
import { FEATURED, NEW_BEATS, TRENDING, GENRES, MOODS, BEATS, KITS, PRODUCER } from '@/lib/data';

const btnRed = 'px-6 py-3 bg-[var(--primary-red)] text-white font-bold text-xs uppercase tracking-widest rounded-full neon-glow hover:brightness-110 transition-all';
const btnGhost = 'px-6 py-3 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all';
const tile = 'px-4 py-2 rounded-full border border-white/15 bg-black/40 text-xs font-semibold text-[var(--muted-text)] hover:border-[var(--primary-red)] hover:text-white transition-colors whitespace-nowrap';

const KIT_TYPES = [
  { type: 'Drum Kits', line: 'Punchy drums & percussion' },
  { type: 'Loops', line: 'Melodies, textures & musical loops' },
  { type: 'Music', line: 'Production-ready musical elements' },
] as const;

const WHY = [
  ['Discover', 'Find sounds across multiple genres.'],
  ['Create', 'Preview beats and build ideas before purchasing.'],
  ['License', 'Choose the license that fits your project.'],
  ['Connect', 'Discover producers and artists.'],
];

export default function HomePage() {
  const myBeats = BEATS.filter((b) => b.artist === PRODUCER.name).length;
  return (
    <div className="flex flex-col w-full pb-10">
      <div className="relative w-full min-h-[440px] flex flex-col items-center justify-center text-center px-4 py-12 gap-5 border-b border-white/5 overflow-hidden"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, #590000 0%, #260000 35%, #000 75%)' }}>
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-none neon-text-glow">Find your sound.<br />Build your future.</h1>
        <p className="text-[var(--muted-text)] max-w-md text-sm">Premium beats, sounds and production tools for artists, creators and producers.</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/beats/" className={btnRed}>Explore Beats</Link>
          <Link href="/kits/" className={btnGhost}>Explore Sound Kits</Link>
        </div>
        <HomeSearch />
      </div>

      <Section title="Explore by genre" href="/beats/" cta="All beats">
        <div className="flex flex-wrap gap-2">{GENRES.map((g) => <Link key={g} href={{ pathname: '/beats/', query: { genre: g } }} className={tile}>{g}</Link>)}</div>
      </Section>
      <Section title="Explore by mood">
        <div className="flex flex-wrap gap-2">{MOODS.map((m) => <Link key={m} href={{ pathname: '/beats/', query: { mood: m } }} className={tile}>{m}</Link>)}</div>
      </Section>

      <Section title="Featured beats" sub="Hand-picked sounds from the boutique." href="/beats/">
        <div className={grid}>{FEATURED.map((b) => <BeatCard key={b.id} beat={b} />)}</div>
      </Section>
      <Section title="New in the boutique" sub="The latest uploads." href="/beats/?sort=new">
        <div className={grid}>{NEW_BEATS.map((b) => <BeatCard key={b.id} beat={b} />)}</div>
      </Section>
      <Section title="Live auctions" sub="Bid before the clock runs out." href="/beats/?type=auction">
        <AuctionsSection />
      </Section>
      <Section title="Trending now" sub="Ranked by plays, saves, crate adds, purchases and bids.">
        <div className="flex flex-col gap-3 max-w-2xl">{TRENDING.slice(0, 3).map((b, i) => <BeatRow key={b.id} beat={b} rank={i + 1} />)}</div>
      </Section>

      <Section title="Sound kits" href="/kits/" cta="Explore sound kits">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {KIT_TYPES.map((k) => (
            <Link key={k.type} href="/kits/" className="glass rounded-2xl p-5 border border-white/5 hover:border-[var(--primary-red)]/50 transition-colors">
              <h3 className="text-white font-black uppercase tracking-wider">{k.type}</h3>
              <p className="text-xs text-[var(--muted-text)] mt-1">{k.line}</p>
              <p className="font-mono text-[10px] text-[var(--primary-red)] mt-3">{KITS.filter((x) => x.type === k.type).length} kits</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Producer spotlight">
        <div className="glass rounded-2xl p-5 border border-white/5 flex flex-col sm:flex-row items-center gap-5 max-w-2xl">
          <div className="w-20 h-20 rounded-full border-2 border-[var(--primary-red)] neon-glow flex items-center justify-center text-2xl font-black text-white shrink-0" style={{ background: 'radial-gradient(circle, #590000, #000)' }}>II</div>
          <div className="text-center sm:text-left">
            <h3 className="text-white font-black text-xl uppercase tracking-widest">{PRODUCER.name}</h3>
            <p className="text-xs text-[var(--primary-red)] font-bold">{PRODUCER.sound}</p>
            <p className="text-xs text-[var(--muted-text)] mt-1">{myBeats} beats · {KITS.length} sound kits</p>
            <Link href="/about/" className={`${btnRed} inline-block mt-3 !py-2`}>View profile</Link>
          </div>
        </div>
      </Section>

      <Section title="More than a beat store">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {WHY.map(([h, p]) => (
            <div key={h} className="rounded-2xl p-4 border border-white/10 bg-[var(--surface)]">
              <h3 className="text-white font-black text-sm uppercase tracking-wider">{h}</h3>
              <p className="text-xs text-[var(--muted-text)] mt-1">{p}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="px-4 py-14 flex flex-col items-center text-center border-t border-white/5" style={{ background: 'radial-gradient(ellipse at 50% 100%, #260000, #000 70%)' }}>
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-widest mb-2 neon-text-glow">Your next record<br />starts here.</h2>
        <p className="text-xs text-[var(--muted-text)] mb-8">Find the beat. Build the record. Create your sound.</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <Link href="/beats/" className={btnRed}>Explore Beats</Link>
          <Link href="/sell/" className={btnGhost}>Sell Your Beats</Link>
        </div>
      </div>
    </div>
  );
}
