import { motion } from 'framer-motion';
import { PhantomIcon } from '@/components/PhantomIcon';
import React from 'react';

const StepIllustration = ({ step }: { step: number }) => {
  const illustrations = {
    0: (
      <motion.div className="relative flex flex-col items-center">
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
              bg-gradient-to-br from-[#4dc8ff]/10 to-[#2dd4bf]/10 rounded-full blur-[100px]"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <motion.div className="relative z-10 space-y-8">
          <motion.div
            className="text-8xl"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            👋
          </motion.div>
          <motion.div
            className="max-w-sm mx-auto text-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-3xl font-light mb-4">Welcome to SafeCircle</h2>
            <p className="text-white/60">Join our community of parents protecting their children online</p>
          </motion.div>
        </motion.div>
      </motion.div>
    ),
    1: (
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
          bg-gradient-to-br from-[#4dc8ff]/5 to-[#2dd4bf]/5 blur-[120px]" />
        <motion.div 
          className="relative z-10 flex flex-col items-center space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl">🛡️</div>
          <p className="text-2xl font-light text-center max-w-sm">
            Choose your protection level
          </p>
        </motion.div>
      </motion.div>
    ),
    2: (
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full
          bg-gradient-to-br from-[#4dc8ff]/5 to-[#2dd4bf]/5 blur-[120px]" />
        <motion.div 
          className="relative z-10 flex flex-col items-center space-y-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <PhantomIcon className="w-32 h-32" />
          <p className="text-2xl font-light text-center max-w-sm">
            Connect your wallet to complete setup
          </p>
        </motion.div>
      </motion.div>
    ),
  };

  return illustrations[step] || null;
};

export default StepIllustration;
