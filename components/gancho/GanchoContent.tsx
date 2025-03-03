"use client"

import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from 'react';

export function GanchoContent() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const y3 = useTransform(scrollY, [0, 300], [0, 25]);
  
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="pt-40 px-4 min-h-screen relative overflow-hidden"
    >
      <motion.div
        style={{ opacity }}
        className="w-full max-w-6xl mx-auto text-center relative z-10"
      >
        <h1 className="text-balance font-bold tracking-tight md:text-7xl text-5xl lg:leading-[1.3] space-y-6">
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: [0.19, 1, 0.22, 1]
            }}
            style={{ y: y1 }}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 animate-gradient whitespace-nowrap glow-text-blue"
          >
            Hay padres tranquilos
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.2,
              ease: [0.19, 1, 0.22, 1]
            }}
            style={{ y: y2 }}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-violet-600 to-cyan-400 animate-gradient whitespace-nowrap glow-text-violet"
          >
            Hay niños seguros
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              delay: 0.4,
              ease: [0.19, 1, 0.22, 1]
            }}
            style={{ y: y3 }}
            className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-cyan-400 to-blue-500 animate-gradient whitespace-nowrap glow-text-cyan"
          >
            Hay SafeCircle
          </motion.span>
        </h1>
      </motion.div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
    </section>
  )
}