'use client';

import { motion } from 'framer-motion';
import { Lock, Shield, FileCheck, Eye, Mail } from 'lucide-react';
import { GlowyDivider } from '@/components/ui/GlowyDivider';
import { useLanguage } from '@/context/LanguageContext';

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
    className="bg-white rounded-lg p-6 backdrop-blur-sm border border-gray-200/80 shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 shadow-sm">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
    </div>
    {children}
  </motion.section>
);

export function PrivacyContent() {
  const { t } = useLanguage();
  
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center backdrop-blur-sm border border-blue-200/50 shadow-sm">
              <Lock className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            {t('privacy.title')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t('privacy.subtitle')}
          </p>
        </motion.div>
        
        <div className="space-y-8">
          <PrivacySection icon={Shield} title={t('privacy.sections.commitment.title')} delay={0.1}>
            <p className="mb-4 text-gray-700 leading-relaxed">
              {t('privacy.sections.commitment.content')}
            </p>
          </PrivacySection>

          <GlowyDivider />

          <PrivacySection icon={Eye} title={t('privacy.sections.dataCollection.title')} delay={0.2}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {['localMonitoring', 'encryption', 'control', 'export'].map((key, index) => (
                <motion.li
                  key={key}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors shadow-sm"
                >
                  <FileCheck className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{t(`privacy.sections.dataCollection.items.${key}`)}</span>
                </motion.li>
              ))}
            </ul>
          </PrivacySection>

          <GlowyDivider />

          <PrivacySection icon={Lock} title={t('privacy.sections.features.title')} delay={0.3}>
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {['zeroKnowledge', 'controls', 'audits', 'gdpr', 'transparency'].map((key, index) => (
                <motion.li
                  key={key}
                  variants={fadeInUpVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-gray-50 to-white p-3 rounded-lg border border-gray-100 hover:border-blue-100 transition-colors shadow-sm"
                >
                  <Shield className="w-4 h-4 text-blue-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{t(`privacy.sections.features.items.${key}`)}</span>
                </motion.li>
              ))}
            </ul>
          </PrivacySection>

          <GlowyDivider />

          <PrivacySection icon={Mail} title={t('privacy.sections.contact.title')} delay={0.4}>
            <div className="flex flex-col items-start gap-4">
              <p className="text-gray-700">
                {t('privacy.sections.contact.content')}
              </p>
              <a 
                href={`mailto:${t('privacy.sections.contact.email')}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/50 hover:border-blue-300/70 shadow-sm hover:shadow transition-all focus:outline-none focus:ring-2 focus:ring-blue-500/30 text-blue-700"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
                <span>{t('privacy.sections.contact.email')}</span>
              </a>
            </div>
          </PrivacySection>
        </div>
      </motion.div>
    </div>
  );
}