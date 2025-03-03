import { Metadata } from 'next';
import { AboutUsContent } from '@/components/about-us/AboutUsContent';
import { Footer } from '@/components/client/Footer';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'Meet the SafeCircle team and learn about our mission to create a safer digital environment for children through innovative AI technology and privacy-first solutions.',
  openGraph: {
    title: 'About SafeCircle - Our Mission and Team',
    description: 'Meet the SafeCircle team and learn about our mission to create a safer digital environment for children through innovative AI technology and privacy-first solutions.',
    images: ['/team/tomaspfp.webp'],
  }
};

export default function AboutUsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-blue-500/20 -top-10 -right-32" />
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-violet-500/20 -bottom-20 -left-32" />
      </div>

      <section className="w-full py-32">
        <div className="container mx-auto px-4">
          <AboutUsContent />
        </div>
      </section>

      <Footer />
    </main>
  );
}