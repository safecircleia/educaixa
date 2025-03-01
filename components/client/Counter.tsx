'use client';

import { motion, useAnimationControls, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { useCounter } from '../../context/CounterContext';
import UICounter from '@/components/ui/counter';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Users, Info, CheckCircle2, PartyPopper } from "lucide-react";

interface AnimatedCounterProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const AnimatedCounter = ({ containerRef }: AnimatedCounterProps) => {
  const { count, total, percentage } = useCounter();
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
            className="relative overflow-hidden rounded-2xl border border-white/20 bg-black/30 backdrop-blur-xl px-4 sm:px-8 py-4 sm:py-6 cursor-help group hover:border-white/30 transition-all duration-300 shadow-lg shadow-cyan-500/5 hover:shadow-cyan-500/10"
            style={{
              boxShadow: reachedMilestone ? '0 0 20px 5px rgba(77, 200, 255, 0.2)' : undefined,
            }}
          >

            {/* Glow effect - enhanced for milestone */}
            <div 
              className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                reachedMilestone ? 'group-hover:animate-pulse' : ''
              }`}
            ></div>
            
            {/* Background pulse effect when milestone reached */}
            {reachedMilestone && (
              <motion.div 
                className="absolute inset-0 bg-cyan-500/5 rounded-2xl z-0"
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
            
            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/30">
              <motion.div
                className={`h-full ${
                  reachedMilestone 
                    ? "bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400" 
                    : "bg-gradient-to-r from-cyan-400 to-blue-500"
                }`}
                animate={{ width: `${percentage}%` }}
                transition={{ type: "spring", stiffness: 50, damping: 20 }}
                style={{
                  boxShadow: reachedMilestone 
                    ? '0 0 10px 0 rgba(251, 191, 36, 0.5)' 
                    : '0 0 8px 0 rgba(77, 200, 255, 0.3)'
                }}
              />
            </div>

            <div className="relative flex flex-col items-center gap-2 sm:gap-3 z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Removed Sparkles icon that was positioned on the left */}
                
                {/* Counter with special effects when milestone reached */}
                <motion.div
                  animate={reachedMilestone ? {
                    filter: ['drop-shadow(0 0 2px rgba(251, 191, 36, 0.5))', 'drop-shadow(0 0 4px rgba(251, 191, 36, 0.3))', 'drop-shadow(0 0 2px rgba(251, 191, 36, 0.5))'],
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
                    textColor={reachedMilestone ? "rgba(251, 191, 36, 1)" : "white"}
                    fontWeight={700}
                    className="scale-75 sm:scale-100"
                  />
                </motion.div>
                <Info className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400/70 group-hover:text-cyan-400 transition-colors" />
              </div>
              
              <div className={`text-sm sm:text-base font-medium tracking-wide ${
                reachedMilestone 
                  ? 'text-amber-300 group-hover:text-amber-200'
                  : 'text-white/80 group-hover:text-white/90'
                } transition-colors flex items-center gap-1.5`}
              >
                {reachedMilestone && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span>
                  Acceso Anticipado {reachedMilestone ? "Milestone!" : ""}
                </span>
              </div>
            </div>
          </motion.div>
        </HoverCardTrigger>
        <HoverCardContent side="top" sideOffset={8} className="w-80 bg-black/95 border border-white/10">
          <div className="flex justify-between space-x-4">
            <div className="space-y-2.5">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-cyan-400" />
                Programa de Acceso Anticipado
                {reachedMilestone && (
                  <span className="bg-yellow-500/20 text-yellow-300 text-xs px-2 py-0.5 rounded-full border border-yellow-500/30">
                    Milestone
                  </span>
                )}
              </h4>
              <p className="text-sm leading-relaxed text-white/80">
                Únete a nuestro programa exclusivo de acceso anticipado para ayudar al proyecto y probarlo antes del lanzamiento público. Limitado a {total.toLocaleString()} participantes que obtendrán acceso prioritario a SafeCircle.
                {reachedMilestone && (
                  <span className="block mt-2 text-amber-300/90">
                    ¡Increíble! Hemos alcanzado más de 1000 registros. ¡Gracias por ser parte de esta comunidad!
                  </span>
                )}
              </p>
              <div className="flex items-center pt-1 text-xs font-medium text-cyan-400/90">
                <span>{Math.round(percentage)}% de cupos ocupados</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </motion.div>
  );
};
