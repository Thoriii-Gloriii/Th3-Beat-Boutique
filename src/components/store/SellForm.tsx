'use client';
import { useState } from 'react';
import { GENRES } from '@/lib/data';

const field = 'w-full bg-[var(--surface)] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--primary-red)]';

export default function SellForm() {
  const [sent, setSent] = useState(false);
  if (sent) return (
    <div className="glass rounded-2xl p-6 text-center border border-[var(--primary-red)]/40">
      <h2 className="text-white font-black uppercase tracking-widest">Application saved</h2>
      <p className="text-xs text-[var(--muted-text)] mt-2">Your details are saved on this device. Seller onboarding is not connected to a server yet.</p>
    </div>
  );
  return (
    <form className="flex flex-col gap-3" onSubmit={(e) => {
      e.preventDefault();
      const d = Object.fromEntries(new FormData(e.currentTarget));
      try { localStorage.setItem('b3-seller-application', JSON.stringify(d)); } catch {}
      setSent(true);
    }}>
      <input name="name" required aria-label="Producer name" placeholder="Producer name" className={field} />
      <input name="email" type="email" required aria-label="Email" placeholder="Email" className={field} />
      <select name="genre" required aria-label="Main genre" defaultValue="" className={field}>
        <option value="" disabled>Main genre</option>{GENRES.map((g) => <option key={g}>{g}</option>)}
      </select>
      <input name="link" type="url" aria-label="Link to your beats" placeholder="Link to your beats (SoundCloud, YouTube...)" className={field} />
      <button type="submit" className="px-6 py-3 bg-[var(--primary-red)] text-white font-bold text-xs uppercase tracking-widest rounded-full neon-glow hover:brightness-110">Apply to sell</button>
    </form>
  );
}
