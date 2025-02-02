'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Coins, Eye, Network, Brain, Key, Database } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import { GlowyDivider } from '../ui/GlowyDivider';

const mainSections = [
  {
    id: 'how-it-works',
    title: 'How It Works',
    description: 'Advanced AI-driven child protection system',
    icon: Shield,
    color: 'rgba(77, 200, 255, 0.2)',
    subsections: [
      {
        title: 'AI Analysis',
        description: 'Real-time content analysis with privacy-preserving AI models',
        icon: Brain
      },
      {
        title: 'Network Security',
        description: 'Distributed network ensuring maximum uptime and protection',
        icon: Network
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy First',
    description: 'Zero-knowledge proof technology',
    icon: Lock,
    color: 'rgba(168, 85, 247, 0.2)',
    variant: 'blue',
    subsections: [
      {
        title: 'Encryption',
        description: 'End-to-end encryption with homomorphic capabilities',
        icon: Key
      },
      {
        title: 'Data Protection',
        description: 'Decentralized storage with client-side encryption',
        icon: Database
      }
    ]
  },
  {
    id: 'token',
    title: 'Token Economy',
    description: 'The $SC token powers our decentralized safety network. Stake tokens to participate in governance and earn rewards.',
    icon: Coins,
    color: 'rgba(251, 191, 36, 0.2)',
    subsections: []
  },
  {
    id: 'transparency',
    title: 'Transparency',
    description: 'Trust through transparency. Our codebase is open-source, regularly audited, and every decision is made with community input.',
    icon: Eye,
    color: 'rgba(16, 185, 129, 0.2)',
    subsections: []
  }
];

export function InfoSections() {
  return (
    <div className="py-20">
      {mainSections.map((section, i) => (
        <div key={section.title} id={section.id}>
          <GlowyDivider direction={i === 0 ? 'top' : 'bottom'} showBuckle={i === 0} />
          <section className="py-24">
            <div className="container mx-auto px-4">
              {/* Main Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <SpotlightCard spotlightColor={section.color}>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <h2 className="text-4xl font-bold">{section.title}</h2>
                      <p className="text-lg text-white/70 leading-relaxed">{section.description}</p>
                    </div>
                    <div className="flex justify-center">
                      <div className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm">
                        <section.icon className="w-24 h-24 text-white/80" />
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>

              {/* Subsections using PixelCard for Privacy section */}
              {section.id === 'privacy' ? (
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {section.subsections.map((subsection) => (
                    <SpotlightCard
                      key={subsection.title}
                      variant="blue"
                      className="!h-auto aspect-[3/2]"
                    >
                      <div className="relative z-10 p-6">
                        <subsection.icon className="w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{subsection.title}</h3>
                        <p className="text-white/70">{subsection.description}</p>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                  {section.subsections.map((subsection) => (
                    <SpotlightCard
                      key={subsection.title}
                      spotlightColor={section.color}
                      className="!p-6"
                    >
                      <div className="relative z-10 p-6">
                        <subsection.icon className="w-8 h-8 mb-4" />
                        <h3 className="text-xl font-semibold mb-2">{subsection.title}</h3>
                        <p className="text-white/70">{subsection.description}</p>
                      </div>
                    </SpotlightCard>
                  ))}
                </div>
              )}
            </div>
          </section>
          {i === mainSections.length - 1 && <GlowyDivider direction="bottom" showBuckle />}
        </div>
      ))}
    </div>
  );
}
