'use client';

import { motion } from 'framer-motion';

export const Chip = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass px-4 py-2 rounded-full text-sm font-medium"
    >
      {children}
    </motion.div>
  );
};
