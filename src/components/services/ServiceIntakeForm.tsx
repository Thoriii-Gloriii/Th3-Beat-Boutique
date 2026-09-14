'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

const PROJECT_TYPES = [
  'Custom Beat',
  'Mixing & Mastering',
  'Sound Engineering',
  'Vocal Production',
  'Full EP/Album Package',
];

const BUDGET_RANGES = [
  'Under $200',
  '$200 – $500',
  '$500 – $1,000',
  '$1,000 – $2,500',
  '$2,500+',
];

export default function ServiceIntakeForm() {
  const [form, setForm] = useState({
    name: '', email: '', instagram: '',
    projectType: '', budget: '', deadline: '', message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (field: string, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500)); // mock API delay
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="glass rounded-2xl border border-white/5 p-8 flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 bg-[var(--primary-red)]/10 border border-[var(--primary-red)]/30 rounded-full flex items-center justify-center text-2xl neon-glow">
          🎧
        </div>
        <h3 className="text-white font-black text-lg">Inquiry Received!</h3>
        <p className="text-[var(--muted-text)] text-sm">
          Imagine It will be in touch within 24–48 hours. Check your DMs!
        </p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[var(--primary-red)] transition-colors';

  return (
    <form onSubmit={handleSubmit} className="glass rounded-2xl border border-white/5 p-4 flex flex-col gap-4">
      <h3 className="text-white font-black text-base uppercase tracking-widest">
        Work With Imagine It
      </h3>

      {/* Service Type Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {['Custom Production', 'Sound Engineering', 'Mixing / Mastering'].map((svc) => (
          <button
            type="button"
            key={svc}
            onClick={() => handleChange('projectType', svc)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all ${
              form.projectType === svc
                ? 'bg-[var(--primary-red)] border-[var(--primary-red)] text-white neon-glow'
                : 'border-white/20 text-[var(--muted-text)] hover:border-white/40 hover:text-white'
            }`}
          >
            {svc}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input className={inputClass} placeholder="Artist / Stage Name" required
          value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
        <input className={inputClass} placeholder="Email Address" type="email" required
          value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
        <input className={inputClass} placeholder="Instagram Handle (optional)"
          value={form.instagram} onChange={(e) => handleChange('instagram', e.target.value)} />
        <input className={inputClass} placeholder="Project Deadline (e.g. Oct 2026)" type="text"
          value={form.deadline} onChange={(e) => handleChange('deadline', e.target.value)} />
      </div>

      <select className={inputClass} value={form.budget}
        onChange={(e) => handleChange('budget', e.target.value)}>
        <option value="" disabled>Select Budget Range</option>
        {BUDGET_RANGES.map((b) => <option key={b}>{b}</option>)}
      </select>

      <textarea
        className={inputClass + ' resize-none'}
        rows={4}
        placeholder="Tell us about your project, reference tracks, vision..."
        value={form.message}
        onChange={(e) => handleChange('message', e.target.value)}
      />

      {/* File Upload hint */}
      <div className="border border-dashed border-white/10 rounded-xl p-3 text-center text-[var(--muted-text)] text-xs">
        📎 Reference audio/file upload coming soon (use the DM hub for now)
      </div>

      <button
        type="submit"
        disabled={loading || !form.name || !form.email}
        className="flex items-center justify-center gap-2 w-full py-3.5 bg-[var(--primary-red)] rounded-xl text-white font-black text-sm uppercase tracking-wider neon-glow hover:brightness-110 transition-all disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        {loading ? 'Sending...' : 'Send Inquiry →'}
      </button>
    </form>
  );
}
