import { motion } from 'framer-motion';
import { PhantomIcon } from '@/components/PhantomIcon';
import React from 'react';
import TransferRequest from './TransferRequest';

interface WalletStepProps {
  onConnect: () => void;
  isPaid: boolean;
  isLoading: boolean;
  error: string | null;
  connected: boolean;
  pubKey: any;
  amount: number;
  onPaymentSuccess: () => void;
}

const WalletStep: React.FC<WalletStepProps> = ({ 
  onConnect, 
  isPaid, 
  isLoading, 
  error, 
  connected, 
  pubKey,
  amount,
  onPaymentSuccess
}) => (
  <div className="space-y-6">
    {!connected ? (
      <motion.button
        onClick={onConnect}
        className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf]
          text-black font-medium flex items-center justify-center gap-2"
        whileHover={{ scale: 1.02 }}
      >
        <PhantomIcon className="w-5 h-5" />
        Connect Wallet
      </motion.button>
    ) : (
      <>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-white/60">Connected Wallet</p>
          <p className="font-mono mt-1">{pubKey?.toString()}</p>
        </div>
        {!isPaid && (
          <TransferRequest 
            amount={amount}
            onPaymentSuccess={onPaymentSuccess}
          />
        )}
      </>
    )}
    {error && (
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
        {error}
      </div>
    )}
  </div>
);

export default WalletStep;
