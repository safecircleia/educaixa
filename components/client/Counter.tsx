'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import CountUp from './CountUp';
import confetti from 'canvas-confetti';

export const Counter = ({ containerRef }) => {
  const [count, setCount] = useState(0);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  const total = 5000;
  const percentage = Math.min((count / total) * 100, 100);

  // Add a previous count ref to track changes
  const prevCountRef = useRef(count);

  useEffect(() => {
    const getCount = async () => {
      const { data } = await supabase
        .from('waitlist_count')
        .select('count')
        .eq('id', 1)
        .single();
      
      if (data) setCount(data.count);
    };

    getCount();

    const channel = supabase
      .channel('counter')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waitlist_count'
        },
        (payload: any) => {
          if (payload.new?.count !== undefined) {
            setCount(payload.new.count);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    // Trigger confetti only when count exactly reaches 5000
    if (count === total && prevCountRef.current !== total && !hasTriggeredConfetti) {
      const startTime = Date.now();
      const duration = 3000; // 3 seconds

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

      fireConfetti();

      // Continuous bursts
      const interval = setInterval(() => {
        if (Date.now() - startTime > duration) {
          clearInterval(interval);
          return;
        }
        fireConfetti();
      }, 200);

      setHasTriggeredConfetti(true);

      return () => clearInterval(interval);
    }
    
    prevCountRef.current = count;
  }, [count, total, hasTriggeredConfetti]);

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
            initial={{ width: 0 }}
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
              <CountUp to={count} duration={1.5} />
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
