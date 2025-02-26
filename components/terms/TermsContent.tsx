'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, Lock, AlertCircle, Mail, Home, Check, AlertTriangle } from 'lucide-react';
import { GlowyDivider } from '@/components/ui/GlowyDivider';
import Link from 'next/link';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const TermsSection = ({ icon: Icon, title, children, delay }: { icon: any, title: string, children: React.ReactNode, delay: number }) => (
  <motion.section
    variants={fadeInUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10">
        <Icon className="w-6 h-6 text-amber-500" />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const ListItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <motion.li
    variants={fadeInUpVariants}
    className="flex items-center gap-2 bg-gradient-to-r from-white/5 to-transparent p-3 rounded-lg"
  >
    <Icon className="w-4 h-4 text-amber-400 flex-shrink-0" aria-hidden="true" />
    <span className="text-sm text-white/80">{text}</span>
  </motion.li>
);

export function TermsContent() {
  const serviceFeatures = [
    { text: "Real-time monitoring of online activity" },
    { text: "Smart protection and content filtering" },
    { text: "Privacy-first design with zero-knowledge architecture" },
    { text: "End-to-end encrypted data protection" }
  ];

  const userResponsibilities = [
    { text: "Maintain the confidentiality of your account credentials" },
    { text: "Use the service in compliance with all applicable laws" },
    { text: "Respect the privacy rights of all users" },
    { text: "Not attempt to circumvent or disable any security features" }
  ];

  const liabilityLimitations = [
    { text: "Internet connectivity issues or service interruptions" },
    { text: "Actions taken by users in violation of these terms" },
    { text: "Content that may bypass our filtering systems" },
    { text: "Any indirect, consequential, or incidental damages" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent"
        >
          Terms of Service
        </motion.h1>
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span>Home</span>
        </Link>
      </div>
      
      <div className="space-y-4">
        <TermsSection icon={FileText} title="Agreement to Terms" delay={0.1}>
          <p className="mb-4 text-white/80 leading-relaxed">
            By accessing or using SafeCircle&apos;s services, you agree to be bound by these Terms of Service and our Privacy Policy. Our services are designed to protect families while respecting privacy and data ownership rights.
          </p>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={Shield} title="Service Description" delay={0.2}>
          <p className="mb-4 text-white/80">SafeCircle provides AI-powered child safety monitoring services that include:</p>
          <motion.ul 
            className="grid gap-3 sm:grid-cols-2"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {serviceFeatures.map((feature, index) => (
              <ListItem key={index} icon={Check} text={feature.text} />
            ))}
          </motion.ul>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={Lock} title="User Responsibilities" delay={0.3}>
          <motion.ul 
            className="grid gap-3 sm:grid-cols-2"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {userResponsibilities.map((responsibility, index) => (
              <ListItem key={index} icon={Shield} text={responsibility.text} />
            ))}
          </motion.ul>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={AlertTriangle} title="Limitation of Liability" delay={0.4}>
          <p className="mb-4 text-white/80">While we strive to provide the highest level of protection, SafeCircle is not liable for:</p>
          <motion.ul 
            className="grid gap-3 sm:grid-cols-2"
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {liabilityLimitations.map((limitation, index) => (
              <ListItem key={index} icon={AlertCircle} text={limitation.text} />
            ))}
          </motion.ul>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={FileText} title="Changes to Terms" delay={0.5}>
          <p className="text-white/80">
            We reserve the right to modify these terms at any time. Users will be notified of significant changes via email or through the service interface.
          </p>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={Mail} title="Contact Information" delay={0.6}>
          <div className="flex flex-col items-start gap-4">
            <p className="text-white/80">
              For questions about these terms, please contact our legal team:
            </p>
            <a 
              href="mailto:legal@safecircle.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500/10 to-amber-500/10 hover:from-orange-500/20 hover:to-amber-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>legal@safecircle.com</span>
            </a>
          </div>
        </TermsSection>
      </div>
    </motion.div>
  );
}