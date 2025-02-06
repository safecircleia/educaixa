'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';

export const PrivacySection = () => (
  <div className="space-y-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
          <Lock className="w-6 h-6 text-purple-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">Privacy & Security</h2>
          <p className="text-white/60">Military-grade encryption with zero-knowledge architecture</p>
        </div>
      </div>
    </motion.div>

    <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.2)" className="p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Uncompromising Data Protection</h3>
            <p className="text-white/70 leading-relaxed">
              Your family's privacy is our top priority. Using zero-knowledge proofs and end-to-end encryption, 
              we ensure that your data remains completely private and secure, even from us.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl text-purple-500">AES-256</div>
            <div className="text-sm text-white/60">Encryption</div>
          </div>
        </div>
        {/* Privacy Visual Component would go here */}
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
