'use client';

import { motion } from 'framer-motion';
import { Key } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { features } from './features';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

export const FeaturesSection = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 via-transparent to-indigo-500/5" />
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
                <Key className="w-10 h-10 text-indigo-500" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-indigo-500/20"
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
          
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-400">
            Funciones Clave
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Herramientas avanzadas diseñadas para proteger a tu familia
          </p>
        </motion.div>

        <SpotlightCard spotlightColor="rgba(99, 102, 241, 0.2)" className="p-8">
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
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-indigo-300 bg-clip-text text-transparent">
                    Control Parental Integral
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Nuestra plataforma te ofrece un conjunto completo de herramientas, 
                    diseñadas específicamente para proteger a tu familia en el entorno digital. 
                    Con controles intuitivos y funciones avanzadas, podrás mantener la 
                    seguridad de tus seres queridos.
                  </p>
                </div>

                {/* Feature Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-sm">
                    <div className="font-mono text-2xl text-indigo-400">100%</div>
                    <div className="text-sm text-white/60 mt-1">Configurable</div>
                  </div>
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 backdrop-blur-sm">
                    <div className="font-mono text-2xl text-indigo-400">24/7</div>
                    <div className="text-sm text-white/60 mt-1">Activo</div>
                  </div>
                </div>

                {/* Key Benefits */}
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    Supervisión parental avanzada
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    Control en tiempo real
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />
                    Filtrado inteligente de contenido
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Features Grid */}
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
                      spotlightColor="rgba(99, 102, 241, 0.1)"
                      className="group h-full p-6 hover:border-indigo-500/20 transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-2.5"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <feature.icon className="w-full h-full text-indigo-400 group-hover:text-indigo-300 transition-colors" />
                          </motion.div>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-2 group-hover:text-indigo-300 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-white/60 mb-2 group-hover:text-white/70 transition-colors">
                            {feature.description}
                          </p>
                          <div className="text-xs font-mono text-indigo-400">{feature.stats}</div>
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
