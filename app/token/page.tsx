'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/navbar';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { GlowyDivider } from '@/components/ui/GlowyDivider';
import { Coins, TrendingUp, PieChart } from 'lucide-react';

// A simple dummy graph component using SVG
const TokenGraph = () => {
  return (
    <svg width="100%" height="200" viewBox="0 0 400 200" className="my-4">
      <motion.polyline
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
        fill="none"
        stroke="#4F46E5"
        strokeWidth="3"
        points="0,150 50,130 100,140 150,90 200,100 250,60 300,80 350,40 400,50"
      />
    </svg>
  );
};

const fadeInUpVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function TokenPage() {
  const [price, setPrice] = useState<number | null>(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const fetchedPrice = 1.23;
        setPrice(fetchedPrice);
      } catch (error) {
        console.error(error);
      }
    }
    fetchPrice();
  }, []);

  return (
    <main className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-16 relative flex flex-col items-center">
        <motion.h1 
          variants={fadeInUpVariants}
          initial="initial"
          animate="animate"
          className="text-6xl font-bold text-center mb-8 bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent"
        >
          Token Overview
        </motion.h1>

        <GlowyDivider className="my-12" />

        <div className="w-full flex flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 pr-0 lg:pr-8 overflow-y-auto">
            <motion.section 
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-3xl font-bold">Current Token Price</h2>
                </div>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                  {price !== null ? `$${price.toFixed(2)}` : 'Loading price...'}
                </p>
              </SpotlightCard>
            </motion.section>

            <motion.section 
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto mb-16"
            >
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-3xl font-bold">Market Trends</h2>
                </div>
                <TokenGraph />
              </SpotlightCard>
            </motion.section>

            <motion.section 
              variants={fadeInUpVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              className="max-w-4xl mx-auto"
            >
              <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <PieChart className="w-6 h-6 text-purple-500" />
                  </div>
                  <h2 className="text-3xl font-bold">Tokenomics</h2>
                </div>
                <div className="space-y-6">
                  <p className="text-lg text-white/80">
                    Our token is designed with a sustainable economy in mind. Distribution includes allocations for community rewards, strategic partners, and future development.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { label: 'Token Supply', value: '1,000,000,000 TKN' },
                      { label: 'Circulating Supply', value: '500,000,000 TKN' },
                      { label: 'Community Rewards', value: '20%' },
                      { label: 'Team', value: '15%' },
                      { label: 'Development', value: '25%' },
                      { label: 'Reserve', value: '40%' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-purple-500/10 rounded-lg"
                      >
                        <p className="text-sm text-white/60">{item.label}</p>
                        <p className="text-xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                          {item.value}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.section>
          </div>
          <div className="hidden lg:block lg:w-2/3 sticky top-0 h-screen">
            <style>{`#dexscreener-embed{position:relative;width:100%;padding-bottom:125%;}@media(min-width:1400px){#dexscreener-embed{padding-bottom:65%;}}#dexscreener-embed iframe{position:absolute;width:100%;height:100%;top:0;left:0;border:0;}`}</style>
            <div id="dexscreener-embed">
              <iframe src="https://dexscreener.com/solana/4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8?embed=1&loadChartSettings=0&tabs=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=1&chartType=marketCap&interval=15"></iframe>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
