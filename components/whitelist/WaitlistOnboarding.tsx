'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Stepper, { Step } from '../ui/stepper';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import TierGrid from './TierGrid';

export const WaitlistOnboarding = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    email: '',
    wallet_address: '',
    tier: null,
    amount_paid: 0
  });
  const [user, setUser] = useState<{ id: string, email?: string } | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const { auth } = supabase;
    auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
      }
    });
  }, [supabase]);

  const handleSubmit = async () => {
    if (!user) return;
    
    try {
      // Insert into waitlist
      const { error: dbError } = await supabase
        .from('waitlist')
        .insert([{ 
          email: formData.email,
          wallet_address: formData.wallet_address,
          user_id: user.id
        }]);

      if (dbError) throw dbError;

      // Increment waitlist count
      const { error: countError } = await supabase
        .rpc('increment_waitlist_count');

      if (countError) throw countError;
      
      onClose();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!user;
      case 2:
        return Boolean(formData.wallet_address && formData.wallet_address.startsWith('0x'));
      case 3:
        return formData.tier !== null;
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:p-8"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl relative"
      >
        <div className="rounded-2xl border border-white/10 overflow-hidden bg-black/90 backdrop-blur-xl">
          <Stepper
            initialStep={1}
            onStepChange={(step: number) => console.log('Current step:', step)}
            onFinalStepCompleted={handleSubmit}
            backButtonText="Previous"
            nextButtonText="Continue"
            nextButtonProps={(step: number) => ({
              disabled: !validateStep(step),
              className: `px-4 py-2 rounded-lg font-medium transition-all ${
                validateStep(step)
                  ? 'bg-[#4dc8ff] hover:bg-[#4dc8ff]/90 text-black'
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`
            })}
            backButtonProps={{
              className: "px-4 py-2 text-white/60 hover:text-white transition-colors"
            }}
            className="bg-transparent"
          >
            <Step>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 py-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Welcome to SafeCircle</h2>
                  <p className="text-white/70">Enter your email to get started</p>
                </div>
                <div className="flex justify-center">
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your@email.com"
                    className="w-full max-w-md p-3 rounded-lg bg-white/5 border border-white/10 
                      focus:border-[#4dc8ff] outline-none transition-colors text-center"
                  />
                </div>
              </motion.div>
            </Step>

            <Step>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 py-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Connect Your Wallet</h2>
                  <p className="text-white/70">Enter your wallet address to continue</p>
                </div>
                <div className="flex justify-center">
                  <input
                    type="text"
                    value={formData.wallet_address}
                    onChange={(e) => setFormData({ ...formData, wallet_address: e.target.value })}
                    placeholder="0x..."
                    className="w-full max-w-md p-3 rounded-lg bg-white/5 border border-white/10 
                      focus:border-[#4dc8ff] outline-none transition-colors text-center font-mono"
                  />
                </div>
              </motion.div>
            </Step>

            <Step>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 py-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Choose Your Tier</h2>
                  <p className="text-white/70">Select your preferred access level</p>
                </div>
                <TierGrid formData={formData} setFormData={setFormData} />
              </motion.div>
            </Step>

            <Step>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6 py-8"
              >
                <div className="space-y-2 text-center">
                  <h2 className="text-2xl font-bold">Complete Registration</h2>
                  <p className="text-white/70">
                    Send {formData.amount_paid} $SC to secure your position
                  </p>
                </div>
                <div className="p-6 rounded-lg border border-white/10 bg-white/5">
                  {/* Add your payment verification component here */}
                  <p className="text-center text-white/60">Payment verification component</p>
                </div>
              </motion.div>
            </Step>
          </Stepper>
        </div>
      </motion.div>
    </motion.div>
  );
};
