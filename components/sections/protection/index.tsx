'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';

const RadarAnimation = () => (
  <div className="relative w-72 h-72">
    {[1, 2, 3].map((ring) => (
      <div key={ring} className={`absolute inset-0 border-2 border-[#4dc8ff]/10 rounded-full 
        scale-${ring * 25} transition-transform duration-1000`} 
      />
    ))}
    <div className="absolute inset-0 animate-radar-spin">
      <div className="h-full w-1/2 origin-right bg-gradient-to-l from-[#4dc8ff]/20 via-[#4dc8ff]/10 to-transparent" />
    </div>
    <div className="absolute inset-0 m-auto w-2 h-2 bg-[#4dc8ff] rounded-full animate-pulse" />
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1.5 h-1.5 bg-[#4dc8ff]/60 rounded-full animate-ping"
        style={{
          left: `${50 + Math.cos(i * Math.PI / 4) * 35}%`,
          top: `${50 + Math.sin(i * Math.PI / 4) * 35}%`,
          animationDelay: `${i * 0.5}s`,
        }}
      />
    ))}
  </div>
);

export const ProtectionSection = () => (
  <div className="space-y-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-amber-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">Complete Protection</h2>
          <p className="text-white/60">All-in-one security suite for total peace of mind</p>
        </div>
      </div>
    </motion.div>

    <SpotlightCard spotlightColor="rgba(251, 191, 36, 0.2)" className="p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">360° Online Safety</h3>
            <p className="text-white/70 leading-relaxed">
              Our comprehensive protection system covers all aspects of online safety. From social media
              monitoring to device protection, we provide complete coverage for your family's digital life.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl text-amber-500">100%</div>
            <div className="text-sm text-white/60">Coverage</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <RadarAnimation />
        </div>
      </div>
    </SpotlightCard>

    <div className="grid md:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <SpotlightCard className="p-6 h-full">
            <div className="space-y-4">
              <feature.icon className="w-8 h-8 text-amber-500" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
              {feature.stats && (
                <div className="text-amber-500 font-mono">{feature.stats}</div>
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);
