import { motion } from 'framer-motion';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

export function ProcessStep({ number, title, description }: ProcessStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100 
      }}
      className="relative group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.06] transition-colors"
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4dc8ff]/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur" />
      
      <div className="relative flex flex-col gap-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.2,
            type: "spring",
            stiffness: 200
          }}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4dc8ff]/10 flex items-center justify-center"
        >
          <motion.span 
            className="text-sm font-mono text-[#4dc8ff]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {number}
          </motion.span>
        </motion.div>

        <div className="space-y-2">
          <motion.h3 
            className="text-lg font-semibold"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.3,
              duration: 0.5
            }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-sm text-white/60"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              delay: 0.4,
              duration: 0.5
            }}
          >
            {description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}
