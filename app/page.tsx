import { Metadata } from 'next';
import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/client/InfoSections';
import { Footer } from '../components/client/Footer';
import { Header1 } from '@/components/navbar/header';

export const metadata: Metadata = {
  openGraph: {
    title: 'SafeCircle - AI-Powered Child Safety Platform',
    description: 'Protect your children online with advanced AI technology that respects privacy. Real-time monitoring, threat detection, and parental controls all in one secure platform.',
    url: 'https://safecircle.tech',
    images: [{
      url: '/logo-nbg.webp',
      width: 800,
      height: 600,
      alt: 'SafeCircle Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeCircle - Child Safety Platform',
    description: 'AI-powered child safety that respects privacy',
    site: '@safecircleai',
    creator: '@safecircleai',
    images: ['/logo-nbg.webp'],
  },
  alternates: {
    canonical: 'https://safecircle.tech'
  }
};

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Header1 />
      <Hero />
      <div id="features">
        <InfoSections />
      </div>
      <Footer />
    </main>
  );
}
