import React, { Suspense } from 'react';
import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import '../styles/globals.css';
import { CounterProvider } from '../context/CounterContext';
import { WalletProviders } from '@/providers/WalletProviders';
import { Toaster as UiToaster } from "@/components/ui/toaster";
import { Metadata } from 'next';

const nothingFont = localFont({
  src: '../public/nothing.ttf',
  variable: '--font-nothing',
});

export const metadata: Metadata = {
  title: {
    default: 'SafeCircle | AI-Powered Child Safety Without Compromising Privacy',
    template: '%s | SafeCircle'
  },
  description: 'Protect your children online with SafeCircle\'s AI-powered safety technology that maintains complete privacy. Real-time monitoring, threat detection, and parental controls.',
  keywords: ['child safety', 'online protection', 'AI security', 'privacy', 'parental control', 'cybersecurity', 'SafeCircle'],
  authors: [{ name: 'SafeCircle Team' }],
  creator: 'SafeCircle',
  publisher: 'SafeCircle',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://safecircle.tech',
    title: 'SafeCircle | AI-Powered Child Safety Without Compromising Privacy',
    description: 'Protect your children online with SafeCircle\'s AI-powered safety technology that maintains complete privacy. Real-time monitoring, threat detection, and parental controls.',
    siteName: 'SafeCircle',
    images: [{
      url: '/logo-nbg.png',
      width: 800,
      height: 600,
      alt: 'SafeCircle Logo',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SafeCircle | Child Safety with Privacy',
    description: 'AI-powered child safety technology that maintains complete privacy',
    site: '@safecircleai',
    creator: '@safecircleai',
    images: ['/logo-nbg.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/logo-nbg.png',
  },
  verification: {
    google: 'your-google-site-verification', // Add your Google verification code
  },
  alternates: {
    canonical: 'https://safecircle.tech',
  },
};

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <html lang="en" className={`scroll-smooth ${GeistSans.variable} ${nothingFont.variable}`}>
      <head />
      <body className="font-sans bg-black text-white min-h-screen flex flex-col">
        <WalletProviders>
          <Suspense fallback={null}>
            <CounterProvider>
              {children}
            </CounterProvider>
            <Toaster position="bottom-right" theme="dark" />
            <UiToaster />
          </Suspense>
        </WalletProviders>
      </body>
    </html>
  );
}
