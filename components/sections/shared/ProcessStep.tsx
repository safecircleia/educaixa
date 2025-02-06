import { motion } from 'framer-motion';

interface ProcessStepProps {
  number: number;
  title: string;
  description: string;
}

export const ProcessStep = ({ number, title, description }: ProcessStepProps) => (
  <motion.div 
    className="relative flex items-start gap-4"
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#4dc8ff]/10 flex items-center justify-center">
      <span className="text-sm font-mono text-[#4dc8ff]">{number}</span>
    </div>
    <div className="space-y-1">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-white/60">{description}</p>
    </div>
  </motion.div>
);
