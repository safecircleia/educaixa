'use client';

import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import Carousel from '@/components/ui/carousel';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

export const FeaturesSection = () => {
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
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 p-2 shadow-lg">
            <feature.icon className="w-full h-full text-indigo-500" />
          </div>
        ),
      })),
    []
  );

  return (
    <div className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 flex items-center justify-center">
            <Key className="w-6 h-6 text-indigo-500" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">Key Features</h2>
            <p className="text-white/60">Comprehensive protection for your family</p>
          </div>
        </div>
      </motion.div>

      <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Everything You Need</h3>
              <p className="text-white/70 leading-relaxed">
                SafeCircle combines essential features with advanced protection capabilities to provide
                complete digital safety for your entire family.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-xl text-indigo-500">100+</div>
              <div className="text-sm text-white/60">Features</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-transparent to-indigo-500/10 blur-3xl -z-10" />
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
