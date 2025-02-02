import { GeistSans } from 'geist/font/sans';
import { Toaster } from 'sonner';
import '../styles/globals.css';
import { CounterProvider } from '../context/CounterContext';
import { Suspense } from 'react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Suspense fallback={null}>
          <CounterProvider>
            {children}
          </CounterProvider>
          <Toaster position="bottom-right" theme="dark" />
        </Suspense>
      </body>
    </html>
  );
}
