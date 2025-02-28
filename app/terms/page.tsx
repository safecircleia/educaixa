import { Metadata } from 'next';
import { TermsContent } from '@/components/terms/TermsContent';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Footer } from '@/components/client/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service | SafeCircle',
  description: 'Read SafeCircle\'s Terms of Service to understand your rights and responsibilities when using our child safety platform.',
  openGraph: {
    title: 'SafeCircle Terms of Service - Clear and Fair',
    description: 'Read SafeCircle\'s Terms of Service to understand your rights and responsibilities when using our child safety platform.',
  },
  alternates: {
    canonical: 'https://safecircle.tech/terms'
  }
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-black text-gray-300">
      <ErrorBoundary>
        <TermsContent />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}