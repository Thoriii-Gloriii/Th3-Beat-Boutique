'use client';

import { useState } from 'react';

const GENRES = ['The Future', 'Rock', 'Hip Hop', 'R&B', 'Cinematic'];
const MOODS = ['Storytelling', 'Resilient', 'Energetic', 'Dark'];

export default function FilterBar() {
  const [activeGenre, setActiveGenre] = useState('The Future');
  const [bpm, setBpm] = useState(120);

  return (
    <div className="flex flex-col gap-4 py-4 px-4 w-full">
      {/* Search & Categories placeholder (if needed) */}
      
      {/* Genre Pills */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {GENRES.map((genre) => (
          <button
            key={genre}
            onClick={() => setActiveGenre(genre)}
            className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all border ${
              activeGenre === genre
                ? 'border-[var(--primary-red)] text-[var(--primary-red)] neon-glow'
                : 'border-white/20 text-[var(--muted-text)] hover:border-white/50 hover:text-white'
            }`}
          >
            {genre}
          </button>
        ))}
      </div>

      {/* BPM & Moods Row */}
      <div className="flex flex-col md:flex-row gap-6 w-full mt-2">
        {/* BPM Slider */}
        <div className="flex-1 glass p-3 rounded-xl">
          <div className="flex justify-between text-xs text-white mb-2 font-mono">
            <span>BPM</span>
            <span className="text-[var(--primary-red)] font-bold">{bpm}</span>
          </div>
          <input 
            type="range" 
            min="60" 
            max="180" 
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
            className="w-full accent-[var(--primary-red)] h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--muted-text)] mt-1 font-mono">
            <span>60</span>
            <span>180</span>
          </div>
        </div>

        {/* Moods */}
        <div className="flex-1 glass p-3 rounded-xl">
          <div className="text-xs text-white mb-2 font-mono">MOOD</div>
          <div className="flex flex-wrap gap-2">
            {MOODS.map(mood => (
              <button 
                key={mood}
                className="px-2 py-1 rounded bg-black/40 border border-white/10 text-[10px] text-[var(--muted-text)] hover:text-white hover:border-white/30 transition-colors"
              >
                {mood}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
