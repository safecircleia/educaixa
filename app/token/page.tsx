import { Metadata } from 'next';
import { TokenPageContent } from '@/components/token/TokenPageContent';
import { Footer } from '@/components/client/Footer';
import { GlowingDots } from "@/components/ui/glowing-dots";

export const metadata: Metadata = {
  title: 'Token',
  description: 'Learn about the SC Token, SafeCircle\'s utility token that provides access to premium features, early updates, and special rewards in our child safety platform.',
  openGraph: {
    title: 'SC Token - SafeCircle\'s Utility Token',
    description: 'Get premium access, early updates, and special rewards with SC Token, the utility token powering SafeCircle\'s child safety platform.',
  }
};

export default function TokenPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-blue-500/20 -top-10 -right-32" />
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-violet-500/20 -bottom-20 -left-32" />
        <GlowingDots className="absolute inset-0" />
      </div>

      <section className="w-full py-32">
        <TokenPageContent />
      </section>

      <Footer />
    </main>
  );
}