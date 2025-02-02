import { Navbar } from '../components/client/Navbar';
import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/server/InfoSections';
import { Footer } from '../components/server/Footer';

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
