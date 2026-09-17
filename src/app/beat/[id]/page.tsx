import BiddingInterface from '@/components/auction/BiddingInterface';
import InteractiveStemPlayer from '@/components/store/InteractiveStemPlayer';
import VocalBoothRecorder from '@/components/store/VocalBoothRecorder';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BeatPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-2xl mx-auto pb-24">
      <Link href="/" className="flex items-center gap-2 text-[var(--muted-text)] hover:text-white transition-colors text-xs font-bold mt-2">
        <ArrowLeft className="w-4 h-4" /> BACK TO STORE
      </Link>

      <div className="flex flex-col items-center mt-2">
        <div className="w-32 h-32 bg-[var(--surface-highlight)] rounded-xl border-2 border-[var(--primary-red)] shadow-[0_0_20px_var(--primary-red-glow)] mb-4"></div>
        <h1 className="text-3xl font-black text-white uppercase tracking-widest text-center">Midnight City</h1>
        <p className="text-[var(--primary-red)] font-mono text-sm mt-1 tracking-widest font-bold">142 BPM • C# MINOR</p>
      </div>

      {/* 1-of-1 Bidding */}
      <BiddingInterface 
        beatTitle="Midnight City"
        currentBid={299}
        reservePrice={150}
        auctionEndTime={new Date(Date.now() + 86400000 * 3).toISOString()}
      />

      {/* Advanced Audio Tools */}
      <div className="mt-4 flex flex-col gap-4">
        <h3 className="text-white font-black text-lg uppercase tracking-widest mb-2 border-b border-white/10 pb-2">Stem Mixer</h3>
        <InteractiveStemPlayer />
        
        <h3 className="text-white font-black text-lg uppercase tracking-widest mb-2 mt-4 border-b border-white/10 pb-2">Vocal Scratchpad</h3>
        <VocalBoothRecorder />
      </div>
    </div>
  );
}
