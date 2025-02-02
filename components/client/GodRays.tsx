'use client';

import { motion } from 'framer-motion';
import '../../styles/godRays.css';

export const GodRays = () => {
  return (
    <motion.div 
      className="sui-god-ray"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="ray absolute inset-x-0 inset-y-0 opacity-50" />
    </motion.div>
  );
};
