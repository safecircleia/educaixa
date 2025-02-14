import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';

import CombinedIllustration from './CombinedIllustration';
import { features } from './features';

export const SecurityProtectionSection = () => (
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
          <CombinedIllustration />
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
              <feature.icon className="w-8 h-8 text-gradient" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
              {feature.stats && (
                <div className="text-sm font-mono text-white/70">{feature.stats}</div>
              )}
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </section>
);
