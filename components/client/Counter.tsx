'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { useCounter } from '../../context/CounterContext';
import UICounter from '@/components/ui/counter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Users, Info } from "lucide-react";

interface AnimatedCounterProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const AnimatedCounter = ({ containerRef }: AnimatedCounterProps) => {
  const { count, total, percentage } = useCounter();
  const hasTriggeredConfetti = useRef(false);
  const prevCount = useRef(count);

  useEffect(() => {
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
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/20 backdrop-blur-xl px-8 py-6 cursor-help group">
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/20">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-3">
              <div className="flex items-center gap-2">
                <UICounter
                  value={count}
                  places={[1000, 100, 10, 1]}
                  fontSize={48}
                  padding={4}
                  gap={6}
                  textColor="white"
                  fontWeight={700}
                />
                <Info className="w-5 h-5 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
              </div>
              
              <div className="text-base font-medium tracking-wide text-white/80 group-hover:text-white/90 transition-colors">
                Early Access Spots
              </div>
            </div>
          </div>
        </HoverCardTrigger>
        <HoverCardContent sideOffset={8} className="w-80 bg-black/95 border border-white/10">
          <div className="flex justify-between space-x-4">
            <div className="space-y-2.5">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                Early Access Program
              </h4>
              <p className="text-sm leading-relaxed text-white/80">
                Join our exclusive early access program to help the project and test it before public release. Limited to {total.toLocaleString()} participants who will get first access to SafeCircle.
              </p>
              <div className="flex items-center pt-1 text-xs font-medium text-cyan-400/90">
                <span>{Math.round(percentage)}% spots filled</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};
