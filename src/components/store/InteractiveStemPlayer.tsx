'use client';

import { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface Stem {
  name: string;
  emoji: string;
  color: string;
}

const STEMS: Stem[] = [
  { name: 'Drums', emoji: '🥁', color: '#E60023' },
  { name: 'Bass/808', emoji: '🎸', color: '#B30000' },
  { name: 'Melody', emoji: '🎹', color: '#FF4D4D' },
  { name: 'FX', emoji: '✨', color: '#800000' },
];

export default function InteractiveStemPlayer() {
  const [stemStates, setStemStates] = useState(
    STEMS.map(() => ({ muted: false, volume: 80 }))
  );

  const toggleMute = (index: number) => {
    setStemStates((prev) =>
      prev.map((s, i) => (i === index ? { ...s, muted: !s.muted } : s))
    );
  };

  const setVolume = (index: number, value: number) => {
    setStemStates((prev) =>
      prev.map((s, i) => (i === index ? { ...s, volume: value } : s))
    );
  };

  return (
    <div className="glass rounded-2xl border border-white/5 p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white font-bold text-sm uppercase tracking-widest">Stem Player</h3>
        <span className="text-[10px] text-[var(--muted-text)] uppercase tracking-wider">Preview Quality</span>
      </div>

      <div className="flex flex-col gap-3">
        {STEMS.map((stem, index) => {
          const state = stemStates[index];
          return (
            <div key={stem.name} className="flex items-center gap-3">
              {/* Mute Toggle */}
              <button
                onClick={() => toggleMute(index)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border transition-all text-sm ${
                  state.muted
                    ? 'bg-black/40 border-white/10 opacity-40'
                    : 'border-white/10 bg-white/5'
                }`}
                style={{ borderColor: state.muted ? undefined : stem.color + '60' }}
              >
                {stem.emoji}
              </button>

              {/* Label */}
              <div className="w-16 flex-shrink-0">
                <p className="text-xs font-semibold text-white leading-none">{stem.name}</p>
              </div>

              {/* Volume Slider */}
              <div className="flex-1 flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={state.volume}
                  onChange={(e) => setVolume(index, Number(e.target.value))}
                  disabled={state.muted}
                  className="flex-1 h-1 rounded-full appearance-none cursor-pointer disabled:opacity-30"
                  style={{ accentColor: stem.color }}
                />
                <span className="font-mono text-[10px] text-[var(--muted-text)] w-6 text-right">
                  {state.muted ? 0 : state.volume}
                </span>
              </div>

              {/* Mute icon indicator */}
              <div className={`transition-colors ${state.muted ? 'text-white/20' : 'text-[var(--muted-text)]'}`}>
                {state.muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[10px] text-[var(--muted-text)] mt-4 text-center">
        🔒 Purchase exclusive rights to unlock full-quality stems
      </p>
    </div>
  );
}
