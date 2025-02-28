'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  number: number;
  title: string;
  description?: string;
  icon?: LucideIcon;
  isLast?: boolean;
}

export const ProcessStep = ({ number, title, description, icon: Icon, isLast }: ProcessStepProps) => {
  return (
    <div className="relative">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative p-6 rounded-2xl border border-white/10 bg-white/[0.02] backdrop-blur-sm group"
      >
        <div className="relative flex gap-6">
          <div className="flex-shrink-0">
            <div className="relative w-12 h-12">
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-[#4dc8ff] to-blue-600 flex items-center justify-center">
                <span className="text-lg font-bold text-black">{number}</span>
              </div>
            </div>
            
            {/* Enhanced connecting line with subtle animations */}
            {!isLast && (
              <div className="absolute left-1/2 top-[calc(100%+0.5rem)] h-[calc(100%+1rem)] -translate-x-1/2">
                {/* Main line with refined gradients */}
                <div className="absolute inset-0 w-px">
                  <div className="absolute inset-0 bg-gradient-to-b from-[#4dc8ff]/15 via-[#4dc8ff]/10 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#4dc8ff]/10 via-transparent to-transparent opacity-50" />
                </div>
                
                {/* Subtle pulsing dot */}
                <motion.div 
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.15, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="w-1 h-1 rounded-full bg-[#4dc8ff]/30" />
                </motion.div>
                
                {/* Gentle flowing line */}
                <motion.div
                  className="absolute w-px h-full bg-gradient-to-b from-[#4dc8ff]/20 via-[#4dc8ff]/10 to-transparent"
                  animate={{
                    opacity: [0, 0.5, 0],
                    y: ["0%", "100%"]
                  }}
                  transition={{
                    duration: 4,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop"
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-white group-hover:text-[#4dc8ff] transition-colors">
                {title}
              </h3>
              {Icon && (
                <Icon className="w-5 h-5 text-[#4dc8ff]" />
              )}
            </div>
            {description && (
              <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
                {description}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
