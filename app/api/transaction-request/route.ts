import { NextResponse } from 'next/server';
import { Connection, clusterApiUrl, PublicKey, Transaction } from '@solana/web3.js';
import { createTransferInstruction, getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { TREASURY_WALLET } from '@/lib/constants'; // Ensure TREASURY_WALLET is defined in your constants

export async function GET(request: Request) {
  return NextResponse.json({
    label: "SafeCircle",
    icon: "https://solana.com/src/img/branding/solanaLogoMark.svg",
  });
}

export async function POST(request: Request) {
  const { account, reference } = await request.json();
  if (!account || !reference) {
    return NextResponse.json({ error: 'Missing account or reference' }, { status: 400 });
  }
  
  const connection = new Connection(clusterApiUrl("devnet"));
  const { blockhash } = await connection.getLatestBlockhash();

  // Create a transaction with the latest blockhash
  const transaction = new Transaction({
    recentBlockhash: blockhash,
    feePayer: new PublicKey(account),
  });

  // Use your own SC token mint address
  const tokenMint = new PublicKey("CQcjASdDAvTMJsybZTJJ3hvfdwbi4uTqmtd2SNqYpump");
  const userPubKey = new PublicKey(account);
  const treasuryPubKey = new PublicKey(TREASURY_WALLET);
  
  // Derive associated token addresses for sender and treasury
  const senderATA = await getAssociatedTokenAddress(tokenMint, userPubKey);
  const treasuryATA = await getAssociatedTokenAddress(tokenMint, treasuryPubKey);
  
  // Define transfer amount (adjust decimals as needed, e.g. 1 token = 1_000_000 for 6 decimals)
  const amount = 1_000_000;

  // Build the token transfer instruction
  const transferIx = createTransferInstruction(
    senderATA,
    treasuryATA,
    userPubKey,
    amount,
    [],
    TOKEN_PROGRAM_ID
  );
  
  // Include the reference as a non-signer key for transaction tracking
  transferIx.keys.push({
    pubkey: new PublicKey(reference),
    isSigner: false,
    isWritable: false,
  });
  
  transaction.add(transferIx);
  
  const serializedTransaction = transaction.serialize({ requireAllSignatures: false });
  const base64 = serializedTransaction.toString("base64");
  
  const message = "Transfer 1 SC token";
  
  return NextResponse.json({
    transaction: base64,
    message,
  });
}
