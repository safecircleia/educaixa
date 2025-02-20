'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AnimatedPriceProps {
  value: number;
  decimals?: number;
  prefix?: string;
  className?: string;
}

export function AnimatedPrice({ 
  value, 
  decimals = 8, 
  prefix = "$", 
  className = "" 
}: AnimatedPriceProps) {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  const formattedValue = displayValue.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  });

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={formattedValue}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.15 }}
        className={className}
      >
        {prefix}{formattedValue}
      </motion.span>
    </AnimatePresence>
  );
}