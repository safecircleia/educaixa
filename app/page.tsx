import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/client/InfoSections'; // Changed from server to client
import { Footer } from '../components/client/Footer';
export default function Home() {
  return (
    <main className="bg-black min-h-screen">
      <Hero />
      <div id="features">
        <InfoSections />
      </div>
      <Footer />
    </main>
  );
}
