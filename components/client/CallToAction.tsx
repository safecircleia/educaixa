'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';
import { WaitlistButton } from '../waitlist/WaitlistButton';
import { useLanguage } from '@/context/LanguageContext';

export const CallToAction = () => {
  const { t } = useLanguage();

  const features = [
    { icon: Shield, text: t('sections.securityprotection.features.advancedencryption.slug') },
    { icon: Lock, text: t('sections.privacy.features.dataprivacy.slug') },
    { icon: Zap, text: t('sections.characteristics.features.intelligentprotection.slug') }
  ];

  return (
    <div className="relative">
      {/* Content */}
      <div className="relative py-32 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-black to-black/80">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl text-black/60">
            {t('cta.description')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <WaitlistButton />
            <motion.a
              href="#section-how-it-works"
              className="group flex items-center gap-2 px-6 py-3 rounded-lg text-black/80 hover:text-black transition-colors"
              whileHover={{ y: -2 }}
            >
              {t('cta.learnMore')}
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-8"
          >
            {features.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-black/40">
                <item.icon className="w-4 h-4" />
                <span className="text-sm">{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
