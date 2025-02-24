'use client';

import { motion } from 'framer-motion';
import { Workflow } from 'lucide-react';

export const HowItWorksSection = () => {
  return (
    <div className="relative py-16 md:py-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-blue-500/5" />
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
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400">
            Cómo Funciona
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Descubre cómo nuestra tecnología avanzada protege a tu familia
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Info Column */}
          <div className="lg:col-span-6 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                  Proceso Simplificado
                </h3>
                <p className="text-white/70 leading-relaxed">
                  Nuestro sistema está diseñado para ser fácil de usar y altamente efectivo. 
                  Desde la configuración inicial hasta la protección continua, te guiamos 
                  en cada paso del camino.
                </p>
              </div>

              {/* How It Works Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div 
                  className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="font-mono text-2xl text-blue-400">5 min</div>
                  <div className="text-sm text-white/60 mt-1">Configuración</div>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 backdrop-blur-sm"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="font-mono text-2xl text-blue-400">24/7</div>
                  <div className="text-sm text-white/60 mt-1">Protección</div>
                </motion.div>
              </div>

              {/* How It Works Benefits */}
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Configuración rápida y sencilla
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Monitoreo en tiempo real
                </li>
                <li className="flex items-center gap-3 text-white/70">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Alertas instantáneas
                </li>
              </ul>
            </motion.div>
          </div>

          {/* YouTube Embed */}
          <div className="lg:col-span-6">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-xl"
                src="https://www.youtube-nocookie.com/embed/njX2bu-_Vw4?rel=0&modestbranding=1"
                title="SafeCircle - How it works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
