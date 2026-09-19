import SellForm from '@/components/store/SellForm';

export default function SellPage() {
  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-xl mx-auto">
      <div className="text-center mt-4">
        <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">Sell your beats</h1>
        <p className="text-[var(--muted-text)] text-xs mt-2">Tell us about your sound and we will get you set up in the boutique.</p>
      </div>
      <SellForm />
    </div>
  );
}
