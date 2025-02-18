import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/client/InfoSections';
import { Footer } from '../components/client/Footer';
import { Header1 } from '@/components/ui/header';

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
