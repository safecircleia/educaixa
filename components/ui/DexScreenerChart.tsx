'use client';

import { useState, useEffect } from 'react';
import { Loader2, AlertCircle, RefreshCcw } from 'lucide-react';
import { Button } from './button';

interface DexScreenerChartProps {
  pairAddress: string;
}

export function DexScreenerChart({ pairAddress }: DexScreenerChartProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setIframeKey(prev => prev + 1);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isLoading) {
        setHasError(true);
        setIsLoading(false);
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [isLoading, iframeKey]);

  if (hasError) {
    return (
      <div className="rounded-xl overflow-hidden border border-red-500/10 relative min-h-[300px] flex items-center justify-center bg-background/80">
        <div className="text-center">
          <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
          <p className="text-white/70 mb-4">Error loading chart</p>
          <Button 
            variant="outline" 
            onClick={handleRetry}
            className="border-red-500/20 hover:bg-red-500/10"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl overflow-hidden border border-violet-500/10 relative min-h-[700px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
          <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
        </div>
      )}
      <style jsx>{`
        .dexscreener-embed {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 700px;
        }
        .dexscreener-embed iframe {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          border: 0;
          background: transparent;
        }
        @media(min-width: 1400px) {
          .dexscreener-embed {
            min-height: 800px;
          }
        }
      `}</style>
      <div className="dexscreener-embed">
        <iframe 
          key={iframeKey}
          src={`https://dexscreener.com/solana/${pairAddress}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartDefaultOnMobile=1&chartTheme=dark&theme=dark&chartStyle=1&chartType=marketCap&interval=15`}
          onLoad={() => {
            setIsLoading(false);
            setHasError(false);
          }}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="eager"
          title="DEX Screener Chart"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-forms allow-downloads"
          allowFullScreen={true}
        />
      </div>
    </div>
  );
}