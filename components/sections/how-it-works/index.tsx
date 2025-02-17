'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Lock, Activity, Terminal } from 'lucide-react';
import { ProcessStep } from '../shared/ProcessStep';
import { VideoCard } from '@/components/ui/video-card';
import { useRef } from 'react';

const features = [
  { 
    title: 'Sign Up & Setup',
    description: 'Create your account and set up your security preferences in minutes with our intuitive onboarding process.',
    icon: Shield
  },
  { 
    title: 'AI-Powered Protection',
    description: 'Our advanced AI monitors online activity for potential threats without accessing private data, ensuring maximum security.',
    icon: Terminal
  },
  { 
    title: 'Real-time Monitoring',
    description: 'Get instant alerts about suspicious activities while maintaining complete privacy through our zero-knowledge architecture.',
    icon: Activity
  },
  { 
    title: 'Stay Protected',
    description: 'Enjoy peace of mind with continuous protection, regular security updates, and proactive threat prevention.',
    icon: Lock
  }
];

export const HowItWorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0]);

  return (
    <div ref={containerRef} className="relative py-32 overflow-hidden">
      {/* Enhanced Background Effects */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: backgroundOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </motion.div>
      
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto space-y-6 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-blue-100 to-gray-200">
              How SafeCircle Works
            </h1>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 leading-relaxed"
          >
            Experience next-generation digital protection that respects your privacy. 
            Our zero-knowledge architecture ensures your data stays private while keeping you protected.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="relative space-y-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: i * 0.15,
                  type: "spring",
                  stiffness: 50
                }}
              >
                <ProcessStep
                  number={i + 1}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  isLast={i === features.length - 1}
                />
              </motion.div>
            ))}
          </div>

          <div className="lg:sticky lg:top-24">
            <VideoCard
              title="See How It Works"
              subtitle="Watch our quick demo video"
              duration="2:30"
              thumbnailUrl="/video-thumbnail.jpg"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
