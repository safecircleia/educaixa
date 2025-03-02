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
  <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/20 group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <p className="text-white/70 leading-relaxed">{description}</p>
  </div>
);

interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

const StepCard = ({ number, title, description }: StepCardProps) => (
  <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 group hover:border-white/20 transition-all duration-300">
    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold border border-blue-500/30">
      {number}
    </div>
    <h4 className="text-lg font-semibold text-white mb-2 mt-2">{title}</h4>
    <p className="text-white/70">{description}</p>
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
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/10">
            <Info className="w-7 h-7 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
          {t('needs.title')}
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
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
        <SpotlightCard className="p-8">
          <h2 className="text-2xl font-bold mb-4">{t('needs.context.title')}</h2>
          <p className="text-white/70 leading-relaxed">
            {t('needs.context.description')}
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <LineChart className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t('needs.stats.title')}</h2>
              <p className="text-white/60">{t('needs.stats.subtitle')}</p>
            </div>
          </div>
          
          <div className="w-full h-[300px]">
            <SecurityStatsChart />
          </div>
          <p className="text-white/60 text-sm mt-4 text-center">
            {t('needs.stats.description')}
          </p>
          <p className="text-white/50 text-xs mt-2 text-center italic">
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
          <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
            {t('needs.solution.title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
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
          <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
            {t('needs.implementation.title')}
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
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
        <SpotlightCard className="p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">{t('needs.token.title')}</h3>
            <p className="text-white/70">
              {t('needs.token.description')}
            </p>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}