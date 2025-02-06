'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';

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

export const AITechnologySection = () => (
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
            <h3 className="text-2xl font-bold">Real-time Protection</h3>
            <p className="text-white/70 leading-relaxed">
              Our AI system processes millions of data points per second, identifying and blocking threats 
              before they reach your children while maintaining complete privacy.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl text-[#4dc8ff]">99.9%</div>
            <div className="text-sm text-white/60">Detection Rate</div>
          </div>
        </div>
        <AIVisual />
      </div>
    </SpotlightCard>

    {/* Features Grid */}
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
              <feature.icon className="w-8 h-8 text-[#4dc8ff]" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
              {feature.stats && (
                <div className="text-[#4dc8ff] font-mono">{feature.stats}</div>
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);
