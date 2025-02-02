import { useState, useEffect } from 'react';
import { usePhantom } from './usePhantom';
import { TREASURY_WALLET } from '@/lib/constants';

export function useWallet() {
  const { connect, connected, pubKey } = usePhantom();
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (amount: number) => {
    if (!connected || !pubKey) {
      throw new Error('Wallet not connected');
    }

    setIsProcessing(true);
    try {
      // Open pump.fun transfer page
      const transferUrl = `https://pump.fun/transfer?recipient=${TREASURY_WALLET}&amount=${amount}`;
      window.open(transferUrl, '_blank');
      
      // Note: Since we can't programmatically verify pump.fun transfers,
      // we'll trust the user and handle verification in a different way if needed
      return true;
    } catch (error) {
      console.error('Payment error:', error);
      throw error;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    connected,
    pubKey,
    connect,
    handlePayment,
    isProcessing
  };
}
