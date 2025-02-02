import { Navbar } from '../components/client/Navbar';
import { Hero } from '../components/client/Hero';
import { InfoSections } from '../components/client/InfoSections'; // Changed from server to client
import { Footer } from '../components/client/Footer'; // Changed from server to client

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
