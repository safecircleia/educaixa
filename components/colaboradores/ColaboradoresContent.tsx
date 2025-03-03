'use client';

import { motion } from 'framer-motion';
import { Users, Building2, GraduationCap, Shield, Zap, Globe, Code2, Lock, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface PartnerCardProps {
  title: string;
  icon: React.ReactNode;
  items: { name: string; description: string }[];
}

const PartnerCard = ({ title, icon, items }: PartnerCardProps) => (
  <div className="relative p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm border border-gray-200/80 shadow-sm transition-all duration-300 hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 group">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-100/30 via-transparent to-purple-100/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100/60 flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 mt-2.5 mr-3 bg-blue-500 rounded-full"></span>
            <div>
              <span className="font-medium text-gray-800">{item.name}</span>
              <span className="text-gray-600"> - {item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-4 rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200/80 shadow-sm hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100/60 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h4>
    </div>
    <p className="text-gray-600 text-sm ml-11">{description}</p>
  </div>
);

export function ColaboradoresContent() {
  const { t } = useLanguage();
  const partners = [
    {
      title: t('collaborators.sections.techGiants.title'),
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "Meta", description: t('collaborators.sections.techGiants.items.meta.description') },
        { name: "Google", description: t('collaborators.sections.techGiants.items.google.description') }
      ]
    },
    {
      title: t('collaborators.sections.educational.title'),
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      items: [
        { name: t('collaborators.sections.educational.items.universities.name'), description: t('collaborators.sections.educational.items.universities.description') },
        { name: t('collaborators.sections.educational.items.schools.name'), description: t('collaborators.sections.educational.items.schools.description') },
        { name: t('collaborators.sections.educational.items.teachers.name'), description: t('collaborators.sections.educational.items.teachers.description') }
      ]
    },
    {
      title: t('collaborators.sections.protection.title'),
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      items: [
        { name: t('collaborators.sections.protection.items.unicef.name'), description: t('collaborators.sections.protection.items.unicef.description') },
        { name: t('collaborators.sections.protection.items.saveChildren.name'), description: t('collaborators.sections.protection.items.saveChildren.description') }
      ]
    }
  ];
  
  const benefits = [
    { icon: <Zap className="w-4 h-4 text-blue-400" />, title: t('collaborators.benefits.items.technology.title'), description: t('collaborators.benefits.items.technology.description') },
    { icon: <Globe className="w-4 h-4 text-blue-400" />, title: t('collaborators.benefits.items.coverage.title'), description: t('collaborators.benefits.items.coverage.description') },
    { icon: <Code2 className="w-4 h-4 text-blue-400" />, title: t('collaborators.benefits.items.improvement.title'), description: t('collaborators.benefits.items.improvement.description') },
    { icon: <Award className="w-4 h-4 text-blue-400" />, title: t('collaborators.benefits.items.validation.title'), description: t('collaborators.benefits.items.validation.description') },
    { icon: <Lock className="w-4 h-4 text-blue-400" />, title: t('collaborators.benefits.items.security.title'), description: t('collaborators.benefits.items.security.description') }
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
              <Users className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            {t('collaborators.title')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t('collaborators.subtitle')}
          </p>
        </motion.div>
        
        {/* Partners Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {partners.map((partner, index) => (
            <PartnerCard key={index} {...partner} />
          ))}
        </motion.div>
        
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              {t('collaborators.benefits.title')}
            </h2>
            <p className="text-gray-600">
              {t('collaborators.benefits.subtitle')}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <BenefitCard {...benefit} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}