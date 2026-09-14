'use client';

import BeatCard from './BeatCard';
import { Beat } from '@/types';

// Placeholder beats for dev/preview
const MOCK_BEATS: Beat[] = [
  {
    id: '1',
    title: 'Dark Horizon',
    artist: 'Imagine It',
    bpm: 145,
    musicKey: 'F# Min',
    genre: 'The Future',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 5 * 24 * 3600000).toISOString(), // 5d from now
    currentBid: 299,
    reservePrice: 100,
  },
  {
    id: '2',
    title: 'Silent Chaos',
    artist: 'Imagine It',
    bpm: 118,
    musicKey: 'B Min',
    genre: 'Rock',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 3 * 24 * 3600000).toISOString(),
    currentBid: 150,
    reservePrice: 50,
  },
  {
    id: '3',
    title: 'Shadow Self',
    artist: 'Imagine It',
    bpm: 90,
    musicKey: 'A Min',
    genre: 'Hip Hop',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 6 * 24 * 3600000).toISOString(),
    currentBid: 0,
    reservePrice: 75,
  },
  {
    id: '4',
    title: 'Blackout',
    artist: 'Imagine It',
    bpm: 140,
    musicKey: 'C# Min',
    genre: 'Cinematic',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 1 * 24 * 3600000).toISOString(),
    currentBid: 499,
    reservePrice: 200,
  },
  {
    id: '5',
    title: 'The Fall',
    artist: 'Imagine It',
    bpm: 102,
    musicKey: 'E Min',
    genre: 'R&B',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 7 * 24 * 3600000).toISOString(),
    currentBid: 0,
    reservePrice: 50,
  },
  {
    id: '6',
    title: 'Broken Dreams',
    artist: 'Imagine It',
    bpm: 95,
    musicKey: 'D Min',
    genre: 'The Future',
    coverArtUrl: '',
    auctionEndTime: new Date(Date.now() + 2 * 24 * 3600000).toISOString(),
    currentBid: 220,
    reservePrice: 100,
  },
];

export default function BeatGrid() {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold text-base uppercase tracking-widest">
          Live Auctions
        </h2>
        <button className="text-[var(--primary-red)] text-xs font-semibold uppercase tracking-wider hover:underline">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {MOCK_BEATS.map((beat) => (
          <BeatCard key={beat.id} beat={beat} />
        ))}
      </div>
    </div>
  );
}
