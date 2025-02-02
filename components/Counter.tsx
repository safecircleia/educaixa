'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

export const Counter = () => {
  const [count, setCount] = useState(4912);
  const total = 5000;

  useEffect(() => {
    const subscription = supabase
      .channel('waitlist-counter')
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'waitlist' 
      }, (payload) => {
        setCount(prev => prev + 1);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div className="font-mono text-2xl mb-8">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-cyan-400"
        >
          {count.toLocaleString()}
        </motion.span>
      </AnimatePresence>
      <span className="text-gray-400">/{total.toLocaleString()} Slots Filled</span>
    </div>
  );
};
