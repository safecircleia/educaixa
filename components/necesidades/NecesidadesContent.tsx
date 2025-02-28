'use client';

import { motion } from 'framer-motion';
import { Info, LineChart, Shield, Lock, Brain, Bell, Users, Settings } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SecurityStatsChart } from '@/components/client/SecurityStatsChart';

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
  const features = [
    {
      icon: <Lock className="w-6 h-6 text-blue-400" />,
      title: "Privacidad Absoluta",
      description: "Sistema de análisis en tiempo real que no almacena conversaciones, protegiendo la privacidad del usuario."
    },
    {
      icon: <Brain className="w-6 h-6 text-blue-400" />,
      title: "IA Avanzada",
      description: "Tecnología de detección sofisticada que reduce falsos positivos mientras mantiene alta efectividad."
    },
    {
      icon: <Bell className="w-6 h-6 text-blue-400" />,
      title: "Alertas Inteligentes",
      description: "Sistema de notificaciones en tiempo real que alerta sobre comportamientos sospechosos."
    },
    {
      icon: <Users className="w-6 h-6 text-blue-400" />,
      title: "Enfoque Múltiple",
      description: "Solución diseñada tanto para padres y tutores como para instituciones educativas."
    }
  ];

  const implementationSteps = [
    {
      title: "Registro en la Plataforma",
      description: "Proceso simple y rápido para comenzar a proteger a tus seres queridos"
    },
    {
      title: "Instalación de la Extensión",
      description: "Fácil instalación en los dispositivos que deseas proteger"
    },
    {
      title: "Configuración Básica",
      description: "Personaliza las preferencias según tus necesidades específicas"
    },
    {
      title: "Activación de Protección",
      description: "Comienza a recibir protección inmediata tras la configuración"
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
          Necesidades
        </h1>
        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto">
          Análisis y soluciones para la seguridad en redes sociales
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
          <h2 className="text-2xl font-bold mb-4">Contexto Actual</h2>
          <p className="text-white/70 leading-relaxed">
            SafeCircle aborda el problema que existe en la actualidad respecto a la seguridad en las RR.SS. Las redes sociales y el internet son una parte importante de la vida de muchas personas, pero también pueden ser peligrosas si no se usan con cuidado. Algunos de los problemas derivados de este ambito son la poca seguridad que hay en las Redes, con SafeCircle confiamos en que podemos solucionar este problema de una manera sencilla y efectiva.
          </p>
        </SpotlightCard>

        <SpotlightCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
              <LineChart className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Evolución del Grooming</h2>
              <p className="text-white/60">Casos reportados 2013-2023</p>
            </div>
          </div>
          
          <div className="w-full h-[300px]">
            <SecurityStatsChart />
          </div>
          <p className="text-white/60 text-sm mt-4 text-center">
            La seguridad de las familias es nuestra razón de ser. En el siguiente gráfico se muestra datos del &quot;Periodico el voluntariado&quot;. Esto nos sirve para conocer la tendencia y la evolución de las causas expuestas.
          </p>
          <p className="text-white/50 text-xs mt-2 text-center italic">
            Gráfico: Periodico del Voluntariado • Fuente: Ministerio del Interior
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
            Nuestra Solución
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Una plataforma innovadora que utiliza inteligencia artificial para proteger a los menores sin comprometer su privacidad
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
            Proceso de Implementación
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Un proceso sencillo y guiado para comenzar a proteger a tus seres queridos
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
            <h3 className="text-2xl font-bold text-blue-400 mb-4">SC Token</h3>
            <p className="text-white/70">
              Pagando nuestro servicio con la SC token el usuario recibirá información exclusiva y anticipada sobre la aplicación, además de acceso a características premium y recompensas especiales.
            </p>
          </div>
        </SpotlightCard>
      </motion.div>
    </motion.div>
  );
}