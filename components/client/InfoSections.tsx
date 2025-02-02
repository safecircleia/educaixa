'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Coins, Users, Network, Brain, Key, Database, Zap, Globe, ChartBar, Eye, Sparkles, Code, MessageCircle } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { useState } from 'react';
import { GlowyDivider } from '../ui/GlowyDivider';

const sections = [
  {
    id: 'technology',
    title: 'AI & Privacy',
    description: 'Revolutionary child protection powered by zero-knowledge proofs and neural networks',
    icon: Brain,
    color: 'rgba(77, 200, 255, 0.2)',
    stats: { value: '99.9%', label: 'Detection Rate' },
    features: [
      { 
        icon: Shield, 
        title: 'Advanced Protection', 
        description: 'Multi-layer threat detection using state-of-the-art neural networks',
        stats: '24/7 monitoring'
      },
      { 
        icon: Lock, 
        title: 'Zero-Knowledge Proofs', 
        description: 'Military-grade encryption ensuring complete data privacy',
        stats: 'AES-256 bit'
      },
      { 
        icon: Zap, 
        title: 'Real-time Analysis', 
        description: 'Instant threat detection and prevention mechanisms',
        stats: '<100ms latency'
      }
    ]
  },
  {
    id: 'network',
    title: 'Global Network',
    description: 'Distributed infrastructure ensuring maximum security and uninterrupted protection.',
    icon: Globe,
    color: 'rgba(168, 85, 247, 0.2)',
    stats: { value: '100%', label: 'Uptime' },
    features: [
      { icon: Network, title: 'Edge Computing', description: 'Globally distributed nodes' },
      { icon: Database, title: 'Secure Storage', description: 'End-to-end encrypted data' },
      { icon: Eye, title: 'Transparent', description: 'Open-source architecture' }
    ]
  },
  {
    id: 'token',
    title: 'Token Economy',
    description: 'Stake $SC tokens to participate in governance and earn rewards.',
    icon: Coins,
    color: 'rgba(251, 191, 36, 0.2)',
    stats: { value: '12%', label: 'APY' },
    features: [
      { icon: Users, title: 'Community DAO', description: 'Decentralized governance' },
      { icon: ChartBar, title: 'Staking', description: 'Earn passive rewards' }
    ]
  }
];

const InfoSectionsWrapper = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newIndex: number) => {
    setDirection(newIndex > currentSection ? 1 : -1);
    setCurrentSection(newIndex);
  };

  return (
    <motion.div className="relative">
      <GlowyDivider />
      <div className="container mx-auto px-4 mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-12"
          >
            <SpotlightCard
              spotlightColor={sections[currentSection].color}
              className="p-8"
            >
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    {React.createElement(sections[currentSection].icon, { className: "w-12 h-12" })}
                    <div className="space-y-1">
                      <h2 className="text-3xl font-bold">{sections[currentSection].title}</h2>
                      <div className="flex items-center gap-2 text-[#4dc8ff]">
                        <span className="font-mono text-xl">{sections[currentSection].stats.value}</span>
                        <span className="text-sm text-white/60">{sections[currentSection].stats.label}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg text-white/70 leading-relaxed">
                    {sections[currentSection].description}
                  </p>
                </div>
              </div>
            </SpotlightCard>

            <div className="grid md:grid-cols-3 gap-6">
              {sections[currentSection].features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <SpotlightCard className="p-6 h-full hover:scale-[1.02] transition-all duration-300">
                    <div className="space-y-4">
                      <feature.icon className="w-8 h-8 text-[#4dc8ff]" />
                      <h3 className="text-xl font-semibold">{feature.title}</h3>
                      <p className="text-white/60">{feature.description}</p>
                      {feature.stats && <p className="text-white/60">{feature.stats}</p>}
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const InfoSections = () => {
  return (
    <motion.div>
      <InfoSectionsWrapper />
    </motion.div>
  );
};
