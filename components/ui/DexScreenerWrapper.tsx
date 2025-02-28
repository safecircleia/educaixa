'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { DexScreenerChart } from './DexScreenerChart';

export function DexScreenerWrapper({ pairAddress }: { pairAddress: string }) {
  return (
    <>
      <Script
        src="https://widgets.dexscreener.com/dist/main.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('DexScreener script loaded');
        }}
      />
      <DexScreenerChart pairAddress={pairAddress} />
    </>
  );
}