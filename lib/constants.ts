import { Keypair, PublicKey } from '@solana/web3.js';

export const TREASURY_WALLET = "3a8nLLkcniAFcaxSK67n6xms4prZf2NczYsnjY8zXPMP"; // Replace with your wallet
export const SC_TOKEN_MINT = "CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump"; // update this value with a valid token mint address

export const MERCHANT_WALLET = new PublicKey('mvines9iiHiQTysrwkJjGf2gb9Ex9jXJX8ns3qwf2kN');

// Keypair purely for testing purposes. Exists only on devnet
export const CUSTOMER_WALLET = Keypair.fromSecretKey(
    Uint8Array.from([
        169, 48, 146, 127, 191, 185, 98, 158, 130, 159, 205, 137, 2, 146, 85, 1, 93, 107, 98, 90, 245, 69, 40, 39, 220,
        78, 226, 249, 231, 254, 92, 13, 186, 138, 174, 147, 156, 143, 248, 132, 28, 206, 134, 228, 241, 192, 94, 44,
        177, 15, 41, 219, 124, 116, 255, 78, 172, 209, 106, 78, 37, 169, 115, 146,
    ])
);

export const generateOrderNumber = () => {
  const prefix = 'SC';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
};

export const tiers = [
  {
    name: 'Beta Access',
    price: '100K $SC',
    amount: 100000,
    gradient: 'from-blue-500/20 to-cyan-500/20',
    description: 'Early access to the platform',
    features: {
      'Early access': true,
      'Basic monitoring': true,
      'Community access': true,
      'Real-time alerts': false,
      'Threat detection': false,
      'DAO voting': false
    }
  },
  {
    name: 'Beta + Alerts',
    price: '500K $SC',
    amount: 500000,
    gradient: 'from-cyan-500/20 to-teal-500/20',
    description: 'Enhanced security features',
    features: {
      'Early access': true,
      'Basic monitoring': true,
      'Community access': true,
      'Real-time alerts': true,
      'Threat detection': true,
      'DAO voting': false
    }
  },
  {
    name: 'Full Governance',
    price: '1M $SC',
    amount: 1000000,
    gradient: 'from-teal-500/20 to-emerald-500/20',
    description: 'Complete platform access',
    features: {
      'Early access': true,
      'Basic monitoring': true,
      'Community access': true,
      'Real-time alerts': true,
      'Threat detection': true,
      'DAO voting': true
    }
  }
];
