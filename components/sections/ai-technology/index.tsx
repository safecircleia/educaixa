'use client';

import { motion } from 'framer-motion';
import { Brain, CircuitBoard } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

const AIVisual = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <motion.div 
      className="relative w-64 h-64"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 grid grid-cols-6 gap-2">
        {Array(36).fill(null).map((_, i) => (
          <div key={i} 
            className="aspect-square bg-[#4dc8ff]/20 rounded-full animate-pulse-slow"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </motion.div>
  </div>
);

export const AITechnologySection = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#4dc8ff]/5 via-transparent to-[#4dc8ff]/5" />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-25 mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-4 space-y-12">
        {/* Centered Section Header */}
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
                <CircuitBoard className="w-10 h-10 text-[#4dc8ff]" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-[#4dc8ff]/20"
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
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#4dc8ff] via-[#4dc8ff]/80 to-[#4dc8ff] bg-clip-text text-transparent">
            Tecnología de IA Avanzada
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Detección de amenazas de próxima generación impulsada por redes neuronales y aprendizaje profundo
          </p>
        </motion.div>

        <SpotlightCard spotlightColor="rgba(77, 200, 255, 0.2)" className="p-8">
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
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-[#4dc8ff] to-[#4dc8ff]/80 bg-clip-text text-transparent">
                    Tecnología AI Propietaria
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Nuestros modelos de IA desarrollados internamente procesan millones de datos por segundo, 
                    construidos desde cero pensando en la seguridad de los niños. Nuestros algoritmos propietarios 
                    identifican y bloquean las amenazas antes de que lleguen a tus hijos, manteniendo una 
                    privacidad total.
                  </p>
                </div>

                {/* AI Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="p-4 rounded-xl bg-[#4dc8ff]/5 border border-[#4dc8ff]/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-[#4dc8ff]">99.9%</div>
                    <div className="text-sm text-white/60 mt-1">Tasa de Detección</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-xl bg-[#4dc8ff]/5 border border-[#4dc8ff]/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-[#4dc8ff]">&lt;5ms</div>
                    <div className="text-sm text-white/60 mt-1">Latencia</div>
                  </motion.div>
                </div>

                {/* AI Benefits */}
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-[#4dc8ff]" />
                    Procesamiento neural distribuido
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-[#4dc8ff]" />
                    Detección predictiva de amenazas
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-[#4dc8ff]" />
                    Aprendizaje continuo y adaptativo
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* AI Features Grid */}
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
                      spotlightColor="rgba(77, 200, 255, 0.1)"
                      className="group h-full p-6 hover:border-[#4dc8ff]/20 transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4dc8ff]/10 to-[#4dc8ff]/20 p-2.5"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <feature.icon className="w-full h-full text-[#4dc8ff] group-hover:text-[#4dc8ff]/80 transition-colors" />
                          </motion.div>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-2 group-hover:text-[#4dc8ff]/80 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-white/60 mb-2 group-hover:text-white/70 transition-colors">
                            {feature.description}
                          </p>
                          <div className="text-xs font-mono text-[#4dc8ff]">{feature.stats}</div>
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
