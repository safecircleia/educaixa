'use client';

import { motion, useInView } from 'framer-motion';
import { Shield, Lock, Activity, Terminal } from 'lucide-react';
import { ProcessStep } from '../shared/ProcessStep';
import { ProcessIllustration } from './ProcessIllustration';

const features = [
  { 
    title: 'Sign Up & Setup', 
  },
  { 
    title: 'AI-Powered Protection', 
    description: 'Our advanced AI monitors online activity for potential threats without accessing private data'
  },
  { 
    title: 'Real-time Monitoring', 
    description: 'Get instant alerts about suspicious activities while maintaining complete privacy'
  },
  { 
    title: 'Stay Protected', 
    description: 'Enjoy peace of mind with continuous protection and regular security updates'
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
          <Shield className="w-12 h-12 text-[#4dc8ff]" />
        </div>
      </div>

      {/* Orbiting icons */}
      {[
        { Icon: Lock, delay: 0 },
        { Icon: Activity, delay: 2 },
        { Icon: Terminal, delay: 4 }
      ].map(({ Icon, delay }, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: -delay
          }}
        >
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10"
            style={{ transform: `rotate(${i * 120}deg) translateY(-120px)` }}
          >
            <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#4dc8ff]" />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Connecting lines */}
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute inset-0 border-2 border-dashed border-gray-700/20 rounded-full" />
      </motion.div>
    </motion.div>
  </div>
);

export const HowItWorksSection = () => {
  return (
    <div className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-4 mb-16"
      >
        <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-300 to-gray-500">
          How SafeCircle Works
        </h1>
        <p className="text-xl text-gray-400 leading-relaxed">
          Experience next-generation digital protection that respects your privacy. Our zero-knowledge architecture ensures your data stays private while keeping you protected.
        </p>
      </motion.div>

      <div className="container mx-auto grid lg:grid-cols-2 gap-16 items-start">
        <div className="grid sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 50
              }}
            >
              <ProcessStep
                number={i + 1}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </div>

        {/* Video Section with enhanced styling */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="sticky top-24"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#4dc8ff]/10 via-transparent to-purple-500/10" />
            
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 0% 0%, rgba(77, 200, 255, 0.03) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 100%, rgba(77, 200, 255, 0.03) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 0%, rgba(77, 200, 255, 0.03) 0%, transparent 50%)",
                ],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className="text-center space-y-4"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="text-gray-400 font-medium">Video Demo Coming Soon</div>
                <div className="text-sm text-gray-500">See SafeCircle in action</div>
              </motion.div>
            </div>
          </div>

          {/* Video decorations */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4dc8ff]/20 to-purple-500/20 rounded-2xl blur-2xl opacity-25 -z-10" />
          <div className="absolute -inset-2 bg-gradient-to-tr from-[#4dc8ff]/10 via-transparent to-purple-500/10 rounded-2xl blur opacity-20 -z-10" />
        </motion.div>
      </div>
    </div>
  );
};
