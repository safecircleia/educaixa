'use client';

import { motion } from 'framer-motion';
import { Users, Building2, GraduationCap, Shield, Zap, Globe, Code2, Lock, Award } from 'lucide-react';

interface PartnerCardProps {
  title: string;
  icon: React.ReactNode;
  items: { name: string; description: string }[];
}

const PartnerCard = ({ title, icon, items }: PartnerCardProps) => (
  <div className="relative p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-white/20 group">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <span className="inline-block w-1.5 h-1.5 mt-2.5 mr-3 bg-blue-400 rounded-full"></span>
            <div>
              <span className="font-medium text-white">{item.name}</span>
              <span className="text-white/70"> - {item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="p-4 rounded-lg bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-white/20 transition-all duration-300">
    <div className="flex items-center gap-3 mb-2">
      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
        {icon}
      </div>
      <h4 className="font-semibold text-white">{title}</h4>
    </div>
    <p className="text-white/70 text-sm ml-11">{description}</p>
  </div>
);

export function ColaboradoresContent() {
  const partners = [
    {
      title: "Gigantes Tecnológicos",
      icon: <Building2 className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "Meta", description: "Integración directa con Facebook, Instagram, WhatsApp" },
        { name: "Google", description: "Implementación en Chrome y servicios de IA" }
      ]
    },
    {
      title: "Instituciones Educativas",
      icon: <GraduationCap className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "Universidades líderes", description: "Investigación y desarrollo" },
        { name: "Colegios", description: "Programas piloto en centros privados y públicos" },
        { name: "Asociaciones de profesores", description: "Formación y feedback" }
      ]
    },
    {
      title: "Organizaciones de Protección",
      icon: <Shield className="w-5 h-5 text-blue-400" />,
      items: [
        { name: "UNICEF", description: "Respaldo y validación de metodologías" },
        { name: "Save the Children", description: "Implementación en programas de protección" }
      ]
    }
  ];

  const benefits = [
    { icon: <Zap className="w-4 h-4 text-blue-400" />, title: "Tecnología de Vanguardia", description: "Acceso a las últimas innovaciones en IA y ciberseguridad" },
    { icon: <Globe className="w-4 h-4 text-blue-400" />, title: "Cobertura Global", description: "Alcance internacional para proteger a más usuarios" },
    { icon: <Code2 className="w-4 h-4 text-blue-400" />, title: "Mejora Continua", description: "Algoritmos en constante evolución y optimización" },
    { icon: <Award className="w-4 h-4 text-blue-400" />, title: "Validación Experta", description: "Metodologías respaldadas por especialistas" },
    { icon: <Lock className="w-4 h-4 text-blue-400" />, title: "Máxima Seguridad", description: "Cumplimiento de los estándares más exigentes" }
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
            <Users className="w-7 h-7 text-blue-400" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
          Colaboradores
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Creamos alianzas estratégicas con líderes de la industria para maximizar nuestro impacto en la protección digital
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
          <h2 className="text-3xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent mb-4">
            Beneficios de la Colaboración
          </h2>
          <p className="text-white/60">
            Cada socio aporta su experiencia única y recursos específicos, fortaleciendo nuestra misión
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
  );
}