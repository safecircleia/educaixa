import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import BigNumber from 'bignumber.js';
import { encodeURL, findReference, FindReferenceError, validateTransfer } from 'solana-pay';
import { MERCHANT_WALLET } from './constants';
import { establishConnection } from './establishConnection';
import { simulateCheckout } from './simulateCheckout';
import { simulateWalletInteraction } from './simulateWalletInteraction';

async function main() {
    console.log("Let's simulate a Solana Pay flow ... \n");
    let paymentStatus: string;

    console.log('1. ✅ Establish connection to the cluster');
    const connection = await establishConnection();

    console.log('\n2. 🛍 Simulate a customer checkout \n');
    const { label, message, memo, amount, reference } = await simulateCheckout();

    console.log('3. 💰 Create a payment request link \n');
    const url = encodeURL({ recipient: MERCHANT_WALLET, amount, reference, label, message, memo });

    console.log('4. 🔐 Simulate wallet interaction \n');
    simulateWalletInteraction(connection, url);

    paymentStatus = 'pending';

    console.log('\n5. Find the transaction');
    let signatureInfo;

    const { signature } = await new Promise((resolve, reject) => {
        const interval = setInterval(async () => {
            console.count('Checking for transaction...');
            try {
                signatureInfo = await findReference(connection, reference, { finality: 'confirmed' });
                console.log('\n 🖌  Signature found: ', signatureInfo.signature);
                clearInterval(interval);
                resolve(signatureInfo);
            } catch (error: any) {
                if (!(error instanceof FindReferenceError)) {
                    console.error(error);
                    clearInterval(interval);
                    reject(error);
                }
            }
        }, 250);
    });

    paymentStatus = 'confirmed';

    console.log('\n6. 🔗 Validate transaction \n');

    try {
        await validateTransfer(connection, signature, { recipient: MERCHANT_WALLET, amount });

        paymentStatus = 'validated';
        console.log('✅ Payment validated');
        console.log('📦 Ship order to customer');
    } catch (error) {
        console.error('❌ Payment failed', error);
    }
}

main().then(
    () => process.exit(),
    (err) => {
        console.error(err);
        process.exit(-1);
    }
);