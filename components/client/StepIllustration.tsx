import { motion } from 'framer-motion';
import { PhantomIcon } from '@/components/PhantomIcon';
import React from 'react';

const StepIllustration = ({ step }: { step: number }) => {
  const illustrations = {
    0: (
      <motion.div className="relative flex flex-col items-center">
        <motion.div className="relative z-10 space-y-4">
          <motion.div
            className="text-6xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            👋
          </motion.div>
          <motion.div
            className="max-w-sm mx-auto text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-light">Welcome to SafeCircle</h2>
            <p className="text-gray-500">
              Join our community of parents protecting their children online
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    ),
    1: (
      <motion.div className="relative flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="relative z-10 flex flex-col items-center space-y-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className="text-4xl">🛡️</div>
          <p className="text-xl font-light text-center">Choose your protection level</p>
        </motion.div>
      </motion.div>
    ),
    2: (
      <motion.div className="relative flex flex-col items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <motion.div className="relative z-10 flex flex-col items-center space-y-4" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 }}>
          <PhantomIcon className="w-24 h-24" />
          <p className="text-xl font-light text-center">Connect your wallet to complete setup</p>
        </motion.div>
      </motion.div>
    ),
  };

  return illustrations[step] || null;
};

export default StepIllustration;
