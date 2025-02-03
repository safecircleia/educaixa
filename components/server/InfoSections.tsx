'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Coins, Users, Network, Brain, Key, Database, Zap, Globe, ChartBar, Eye } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import SecuritySection from './SecuritySection';
import { useState } from 'react';

const sections = [
  {
    id: 'ai-tech',
    title: 'AI Protection',
    description: 'Our advanced neural networks analyze content in real-time while preserving complete privacy.',
    icon: Brain,
    color: 'rgba(77, 200, 255, 0.2)',
    stats: { value: '99.9%', label: 'Accuracy' },
    features: [
      { icon: Shield, title: 'Threat Detection', description: 'Real-time protection against online threats' },
      { icon: Lock, title: 'Privacy First', description: 'Zero-knowledge proofs ensure data privacy' },
      { icon: Zap, title: 'Instant Analysis', description: 'Sub-10ms response time' }
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

export function InfoSections() {
  const [currentSection, setCurrentSection] = useState(0);
  const [direction, setDirection] = useState(0);

  const navigate = (newIndex: number) => {
    setDirection(newIndex > currentSection ? 1 : -1);
    setCurrentSection(newIndex);
  };

  return (
    <div className="py-24 relative">
      <nav className="sticky top-24 z-30 backdrop-blur-xl bg-black/20 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <ul className="flex gap-8">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <button
                    onClick={() => navigate(index)}
                    className={`relative py-4 text-sm font-medium transition-colors
                      ${currentSection === index ? 'text-white' : 'text-white/60 hover:text-white'}`}
                  >
                    {section.title}
                    {currentSection === index && (
                      <motion.div
                        layoutId="activeSection"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

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
                    <sections[currentSection].icon className="w-12 h-12" />
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
                <div className="relative min-h-[400px] flex items-center">
                  <SecuritySection />
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
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
