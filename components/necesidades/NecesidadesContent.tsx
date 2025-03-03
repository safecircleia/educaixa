'use client';

import { motion } from 'framer-motion';
import { Info, LineChart, Shield, Lock, Brain, Bell, Users, Settings } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SecurityStatsChart } from '@/components/client/SecurityStatsChart';
import { useLanguage } from '@/context/LanguageContext';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm border border-gray-200/80 shadow-sm transition-all duration-300 hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100/60 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
    </div>
    <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">{description}</p>
  </div>
);

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm border border-gray-200/80 shadow-sm group hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-semibold border border-blue-200/50 shadow-sm">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-gray-800 mb-2 mt-2 group-hover:text-blue-700 transition-colors">{title}</h4>
    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{description}</p>
  </div>
);

export function NecesidadesContent() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: t('needs.solution.features.privacy.title'),
      description: t('needs.solution.features.privacy.description')
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: t('needs.solution.features.ai.title'),
      description: t('needs.solution.features.ai.description')
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-400" />,
      title: t('needs.solution.features.alerts.title'),
      description: t('needs.solution.features.alerts.description')
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: t('needs.solution.features.approach.title'),
      description: t('needs.solution.features.approach.description')
    }
  ];

  const implementationSteps = [
    {
      title: t('needs.implementation.steps.register.title'),
      description: t('needs.implementation.steps.register.description')
    },
    {
      title: t('needs.implementation.steps.install.title'),
      description: t('needs.implementation.steps.install.description')
    },
    {
      title: t('needs.implementation.steps.setup.title'),
      description: t('needs.implementation.steps.setup.description')
    },
    {
      title: t('needs.implementation.steps.activate.title'),
      description: t('needs.implementation.steps.activate.description')
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-blue-50/30 min-h-screen py-16 md:py-24">
      <motion.div 
        className="container mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center backdrop-blur-sm border border-blue-200/50 shadow-sm">
              <Info className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            {t('needs.title')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t('needs.subtitle')}
          </p>
        </motion.div>
        
        {/* Context Section with Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)" className="p-8 border border-gray-200/80 shadow-lg shadow-blue-500/5 bg-white backdrop-blur-sm">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{t('needs.context.title')}</h2>
            <p className="text-gray-700 leading-relaxed">
              {t('needs.context.description')}
            </p>
          </SpotlightCard>
          
          <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.1)" className="p-8 border border-gray-200/80 shadow-lg shadow-indigo-500/5 bg-white backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100/60 flex items-center justify-center shadow-sm">
                <LineChart className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{t('needs.stats.title')}</h2>
                <p className="text-gray-600">{t('needs.stats.subtitle')}</p>
              </div>
            </div>
            
            <div className="w-full h-[300px]">
              <SecurityStatsChart />
            </div>
            <p className="text-gray-600 text-sm mt-4 text-center">
              {t('needs.stats.description')}
            </p>
            <p className="text-gray-500 text-xs mt-2 text-center italic">
              {t('needs.stats.source')}
            </p>
          </SpotlightCard>
        </motion.div>
        
        {/* Solution Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {t('needs.solution.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('needs.solution.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Implementation Steps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {t('needs.implementation.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('needs.implementation.subtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
              >
                <StepCard number={index + 1} {...step} />
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Token Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)" className="p-8 text-center border border-gray-200/80 shadow-lg shadow-blue-500/5 bg-white backdrop-blur-sm">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">{t('needs.token.title')}</h3>
              <p className="text-gray-700">
                {t('needs.token.description')}
              </p>
            </div>
          </SpotlightCard>
        </motion.div>
      </motion.div>
    </div>
  );
}