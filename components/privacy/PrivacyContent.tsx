'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, FileCheck, Eye, Mail, Home } from 'lucide-react';
import { GlowyDivider } from '@/components/ui/GlowyDivider';
import Link from 'next/link';

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const PrivacySection = ({ icon: Icon, title, children, delay }: { icon: any, title: string, children: React.ReactNode, delay: number }) => (
  <motion.section
    variants={fadeInUpVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-teal-500/10">
        <Icon className="w-6 h-6 text-cyan-500" />
      </div>
      <h2 className="text-2xl font-semibold">{title}</h2>
    </div>
    {children}
  </motion.section>
);

export function PrivacyContent() {
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
          className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text text-transparent"
        >
          Privacy Policy
        </motion.h1>
        <Link 
          href="/" 
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/10 to-teal-500/10 hover:from-cyan-500/20 hover:to-teal-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span>Home</span>
        </Link>
      </div>
      
      <div className="space-y-4">
        <PrivacySection icon={Shield} title="Our Commitment to Privacy" delay={0.1}>
          <p className="mb-4 text-white/80 leading-relaxed">
            At SafeCircle, we prioritize the privacy and security of your family&apos;s data. Our platform is built on a zero-knowledge architecture, ensuring that your personal information remains completely private and under your control.
          </p>
        </PrivacySection>

        <GlowyDivider />

        <PrivacySection icon={Eye} title="Data Collection and Use" delay={0.2}>
          <ul className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Lock, text: "We never see or store your personal data - all monitoring is done locally" },
              { icon: Lock, text: "All data is encrypted end-to-end using AES-256 & RSA encryption" },
              { icon: Shield, text: "You maintain full ownership and control of your data" },
              { icon: FileCheck, text: "Data can be exported or deleted at any time" }
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-white/5 to-transparent p-3 rounded-lg"
              >
                <item.icon className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </PrivacySection>

        <GlowyDivider />

        <PrivacySection icon={Lock} title="Privacy Features" delay={0.3}>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Shield, text: "Zero-knowledge architecture ensures complete privacy" },
              { icon: Lock, text: "Granular privacy controls for customizing data sharing" },
              { icon: FileCheck, text: "Regular third-party security audits" },
              { icon: Shield, text: "GDPR compliant data handling" },
              { icon: Eye, text: "Transparent data processing policies" }
            ].map((item, index) => (
              <motion.li
                key={index}
                variants={fadeInUpVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-2 bg-gradient-to-r from-white/5 to-transparent p-3 rounded-lg"
              >
                <item.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span className="text-sm text-white/80">{item.text}</span>
              </motion.li>
            ))}
          </ul>
        </PrivacySection>

        <GlowyDivider />

        <PrivacySection icon={Mail} title="Contact Us" delay={0.4}>
          <div className="flex flex-col items-start gap-4">
            <p className="text-white/80">
              If you have any questions about our privacy policy or data practices, please contact our privacy team:
            </p>
            <a 
              href="mailto:privacy@safecircle.com"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-teal-500/10 to-cyan-500/10 hover:from-teal-500/20 hover:to-cyan-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-teal-500/50"
            >
              <Mail className="w-4 h-4" aria-hidden="true" />
              <span>privacy@safecircle.com</span>
            </a>
          </div>
        </PrivacySection>
      </div>
    </motion.div>
  );
}