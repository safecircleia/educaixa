'use client';

import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { ParticlesEffect } from '@/components/client/ParticlesEffect';
import { Info, Shield, Star } from 'lucide-react';

// Web3 style animation variants
const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

// Token information card
function TokenInfoCard() {
  return (
    <motion.div 
      variants={fadeInUpVariants} 
      className="bg-gray-800 border border-gray-700 rounded-xl p-10 shadow-2xl space-y-6"
    >
      <div className="flex items-center gap-4">
        <Info className="w-8 h-8 text-cyan-400" />
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
          CS Token
        </h2>
      </div>
      <p className="text-lg text-gray-300">
        The CS Token is a state-of-the-art digital asset built on the Solana blockchain, designed for secure and efficient transactions.
      </p>
      <div className="flex items-center gap-4">
        <Shield className="w-6 h-6 text-cyan-400" />
        <span className="text-md text-gray-400">Secure & Reliable</span>
      </div>
      <div className="flex items-center gap-4">
        <Star className="w-6 h-6 text-cyan-400" />
        <span className="text-md text-gray-400">Innovative Technology</span>
      </div>
      <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
        <p className="text-sm text-gray-400">Token Address:</p>
        <p className="text-sm font-mono text-cyan-400">CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump</p>
      </div>
    </motion.div>
  );
}

export default function TokenPage() {
  return (
    <main className="relative bg-gray-900 text-white min-h-screen overflow-hidden">
      {/* Particle animated background for web3 vibe */}
      <ParticlesEffect className="absolute inset-0 z-0" />
      <Navbar />
      <div className="relative z-10 container mx-auto px-6 py-16 max-w-7xl">
        <motion.h1
          initial="initial"
          animate="animate"
          variants={fadeInUpVariants}
          className="text-6xl md:text-7xl font-extrabold text-center mb-16 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent drop-shadow-2xl"
        >
          Solana Token Overview
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Token Information Card */}
          <TokenInfoCard />

          {/* Dexscreener embed for token chat / chart */}
          <motion.div 
            variants={fadeInUpVariants} 
            className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden shadow-2xl"
          >
            <style>{`#dexscreener-embed{position:relative;width:100%;padding-bottom:80%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:60%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}`}</style>
            <div id="dexscreener-embed">
              <iframe src="https://dexscreener.com/solana/4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8?embed=1&loadChartSettings=0&tabs=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=marketCap&interval=15"></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
