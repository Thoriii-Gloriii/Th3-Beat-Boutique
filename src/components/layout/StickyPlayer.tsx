'use client';

import { useState } from 'react';
import {
  Play, Pause, SkipBack, SkipForward,
  Volume2, VolumeX, ShoppingCart,
} from 'lucide-react';

// Mock currently-playing track — will be replaced by global audio context
const MOCK_TRACK = {
  title: 'Dark Horizon',
  artist: 'Imagine It',
  currentBid: 299,
};

export default function StickyPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(42); // percent

  return (
    <div className="fixed bottom-16 left-0 right-0 z-30 glass border-t border-white/5 px-4 py-2">
      <div className="flex items-center gap-3 max-w-7xl mx-auto">

        {/* Track info */}
        <div className="flex items-center gap-2 flex-shrink-0 w-28">
          <div className="w-8 h-8 rounded bg-gradient-to-br from-[var(--primary-red)] to-black/60 flex-shrink-0" />
          <div className="overflow-hidden">
            <p className="text-white text-[11px] font-bold truncate leading-tight">{MOCK_TRACK.title}</p>
            <p className="text-[var(--muted-text)] text-[10px] truncate">{MOCK_TRACK.artist}</p>
          </div>
        </div>

        {/* Center controls */}
        <div className="flex-1 flex flex-col items-center gap-1.5">
          {/* Buttons */}
          <div className="flex items-center gap-4">
            <button className="text-[var(--muted-text)] hover:text-white transition-colors">
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-9 h-9 bg-[var(--primary-red)] rounded-full flex items-center justify-center neon-glow hover:brightness-110 transition-all flex-shrink-0"
            >
              {isPlaying
                ? <Pause className="w-4 h-4 text-white fill-white" />
                : <Play className="w-4 h-4 text-white fill-white ml-0.5" />}
            </button>
            <button className="text-[var(--muted-text)] hover:text-white transition-colors">
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Waveform progress bar */}
          <div className="w-full flex items-center gap-2">
            <span className="text-[9px] font-mono text-[var(--muted-text)] flex-shrink-0">1:42</span>
            <div
              className="flex-1 h-1.5 bg-white/10 rounded-full cursor-pointer relative overflow-hidden"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setProgress(((e.clientX - rect.left) / rect.width) * 100);
              }}
            >
              <div
                className="h-full bg-[var(--primary-red)] rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-[9px] font-mono text-[var(--muted-text)] flex-shrink-0">3:45</span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="text-[var(--muted-text)] hover:text-white transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <button className="flex items-center gap-1 bg-white/5 border border-[var(--primary-red)]/40 rounded-full px-2.5 py-1 text-[10px] font-bold text-[var(--primary-red)] hover:bg-[var(--primary-red)] hover:text-white transition-all">
            <ShoppingCart className="w-3 h-3" />
            <span>Bid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
