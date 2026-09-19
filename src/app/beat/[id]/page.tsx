import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import InteractiveStemPlayer from '@/components/store/InteractiveStemPlayer';
import VocalBoothRecorder from '@/components/store/VocalBoothRecorder';
import BeatActions from '@/components/store/BeatActions';
import AuctionPanel from '@/components/auction/AuctionPanel';
import { Cover } from '@/components/store/BeatCard';
import { BEATS, getBeat } from '@/lib/data';

export function generateStaticParams() {
  return BEATS.map((b) => ({ id: b.id }));
}

export default async function BeatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const beat = getBeat(id);
  if (!beat) notFound();

  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <Link href="/beats/" className="flex items-center gap-2 text-[var(--muted-text)] hover:text-white text-xs font-bold mt-2">
        <ArrowLeft className="w-4 h-4" /> Back to beats
      </Link>
      <div className="flex flex-col items-center gap-2">
        <Cover beat={beat} className="w-32 h-32 rounded-xl border-2 border-[var(--primary-red)] shadow-[0_0_20px_var(--primary-red-glow)]" />
        <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center mt-2">{beat.title}</h1>
        <p className="text-[var(--muted-text)] text-xs">{beat.artist} · {beat.genre} · {beat.mood}</p>
        <p className="text-[var(--primary-red)] font-mono text-sm tracking-widest font-bold">{beat.bpm} BPM • {beat.musicKey.toUpperCase()} • {beat.duration}</p>
        <BeatActions beat={beat} />
      </div>

      {beat.auction && <AuctionPanel beat={beat} />}

      <div className="flex flex-col gap-4">
        <h3 className="text-white font-black text-lg uppercase tracking-widest border-b border-white/10 pb-2">Stem mixer</h3>
        <InteractiveStemPlayer />
        <h3 className="text-white font-black text-lg uppercase tracking-widest mt-4 border-b border-white/10 pb-2">Vocal scratchpad</h3>
        <VocalBoothRecorder />
      </div>
    </div>
  );
}
