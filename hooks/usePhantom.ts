'use client';
import { useWallet } from '@solana/wallet-adapter-react';

export function usePhantom() {
  const wallet = useWallet();
  return {
    connect: wallet.connect,
    disconnect: wallet.disconnect,
    connected: !!wallet.publicKey,
    pubKey: wallet.publicKey,
    sendTransaction: wallet.sendTransaction,
  };
}
