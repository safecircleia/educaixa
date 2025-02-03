import type { Connection } from '@solana/web3.js';
import { LAMPORTS_PER_SOL, sendAndConfirmTransaction } from '@solana/web3.js';
import { createTransfer, encodeURL } from '@solana/pay';
import { CUSTOMER_WALLET } from './constants';

export async function simulateWalletInteraction(connection: Connection, url: URL) {
    const { recipient, amount, reference, label, message, memo } = encodeURL(url);
    console.log('label: ', label);
    console.log('message: ', message);

    await getPayer(connection);

    const tx = await createTransfer(connection, CUSTOMER_WALLET.publicKey, { recipient, amount, reference, memo });

    sendAndConfirmTransaction(connection, tx, [CUSTOMER_WALLET]);
}

async function getPayer(connection: Connection) {
    try {
        const airdropSignature = await connection.requestAirdrop(CUSTOMER_WALLET.publicKey, LAMPORTS_PER_SOL * 2);
        await connection.confirmTransaction(airdropSignature);
    } catch {
        // Fail silently
    }
    await new Promise((resolve) => setTimeout(resolve, 5000));

    return;
}