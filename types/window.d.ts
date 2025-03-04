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

  // Google Translate API types
  google?: {
    translate?: {
      TranslateElement?: {
        new(options: any, element: HTMLElement): any;
        getInstance(): {
          restore: () => void;
          showBanner: (show: boolean) => void;
        };
      };
    };
  };
}
