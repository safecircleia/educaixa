'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PhantomIcon } from '../PhantomIcon';
import { ChevronRight } from 'lucide-react';

const tiers = [
  {
    name: 'Beta Access',
    price: '100K $SC',
    features: ['Early platform access', 'Basic features', 'Community access'],
    gradient: 'from-blue-500/20 to-cyan-400/20'
  },
  {
    name: 'Beta + Updates',
    price: '500K $SC',
    features: ['Beta access', 'Exclusive updates', 'Priority support'],
    gradient: 'from-violet-500/20 to-purple-400/20'
  },
  {
    name: 'Governance',
    price: '1M $SC',
    features: ['Beta access', 'Exclusive updates', 'Early governance rights'],
    gradient: 'from-rose-500/20 to-pink-400/20'
  }
];

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30
    }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2
    }
  }
};

export const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        className="glass px-8 py-4 rounded-full text-white font-semibold text-lg
          border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all
          flex items-center gap-2 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Join Waitlist
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-4 top-[50%] translate-y-[-50%] max-w-3xl mx-auto z-50
                bg-black/80 border border-white/10 rounded-3xl p-8 backdrop-blur-xl"
            >
              <h3 className="text-3xl font-bold mb-2">Choose Your Tier</h3>
              <p className="text-white/60 mb-8">Select a tier to join the SafeCircle waitlist</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                {tiers.map((tier, index) => (
                  <motion.button
                    key={tier.name}
                    onClick={() => setSelectedTier(index)}
                    className={`p-6 rounded-2xl text-left relative overflow-hidden
                      border transition-all duration-300 ${
                        selectedTier === index 
                          ? 'border-white/30 bg-white/10' 
                          : 'border-white/10 hover:border-white/20'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-20`} />
                    <div className="relative">
                      <div className="font-bold text-lg mb-1">{tier.name}</div>
                      <div className="text-cyan-400 font-mono text-xl mb-4">{tier.price}</div>
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="text-sm text-white/70 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-cyan-400" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.button>
                ))}
              </div>

              <div className="mt-8 flex justify-end gap-4">
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 text-white/60 hover:text-white"
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  onClick={() => {
                    // Handle tier selection
                    setIsOpen(false);
                  }}
                  className="glass px-6 py-2 rounded-lg text-white font-semibold
                    border border-white/10 hover:bg-white/10"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={selectedTier === null}
                >
                  <span className="flex items-center gap-2">
                    <PhantomIcon className="w-5 h-5" />
                    Connect Wallet
                  </span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
