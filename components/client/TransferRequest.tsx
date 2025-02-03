import { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { encodeURL, findReference, FindReferenceError, validateTransfer } from '@solana/pay';
import { establishConnection } from '@/lib/establishConnection';
import { simulateCheckout } from '@/lib/simulateCheckout';
import { simulateWalletInteraction } from '@/lib/simulateWalletInteraction';
import { MERCHANT_WALLET } from '@/lib/constants';
import { toast } from 'sonner';

const TransferRequest = ({ amount, onPaymentSuccess }: { amount: number, onPaymentSuccess: () => void }) => {
  const { publicKey } = useWallet();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!publicKey) {
      toast.error('Wallet not connected.');
      return;
    }

    setLoading(true);
    try {
      const connection = await establishConnection();
      const { label, message, memo, amount: checkoutAmount, reference } = await simulateCheckout();
      const url = encodeURL({ recipient: MERCHANT_WALLET, amount: checkoutAmount, reference, label, message, memo });
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

      await validateTransfer(connection, signature, { recipient: MERCHANT_WALLET, amount: checkoutAmount });
      toast.success('Payment successful!');
      onPaymentSuccess();
    } catch (error: unknown) {
      toast.error('Payment failed.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-3 rounded-lg bg-gradient-to-r from-[#4dc8ff] to-[#2dd4bf] text-black font-medium flex items-center justify-center gap-2"
    >
      {loading ? 'Processing Payment...' : `Pay ${amount} SC Tokens`}
    </button>
  );
};

export default TransferRequest;