'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import CountUp from './CountUp';
import confetti from 'canvas-confetti';
import { useCounter } from '../../context/CounterContext';

export const Counter = ({ containerRef }) => {
  const { count, total, percentage } = useCounter();
  const hasTriggeredConfetti = useRef(false);
  const prevCount = useRef(count);

  useEffect(() => {
    // Trigger confetti only when count reaches total for the first time
    if (count === total && prevCount.current !== total && !hasTriggeredConfetti.current) {
      const fireConfetti = () => {
        const defaults = {
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          zIndex: 100,
          gravity: 1.2,
          scalar: 1.2,
          disableForReducedMotion: true
        };

        confetti({
          ...defaults,
          particleCount: 80,
          origin: { x: 0.2, y: 0.7 }
        });
        confetti({
          ...defaults,
          particleCount: 80,
          origin: { x: 0.8, y: 0.7 }
        });
      };

      const startTime = Date.now();
      const duration = 3000;
      
      const interval = setInterval(() => {
        if (Date.now() - startTime > duration) {
          clearInterval(interval);
          return;
        }
        fireConfetti();
      }, 200);

      hasTriggeredConfetti.current = true;
      return () => clearInterval(interval);
    }
    
    prevCount.current = count;
  }, [count, total]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="relative w-full max-w-md mx-auto"
    >
      {/* Enhanced glow effect */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-[#4dc8ff]/20 via-transparent to-transparent blur-2xl" />
        <motion.div
          className="absolute inset-0 bg-gradient-conic from-[#4dc8ff]/10 via-transparent to-[#2dd4bf]/10"
          animate={{
            rotate: 360
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/10 
        bg-black/20 backdrop-blur-xl px-8 py-6"
      >
        {/* Progress indicator */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
          <motion.div
            className="h-full bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
            animate={{ width: `${percentage}%` }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 20
            }}
          />
        </div>

        <div className="relative flex flex-col items-center gap-3">
          <div className="flex items-baseline gap-3">
            <div className="font-mono text-4xl font-bold bg-clip-text text-transparent 
              bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
            >
              <CountUp to={count} duration={1} />
            </div>
            <div className="font-mono text-2xl text-white/40">
              / {total.toLocaleString()}
            </div>
          </div>
          
          <div className="text-sm font-medium text-white/60 tracking-wider uppercase">
            Early Access Slots
          </div>
        </div>
      </div>
    </motion.div>
  );
};
