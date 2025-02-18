import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import Carousel from '@/components/ui/carousel';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

import { features } from './features';

export const SecurityProtectionSection = () => {
  const { width } = useWindowSize();

  const carouselWidth = useMemo(() => {
    if (width) {
      if (width < 640) return width - 48;
      if (width < 1024) return 480;
      return 520;
    }
    return 320;
  }, [width]);

  const carouselItems = useMemo(() =>
    features.map((feature, index) => ({
      id: index,
      title: feature.title,
      description: feature.description,
      icon: (
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/10 to-amber-500/10 p-2 shadow-lg">
          <feature.icon className="w-full h-full text-gradient" />
        </div>
      )
    }))
  , []);

  return (
    <section className="space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500/10 to-amber-500/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-gradient" />
          </div>
          <div>
            <h2 className="text-4xl font-bold">Security & Protection</h2>
            <p className="text-white/60">
              Unified enterprise-grade security and complete online protection for your family
            </p>
          </div>
        </div>
      </motion.div>

      <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="p-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Comprehensive Defense</h3>
              <p className="text-white/70 leading-relaxed">
                Combining military-grade security with 360° online protection, our unified framework
                leverages multi-layer defense, advanced encryption, and intelligent content filtering to
                secure every facet of your digital life.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="font-mono text-xl text-gradient">256-bit</div>
              <div className="text-sm text-white/60">Encryption & Monitoring</div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-emerald-500/10 blur-3xl -z-10" />
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
    </section>
  );
};
