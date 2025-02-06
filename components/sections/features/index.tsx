'use client';

import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';

const FeaturesVisual = () => (
  <div className="relative w-72 h-72">
    <motion.div 
      className="absolute inset-0 grid grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Array(9).fill(null).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square rounded-xl bg-gradient-to-br from-indigo-500/10 to-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        >
          <div className="h-full p-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-indigo-500/40 rounded-full animate-pulse-slow" 
              style={{ animationDelay: `${i * 200}ms` }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export const FeaturesSection = () => (
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
          <FeaturesVisual />
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
              <feature.icon className="w-8 h-8 text-indigo-500" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);
