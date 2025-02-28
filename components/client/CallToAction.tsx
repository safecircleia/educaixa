'use client';

import { motion } from 'framer-motion';
import { Shield, Lock, Zap } from 'lucide-react';
import { WaitlistButton } from '../whitelist/WaitlistButton';

export const CallToAction = () => (
  <div className="relative">
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#4dc8ff]/5 via-transparent to-transparent opacity-60 blur-3xl" />

    {/* Content */}
    <div className="relative py-32 container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto space-y-8 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
          Proteja la Vida Digital de su Familia
        </h2>
        <p className="text-lg md:text-xl text-white/60">
          Únase a miles de familias que ya usan SafeCircle para una protección en línea completa.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <WaitlistButton />
          <motion.a
            href="#section-how-it-works"
            className="group flex items-center gap-2 px-6 py-3 rounded-lg text-white/80 hover:text-white transition-colors"
            whileHover={{ y: -2 }}
          >
            Ver Cómo Funciona
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </motion.a>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-8"
        >
          {[
            { icon: Shield, text: 'Seguridad de Grado Militar' },
            { icon: Lock, text: 'Privacidad Primero' },
            { icon: Zap, text: 'Protección en Tiempo Real' }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-white/40">
              <item.icon className="w-4 h-4" />
              <span className="text-sm">{item.text}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  </div>
);
