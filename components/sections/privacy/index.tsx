'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import Carousel from '@/components/ui/carousel';
import { useMemo, useState } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

export const PrivacySection = () => {
  const { width } = useWindowSize();
  
  const carouselWidth = useMemo(() => {
    if (width) {
      if (width < 640) return width - 48; // Full width on mobile minus padding
      if (width < 1024) return 480; // Tablet size
      return 520; // Desktop size
    }
    return 320; // Default fallback
  }, [width]);

  const carouselItems = useMemo(() => features.map((feature, index) => ({
    id: index,
    title: feature.title,
    description: feature.description,
    icon: (
      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} p-2 shadow-lg`}>
        <feature.icon className="w-full h-full text-white" />
      </div>
    ),
  })), []);

  return (
    <div className="space-y-16 px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
              Privacy First
            </h2>
            <p className="text-white/60">Your data belongs to you, and only you</p>
          </div>
        </div>
      </motion.div>

      <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-6 md:p-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Complete Data Privacy</h3>
              <p className="text-white/70 leading-relaxed">
                Your family&apos;s privacy is paramount. With our zero-knowledge architecture, 
                you maintain full control over your personal information. We believe privacy 
                isn&apos;t just a feature—it&apos;s a fundamental right.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-purple-500/10 p-4 rounded-lg">
              <div className="font-mono text-xl bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent">
                100%
              </div>
              <div className="text-sm text-white/60">Data ownership</div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-purple-500/10 blur-3xl -z-10" />
              <div className="relative flex justify-center items-center min-h-[400px]">
                <Carousel
                  items={carouselItems}
                  baseWidth={carouselWidth}
                  autoplay={true}
                  autoplayDelay={4000}
                  pauseOnHover={true}
                  loop={true}
                  round={false}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </SpotlightCard>
    </div>
  );
};
