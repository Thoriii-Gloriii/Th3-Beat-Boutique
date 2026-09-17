'use client';

import Link from 'next/link';
import { Play, Clock } from 'lucide-react';
import { Beat } from '@/types';

function getTimeLeft(endTime: string): string {
  const diff = new Date(endTime).getTime() - Date.now();
  if (diff <= 0) return 'Ended';
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}

export default function BeatCard({ beat }: { beat: Beat }) {
  const timeLeft = getTimeLeft(beat.auctionEndTime);

  return (
    <Link href={`/beat/${beat.id}`} className="block glass rounded-2xl overflow-hidden border border-white/5 hover:border-[var(--primary-red)]/40 transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:neon-glow">
      {/* Cover Art */}
      <div className="relative aspect-square bg-black/60 overflow-hidden">
        {beat.coverArtUrl ? (
          <img
            src={beat.coverArtUrl}
            alt={beat.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#1a1a2e] to-[#0D0D11] flex items-center justify-center">
            <span className="text-4xl font-black text-white/10">B3</span>
          </div>
        )}

        {/* Play overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-14 h-14 bg-[var(--primary-red)] rounded-full flex items-center justify-center neon-glow transition-transform hover:scale-110">
            <Play className="w-6 h-6 text-white fill-white ml-1" />
          </button>
        </div>

        {/* Genre tag */}
        <div className="absolute top-2 left-2">
          <span className="px-2 py-0.5 bg-black/60 backdrop-blur-sm border border-white/10 rounded-full text-[10px] font-semibold text-[var(--primary-red)] uppercase tracking-wider">
            {beat.genre}
          </span>
        </div>
      </div>

      {/* Beat Info */}
      <div className="p-3 flex flex-col gap-2">
        <div>
          <h3 className="font-bold text-white text-sm leading-tight truncate">{beat.title}</h3>
          <p className="text-[var(--muted-text)] text-xs mt-0.5">{beat.artist}</p>
        </div>

        {/* BPM & Key */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--muted-text)]">
            {beat.bpm} BPM
          </span>
          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--muted-text)]">
            {beat.musicKey}
          </span>
        </div>

        {/* Auction Info */}
        <div className="flex items-center justify-between pt-1 border-t border-white/5">
          <div>
            <p className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">Current Bid</p>
            <p className="text-sm font-black text-white">
              ${beat.currentBid > 0 ? beat.currentBid.toLocaleString() : beat.reservePrice.toLocaleString()}
            </p>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 text-[var(--primary-red)]">
              <Clock className="w-3 h-3" />
              <span className="text-[10px] font-mono font-bold">{timeLeft}</span>
            </div>
            <button className="mt-1 px-3 py-1 bg-[var(--primary-red)] rounded-full text-white text-[10px] font-bold uppercase tracking-wider hover:brightness-110 transition-all neon-glow">
              Bid Now
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
