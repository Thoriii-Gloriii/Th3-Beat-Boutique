import ServiceIntakeForm from '@/components/services/ServiceIntakeForm';

export default function ServicesPage() {
  return (
    <div className="p-4 flex flex-col gap-6 w-full max-w-2xl mx-auto">
      <div className="text-center mt-4 mb-2">
        <h1 className="text-2xl font-black text-white uppercase tracking-widest neon-text-glow">Services</h1>
        <p className="text-[var(--muted-text)] text-xs mt-2">Book custom production, mixing, and mastering</p>
      </div>
      <ServiceIntakeForm />
    </div>
  );
}
