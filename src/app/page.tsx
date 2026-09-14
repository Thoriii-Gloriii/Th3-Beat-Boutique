import FilterBar from '@/components/store/FilterBar';
import BeatGrid from '@/components/store/BeatGrid';
import { Search } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Search */}
      <div className="px-4 pt-6 pb-2">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-text)]" />
          <input
            type="text"
            placeholder="Search beats, artists, genres..."
            className="w-full bg-[var(--surface)] border border-white/10 rounded-full py-3 pl-11 pr-4 text-sm text-white placeholder:text-[var(--muted-text)] focus:outline-none focus:border-[var(--primary-red)] transition-colors"
          />
        </div>
      </div>

      {/* Filter Bar */}
      <FilterBar />

      {/* Beat Grid */}
      <BeatGrid />
    </div>
  );
}
