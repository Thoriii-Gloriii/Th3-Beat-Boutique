'use client';

import { useState, useEffect } from 'react';
import { Clock, TrendingUp, Crown } from 'lucide-react';

interface Bid {
  username: string;
  amount: number;
  timeAgo: string;
}

const MOCK_BIDS: Bid[] = [
  { username: '@heatseekr_za', amount: 299, timeAgo: '2m ago' },
  { username: '@prod_wave', amount: 250, timeAgo: '15m ago' },
  { username: '@studio_khali', amount: 180, timeAgo: '1h ago' },
];

function useCountdown(endTime: string) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const update = () => {
      const diff = new Date(endTime).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft('Auction Ended'); return; }
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft(`${d}d ${h}h ${m}m ${s}s`);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return timeLeft;
}

interface BiddingInterfaceProps {
  beatTitle: string;
  currentBid: number;
  reservePrice: number;
  auctionEndTime: string;
}

export default function BiddingInterface({
  beatTitle,
  currentBid,
  reservePrice,
  auctionEndTime,
}: BiddingInterfaceProps) {
  const [bidAmount, setBidAmount] = useState(currentBid + 10);
  const [bids, setBids] = useState<Bid[]>(MOCK_BIDS);
  const [submitted, setSubmitted] = useState(false);
  const timeLeft = useCountdown(auctionEndTime);
  const minBid = Math.max(currentBid + 1, reservePrice);

  const handleBid = () => {
    if (bidAmount < minBid) return;
    const newBid: Bid = {
      username: '@you',
      amount: bidAmount,
      timeAgo: 'just now',
    };
    setBids([newBid, ...bids]);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="glass rounded-2xl border border-white/5 p-4 w-full flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-white font-black text-lg leading-tight">{beatTitle}</h2>
          <p className="text-[var(--muted-text)] text-xs mt-0.5">1-of-1 Exclusive • Full Rights</p>
        </div>
        <div className="flex items-center gap-1.5 bg-[var(--primary-red)]/10 border border-[var(--primary-red)]/30 rounded-full px-3 py-1">
          <Clock className="w-3 h-3 text-[var(--primary-red)]" />
          <span className="font-mono text-[11px] text-[var(--primary-red)] font-bold">{timeLeft}</span>
        </div>
      </div>

      {/* Current Bid */}
      <div className="bg-black/40 rounded-xl p-3 border border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">Current Bid</p>
          <p className="text-3xl font-black text-white">${currentBid.toLocaleString()}</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">Reserve</p>
          <p className="text-sm font-bold text-white">${reservePrice.toLocaleString()}</p>
        </div>
      </div>

      {/* Bid Input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white font-bold text-sm">$</span>
          <input
            type="number"
            min={minBid}
            value={bidAmount}
            onChange={(e) => setBidAmount(Number(e.target.value))}
            className="w-full bg-black/40 border border-white/10 rounded-xl pl-7 pr-3 py-3 text-white text-sm font-bold focus:outline-none focus:border-[var(--primary-red)] transition-colors"
          />
        </div>
        <button
          onClick={handleBid}
          disabled={bidAmount < minBid}
          className="px-5 py-3 bg-[var(--primary-red)] rounded-xl text-white font-bold text-sm neon-glow hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <TrendingUp className="w-4 h-4" />
          {submitted ? '✅ Placed!' : 'Place Bid'}
        </button>
      </div>
      {bidAmount < minBid && (
        <p className="text-[var(--primary-red)] text-[10px] -mt-2 ml-1">
          Minimum bid: ${minBid.toLocaleString()}
        </p>
      )}

      {/* Quick Bid Buttons */}
      <div className="flex gap-2">
        {[10, 25, 50, 100].map((inc) => (
          <button
            key={inc}
            onClick={() => setBidAmount(currentBid + inc)}
            className="flex-1 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] text-[var(--muted-text)] hover:text-white hover:border-white/30 transition-all font-mono"
          >
            +${inc}
          </button>
        ))}
      </div>

      {/* Live Leaderboard */}
      <div>
        <h4 className="text-[10px] text-[var(--muted-text)] uppercase tracking-widest mb-2">
          Bid History
        </h4>
        <div className="flex flex-col gap-1.5">
          {bids.map((bid, i) => (
            <div key={i} className="flex items-center justify-between bg-black/30 rounded-lg px-3 py-2 border border-white/5">
              <div className="flex items-center gap-2">
                {i === 0 && <Crown className="w-3 h-3 text-[var(--primary-red)]" />}
                <span className="text-xs text-white font-medium">{bid.username}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-white">${bid.amount.toLocaleString()}</span>
                <span className="text-[9px] text-[var(--muted-text)]">{bid.timeAgo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
