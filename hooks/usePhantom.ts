'use client';

import { useState, useEffect } from 'react';

export const usePhantom = () => {
  const [phantom, setPhantom] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState<string>();

  useEffect(() => {
    if (window.phantom?.solana) {
      setPhantom(window.phantom.solana);
      window.phantom.solana.on('connect', () => {
        setConnected(true);
        setAddress(window.phantom.solana.publicKey?.toString());
      });
    }
  }, []);

  const connect = async () => {
    try {
      if (phantom) {
        await phantom.connect();
      } else {
        window.open('https://phantom.app/', '_blank');
      }
    } catch (error) {
      console.error('Error connecting to Phantom:', error);
    }
  };

  return { connect, connected, address };
};
