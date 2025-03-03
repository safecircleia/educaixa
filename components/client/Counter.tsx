'use client';

import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useCounter } from '../../context/CounterContext';
import UICounter from '@/components/ui/counter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Users, Info, CheckCircle2, PartyPopper } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

interface AnimatedCounterProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const AnimatedCounter = ({ containerRef }: AnimatedCounterProps) => {
  const { count, total, percentage } = useCounter();
  const { t } = useLanguage();
  const hasTriggeredConfetti = useRef(false);
  const prevCount = useRef(count);
  const controls = useAnimationControls();
  const [showCelebration, setShowCelebration] = useState(false);
  const reachedMilestone = count >= 1000;

  // Celebration effect when counter reaches 1000
  useEffect(() => {
    if (count >= 1000 && prevCount.current < 1000) {
      // Trigger celebration animation
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.5, ease: "easeInOut" }
      });
      
      // Show celebration badge
      setShowCelebration(true);
      
      // Fire special milestone confetti
      const fireMilestoneConfetti = () => {
        const defaults = {
          startVelocity: 45,
          spread: 360,
          ticks: 100,
          zIndex: 100,
          gravity: 0.8,
          scalar: 1.5,
          drift: 0,
          origin: { x: 0.5, y: 0.5 }
        };

        // Fire gold sparkles for the milestone
        confetti({
          ...defaults,
          particleCount: 120,
          colors: ['#FFD700', '#FFC800', '#FFDF00', '#F8F8FF'],
          shapes: ['star', 'square'],
        });
        
        // Add a second wave with different parameters
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 80,
            origin: { x: 0.1, y: 0.6 },
            colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a'],
          });
          
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 80,
            origin: { x: 0.9, y: 0.6 },
            colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a'],
          });
        }, 400);
      };
      
      fireMilestoneConfetti();
      
      // Add some ambient confetti in the background
      const ambientConfettiInterval = setInterval(() => {
        confetti({
          particleCount: 20,
          spread: 120,
          startVelocity: 30,
          gravity: 0.9,
          scalar: 0.8,
          origin: { x: Math.random(), y: Math.random() * 0.5 },
          colors: ['#26ccff', '#a25afd', '#ff5e7e', '#88ff5a', '#FFD700'],
        });
      }, 800);
      
      // Stop ambient confetti after a few seconds
      setTimeout(() => clearInterval(ambientConfettiInterval), 3000);
    }
    
    prevCount.current = count;
  }, [count, controls]);

  // Original confetti effect when counter reaches total
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
  }, [count, total]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.4 }}
      className="relative w-full max-w-md mx-auto px-4 sm:px-0"
    >
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <motion.div 
            animate={controls}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white backdrop-blur-xl px-4 sm:px-8 py-4 sm:py-6 cursor-help group hover:border-blue-200/70 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-blue-500/5"
            style={{
              boxShadow: reachedMilestone ? '0 0 20px 5px rgba(77, 200, 255, 0.1)' : undefined,
            }}
          >
            {/* Glow effect - enhanced for milestone */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-blue-100/40 via-transparent to-blue-50/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                reachedMilestone ? 'group-hover:animate-pulse' : ''
              }`}
            ></div>
            
            {/* Background pulse effect when milestone reached */}
            {reachedMilestone && (
              <motion.div 
                className="absolute inset-0 bg-amber-100/30 rounded-2xl z-0"
                animate={{ 
                  scale: [1, 1.02, 1],
                  opacity: [0.1, 0.2, 0.1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            )}
            
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gray-100">
              <motion.div
                className={`h-full ${
                  reachedMilestone 
                    ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" 
                    : "bg-gradient-to-r from-blue-400 to-blue-600"
                }`}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  boxShadow: reachedMilestone 
                    ? '0 0 10px 0 rgba(251, 191, 36, 0.3)' 
                    : '0 0 8px 0 rgba(77, 200, 255, 0.2)'
                }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-2 sm:gap-3 z-10">
              <div className="flex items-center gap-2 sm:gap-3 pt-2 sm:pt-0">
                <motion.div
                  animate={reachedMilestone ? {
                    filter: ['drop-shadow(0 0 2px rgba(251, 191, 36, 0.3))', 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.2))', 'drop-shadow(0 0 2px rgba(251, 191, 36, 0.3))'],
                  } : {}}
                  transition={{ 
                    duration: 2, 
                    repeat: reachedMilestone ? Infinity : 0,
                    repeatType: "reverse"
                  }}
                >
                  <UICounter
                    value={count}
                    places={[1000, 100, 10, 1]}
                    fontSize={32}
                    padding={3}
                    gap={4}
                    textColor={reachedMilestone ? "rgba(251, 191, 36, 1)" : "#1e3a8a"}
                    fontWeight={700}
                    className="scale-[0.65] xs:scale-75 sm:scale-100 text-gray-800"
                  />
                </motion.div>
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600/70 group-hover:text-blue-600 transition-colors" />
              </div>
              
              <div className={`text-xs xs:text-sm sm:text-base font-medium tracking-wide ${
                reachedMilestone 
                  ? 'text-amber-600 group-hover:text-amber-700'
                  : 'text-gray-600 group-hover:text-gray-800'
                } transition-colors flex items-center gap-1 sm:gap-1.5 pt-1 sm:pt-0`}
              >
                {reachedMilestone && (
                  <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
                )}
                <span>
                  {t('counter.earlyAccess')} {reachedMilestone ? t('counter.milestone') : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent 
          side="top" 
          sideOffset={8} 
          className="w-80 bg-white border border-gray-200 shadow-md"
        >
          <div className="flex justify-between space-x-4">
            <div className="space-y-2.5">
              <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-800">
                <Users className="h-4 w-4 text-blue-600" />
                {t('counter.program')}
                {reachedMilestone && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full border border-yellow-200">
                    {t('counter.milestone')}
                  </span>
                )}
              </h4>
              <p className="text-sm leading-relaxed text-gray-600">
                {t('counter.description').replace('{total}', total.toLocaleString())}
                {reachedMilestone && (
                  <span className="block mt-2 text-amber-600">
                    {t('counter.milestoneMessage')}
                  </span>
                )}
              </p>
              <div className="flex items-center pt-1 text-xs font-medium text-blue-600">
                <span>{t('counter.slotsOccupied').replace('{percentage}', Math.round(percentage).toString())}</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};
