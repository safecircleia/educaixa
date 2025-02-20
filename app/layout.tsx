import React, { Suspense } from 'react';
import { GeistSans } from 'geist/font/sans';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import '../styles/globals.css';
import { CounterProvider } from '../context/CounterContext';
import { WalletProviders } from '@/providers/WalletProviders';
import { Toaster as UiToaster } from "@/components/ui/toaster";

const nothingFont = localFont({
  src: '../public/nothing.ttf',
  variable: '--font-nothing',
});

export const metadata = {
   title: 'SafeCircle',
   description: 'AI-Powered Child Safety Without Compromising Privacy',
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
