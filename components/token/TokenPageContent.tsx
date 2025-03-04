"use client";

import { useState } from "react";
import {
  Coins,
  Wallet,
  Users,
  Vote,
  LineChart,
  ArrowUpRight,
  Loader2,
  Twitter,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { motion } from "framer-motion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Button } from "@/components/ui/button";
import { PixelCard } from "@/components/ui/pixelcard";
import { GlowingDots } from "@/components/ui/glowing-dots";
import { useTokenData } from "@/hooks/useTokenData";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import ErrorState from "@/components/ui/error-state";
import Image from "next/image";
import { DexScreenerWrapper } from "@/components/ui/DexScreenerWrapper";
import { useLanguage } from "@/context/LanguageContext";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function LoadingState() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="w-8 h-8 animate-spin text-blue-400 mb-4" />
      <p className="text-white/60">{t("common.loading.tokenData")}</p>
    </div>
  );
}

// Logos array for the marquee component
const LOGOS = [
  {
    src: "/branding/Brand_DEXTools_Light.svg",
    alt: "DEXTools Logo",
    width: 180,
    height: 40,
    className: "h-[40px] w-auto",
    href: "https://www.dextools.io/app/en/solana/pair-explorer/CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump"
  },
  {
    src: "/branding/coingecko.svg",
    alt: "CoinGecko Logo",
    width: 240,
    height: 60,
    className: "h-[60px] w-auto",
    href: "https://www.coingecko.com/en/coins/safecircle"
  },
  {
    src: "/branding/gmgn.svg",
    alt: "GMGN Logo",
    width: 240,
    height: 60,
    className: "h-[60px] w-auto",
    href: "https://gmgn.ai/sol/token/solscan_CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump"
  },
  {
    src: "/branding/coinmarketcap-seeklogo.svg",
    alt: "Coinmarketcap Logo",
    width: 900,
    height: 190,
    className: "h-[230px] w-auto invert brightness-[.85]",
    href: "https://coinmarketcap.com/dexscan/solana/4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8/"
  }
];

export function TokenPageContent() {
  const { tokenData, isLoading, error, retry } = useTokenData();
  const [chartLoading, setChartLoading] = useState(true);
  const { t } = useLanguage();

  if (error) {
    return (
      <div className="container mx-auto px-4">
        <ErrorState error={new Error(error)} reset={retry} />
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
            {t("token.hero.title")}
          </h1>
          <p className="text-xl text-white/60 max-w-3xl mx-auto">
            {t("token.hero.description")}
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white"
              onClick={() =>
                window.open(
                  "https://raydium.io/swap/?inputMint=sol&outputMint=CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump",
                  "_blank"
                )
              }
            >
              {t("token.hero.trade")}
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          role="list"
          aria-label="Token Statistics"
        >
          <ErrorBoundary>
            <PixelCard
              variant="blue"
              className="group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
              aria-label={`Token ${t('token.stats.marketCap')}: ${!isLoading ? 
                 (tokenData?.marketCap >= 1000000 
                   ? `$${(tokenData?.marketCap / 1000000).toFixed(2)}${t('token.stats.million')}` 
                   : `$${(tokenData?.marketCap / 1000).toFixed(2)}${t('token.stats.thousand')}`)
                 : 'Loading...'}`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-blue-400 font-medium">{t('token.stats.marketCap')}</span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          ${tokenData?.marketCap >= 1000000 
                            ? (tokenData?.marketCap / 1000000).toFixed(2)
                            : (tokenData?.marketCap / 1000).toFixed(2)}
                          <span className="text-xl ml-1">
                            {tokenData?.marketCap >= 1000000 
                              ? t('token.stats.million') 
                              : t('token.stats.thousand')}
                          </span>
                        </p>
                        <div
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            tokenData?.priceChange.h24 >= 0
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                          }`}
                        >
                          <ArrowUpRight
                            className={`w-3 h-3 ${
                              tokenData?.priceChange.h24 < 0 ? "rotate-90" : ""
                            }`}
                          />
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
              aria-label={`${t("token.stats.volume")}: ${
                !isLoading
                  ? `$${tokenData?.volume.h24.toLocaleString()}`
                  : "Loading..."
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-pink-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-pink-400 font-medium">
                      {t("token.stats.volume")}
                    </span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-pink-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-pink-400 via-pink-300 to-rose-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          $
                          {tokenData?.volume.h24.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-500/10 text-pink-400 border border-pink-500/20">
                          <span className="opacity-60">
                            {t("token.stats.totalUSD")}
                          </span>
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
              aria-label={`${t("token.stats.liquidity")}: ${
                !isLoading
                  ? `$${tokenData?.liquidity.usd.toLocaleString()}`
                  : "Loading..."
              }`}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <div className="space-y-1 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Wallet className="w-5 h-5 text-violet-400 group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-violet-400 font-medium">
                      {t("token.stats.liquidity")}
                    </span>
                  </div>
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin text-violet-400" />
                  ) : (
                    <>
                      <div className="space-y-1">
                        <p className="text-4xl font-bold tracking-tight bg-gradient-to-br from-violet-400 via-violet-300 to-purple-400 bg-clip-text text-transparent transform transition-transform group-hover:scale-105">
                          $
                          {tokenData?.liquidity.usd.toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </p>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20">
                          <span className="opacity-60">
                            {t("token.stats.tvl")}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </PixelCard>
          </ErrorBoundary>
        </motion.div>

        {/* Featured On Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.2)" className="backdrop-blur-sm">
            <div className="p-8">
              <h2 className="text-2xl font-bold text-center text-white/90 mb-8">{t('token.sections.featured.title')}</h2>
              <div className="relative h-[100px] w-full overflow-hidden">
                <InfiniteSlider 
                  className="flex h-full w-full items-center" 
                  duration={30}
                  gap={48}
                >
                  {LOGOS.map((logo, index) => (
                    <div 
                      key={index} 
                      className="flex w-64 items-center justify-center"
                    >
                      {logo.href ? (
                        <a 
                          href={logo.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-opacity hover:opacity-80"
                        >
                          <Image
                            src={logo.src}
                            alt={logo.alt}
                            width={logo.width}
                            height={logo.height}
                            className={logo.className}
                          />
                        </a>
                      ) : (
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          className={logo.className}
                        />
                      )}
                    </div>
                  ))}
                </InfiniteSlider>
                <ProgressiveBlur
                  className="pointer-events-none absolute top-0 left-0 h-full w-[200px]"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute top-0 right-0 h-full w-[200px]"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Binance Blog Post Feature */}
        <motion.div
          variants={itemVariants}
          className="mb-12"
        >
          <SpotlightCard spotlightColor="rgba(245, 158, 11, 0.2)" className="h-full backdrop-blur-sm">
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/10 to-yellow-500/10 flex items-center justify-center">
                  <Image
                    src="/branding/binance-svgrepo-com.svg"
                    alt="Binance Logo"
                    width={24}
                    height={24}
className="w-6 h-6 text-amber-400"
                    />
                </div>
                <h2 className="text-2xl font-bold text-white/90">
                  {t('token.sections.featured.binance.title')}
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-white/70 leading-relaxed">
                  {t('token.sections.featured.binance.description')}
                </p>
                <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 p-6 rounded-xl border border-amber-500/20">
                  <h3 className="text-xl font-semibold text-amber-300 mb-3">{t('token.sections.featured.binance.article.title')}</h3>
                  <p className="text-white/70 mb-4">
                    {t('token.sections.featured.binance.article.content')}
                  </p>
                  <div className="flex justify-end">
                    <a 
                      href="https://www.binance.com/en/square/post/21051172805018" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 transition-colors"
                    >
                      {t('token.sections.featured.binance.article.cta')} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </motion.div>

        {/* Token Info */}
        <motion.div variants={itemVariants} className="mb-12">
          <SpotlightCard
            spotlightColor="rgba(59, 130, 246, 0.2)"
            className="h-full backdrop-blur-sm"
          >
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
                    {t("token.sections.overview.title")}
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
                        {social.type === "twitter" ? (
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
                {t("token.sections.overview.description")}
              </p>
              <div className="flex items-center gap-2 p-4 rounded-lg bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm">
                <Wallet className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-white/60">Contract Address:</span>
                <code className="text-sm text-blue-400 font-mono">
                  {t("token.sections.overview.contractAddress")}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto hover:bg-blue-500/10"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      t("token.sections.overview.contractAddress")
                    );
                  }}
                >
                  {t("common.copy")}
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
          {(() => {
            // Get features array from translations
            const features = t("token.sections.features");
            // Ensure it's an array we can map over
            if (Array.isArray(features)) {
              return features.map((feature, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <SpotlightCard
                    spotlightColor="rgba(99, 102, 241, 0.2)"
                    className="h-full backdrop-blur-sm"
                  >
                    <div className="p-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 flex items-center justify-center">
                          {index === 0 ? (
                            <Vote className="w-5 h-5 text-indigo-400" />
                          ) : index === 1 ? (
                            <Coins className="w-5 h-5 text-indigo-400" />
                          ) : index === 2 ? (
                            <Wallet className="w-5 h-5 text-indigo-400" />
                          ) : (
                            <Users className="w-5 h-5 text-indigo-400" />
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-white/90">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="text-white/70">{feature.description}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ));
            }
            // Fallback for non-array case
            console.warn("Token features is not an array:", features);
            return null;
          })()}
        </motion.div>

        {/* Chart Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <SpotlightCard
            spotlightColor="rgba(139, 92, 246, 0.2)"
            className="h-full backdrop-blur-sm"
          >
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/10 to-blue-500/10 flex items-center justify-center">
                  <Coins className="w-5 h-5 text-violet-400" />
                </div>
                <h2 className="text-2xl font-bold text-white/90">
                  {t("token.sections.metrics.title")}
                </h2>
              </div>
              <p className="text-white/70">
                {t("token.sections.metrics.description")}
              </p>
              <DexScreenerWrapper pairAddress="4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8" />
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </>
  );
}
