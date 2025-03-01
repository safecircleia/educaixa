import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import Carousel from '@/components/ui/carousel';
import { useMemo } from 'react';
import { useWindowSize } from '../../../hooks/use-window-size';

import { features } from './features';

export const SecurityProtectionSection = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated security pattern */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-[800px] h-[800px] border border-emerald-500/10 rounded-full"
              style={{
                left: '50%',
                top: '50%',
                translateX: '-50%',
                translateY: '-50%'
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                delay: i * 2,
                ease: "linear"
              }}
            />
          ))}
        </div>
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
                <Shield className="w-10 h-10 text-emerald-400" />
              </div>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 rounded-xl border-2 border-emerald-500/20"
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
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-400 via-emerald-300 to-emerald-400 bg-clip-text text-transparent">
            Seguridad y Protección
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Protección integral de nivel empresarial y seguridad en línea completa para tu familia
          </p>
        </motion.div>

        <SpotlightCard spotlightColor="rgba(16, 185, 129, 0.2)" className="p-8">
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
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                    Defensa Integral
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    Combinamos seguridad de grado militar con protección en línea 360°. 
                    Nuestro marco unificado utiliza defensa multicapa, cifrado avanzado 
                    y filtrado inteligente de contenido para asegurar cada aspecto de tu 
                    vida digital.
                  </p>
                </div>

                {/* Security Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <motion.div 
                    className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-emerald-400">256-bit</div>
                    <div className="text-sm text-white/60 mt-1">Cifrado</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="font-mono text-2xl text-emerald-400">24/7</div>
                    <div className="text-sm text-white/60 mt-1">Monitoreo</div>
                  </motion.div>
                </div>

                {/* Security Features List */}
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Cifrado de extremo a extremo
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Análisis de amenazas en tiempo real
                  </li>
                  <li className="flex items-center gap-3 text-white/70">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Protección multicapa avanzada
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Security Features Grid */}
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
                      spotlightColor="rgba(16, 185, 129, 0.1)"
                      className="group h-full p-6 hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0">
                          <motion.div 
                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-2.5"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <feature.icon className="w-full h-full text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                          </motion.div>
                        </div>
                        <div>
                          <h4 className="font-medium text-lg mb-2 group-hover:text-emerald-300 transition-colors">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-white/60 mb-2 group-hover:text-white/70 transition-colors">
                            {feature.description}
                          </p>
                          <div className="text-xs font-mono text-emerald-400">{feature.stats}</div>
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
