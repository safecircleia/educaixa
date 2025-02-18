'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import Carousel from '@/components/ui/carousel';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

const AIVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      className="relative w-64 h-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 grid grid-cols-6 gap-2">
        {Array(36).fill(null).map((_, i) => (
          <div key={i} 
            className="aspect-square bg-[#4dc8ff]/20 rounded-full animate-pulse-slow"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

export const AITechnologySection = () => {
  const { width } = useWindowSize();

  const carouselWidth = useMemo(() => {
    if (width) {
      if (width < 640) return width - 48;
      if (width < 1024) return 480;
      return 520;
    }
    return 320;
  }, [width]);

  const carouselItems = useMemo(
    () =>
      features.map((feature, index) => ({
        id: index,
        title: feature.title,
        description: feature.description,
        icon: (
          <div className="w-10 h-10 rounded-xl bg-[#4dc8ff]/10 p-2 shadow-lg">
            <feature.icon className="w-full h-full text-[#4dc8ff]" />
          </div>
        ),
      })),
    []
  );

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#4dc8ff]/10 flex items-center justify-center">
            <Brain className="w-6 h-6 text-[#4dc8ff]" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">AI & Machine Learning</h2>
            <p className="text-white/60">Next-generation threat detection powered by neural networks</p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <SpotlightCard spotlightColor="rgba(77, 200, 255, 0.2)" className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Proprietary AI Technology</h3>
              <p className="text-white/70 leading-relaxed">
                Our in-house developed AI models process millions of data points per second, 
                built from the ground up with children&apos;s safety in mind. Our proprietary algorithms 
                identify and block threats before they reach your children while maintaining 
                complete privacy.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-xl text-[#4dc8ff]">99.9%</div>
              <div className="text-sm text-white/60">Detection Rate</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-[#4dc8ff]/10 via-transparent to-[#4dc8ff]/10 blur-3xl -z-10" />
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
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
};
