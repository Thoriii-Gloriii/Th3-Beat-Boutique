'use client';
import type { Beat } from '@/types';
import { useNow, nextEnd } from '@/lib/time';
import BiddingInterface from './BiddingInterface';

export default function AuctionPanel({ beat }: { beat: Beat }) {
  const now = useNow(60000);
  const a = beat.auction!;
  if (now === null) return <div className="h-40" aria-hidden />;
  return <BiddingInterface beatTitle={beat.title} currentBid={a.currentBid} reservePrice={a.reserve} auctionEndTime={new Date(nextEnd(a.hours, now)).toISOString()} />;
}
