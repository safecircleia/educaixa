'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { PhantomIcon } from '../PhantomIcon';
import { Shield, User, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { createWaitlistEntry } from '@/lib/supabase';
import { usePhantom } from '@/hooks/usePhantom';
import type { WaitlistFormData } from '@/types/database';
import React from 'react';
import { toast } from 'sonner';
import { tiers } from '@/lib/constants';
import TransferRequest from '@/components/client/TransferRequest';
import { establishConnection } from '@/lib/establishConnection';
import { simulateCheckout } from '@/lib/simulateCheckout';
import { simulateWalletInteraction } from '@/lib/simulateWalletInteraction';
import { encodeURL, findReference, FindReferenceError, validateTransfer } from '@solana/pay';
import { MERCHANT_WALLET } from '@/lib/constants';

export const Onboarding = ({ isOpen, onClose, onComplete }: { isOpen: boolean, onClose: () => void, onComplete: (entry: WaitlistFormData) => void }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<WaitlistFormData>({
    name: '',
    email: '',
    tier: 0,
    wallet_id: '',
    order_number: '',
    amount_paid: 0,
    status: 'pending'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const { connect, connected, pubKey: address } = usePhantom();

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.length > 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 1:
        return formData.tier !== null;
      case 2:
        return connected && address;
      default:
        return false;
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleNext = async () => {
    if (!canProceed()) return;

    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (!isPaid) {
        toast.error('Please complete the payment first');
        return;
      }

      setIsLoading(true);
      try {
        const connection = await establishConnection();
        const { label, message, memo, amount, reference } = await simulateCheckout();
        const url = encodeURL({ recipient: MERCHANT_WALLET, amount, reference, label, message, memo });
        await simulateWalletInteraction(connection, url);

        let signatureInfo;
        const { signature } = await new Promise<{ signature: string }>((resolve, reject) => {
          const interval = setInterval(async () => {
            console.count('Checking for transaction...');
            try {
              signatureInfo = await findReference(connection, reference, { finality: 'confirmed' });
              console.log('\n 🖌  Signature found: ', signatureInfo.signature);
              clearInterval(interval);
              resolve(signatureInfo);
            } catch (error) {
              if (!(error instanceof FindReferenceError)) {
                console.error(error);
                clearInterval(interval);
                reject(error);
              }
            }
          }, 250);
        });

        await validateTransfer(connection, signature, { recipient: MERCHANT_WALLET, amount });
        toast.success('Payment successful!');
        setIsPaid(true);
        setFormData(prev => ({
          ...prev,
          status: 'completed'
        }));

        const entry = await createWaitlistEntry({
          ...formData,
          wallet_id: address?.toString(),
          status: 'completed'
        });
        onComplete(entry);
        toast.success('Successfully joined waitlist!');
      } catch (error) {
        toast.error('Failed to create entry');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const TierGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {tiers.map((tier, index) => (
        <motion.button
          key={tier.name}
          onClick={() => setFormData({ 
            ...formData, 
            tier: index,
            amount_paid: tier.amount
          })}
          className={`flex flex-col h-full p-4 rounded-xl relative overflow-hidden
            border transition-all duration-300 ${
              formData.tier === index 
                ? 'border-[#4dc8ff] bg-white/10' 
                : 'border-white/10 hover:border-white/20'
            }`}
          whileHover={{ scale: 1.02 }}
        >
          <div className={`absolute inset-0 bg-gradient-to-br opacity-20`} />
          <div className="relative space-y-4">
            <div className="text-center pb-4 border-b border-white/10">
              <h3 className="font-bold text-lg">{tier.name}</h3>
              <p className="text-white/60 text-sm">{tier.description}</p>
              <div className="mt-2 text-[#4dc8ff] font-mono text-2xl">{tier.price}</div>
            </div>
            
            <div className="space-y-2">
              {Object.entries(tier.features).map(([feature, included]) => (
                <div 
                  key={feature}
                  className={`flex items-center gap-2 text-sm ${
                    included ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {included ? (
                    <div className="w-4 h-4 rounded-full bg-[#4dc8ff]/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#4dc8ff]" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full bg-white/5 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white/20" />
                    </div>
                  )}
                  {feature}
                </div>
              ))}
            </div>
          </div>

          {formData.tier === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#4dc8ff]"
            />
          )}
        </motion.button>
      ))}
    </div>
  );

  const steps = [
    {
      id: 'info',
      title: 'Basic Information',
      icon: User,
      component: (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
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
        </motion.div>
      )
    },
    {
      id: 'tier',
      title: 'Select Tier',
      icon: Shield,
      component: (
        <div className="w-full">
          <TierGrid />
        </div>
      )
    },
    {
      id: 'payment',
      title: 'Connect & Pay',
      icon: PhantomIcon,
      component: (
        <div className="text-center space-y-4">
          {!connected ? (
            <button onClick={connect} className="btn-primary">
              Connect Wallet
            </button>
          ) : (
            <TransferRequest 
              amount={tiers[formData.tier].amount} 
              onPaymentSuccess={() => {
                setIsPaid(true);
                setFormData(prev => ({
                  ...prev,
                  status: 'completed'
                }));
                toast.success('Payment successful!');
              }} 
            />
          )}
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
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
              w-full backdrop-blur-xl my-8"
            style={{
              maxWidth: currentStep === 1 ? '900px' : '500px'
            }}
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

            <div className="space-y-6 overflow-hidden">
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
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="min-h-[300px] flex flex-col justify-center"
                >
                  {steps[currentStep].component}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
                {currentStep > 0 && (
                  <motion.button
                    onClick={handleBack}
                    className="px-4 py-2 rounded-lg flex items-center gap-2
                      hover:bg-white/5 transition-colors"
                    whileHover={{ scale: 1.02 }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back
                  </motion.button>
                )}
                <motion.button
                  onClick={handleNext}
                  disabled={!canProceed() || isLoading}
                  className={`ml-auto px-6 py-2 rounded-lg bg-gradient-to-r 
                    from-[#4dc8ff] to-[#2dd4bf] text-black font-medium
                    flex items-center gap-2 ${
                      (!canProceed() || isLoading) ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  whileHover={canProceed() ? { scale: 1.02 } : {}}
                >
                  {isLoading ? 'Processing...' : currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
                  <ChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
