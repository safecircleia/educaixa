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
    className="bg-white rounded-lg p-6 backdrop-blur-sm border border-gray-200/80 shadow-sm hover:shadow-md hover:shadow-amber-500/5 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 shadow-sm">
        <Icon className="w-6 h-6 text-amber-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const ListItem = ({ icon: Icon, text }: { icon: any, text: string }) => (
  <motion.li
    variants={fadeInUpVariants}
    className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-amber-100 transition-colors shadow-sm"
  >
    <Icon className="w-4 h-4 text-amber-600 flex-shrink-0" aria-hidden="true" />
    <span className="text-sm text-gray-700">{text}</span>
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
    <div className="min-h-screen">
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center backdrop-blur-sm border border-amber-200/50 shadow-sm">
              <FileText className="w-7 h-7 text-amber-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-amber-600 to-amber-800 bg-clip-text text-transparent mb-4">
            {t('footer.terms')}
          </h1>
        </motion.div>
        
        <div className="space-y-6">
          <TermsSection icon={FileText} title={t('terms.sections.agreement')} delay={0.1}>
            <p className="mb-4 text-gray-700 leading-relaxed">
              {t('terms.agreement.description')}
            </p>
          </TermsSection>
          
          <GlowyDivider />
          
          <TermsSection icon={Shield} title={t('terms.sections.service')} delay={0.2}>
            <p className="mb-4 text-gray-700">{t('terms.service.description')}</p>
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
            <p className="mb-4 text-gray-700">{t('terms.liability.description')}</p>
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
            <p className="text-gray-700">
              {t('terms.changes.description')}
            </p>
          </TermsSection>
          
          <GlowyDivider />
          
          <TermsSection icon={Mail} title={t('terms.sections.contact')} delay={0.6}>
            <div className="flex flex-col items-start gap-4">
              <p className="text-gray-700">
                {t('terms.contact.description')}
              </p>
              <a 
                href="mailto:legal@safecircle.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/50 hover:border-amber-300/70 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-amber-500/30 text-amber-700"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>legal@safecircle.com</span>
              </a>
            </div>
          </TermsSection>
        </div>
      </motion.div>
    </div>
  );
}