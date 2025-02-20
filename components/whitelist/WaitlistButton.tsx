'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarBorder from "@/components/ui/starborder";
import { WaitlistOnboarding } from './WaitlistOnboarding';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CalendarDays, Sparkles } from "lucide-react";

const isProduction = process.env.NEXT_PUBLIC_DISABLE_WAITLIST === 'true';

export const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <StarBorder
            onClick={isProduction ? undefined : () => setIsOpen(true)}
            className={`group relative transition-all ${
              isProduction 
                ? 'opacity-50 saturate-50 cursor-not-allowed hover:opacity-50' 
                : 'cursor-pointer hover:opacity-90'
            }`}
            color={isProduction ? "#808080" : "cyan"}
            speed="4s"
          >
            <span className="flex items-center gap-2 px-4">
              <div className="flex items-center gap-3">
                <span className={isProduction ? 'text-gray-400' : ''}>Unirse a la lista de espera</span>
                {!isProduction && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </div>
            </span>
          </StarBorder>
        </HoverCardTrigger>
        {isProduction && (
          <HoverCardContent className="w-80 bg-black/95 border border-white/10">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-blue-400" />
                  Proximamente
                </h4>
                <p className="text-sm text-white/70">
                  Nuestro equipo está trabajando duro para ofrecerte algo especial. ¡Únete pronto a nuestra lista de espera!                </p>
                <div className="flex items-center pt-2 text-xs text-white/50">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>Proximamente Q1 2025</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        )}
      </HoverCard>

      <AnimatePresence>
        {isOpen && <WaitlistOnboarding onClose={() => setIsOpen(false)} />}
      </AnimatePresence>
    </>
  );
};
