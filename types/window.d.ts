interface Window {
  phantom?: {
    solana?: {
      isConnected: boolean;
      connect(): Promise<void>;
      disconnect(): Promise<void>;
      publicKey: PublicKey;
      on(event: string, callback: (publicKey: PublicKey) => void): void;
      signTransaction(transaction: Transaction): Promise<Transaction>;
    };
  };
}
