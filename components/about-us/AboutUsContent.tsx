'use client';
import { motion } from 'framer-motion';
import { FileText, Users, Target, Globe, Shield, Sparkles, Award, Twitter, ChevronRight } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { Gallery4, Gallery4Props } from "@/components/blocks/gallery4";
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const ODSIcon = () => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-5 h-5 text-emerald-500"
  >
    <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
    {Array.from({ length: 17 }).map((_, i) => {
      const angle = (i * 360) / 17;
      const x = 12 + 9 * Math.cos((angle * Math.PI) / 180);
      const y = 12 + 9 * Math.sin((angle * Math.PI) / 180);
      return (
        <circle key={i} cx={x} cy={y} r="0.5" fill="currentColor" />
      );
    })}
  </svg>
);

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white backdrop-blur-sm border border-gray-200/80 shadow-sm transition-all duration-300 hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 group">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100/60 flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">{title}</h3>
    </div>
    <p className="text-gray-600 group-hover:text-gray-700 transition-colors">{description}</p>
  </div>
);

interface TeamMember {
  name: string;
  key: 'tomas' | 'victor' | 'fabio';
  role: keyof typeof roleKeys;
  description: string;
  image: string;
  twitter?: string;
}

const roleKeys = {
  founder: 'about.team.roles.founder',
  cofounder: 'about.team.roles.cofounder',
  assistant: 'about.team.roles.assistant'
} as const;

const TeamMemberCard = ({ member, index }: { member: TeamMember; index: number }) => {
  const { t } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 + (index % 6) * 0.1 }}
      viewport={{ once: true }}
      className="h-full"
    >
      <div className="p-6 rounded-xl bg-white backdrop-blur-sm border border-gray-200/80 shadow-sm transition-all duration-300 hover:border-blue-200/70 hover:shadow-md hover:shadow-blue-500/5 group h-full flex flex-col">
        <div className="flex flex-col items-center text-center mb-4 md:mb-6">
          <div className="relative w-24 h-24 md:w-28 md:h-28 mb-4 overflow-hidden bg-gradient-to-br from-blue-100 via-violet-100 to-purple-100 transform group-hover:scale-105 transition-all duration-300 rounded-full flex items-center justify-center shadow-sm">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover rounded-full"
              sizes="(max-width: 768px) 96px, 112px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
              {member.name}
            </h4>
            <p className="text-sm bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent font-semibold">
              {t(roleKeys[member.role])}
            </p>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed text-center flex-grow">
          {t(`about.team.members.${member.key}.description`)}
        </p>
        
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">
              {t('about.team.activeStatus')}
            </span>
          </div>
          <div className="flex gap-2">
            {member.twitter && (
              <a
                href={`https://twitter.com/${member.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors"
                aria-label={`Twitter de ${member.name}`}
              >
                <Twitter className="w-4 h-4 text-blue-500" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export function AboutUsContent() {
  const { t } = useLanguage();

  const teamMembers: TeamMember[] = [
    {
      name: "Tomas Palma Sanchez",
      key: 'tomas',
      role: 'founder',
      description: t('about.team.members.tomas.description'),
      image: "/team/tomaspfp.webp",
      twitter: "toomas_ps"
    },
    {
      name: "Victor Muñoz Salazar",
      key: 'victor',
      role: 'cofounder',
      description: t('about.team.members.victor.description'),
      image: "/team/victorpfp.webp",
      twitter: "_mnozz"
    },
    {
      name: "Fabio Bernal Garcia",
      key: 'fabio',
      role: 'assistant',
      description: t('about.team.members.fabio.description'),
      image: "/team/fabiopfp.webp",
      twitter: "fabiiowette"
    }
  ];

  const values = [
    {
      icon: <Shield className="w-6 h-6 text-blue-400" />,
      title: t('about.values.privacy.title'),
      description: t('about.values.privacy.description')
    },
    {
      icon: <Target className="w-6 h-6 text-blue-400" />,
      title: t('about.values.innovation.title'),
      description: t('about.values.innovation.description')
    },
    {
      icon: <Award className="w-6 h-6 text-blue-400" />,
      title: t('about.values.excellence.title'),
      description: t('about.values.excellence.description')
    },
    {
      icon: <FileText className="w-6 h-6 text-blue-400" />,
      title: t('about.values.opensource.title'),
      description: t('about.values.opensource.description')
    }
  ];

  const odsData: Gallery4Props = {
    items: [
      {
        id: "ods-3",
        title: t('about.ods.goals.health.title'),
        description: t('about.ods.goals.health.description'),
        href: "https://www.un.org/sustainabledevelopment/es/health/",
        image: "/ods/3.webp"
      },
      {
        id: "ods-8",
        title: t('about.ods.goals.work.title'),
        description: t('about.ods.goals.work.description'),
        href: "https://www.un.org/sustainabledevelopment/es/economic-growth/",
        image: "/ods/8.webp"
      },
      {
        id: "ods-16",
        title: t('about.ods.goals.peace.title'),
        description: t('about.ods.goals.peace.description'),
        href: "https://www.un.org/sustainabledevelopment/es/peace-justice/",
        image: "/ods/16.webp"
      },
      {
        id: "ods-17",
        title: t('about.ods.goals.partnerships.title'),
        description: t('about.ods.goals.partnerships.description'),
        href: "https://www.un.org/sustainabledevelopment/es/globalpartnerships/",
        image: "/ods/17.webp"
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50/30 min-h-screen">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center backdrop-blur-sm border border-blue-200/50 shadow-sm">
              <Users className="w-7 h-7 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
            {t('about.title')}
          </h1>
          <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)" className="h-full border border-gray-200/80 shadow-lg shadow-blue-500/5 bg-white backdrop-blur-sm">
              <div className="p-8 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center shadow-sm">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t('about.description.title')}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('about.description.content')}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                {t('about.values.title')}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {t('about.values.subtitle')}
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <FeatureCard key={index} {...value} />
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <SpotlightCard spotlightColor="rgba(59, 130, 246, 0.1)" className="h-full overflow-hidden border border-gray-200/80 shadow-lg shadow-blue-500/5 bg-white backdrop-blur-sm">
              <div className="p-8">
                <div className="text-center mb-10">
                  <h2 className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
                    {t('about.team.title')}
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                    {t('about.team.subtitle')}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard key={member.name} member={member} index={index} />
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.1)" className="h-full border border-gray-200/80 shadow-lg shadow-violet-500/5 bg-white backdrop-blur-sm">
              <div className="p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center shadow-sm">
                    <Target className="w-5 h-5 text-violet-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t('about.mission.title')}</h3>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {t('about.mission.content')}
                </p>
                <div className="inline-flex items-center gap-4 px-6 py-3 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-200/30 shadow-sm">
                  <div className="font-mono text-2xl bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                    {t('about.mission.support.time')}
                  </div>
                  <div className="text-sm text-gray-600">{t('about.mission.support.text')}</div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <SpotlightCard spotlightColor="rgba(34, 197, 94, 0.1)" className="h-full border border-gray-200/80 shadow-lg shadow-green-500/5 bg-white backdrop-blur-sm">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4 group">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center shadow-sm">
                    <ODSIcon />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold md:text-4xl text-xl text-gray-800">{t('about.ods.title')}</p>
                    <ChevronRight className="w-5 h-5 text-emerald-500 transform transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" />
                  </div>
                </div>
                <Gallery4 {...odsData} />
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}