import { Metadata } from 'next';
import { NecesidadesContent } from '@/components/necesidades/NecesidadesContent';
import { Footer } from '@/components/client/Footer';

export const metadata: Metadata = {
  title: 'Necesidades',
  description: 'Discover how SafeCircle addresses online child safety challenges with innovative AI solutions while maintaining privacy. Learn about our comprehensive approach to digital protection.',
  openGraph: {
    title: 'SafeCircle Solutions - Online Child Safety',
    description: 'Discover how SafeCircle addresses online child safety challenges with innovative AI solutions while maintaining privacy.',
  }
};

export default function NecesidadesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-white">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-blue-500/20 -top-10 -right-32" />
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-violet-500/20 -bottom-20 -left-32" />
      </div>

      <section className="w-full py-32">
        <NecesidadesContent />
      </section>

      <Footer />
    </main>
  );
}