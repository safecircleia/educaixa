import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/client/InfoSections';
import { Footer } from '../components/client/Footer';
import { Navbar } from '@/components/navbar';

export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      <Hero />
      <div id="features">
        <InfoSections />
      </div>
      <Footer />
    </main>
  );
}
