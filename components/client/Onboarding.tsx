'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';
import { useState } from 'react';
import { PhantomIcon } from '../PhantomIcon';
import { Shield, User, Mail, ChevronRight, X } from 'lucide-react';

const tiers = [
  {
    name: 'Beta Access',
    price: '100K $SC',
    features: ['Early platform access', 'Basic features', 'Community access'],
    gradient: 'from-blue-500/20 to-cyan-400/20'
  },
  {
    name: 'Beta + Updates',
    price: '500K $SC',
    features: ['Beta access', 'Exclusive updates', 'Priority support'],
    gradient: 'from-violet-500/20 to-purple-400/20'
  },
  {
    name: 'Governance',
    price: '1M $SC',
    features: ['Beta access', 'Exclusive updates', 'Early governance rights'],
    gradient: 'from-rose-500/20 to-pink-400/20'
  }
];

export const Onboarding = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: null,
    wallet: null
  });

  const steps = [
    {
      id: 'info',
      title: 'Basic Information',
      icon: User,
      component: (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
              focus:border-[#4dc8ff]/50 focus:ring-1 focus:ring-[#4dc8ff]/50"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10
              focus:border-[#4dc8ff]/50 focus:ring-1 focus:ring-[#4dc8ff]/50"
          />
        </div>
      )
    },
    {
      id: 'tier',
      title: 'Select Tier',
      icon: Shield,
      component: (
        <div className="grid gap-4">
          {tiers.map((tier, index) => (
            <motion.button
              key={tier.name}
              onClick={() => setFormData({ ...formData, tier: index })}
              className={`p-4 rounded-xl text-left relative overflow-hidden
                border transition-all duration-300 ${
                  formData.tier === index 
                    ? 'border-[#4dc8ff] bg-white/10' 
                    : 'border-white/10 hover:border-white/20'
                }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${tier.gradient} opacity-20`} />
              <div className="relative space-y-2">
                <div className="font-bold">{tier.name}</div>
                <div className="text-[#4dc8ff] font-mono">{tier.price}</div>
                <ul className="space-y-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="text-sm text-white/70 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-[#4dc8ff]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.button>
          ))}
        </div>
      )
    },
    {
      id: 'wallet',
      title: 'Connect Wallet',
      icon: PhantomIcon,
      component: (
        <div className="text-center space-y-4">
          <p className="text-white/60">Connect your Phantom wallet to secure your spot</p>
          <motion.button
            onClick={() => {/* Connect wallet logic */}}
            className="w-full py-3 rounded-lg bg-[#4dc8ff]/10 hover:bg-[#4dc8ff]/20
              border border-[#4dc8ff]/20 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
          >
            <PhantomIcon className="w-5 h-5" />
            Connect Phantom
          </motion.button>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative bg-black/80 border border-white/10 rounded-2xl p-8 
              max-w-md w-full backdrop-blur-xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full 
                hover:bg-white/5 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Step content */}
            <div className="space-y-6">
              {/* Step indicator */}
              <div className="flex justify-center space-x-2">
                {steps.map((step, i) => (
                  <div
                    key={step.id}
                    className={`h-1 rounded-full transition-all ${
                      i <= currentStep ? 'w-8 bg-[#4dc8ff]' : 'w-4 bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <div className="text-center space-y-2">
                {React.createElement(steps[currentStep].icon, {
                  className: "w-8 h-8 mx-auto mb-4"
                })}
                <h3 className="text-xl font-bold">{steps[currentStep].title}</h3>
                {steps[currentStep].description && (
                  <p className="text-white/60">{steps[currentStep].description}</p>
                )}
              </div>

              {/* Dynamic form content */}
              {steps[currentStep].component}

              <motion.button
                onClick={handleNext}
                className="w-full py-3 rounded-lg bg-gradient-to-r 
                  from-[#4dc8ff] to-[#2dd4bf] text-black font-medium
                  flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
