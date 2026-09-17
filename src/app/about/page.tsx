export default function AboutPage() {
  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-2xl mx-auto h-[70vh] items-center justify-center text-center">
      <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">Imagine It</h1>
      <p className="text-[var(--muted-text)] text-sm max-w-sm">
        Bhekumusa Nyathi & Mvhumelo Christopher Baloyi.
        <br/><br/>
        Soshanguve, Pretoria, South Africa.
        <br/><br/>
        <span className="text-[var(--primary-red)] font-bold">The Future.</span>
      </p>
    </div>
  );
}
