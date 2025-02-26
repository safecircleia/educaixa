'use client';

import { useState } from 'react';
import { Coins, Wallet, Users, Vote, LineChart, ArrowUpRight, Loader2, Twitter, MessageCircle } from "lucide-react";
import { tokenContent } from "@/app/token/token-content";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/ui/pixelcard";
import { GlowingDots } from "@/components/ui/glowing-dots";
import { useTokenData } from "@/hooks/useTokenData";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { ErrorState } from "@/components/ui/error-state";
import Image from "next/image";
import { DexScreenerWrapper } from "@/components/ui/DexScreenerWrapper";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-4" />
      <p className="text-white/60">Cargando datos del token...</p>
    </div>
  );
}

export function TokenPageContent() {
  const { tokenData, isLoading, error, retry } = useTokenData();
  const [chartLoading, setChartLoading] = useState(true);

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <ErrorState message={error} retry={retry} />
      </div>
    );
  }

  if (!tokenData && isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <motion.div 
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* Hero Section */}
        <motion.div
          variants={itemVariants}
          className="text-center space-y-6 mb-16"
        >
          <h1 className="text-6xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
            {tokenContent.hero.title}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {tokenContent.hero.description}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          role="list"
          aria-label="Token Statistics"
        >
          <ErrorBoundary>
            <PixelCard 
              variant="blue" 
              className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
              aria-label={`Token price: ${!isLoading ? `$${Number(tokenData?.priceUsd).toFixed(8)}` : 'Loading...'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-blue-400 font-medium">Precio</span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          ${Number(tokenData?.priceUsd).toFixed(8)}
                        </p>
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          tokenData?.priceChange.h24 >= 0 
                            ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                            : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                          <ArrowUpRight className={`w-3 h-3 ${tokenData?.priceChange.h24 < 0 ? 'rotate-90' : ''}`} />
                          {tokenData?.priceChange.h24}%
                          <span className="text-[10px] opacity-60">24h</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PixelCard>
          </ErrorBoundary>

          <ErrorBoundary>
            <PixelCard 
              variant="pink" 
              className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(236,72,153,0.3)]"
              aria-label={`24 hour volume: ${!isLoading ? `$${tokenData?.volume.h24.toLocaleString()}` : 'Loading...'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-pink-400 font-medium">Volumen 24h</span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-pink-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-pink-400 via-pink-300 to-rose-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          ${tokenData?.volume.h24.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                          <span className="opacity-60">USD Total</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PixelCard>
          </ErrorBoundary>

          <ErrorBoundary>
            <PixelCard 
              variant="violet" 
              className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.3)]"
              aria-label={`Total liquidity: ${!isLoading ? `$${tokenData?.liquidity.usd.toLocaleString()}` : 'Loading...'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-violet-400 font-medium">Liquidez</span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-violet-400 via-violet-300 to-purple-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          ${tokenData?.liquidity.usd.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          <span className="opacity-60">TVL</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PixelCard>
          </ErrorBoundary>
        </motion.div>

        {/* Token Info */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="h-full backdrop-blur-sm">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                {tokenData?.info.imageUrl && (
                  <Image
                    src={tokenData.info.imageUrl}
                    alt="Token Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h2 className="text-2xl font-bold text-white/90">
                    {tokenContent.sections.overview.title}
                  </h2>
                  <div className="flex gap-2 mt-2">
                    {tokenData?.info.socials.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-white/90 transition-colors"
                      >
                        {social.type === 'twitter' ? (
                          <Twitter className="w-5 h-5" />
                        ) : (
                          <MessageCircle className="w-5 h-5" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/70 leading-relaxed">
                {tokenContent.sections.overview.description}
              </p>
              <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm">
                <Wallet className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-white/60">Contract Address:</span>
                <code className="text-sm text-blue-400 font-mono">
                  {tokenContent.sections.overview.contractAddress}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto hover:bg-blue-500/10"
                  onClick={() => {
                    navigator.clipboard.writeText(tokenContent.sections.overview.contractAddress);
                  }}
                >
                  Copiar
                </Button>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
        >
          {tokenContent.sections.features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <SpotlightCard
                spotlightColor="rgba(99, 102, 241, 0.2)"
                className="h-full backdrop-blur-sm"
              >
                <div className="p-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                      {index === 0 ? <Vote className="w-5 h-5 text-indigo-400" /> :
                       index === 1 ? <Coins className="w-5 h-5 text-indigo-400" /> :
                       index === 2 ? <Wallet className="w-5 h-5 text-indigo-400" /> :
                       <Users className="w-5 h-5 text-indigo-400" />}
                    </div>
                    <h3 className="text-xl font-bold text-white/90">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-white/70">{feature.description}</p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Chart Section */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="h-full backdrop-blur-sm">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white/90">
                  {tokenContent.sections.metrics.title}
                </h2>
              </div>
              <p className="text-white/70">
                {tokenContent.sections.metrics.description}
              </p>
              <DexScreenerWrapper pairAddress="4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8" />
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </>
  );
}