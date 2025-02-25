'use client';

import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface ClientInfoSectionProps {
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  gradient: string;
  isReversed?: boolean;
}

export function ClientInfoSection({ 
  title, 
  description, 
  iconName, 
  gradient, 
  isReversed = false 
}: ClientInfoSectionProps) {
  const Icon = Icons[iconName] as LucideIcon;

  return (
    <section className="py-24 border-b border-white/10">
      <div className={`container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center ${
        isReversed ? 'direction-rtl' : ''
      }`}>
        <motion.div
          initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h2 className="text-4xl font-bold">{title}</h2>
          <p className="text-lg text-white/70 leading-relaxed max-w-xl">
            {description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={`relative ${isReversed ? 'order-first' : ''}`}
        >
          <div className={`absolute inset-0 blur-3xl bg-gradient-to-r ${gradient} opacity-20`} />
          <div className="relative glass rounded-2xl p-8 aspect-square flex items-center justify-center">
            <Icon className="w-24 h-24 text-white" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
