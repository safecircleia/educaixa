import React from 'react';
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const CombinedIllustration = () => (
  <div className="relative w-[300px] h-[300px] flex items-center justify-center">
    {/* Minimal subtle rotating border */}
    <motion.div
      className="absolute inset-0 rounded-full border border-gray-600"
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
    />

    {/* Subtle pulsing shield icon */}
    <motion.div
      className="absolute flex items-center justify-center"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Shield className="w-24 h-24 text-gray-300" />
    </motion.div>
  </div>
);

export default CombinedIllustration;
