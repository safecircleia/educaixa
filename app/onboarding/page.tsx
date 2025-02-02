'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, User, ChevronRight, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { createWaitlistEntry, getWaitlistEntry } from '@/lib/waitlist';
import StepIllustration from '@/components/client/StepIllustration';
import TierGrid from '@/components/client/TierGrid';
import WalletStep from '@/components/client/WalletStep';
import { motion, AnimatePresence } from 'framer-motion';
import { PhantomIcon } from '@/components/PhantomIcon';
import { TREASURY_WALLET, SC_TOKEN_MINT, tiers } from '@/lib/constants';
import React from 'react';
import { Transaction, PublicKey, Connection, TransactionInstruction, VersionedTransaction, TransactionMessage, Keypair } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress, createAssociatedTokenAccountInstruction, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { usePhantom } from '@/hooks/usePhantom';
import bs58 from 'bs58';

const IS_LOCAL = process.env.NODE_ENV === 'development';

// Add helper function to abbreviate numbers
const abbreviateNumber = (num: number): string => {
  if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
  if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
  return num.toString();
};

export default function OnboardingPage() {
  const router = useRouter();
  // Updated: include connect in the destructuring
  const { connect, pubKey, sendTransaction, connected } = usePhantom();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    tier: 0,
    wallet_id: '',
    order_number: '',
    amount_paid: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return formData.name.length > 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case 1:
        return formData.tier !== null;
      case 2:
        return connected && (isPaid || IS_LOCAL);
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
      return;
    }

    if (!isPaid) {
      setError('Please complete the payment first');
      return;
    }

    setIsLoading(true);
    try {
      await createWaitlistEntry({
        ...formData,
        wallet_id: pubKey?.toString() || '',
        status: 'completed'
      });

      toast.success('Successfully joined waitlist!');
      router.push('/dashboard');
    } catch (error: unknown) {
      setError((error as Error)?.message || 'Failed to create entry');
      toast.error('Failed to create entry');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Enter' && canProceed()) {
      handleNext();
    }
  }, [canProceed, handleNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const handlePaymentStep = async () => {
    if (!connected || !pubKey) {
      setError('Please connect your wallet using the Wallet Buttons above.');
      toast.error('Wallet not connected.');
      return;
    }

    try {
      setIsLoading(true);
      // Generate a random reference (base58-encoded 32-byte public key)
      const reference = Keypair.generate().publicKey.toBase58();
      // Call the transaction request API endpoint
      const resp = await fetch('/api/transaction-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ account: pubKey.toString(), reference }),
      });
      const { transaction: base64Tx, message } = await resp.json();
      if (!base64Tx) throw new Error(message || 'Failed to build transaction');
      
      // Deserialize the transaction from base64
      const txBuffer = Buffer.from(base64Tx, 'base64');
      const transaction = Transaction.from(txBuffer);
      
      // Send and confirm the transaction using the wallet adapter
      const signature = await sendTransaction(transaction, new Connection('https://api.devnet.solana.com'));
      const confirmation = await new Connection('https://api.devnet.solana.com').confirmTransaction(signature, 'finalized');
      if (confirmation.value.err) throw new Error('Transaction failed to confirm');

      setIsPaid(true);
      setFormData(prev => ({ ...prev, tx_hash: signature }));
      toast.success('Payment confirmed! Click Complete to finish registration.');
    } catch (err: any) {
      console.error('Payment error:', err);
      setError(err.message || 'Failed to process payment');
      toast.error(`Payment failed: ${err.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSimulatePayment = async () => {
    if (!connected || !pubKey) return;
    
    try {
      setIsLoading(true);
      setIsPaid(true);
      toast.success('Payment simulated successfully! Click Complete to finish registration.');
    } catch (error) {
      console.error('Simulation error:', error);
      toast.error('Simulation failed');
      setIsPaid(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const validateAccess = async () => {
      if (!connected || !pubKey) return;

      const { data } = await getWaitlistEntry(pubKey.toString());

      if (data) {
        router.push('/dashboard');
      }
    };

    validateAccess();
  }, [connected, pubKey, router]);

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
          <TierGrid formData={formData} setFormData={setFormData} />
        </div>
      )
    },
    {
      id: 'wallet',
      title: 'Connect & Pay',
      icon: PhantomIcon,
      component: (
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Display $SC text using the selected tier's price when available */}
            <span className="font-bold">$SC</span>
            <span className="font-semibold">
              Amount to pay: {formData.tier != null ? tiers[formData.tier].price : abbreviateNumber(Number(formData.amount_paid)) + ' $SC'}
            </span>
          </div>
          <WalletStep
            onConnect={connect}
            isPaid={isPaid}
            isLoading={isLoading}
            error={error}
            connected={connected}
            pubKey={pubKey}
            handlePaymentStep={handlePaymentStep}
          />
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen relative">
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center">
        <div className="grid md:grid-cols-2 gap-12 w-full items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="backdrop-blur-md bg-black/40 p-8 rounded-2xl border border-white/10"
          >
            <div className="mb-8">
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
            </div>

            <div className="space-y-8">
              <div className="text-center">
                {React.createElement(steps[currentStep].icon, {
                  className: "w-8 h-8 mx-auto mb-4"
                })}
                <h1 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h1>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="min-h-[300px]"
                >
                  {steps[currentStep].component}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between pt-6 border-t border-white/10">
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
              {IS_LOCAL && currentStep === 2 && (
                <div className="mt-4 p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/5">
                  <p className="text-yellow-500 text-sm mb-2">Development Mode</p>
                  <button
                    onClick={handleSimulatePayment}
                    className="w-full py-2 bg-yellow-500/20 hover:bg-yellow-500/30 
                      text-yellow-500 rounded-lg transition-colors"
                  >
                    Simulate Payment Success
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center justify-center"
          >
            <StepIllustration step={currentStep} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
