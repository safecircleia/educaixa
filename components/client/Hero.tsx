'use client';

import { motion } from 'framer-motion';
import { Counter } from './Counter';
import { WaitlistButton } from './WaitlistButton';
import { GodRays } from './GodRays';
import { TextScramble } from './TextScramble';
import { useRef } from 'react';
import TextPressure  from '@/components/ui/TextPreasure';

export const Hero = () => {
  const counterRef = useRef(null);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-6 md:px-8">
      <GodRays />
      <motion.div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        <div className="space-y-20">
          {/* Stacked title layout */}
          <div className="flex flex-col items-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl lg:text-8xl font-light tracking-tight
                bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/80"
            >
              AI-Powered Child Safety
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-5xl md:text-6xl lg:text-7xl text-white/80"
            >
              Without Compromising
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <TextPressure
                text="Privacy"
                className="text-7xl md:text-8xl lg:text-9xl font-bold 
                  bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf] bg-clip-text text-transparent"
              />
            </motion.div>
          </div>

          {/* Counter and CTA sections */}
          <div className="space-y-12">
            <div ref={counterRef} className="max-w-lg mx-auto">
              <Counter containerRef={counterRef} />
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <WaitlistButton />
              <motion.a
                href="#learn-more"
                className="px-8 py-4 rounded-full text-white/80 hover:text-white
                  flex items-center gap-2 group transition-colors"
                whileHover={{ y: -2 }}
              >
                Learn More
                <motion.span
                  className="inline-block"
                  initial={{ x: 0 }}
                  whileHover={{ x: 4 }}
                >
                  →
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
