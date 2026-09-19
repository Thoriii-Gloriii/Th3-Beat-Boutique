import { Suspense } from 'react';
import BeatsBrowser from '@/components/store/BeatsBrowser';

export default function BeatsPage() {
  return <Suspense fallback={<p className="p-4 text-sm text-[var(--muted-text)]">Loading beats...</p>}><BeatsBrowser /></Suspense>;
}
