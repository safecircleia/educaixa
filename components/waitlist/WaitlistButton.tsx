'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarBorder from "@/components/ui/starborder";
import { WaitlistOnboarding } from './WaitlistOnboarding';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { CalendarDays, Sparkles, Users } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';

const isProduction = process.env.NEXT_PUBLIC_DISABLE_WAITLIST === 'true';

export const WaitlistButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  
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
            color={isProduction ? "#808080" : "blue"}
            speed="4s"
          >
            <span className="flex items-center gap-2 px-4">
              <div className="flex items-center gap-3">
                <span className={isProduction ? 'text-gray-400' : ''}>{t('waitlist.button.title')}</span>
                {!isProduction && (
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                )}
              </div>
            </span>
          </StarBorder>
        </HoverCardTrigger>
        
        {isProduction && (
          <HoverCardContent className="w-80 bg-white border border-gray-200 shadow-lg">
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-800">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                  {t('waitlist.button.comingSoon')}
                </h4>
                <p className="text-sm text-gray-600">
                  {t('waitlist.button.description')}
                </p>
                <div className="flex items-center pt-2 text-xs text-gray-500">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  <span>{t('waitlist.button.comingq1')}</span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        )}
        
        {!isProduction && (
          <HoverCardContent 
            side="top" 
            sideOffset={8}
            align="center"
            className="w-72 sm:w-80 bg-white border border-gray-200 shadow-lg rounded-xl"
          >
            <div className="flex justify-between space-x-4">
              <div className="space-y-2">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-gray-800">
                  <Users className="h-4 w-4 text-blue-600" />
                  {t('waitlist.joinProgram')}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t('waitlist.description')}
                </p>
                <div className="flex items-center pt-1.5">
                  <span className="text-xs text-blue-600 font-medium">
                    {t('waitlist.limitedSpots')}
                  </span>
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
