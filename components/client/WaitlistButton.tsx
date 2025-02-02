'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Onboarding } from './Onboarding';

export const WaitlistButton = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleComplete = (data) => {
    console.log('Onboarding completed:', data);
    setShowOnboarding(false);
  };

  return (
    <>
      <motion.button
        onClick={() => setShowOnboarding(true)}
        className="glass px-8 py-4 rounded-full text-white font-semibold text-lg
          border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all
          flex items-center gap-2 group"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Join Waitlist
        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      <Onboarding 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
        onComplete={handleComplete}
      />
    </>
  );
};
