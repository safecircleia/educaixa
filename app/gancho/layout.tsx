import { Header1 } from '@/components/navbar/header';
import { ParticlesEffect } from '@/components/client/ParticlesEffect';
import { GodRays } from '@/components/client/GodRays';
import { Footer } from '@/components/client/Footer';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="relative min-h-screen bg-[#050508] flex flex-col">
      <div className="fixed inset-0">
        <ParticlesEffect />
        <GodRays />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/60" />
      </div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header1 />
        <div className="flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}