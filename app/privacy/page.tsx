import { Metadata } from 'next';
import { PrivacyContent } from '@/components/privacy/PrivacyContent';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { Footer } from '@/components/client/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | SafeCircle',
  description: 'Learn about SafeCircle\'s privacy-first approach to child safety. We use end-to-end encryption and zero-knowledge architecture to protect your family\'s data.',
  openGraph: {
    title: 'SafeCircle Privacy Policy - Your Data, Your Control',
    description: 'Learn about SafeCircle\'s privacy-first approach to child safety. We use end-to-end encryption and zero-knowledge architecture to protect your family\'s data.',
  },
  alternates: {
    canonical: 'https://safecircle.tech/privacy'
  }
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <ErrorBoundary>
        <PrivacyContent />
      </ErrorBoundary>
      <Footer />
    </main>
  );
}