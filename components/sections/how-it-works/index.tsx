'use client';

import { motion } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const HowItWorksSection = () => {
  const { t } = useLanguage();

  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 space-y-12 max-w-5xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400">
            {t('sections.howItWorks.title')}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('sections.howItWorks.description')}
          </p>
        </motion.div>

        {/* Video Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/10 border border-white/10">
            {/* Video Player */}
            <div className="relative w-full bg-black/40 backdrop-blur-sm" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/KMNUBzgh64I?si=bUGGFmyFq8ppZBnC"
                title="SafeCircle - How it works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </motion.div>
        
        {/* Quick Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6"
        >
          <div className="bg-blue-500/5 backdrop-blur-sm border border-blue-500/10 rounded-xl p-5 hover:bg-blue-500/10 transition-all duration-300">
            <div className="font-medium text-blue-400 mb-1">
              {t('sections.howItWorks.benefits.quickSetup.title')}
            </div>
            <div className="text-white/70 text-sm">
              {t('sections.howItWorks.benefits.quickSetup.description')}
            </div>
          </div>
          <div className="bg-blue-500/5 backdrop-blur-sm border border-blue-500/10 rounded-xl p-5 hover:bg-blue-500/10 transition-all duration-300">
            <div className="font-medium text-blue-400 mb-1">
              {t('sections.howItWorks.benefits.protection247.title')}
            </div>
            <div className="text-white/70 text-sm">
              {t('sections.howItWorks.benefits.protection247.description')}
            </div>
          </div>
          <div className="bg-blue-500/5 backdrop-blur-sm border border-blue-500/10 rounded-xl p-5 hover:bg-blue-500/10 transition-all duration-300">
            <div className="font-medium text-blue-400 mb-1">
              {t('sections.howItWorks.benefits.easyToUse.title')}
            </div>
            <div className="text-white/70 text-sm">
              {t('sections.howItWorks.benefits.easyToUse.description')}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
