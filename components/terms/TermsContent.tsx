'use client';

import { motion } from 'framer-motion';
import { FileText, Shield, Lock, AlertCircle, Mail, Home, Check, AlertTriangle } from 'lucide-react';
import { GlowyDivider } from '@/components/ui/GlowyDivider';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();
  
  const serviceFeatures = [
    { text: t('terms.features.monitoring') },
    { text: t('terms.features.protection') },
    { text: t('terms.features.privacy') },
    { text: t('terms.features.encryption') }
  ];

  const userResponsibilities = [
    { text: t('terms.responsibilities.credentials') },
    { text: t('terms.responsibilities.compliance') },
    { text: t('terms.responsibilities.privacy') },
    { text: t('terms.responsibilities.security') }
  ];

  const liabilityLimitations = [
    { text: t('terms.limitations.connectivity') },
    { text: t('terms.limitations.violations') },
    { text: t('terms.limitations.filtering') },
    { text: t('terms.limitations.damages') }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 pt-32 pb-12"
    >
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center backdrop-blur-sm border border-amber-500/10">
            <FileText className="w-7 h-7 text-amber-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
          {t('footer.terms')}
        </h1>
      </motion.div>
      
      <div className="space-y-6">
        <TermsSection icon={FileText} title={t('terms.sections.agreement')} delay={0.1}>
          <p className="mb-4 text-white/80 leading-relaxed">
            {t('terms.agreement.description')}
          </p>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={Shield} title={t('terms.sections.service')} delay={0.2}>
          <p className="mb-4 text-white/80">{t('terms.service.description')}</p>
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

        <TermsSection icon={Lock} title={t('terms.sections.responsibilities')} delay={0.3}>
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

        <TermsSection icon={AlertTriangle} title={t('terms.sections.liability')} delay={0.4}>
          <p className="mb-4 text-white/80">{t('terms.liability.description')}</p>
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

        <TermsSection icon={FileText} title={t('terms.sections.changes')} delay={0.5}>
          <p className="text-white/80">
            {t('terms.changes.description')}
          </p>
        </TermsSection>

        <GlowyDivider />

        <TermsSection icon={Mail} title={t('terms.sections.contact')} delay={0.6}>
          <div className="flex flex-col items-start gap-4">
            <p className="text-white/80">
              {t('terms.contact.description')}
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