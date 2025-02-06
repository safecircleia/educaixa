'use client';

import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { ProcessStep } from '../shared/ProcessStep';

const features = [
  { 
    title: 'Real-time Monitoring', 
    description: 'Our AI constantly analyzes online activity for potential threats'
  },
  { 
    title: 'Smart Protection', 
    description: 'Automated blocking of harmful content and suspicious activities'
  },
  { 
    title: 'Privacy-First Design', 
    description: 'Zero-knowledge proofs ensure complete data privacy'
  }
];

const HowItWorksVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-72 h-72"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-gray-700/30 flex items-center justify-center">
          <Shield className="w-12 h-12 text-gray-500" />
        </div>
      </div>

      {/* Orbiting particles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "linear",
            delay: i * -2
          }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4"
            style={{ transform: `rotate(${i * 120}deg) translateY(-120px)` }}
          >
            <div className="w-full h-full rounded-full bg-gray-700/20 animate-pulse-slow" 
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          </div>
        </motion.div>
      ))}

      {/* Connecting lines */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-dashed border-gray-700/10 rounded-full" />
      </motion.div>
    </motion.div>
  </div>
);

export const HowItWorksSection = () => {
  return (
    <div className="space-y-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
          How SafeCircle Works
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          SafeCircle combines AI-powered threat detection with blockchain security to create an impenetrable shield around your family's digital life.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((feature, i) => (
          <ProcessStep
            key={feature.title}
            number={i + 1}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>

      <div className="relative h-[400px]">
        <HowItWorksVisual />
      </div>
    </div>
  );
};
