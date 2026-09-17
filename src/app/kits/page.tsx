export default function KitsPage() {
  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-2xl mx-auto h-[70vh] items-center justify-center text-center">
      <div className="w-16 h-16 bg-[var(--surface-highlight)] rounded-full flex items-center justify-center mb-4 border border-[var(--primary-red-glow)] neon-glow">
        <span className="text-2xl">🥁</span>
      </div>
      <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">Sound Kits</h1>
      <p className="text-[var(--muted-text)] text-sm max-w-sm">
        Exclusive drum kits, loop packs, and presets used by Imagine It. 
        <br/><br/>
        <span className="text-[var(--primary-red)] font-bold">Dropping soon.</span>
      </p>
    </div>
  );
}
