'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import { PrivacyIllustration } from './PrivacyIllustration';

export const PrivacySection = () => (
  <div className="space-y-12">
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
          <h2 className="text-4xl font-bold">Privacy First</h2>
          <p className="text-white/60">Your data belongs to you, and only you</p>
        </div>
      </div>
    </motion.div>

    <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Complete Data Privacy</h3>
            <p className="text-white/70 leading-relaxed">
              Your family&apos;s privacy is paramount. With our zero-knowledge architecture, 
              you maintain full control over your personal information. We believe privacy 
              isn&apos;t just a feature—it&apos;s a fundamental right.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl text-purple-500">100%</div>
            <div className="text-sm text-white/60">Data ownership</div>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center justify-center"
        >
          <PrivacyIllustration />
        </motion.div>
      </div>
    </SpotlightCard>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, i) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <SpotlightCard className="p-6 h-full">
            <div className="space-y-4">
              <feature.icon className="w-8 h-8 text-purple-500" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
              {feature.stats && (
                <div className="text-purple-500 font-mono">{feature.stats}</div>
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);
