'use client';

import { motion } from 'framer-motion';
import { Counter } from './Counter';
import { WaitlistButton } from './WaitlistButton';
import { GodRays } from './GodRays';

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8">
      <GodRays />
      <motion.div className="relative z-10 w-full max-w-4xl mx-auto text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50"
        >
          SAFECIRCLE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto mb-16"
        >
          AI-Powered Child Safety Without Compromising Privacy
        </motion.p>

        <div className="mt-16 space-y-8 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="w-full max-w-lg"
          >
            <Counter />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <WaitlistButton />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};
