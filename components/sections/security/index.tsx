'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';

const SecurityVisual = () => (
  <div className="relative w-72 h-72">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <div 
            className={`w-${48 - i * 8} h-${48 - i * 8} border-2 border-emerald-500/20
              rotate-${i * 15} transition-transform duration-1000`}
            style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
          >
            <div className="absolute inset-0 animate-pulse-slow"
              style={{ animationDelay: `${i * 300}ms` }}
            />
          </div>
        </motion.div>
      ))}
      
      <motion.div
        className="absolute inset-0"
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          background: 'linear-gradient(45deg, transparent 0%, #10b981 50%, transparent 100%)',
          backgroundSize: '200% 200%'
        }}
      />
    </motion.div>
  </div>
);

export const SecuritySection = () => (
  <div className="space-y-12">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center">
          <Shield className="w-6 h-6 text-emerald-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">Security Framework</h2>
          <p className="text-white/60">Enterprise-grade protection for families</p>
        </div>
      </div>
    </motion.div>

    <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="p-8">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Military-Grade Security</h3>
            <p className="text-white/70 leading-relaxed">
              Our security framework is built on the same principles used by military and enterprise
              systems, ensuring the highest level of protection for your family.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-mono text-xl text-emerald-500">256-bit</div>
            <div className="text-sm text-white/60">Encryption</div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <SecurityVisual />
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
              <feature.icon className="w-8 h-8 text-emerald-500" />
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </div>
  </div>
);
