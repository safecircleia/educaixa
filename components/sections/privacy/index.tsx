'use client';

import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { getFeatures } from './features';
import { useMemo } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export const PrivacySection = () => {
  const { t } = useLanguage();
  const features = useMemo(() => getFeatures(t), [t]);
  
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      
      <div className="container mx-auto px-4 space-y-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-6"
        >
          <motion.div 
            className="inline-flex items-center justify-center"
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 flex items-center justify-center">
                <Lock className="w-10 h-10 text-purple-600" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-purple-400/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.2, 0.5]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 bg-clip-text text-transparent">
            {t('sections.privacy.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('sections.privacy.description')}
          </p>
        </motion.div>
        
        <SpotlightCard spotlightColor="rgba(168, 85, 247, 0.1)" className="p-8 border border-gray-200/80 shadow-lg shadow-purple-500/5 bg-white backdrop-blur-sm">
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Main Info Column */}
            <div className="lg:col-span-5 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                    {t('sections.privacy.title')}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {t('sections.privacy.description1')}
                  </p>
                </div>
                
                {/* Privacy Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/70 border border-purple-200/30 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-purple-600">100%</div>
                    <div className="text-sm text-gray-600 mt-1">{t('sections.privacy.datacontrol')}</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/70 border border-purple-200/30 shadow-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-purple-600">E2E</div>
                    <div className="text-sm text-gray-600 mt-1">{t('sections.privacy.encryption')}</div>
                  </motion.div>
                </div>
                
                {/* Privacy Points */}
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    {t('sections.privacy.point1')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    {t('sections.privacy.point2')}
                  </li>
                  <li className="flex items-center gap-3 text-gray-700">
                    <div className="w-2 h-2 rounded-full bg-purple-500" />
                    {t('sections.privacy.point3')}
                  </li>
                </ul>
              </motion.div>
            </div>
            
            {/* Privacy Features Grid */}
            <div className="lg:col-span-7">
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SpotlightCard 
                      spotlightColor="rgba(168, 85, 247, 0.08)"
                      className="group h-full p-6 border border-gray-200/50 hover:border-purple-200/70 transition-all duration-300 shadow-sm hover:shadow-md hover:shadow-purple-500/5 bg-white/80"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-purple-200/60 p-2.5 shadow-sm"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <feature.icon className="w-full h-full text-purple-600 group-hover:text-purple-700 transition-colors" />
                          </motion.div>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-2 text-gray-800 group-hover:text-purple-700 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 group-hover:text-gray-700 transition-colors">
                            {feature.description}
                          </p>
                          <div className="text-xs font-mono text-purple-600 group-hover:text-purple-700">{feature.stats}</div>
                        </div>
                      </div>
                    </SpotlightCard>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
};
