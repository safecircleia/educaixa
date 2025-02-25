'use client';

import { motion } from 'framer-motion';
import { LineChart as LineChartIcon, Info } from 'lucide-react';
import { SpotlightCard } from '@/components/ui/SpotlightCard';
import { SecurityStatsChart } from '@/components/client/SecurityStatsChart';
import { Footer } from '@/components/client/Footer';

export default function NecesidadesPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative bg-black">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-blue-500/20 -top-10 -right-32" />
        <div className="absolute w-[500px] h-[500px] blur-[120px] rounded-full bg-violet-500/20 -bottom-20 -left-32" />
      </div>

      {/* Content */}
      <section className="w-full py-32">
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
            className="mb-12"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center backdrop-blur-sm border border-blue-500/10">
                <Info className="w-7 h-7 text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-br from-white to-white/70 bg-clip-text text-transparent">
                  Necesidades
                </h1>
                <p className="text-white/60 text-lg">
                  Análisis de la seguridad en redes sociales
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <SpotlightCard className="p-8">
                <h2 className="text-2xl font-bold mb-4">Contexto Actual</h2>
                <p className="text-white/70 leading-relaxed">
                  SafeCircle aborda el problema que existe en la actualidad respecto a la seguridad en las RR.SS. Las redes sociales y el internet son una parte importante de la vida de muchas personas, pero también pueden ser peligrosas si no se usan con cuidado. Algunos de los problemas derivados de este ambito son la poca seguridad que hay en las Redes, con SafeCircle confiamos en que podemos solucionar este problema de una manera sencilla y efectiva.
                </p>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <SpotlightCard className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
                    <LineChartIcon className="w-6 h-6 text-indigo-400" />
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
                  La seguridad de las familias es nuestra razón de ser. En el siguiéntes gráfico se muestra datos del &quot;Periodico el voluntariado&quot;. Esto nos sirve para conocer la tendencia y la evolución de las causas expuestas.
                </p>
                <p className="text-white/50 text-xs mt-2 text-center italic">
                  Gráfico: Periodico del Voluntariado • Fuente: Ministerio del Interior
                </p>
              </SpotlightCard>
            </motion.div>
          </div>
        </motion.div>
      </section>
      <Footer />
    </main>
  );
}