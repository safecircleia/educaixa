'use client';

import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Brain, Network, Database, Zap, Eye, FileCheck, Bot, Key, Clock, Bell } from 'lucide-react';
import { SpotlightCard } from '../ui/SpotlightCard';
import SecuritySection from '../server/SecuritySection';
import { useState } from 'react';
import { GlowyDivider } from '../ui/GlowyDivider';
import { WaitlistButton } from '../client/WaitlistButton';

// Update How It Works section in sections array
const sections = [
  {
    id: 'section-how-it-works',
    title: 'How SafeCircle Works',
    shortTitle: 'How It Works',
    description: 'Protecting your family with advanced AI and blockchain technology',
    icon: Brain,
    color: 'rgba(77, 200, 255, 0.2)',
    stats: { value: '24/7', label: 'Protection' },
    mainContent: 'SafeCircle combines AI-powered threat detection with blockchain security to create an impenetrable shield around your family\'s digital life. Our system works in three simple steps:',
    features: [
      { 
        icon: Zap, 
        title: 'Real-time Monitoring', 
        description: 'Our AI constantly analyzes online activity for potential threats',
        stats: 'Instant Detection'
      },
      { 
        icon: Shield, 
        title: 'Smart Protection', 
        description: 'Automated blocking of harmful content and suspicious activities',
        stats: '99.9% Accuracy'
      },
      { 
        icon: Eye, 
        title: 'Privacy-First Design', 
        description: 'Zero-knowledge proofs ensure complete data privacy',
        stats: 'Military Grade'
      }
    ]
  },
  {
    id: 'section-ai',
    title: 'AI & Machine Learning',
    shortTitle: 'AI Technology',
    description: 'Next-generation threat detection powered by advanced neural networks',
    icon: Brain,
    color: 'rgba(77, 200, 255, 0.2)',
    stats: { value: '99.9%', label: 'Detection Rate' },
    subtitle: 'Real-time Protection with Neural Networks',
    mainContent: 'Our AI system processes millions of data points per second, identifying and blocking threats before they reach your children. Using state-of-the-art machine learning models, we ensure the highest level of protection while maintaining complete privacy.',
    features: [
      { 
        icon: Bot, 
        title: 'Smart Detection', 
        description: 'Advanced pattern recognition for threat identification',
        stats: '500M+ patterns'
      },
      { 
        icon: Zap, 
        title: 'Lightning Fast', 
        description: 'Industry-leading response time for instant protection',
        stats: '<5ms latency'
      },
      { 
        icon: Brain, 
        title: 'Self-Learning', 
        description: 'Continuous improvement through behavioral analysis',
        stats: '24/7 updates'
      }
    ]
  },
  {
    id: 'section-privacy',
    title: 'Privacy & Security',
    shortTitle: 'Privacy',
    description: 'Military-grade encryption with zero-knowledge architecture',
    icon: Lock,
    color: 'rgba(168, 85, 247, 0.2)',
    stats: { value: 'AES-256', label: 'Encryption' },
    subtitle: 'Uncompromising Data Protection',
    mainContent: 'Your family\'s privacy is our top priority. Using zero-knowledge proofs and end-to-end encryption, we ensure that your data remains completely private and secure, even from us.',
    features: [
      { icon: Lock, title: 'Zero-Knowledge', description: 'Complete data privacy guarantee', stats: '256-bit encryption' },
      { icon: Database, title: 'Secure Storage', description: 'Distributed encrypted data centers', stats: '99.999% uptime' },
      { icon: Eye, title: 'Transparency', description: 'Open-source security protocols', stats: 'Regular audits' }
    ]
  },
  {
    id: 'section-protection',
    title: 'Complete Protection',
    shortTitle: 'Protection',
    description: 'All-in-one security suite for total peace of mind',
    icon: Shield,
    color: 'rgba(251, 191, 36, 0.2)',
    stats: { value: '100%', label: 'Coverage' },
    subtitle: '360° Online Safety',
    mainContent: 'Our comprehensive protection system covers all aspects of online safety. From social media monitoring to device protection, we provide complete coverage for your family\'s digital life.',
    features: [
      { icon: Shield, title: 'Multi-Layer Defense', description: 'Multiple security layers working in harmony', stats: '24/7 active' },
      { icon: Network, title: 'Network Shield', description: 'Secure connection on any network', stats: 'Global coverage' },
      { icon: FileCheck, title: 'Smart Filtering', description: 'Intelligent content filtering', stats: 'Real-time' }
    ]
  },
  {
    id: 'section-features',
    title: 'Key Features',
    shortTitle: 'Features',
    description: 'Comprehensive protection for your family',
    icon: Key,
    color: 'rgba(99, 102, 241, 0.2)',
    stats: { value: '100+', label: 'Features' },
    features: [
      { icon: Lock, title: 'Access Control', description: 'Granular permission settings' },
      { icon: Clock, title: 'Time Management', description: 'Screen time controls' },
      { icon: Bell, title: 'Alert System', description: 'Instant notifications' }
    ]
  },
  {
    id: 'section-security',
    title: 'Security Framework',
    shortTitle: 'Security',
    description: 'Enterprise-grade protection for families',
    icon: Shield,
    color: 'rgba(16, 185, 129, 0.2)',
    stats: { value: 'Military', label: 'Grade' },
    features: [
      { icon: Lock, title: 'Encryption', description: 'End-to-end data protection' },
      { icon: Network, title: 'VPN', description: 'Secure network access' },
      { icon: FileCheck, title: 'Compliance', description: 'Regular security audits' }
    ]
  }
];

// Add new RadarAnimation component
const RadarAnimation = () => {
  return (
    <div className="relative w-72 h-72">
      {/* Multiple radar rings */}
      {[1, 2, 3].map((ring) => (
        <div key={ring} className={`absolute inset-0 border-2 border-[#4dc8ff]/10 rounded-full 
          scale-${ring * 25} transition-transform duration-1000`} 
        />
      ))}
      {/* Scanning effect */}
      <div className="absolute inset-0 animate-radar-spin">
        <div className="h-full w-1/2 origin-right bg-gradient-to-l from-[#4dc8ff]/20 via-[#4dc8ff]/10 to-transparent" />
      </div>
      {/* Center dot */}
      <div className="absolute inset-0 m-auto w-2 h-2 bg-[#4dc8ff] rounded-full animate-pulse" />
      {/* Radar points */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-[#4dc8ff]/60 rounded-full animate-ping"
          style={{
            left: `${50 + Math.cos(i * Math.PI / 4) * 35}%`,
            top: `${50 + Math.sin(i * Math.PI / 4) * 35}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}
    </div>
  );
};

// Add new ProcessStep component for How It Works
const ProcessStep = ({ number, title, description }: { 
  number: number; 
  title: string; 
  description: string;
}) => (
  <motion.div 
    className="relative flex items-start gap-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4dc8ff]/10 flex items-center justify-center">
      <span className="text-sm font-mono text-[#4dc8ff]">{number}</span>
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.div>
);

// Add new visualization components
const HowItWorksVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative w-72 h-72"
    >
      {/* Center circle */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full border-4 border-[#4dc8ff]/20 flex items-center justify-center">
          <Shield className="w-12 h-12 text-[#4dc8ff]/40" />
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
            <div className="w-full h-full rounded-full bg-[#4dc8ff]/20 animate-pulse-slow" 
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
        <div className="absolute inset-0 border-2 border-dashed border-[#4dc8ff]/10 rounded-full" />
      </motion.div>
    </motion.div>
  </div>
);

const FeaturesVisual = () => (
  <div className="relative w-72 h-72">
    <motion.div 
      className="absolute inset-0 grid grid-cols-3 gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Array(9).fill(null).map((_, i) => (
        <motion.div
          key={i}
          className="aspect-square rounded-xl bg-gradient-to-br from-[#4dc8ff]/10 to-transparent"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.5,
            delay: i * 0.1,
            ease: "easeOut"
          }}
        >
          <div className="h-full p-2 flex items-center justify-center">
            <div className="w-2 h-2 bg-[#4dc8ff]/40 rounded-full animate-pulse-slow" 
              style={{ animationDelay: `${i * 200}ms` }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

const SecurityVisual = () => (
  <div className="relative w-72 h-72">
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Concentric hexagons */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: i * 0.2 }}
        >
          <div 
            className={`w-${48 - i * 8} h-${48 - i * 8} border-2 border-[#4dc8ff]/20
              rotate-${i * 15} transition-transform duration-1000`}
            style={{ clipPath: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" }}
          >
            <div className="absolute inset-0 animate-pulse-slow"
              style={{ animationDelay: `${i * 300}ms` }}
            />
          </div>
        </motion.div>
      ))}
      
      {/* Scanning line */}
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
          background: 'linear-gradient(45deg, transparent 0%, #4dc8ff20 50%, transparent 100%)',
          backgroundSize: '200% 200%'
        }}
      />
    </motion.div>
  </div>
);

// ContentVisualizations component to handle different section visualizations
const ContentVisualizations = ({ section }: { section: string }) => {
  const renderVisual = useCallback(() => {
    switch (section) {
      case 'section-how-it-works':
        return <HowItWorksVisual />;
      case 'section-features':
        return <FeaturesVisual />;
      case 'section-security':
        return <SecurityVisual />;
      case 'section-privacy':
        return <SecuritySection />;
      case 'section-ai':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* AI Visualization with improved loading */}
            <motion.div 
              className="relative w-64 h-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 grid grid-cols-6 gap-2">
                {Array(36).fill(null).map((_, i) => (
                  <div key={i} 
                    className="aspect-square bg-[#4dc8ff]/20 rounded-full animate-pulse-slow"
                    style={{ animationDelay: `${i * 100}ms` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        );
      case 'section-protection':
        return (
          <div className="relative w-full h-full flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <RadarAnimation />
            </motion.div>
          </div>
        );
      default:
        return null;
    }
  }, [section]);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={section}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
        >
          {renderVisual()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

// Add TableOfContents component
const TableOfContents = ({ sections, currentSection, onNavigate }: {
  sections: typeof sections,
  currentSection: number,
  onNavigate: (index: number) => void
}) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 border border-white/5">
        <div className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => onNavigate(index)}
              className={`flex items-center gap-3 group transition-all duration-200
                ${currentSection === index ? 'text-[#4dc8ff]' : 'text-white/40 hover:text-white'}`}
            >
              <div className="relative h-4 w-4">
                <div className={`absolute inset-0 rounded-full border-2 
                  ${currentSection === index ? 'border-[#4dc8ff]' : 'border-white/40 group-hover:border-white'}`} 
                />
                {currentSection === index && (
                  <div className="absolute inset-1 rounded-full bg-[#4dc8ff] animate-pulse" />
                )}
              </div>
              <span className="text-sm font-medium whitespace-nowrap">{section.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add ScrollIndicator component
const ScrollIndicator = ({ sections, currentSection }: {
  sections: typeof sections,
  currentSection: number
}) => {
  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40">
      <div className="flex flex-col items-center gap-2">
        {sections.map((_, index) => (
          <div
            key={index}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300
              ${index === currentSection 
                ? 'bg-[#4dc8ff] h-4' 
                : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>
    </div>
  );
};

// Add new hook for scroll tracking
const useScrollSpy = (sectionIds: string[], offset = 0) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionIds.indexOf(entry.target.id.replace('section-', ''));
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { rootMargin: `${-offset}px 0px 0px 0px`, threshold: 0.5 }
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(`section-${id}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sectionIds, offset]);

  return activeSection;
};

// Add new CTA component
const CallToAction = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    className="relative py-32"
  >
    {/* Background effects */}
    <div className="absolute inset-0 bg-gradient-radial from-[#4dc8ff]/10 via-transparent to-transparent" />
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4dc8ff]/10 via-transparent to-transparent opacity-60 blur-2xl" />
    </div>

    <div className="relative container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto space-y-8"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
          Ready to Protect Your Family?
        </h2>
        <p className="text-lg md:text-xl text-white/60">
          Join thousands of families already using SafeCircle to ensure their children's online safety.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <WaitlistButton />
          <motion.a
            href="#how-it-works"
            className="group flex items-center gap-2 px-8 py-4 rounded-full text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Learn More
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 4 }}
              className="inline-block transition-transform"
            >
              →
            </motion.span>
          </motion.a>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="pt-8 flex items-center justify-center gap-8 text-white/40"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="text-sm">Military-grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Privacy First</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm">Real-time Protection</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  </motion.div>
);

const InfoSectionsWrapper = () => {
  const [direction, setDirection] = useState(0);
  const currentSection = useScrollSpy(sections.map(s => s.id), 100);

  const scrollToSection = (index: number) => {
    setDirection(index > currentSection ? 1 : -1);
    const element = document.getElementById(`section-${sections[index].id}`);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    // Handle initial hash navigation
    const hash = window.location.hash.replace('#', '');
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="relative">
      {/* Remove navbar */}
      
      {/* Scroll Indicator */}
      <ScrollIndicator sections={sections} currentSection={currentSection} />

      {/* Sections */}
      {sections.map((section, index) => (
        <React.Fragment key={section.id}>
          <section
            id={`section-${section.id}`}
            className="min-h-screen py-24 flex items-center"
          >
            <div className="container mx-auto px-4">
              {/* Special layout for How It Works section */}
              {section.id === 'section-how-it-works' ? (
                <div className="space-y-16">
                  {/* Section header */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto space-y-4"
                  >
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                      {section.title}
                    </h1>
                    <p className="text-xl text-white/60 leading-relaxed">
                      {section.mainContent}
                    </p>
                  </motion.div>

                  {/* Process steps */}
                  <div className="grid md:grid-cols-3 gap-8">
                    {section.features.map((feature, i) => (
                      <ProcessStep
                        key={feature.title}
                        number={i + 1}
                        title={feature.title}
                        description={feature.description}
                      />
                    ))}
                  </div>

                  {/* Visualization */}
                  <div className="relative h-[400px]">
                    <HowItWorksVisual />
                  </div>
                </div>
              ) : (
                // Regular section layout
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-12"
                  >
                    {/* Section Title */}
                    <div className="flex items-center gap-4 mb-12">
                      <div className="w-12 h-12 rounded-full bg-[#4dc8ff]/10 flex items-center justify-center">
                        {React.createElement(section.icon, { className: "w-6 h-6 text-[#4dc8ff]" })}
                      </div>
                      <div>
                        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                          {section.title}
                        </h1>
                        <p className="text-lg text-white/60">{section.description}</p>
                      </div>
                    </div>

                    {/* Main Content */}
                    <SpotlightCard
                      spotlightColor={section.color}
                      className="p-8"
                    >
                      <div className="grid md:grid-cols-2 gap-12">
                        {/* Content Section */}
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
                        {/* Visualization Section */}
                        <div className="relative min-h-[400px] flex items-center justify-center">
                          <ContentVisualizations section={sections[currentSection].id} />
                        </div>
                      </div>
                    </SpotlightCard>

                    {/* Features Grid */}
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
              )}
            </div>
          </section>
          {/* Add GlowyDivider between sections */}
          {index < sections.length - 1 && <GlowyDivider />}
        </React.Fragment>
      ))}

      {/* Add CTA section */}
      <CallToAction />
    </div>
  );
};

export const InfoSections = () => {
  return <InfoSectionsWrapper />;
};
