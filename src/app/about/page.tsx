import Link from 'next/link';
import BeatCard from '@/components/store/BeatCard';
import { BEATS, KITS, PRODUCER } from '@/lib/data';

export default function AboutPage() {
  return (
    <div className="p-4 flex flex-col gap-8 w-full">
      <div className="flex flex-col items-center text-center gap-3 mt-6">
        <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">{PRODUCER.name}</h1>
        <p className="text-[var(--muted-text)] text-sm max-w-sm">
          Bhekumusa Nyathi &amp; Mvhumelo Christopher Baloyi.<br />{PRODUCER.place}, South Africa.
        </p>
        <p className="text-[var(--primary-red)] font-bold text-sm">The Future.</p>
        <p className="font-mono text-[11px] text-[var(--muted-text)]">{BEATS.length} beats · {KITS.length} sound kits</p>
        <div className="flex gap-3">
          <Link href="/kits/" className="px-5 py-2 bg-[var(--primary-red)] rounded-full text-white text-xs font-bold neon-glow">Sound kits</Link>
          <Link href="/services/" className="px-5 py-2 border border-white/20 rounded-full text-white text-xs font-bold hover:bg-white/10">Book a service</Link>
        </div>
      </div>
      <section>
        <h2 className="text-white font-black text-lg uppercase tracking-widest mb-3">Beats by {PRODUCER.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">{BEATS.map((b) => <BeatCard key={b.id} beat={b} />)}</div>
      </section>
    </div>
  );
}
