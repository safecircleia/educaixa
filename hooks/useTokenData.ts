'use client';

import { useState, useEffect, useCallback } from 'react';

interface TokenData {
  priceUsd: string;
  volume: {
    h24: number;
  };
  liquidity: {
    usd: number;
    base: number;
  };
  priceChange: {
    h24: number;
  };
  marketCap: number;
  info: {
    imageUrl: string;
    socials: Array<{
      type: string;
      url: string;
    }>;
  };
}

const DEFAULT_TOKEN_DATA: TokenData = {
  priceUsd: "0.00000000",
  volume: {
    h24: 0
  },
  liquidity: {
    usd: 0,
    base: 0
  },
  priceChange: {
    h24: 0
  },
  marketCap: 0,
  info: {
    imageUrl: "",
    socials: []
  }
};

export const useTokenData = () => {
  const [tokenData, setTokenData] = useState<TokenData>(DEFAULT_TOKEN_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTokenData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(
        'https://api.dexscreener.com/latest/dex/pairs/solana/4UPkJAdbYrmVp2NN7DWrsAwNDkpriRupRS1GM38hHZG8'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch token data');
      }

      const data = await response.json();
      
      if (!data.pair) {
        throw new Error('No token data found');
      }

      // Merge with default data to ensure all fields exist
      setTokenData({
        ...DEFAULT_TOKEN_DATA,
        ...data.pair
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch token data');
      setTokenData(DEFAULT_TOKEN_DATA); // Reset to default data on error
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTokenData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchTokenData, 30000);
    
    return () => clearInterval(interval);
  }, [fetchTokenData]);

  return { tokenData, isLoading, error, retry: fetchTokenData };
};