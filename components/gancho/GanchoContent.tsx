"use client"
import { useLanguage } from '@/context/LanguageContext';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Heart, UserCheck } from 'lucide-react';
import { Footer } from '../client/Footer';

export function GanchoContent() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState(0);
  
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const y3 = useTransform(scrollY, [0, 300], [0, 25]);
  
  const opacity = useTransform(scrollY, [0, 400], [1, 0.2]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSection((prev) => (prev + 1) % 3);
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      title: "Protección Integral",
      description: "Protegemos a niños y adolescentes con tecnología avanzada de detección de riesgos online.",
      icon: Shield,
      color: "blue"
    },
    {
      title: "Tranquilidad para Padres",
      description: "Ofrecemos herramientas para que los padres puedan supervisar sin invadir la privacidad.",
      icon: Heart,
      color: "violet" 
    },
    {
      title: "Comunidad Segura",
      description: "Promovemos el uso saludable de la tecnología dentro de una comunidad que vela por el bienestar de todos.",
      icon: UserCheck,
      color: "cyan"
    }
  ];

  return (
    <>
      <section 
        ref={containerRef}
        className="pt-32 sm:pt-40 px-4 min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-50"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute -bottom-40 -right-20 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl animate-float-delayed" />
          <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-cyan-500/10 rounded-full blur-2xl animate-pulse" />
          
          <svg className="absolute top-0 right-0 h-16 w-16 text-blue-500/20" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" />
          </svg>
          
          <svg className="absolute bottom-1/4 left-10 h-32 w-32 text-violet-500/20" viewBox="0 0 100 100" fill="none">
            <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" strokeWidth="8" />
          </svg>
          
          <div className="hidden lg:block absolute top-40 right-20 w-[300px] h-[300px] rounded-2xl bg-gradient-to-br from-blue-100 to-white border border-gray-200/50 shadow-xl shadow-blue-500/5 backdrop-blur-sm transform rotate-6" />
          
          <div className="hidden lg:block absolute bottom-40 left-20 w-[200px] h-[200px] rounded-full bg-gradient-to-br from-violet-100 to-white border border-gray-200/50 shadow-xl shadow-violet-500/5 backdrop-blur-sm" />
        </div>
        
        <div className="max-w-7xl mx-auto">
          <motion.div
            style={{ opacity, scale }}
            className="w-full max-w-5xl mx-auto text-center relative z-10"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="px-4 py-1.5 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full inline-block">
                SafeCircle
              </span>
            </motion.div>
            
            <h1 className="text-balance font-bold tracking-tight md:text-7xl text-4xl lg:text-8xl lg:leading-[1.1] space-y-6 mb-10">
              <AnimatePresence mode="wait">
                {activeSection === 0 && (
                  <motion.span 
                    key="text1"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    style={{ y: y1 }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 animate-gradient whitespace-nowrap glow-text-blue"
                  >
                    Hay padres tranquilos
                  </motion.span>
                )}
                {activeSection === 1 && (
                  <motion.span 
                    key="text2"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    style={{ y: y2 }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-violet-600 to-cyan-500 animate-gradient whitespace-nowrap glow-text-violet"
                  >
                    Hay niños seguros
                  </motion.span>
                )}
                {activeSection === 2 && (
                  <motion.span 
                    key="text3"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40 }}
                    transition={{ duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    style={{ y: y3 }}
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-violet-600 via-cyan-500 to-blue-600 animate-gradient whitespace-nowrap glow-text-cyan"
                  >
                    Hay SafeCircle
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-lg mx-auto"
            >
              <p className="text-lg text-gray-600 mb-8">
                La solución integral que conecta familias y protege a los más pequeños 
                en sus experiencias digitales, sin sacrificar su privacidad ni autonomía.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/#features">
                  <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                    Descubrir cómo 
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link href="/necesidades">
                  <Button size="lg" variant="outline" className="bg-white border-gray-300 hover:bg-gray-50">
                    Para familias
                  </Button>
                </Link>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {[0, 1, 2].map((index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  activeSection === index 
                    ? 'bg-blue-600 w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por qué elegir <span className="text-blue-600">SafeCircle</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Nuestra plataforma está diseñada para mantener a tus hijos seguros en línea, 
              sin comprometer su privacidad o independencia.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow group"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 bg-${feature.color}-100`}>
                  <feature.icon className={`h-6 w-6 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
                <div className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-${feature.color}-500 to-${feature.color}-300 transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-violet-50 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/5 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/5 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl animate-float-delayed" />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Únete a la comunidad de familias protegidas
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
              Miles de padres y niños ya disfrutan de una experiencia digital más segura y 
              enriquecedora con SafeCircle. Súmate hoy mismo.
            </p>
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 text-white">
                Comenzar ahora
              </Button>
            </Link>
          </motion.div>
        </div>
        <Footer />
      </section>
    </>
  );
}