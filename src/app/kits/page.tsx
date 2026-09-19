import KitCard from '@/components/store/KitCard';
import { KITS } from '@/lib/data';

const TYPES = ['Drum Kits', 'Loops', 'Music'] as const;

export default function KitsPage() {
  return (
    <div className="p-4 flex flex-col gap-8 w-full">
      <div>
        <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">Sound kits</h1>
        <p className="text-[var(--muted-text)] text-xs mt-2">Drums, loops and production-ready music from Imagine It.</p>
      </div>
      {TYPES.map((t) => {
        const kits = KITS.filter((k) => k.type === t);
        return (
          <section key={t}>
            <h2 className="text-white font-black text-lg uppercase tracking-widest mb-1">{t}</h2>
            <p className="text-xs text-[var(--muted-text)] mb-3">{kits[0].desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">{kits.map((k) => <KitCard key={k.id} kit={k} />)}</div>
          </section>
        );
      })}
    </div>
  );
}
