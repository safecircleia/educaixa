'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import CountUp from './CountUp';
import confetti from 'canvas-confetti';

export const Counter = () => {
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
    <div className="relative">
      <div className="relative bg-black/20 backdrop-blur-xl px-8 py-6 rounded-3xl border border-white/10">
        {/* Updated progress bar */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/[0.12] to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: percentage / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ transformOrigin: "left" }}
          />
        </div>
        
        <div className="relative flex items-center justify-center gap-4">
          <div className="font-mono text-3xl flex items-baseline gap-2">
            <CountUp
              to={count}
              className="font-bold text-white"
              duration={1.5}
              separator=","
            />
            <span className="text-white/40 text-xl">/{total.toLocaleString()}</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="text-white/60">Slots Filled</div>
        </div>
      </div>
    </div>
  );
};
