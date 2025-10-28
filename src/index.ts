import inquirer from "inquirer";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, sendAndConfirmTransaction, SystemProgram, Transaction } from "@solana/web3.js";
import type { Cluster } from "@solana/web3.js";
import { readFileSync } from "fs";


async function main() {
  console.log("Welcome to Solana CLI \n");

  // Step 1: Require user to type "solana"
  const { keyword } = await inquirer.prompt([
    {
      type: "input",
      name: "keyword",
      message: 'Type "solana" to continue: to the users:',
      validate: (input) =>
        input.trim().toLowerCase() === "solana" ||
        'You must type exactly "solana" to continue.',
    },
  ]);
  console.log("Great! Let’s proceed.\n");

  // Step 2: Choose the action
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "What do you want to do?",
      choices: ["transfer", "swap", "rent", "airdrop"],
    },
  ]);

  // Step 3: Select network
  const { cluster } = await inquirer.prompt([
    {
      type: "list",
      name: "cluster",
      message: "Select network:",
      choices: ["devnet", "testnet", "mainnet-beta"],
      default: "devnet",
    },
  ]);


  const {actions} = await inquirer.prompt ( [
{
  type:"list",
  names: "cluster",
  message: "Is this network",
  choices: ["devnet"],
  default:"devnet"
}


  ])

  console.log(`\nAction: ${action}`);
  console.log(`Network: ${cluster}\n`);

  // Step 4: Handle each action
  switch (action) {
    case "transfer":
      await handleTransfer(cluster as Cluster);
      break;
    case "airdrop":
      await handleAirdrop(cluster as Cluster);
      break;
    default:
      console.log(`${action} not implemented yet.`);
  }
}

// ========== ACTION HANDLERS ==========

async function handleTransfer(cluster: Cluster) {
  const connection = new Connection(clusterApiUrl(cluster), "confirmed");

  const { recipient, amount, secretKeyPath } = await inquirer.prompt([
    {
      type: "input",
      name: "recipient",
      message: "Enter recipient wallet address:",
      validate: (input) =>
        input && input.length > 30 ? true : "Invalid address",
    },
    {
      type: "number",
      name: "amount",
      message: "Enter amount (in Lamports):",
      validate: (n) => typeof n ==='number' && n > 0 || "Amount must be greater than 0",
    },
    {
      type: "input",
      name: "secretKeyPath",
      message:
        "Enter path to your sender secret key file (e.g., ~/.config/solana/id.json):",
      default: `${process.env.HOME}/.config/solana/id.json`,
    },
  ]);

  try {
    const keyData = JSON.parse(readFileSync(secretKeyPath, 'utf8'));
    const sender = Keypair.fromSecretKey(Uint8Array.from(keyData));
    const recipientPubkey = new PublicKey(recipient);

    console.log(`\nSender: ${sender.publicKey.toBase58()}`);
    console.log(`Sending ${amount} SOL to ${recipient} on ${cluster}...`);

    const tx = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: sender.publicKey,
        toPubkey: recipientPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    const sig = await sendAndConfirmTransaction(connection, tx, [sender]);
    console.log(`Success! Tx: https://explorer.solana.com/tx/${sig}?cluster=${cluster}`);
  } catch (err) {
    console.error("Transfer failed:", err);
  }
}

async function handleAirdrop(cluster: Cluster) {
  const connection = new Connection(clusterApiUrl(cluster), "confirmed");
  const { publicKey, amount } = await inquirer.prompt([
    { type: "input", name: "publicKey", message: "Enter wallet address to airdrop SOL to:" },
    { type: "number", name: "amount", message: "Enter amount (in SOL):" },
  ]);
  try {
    const sig = await connection.requestAirdrop(
      new PublicKey(publicKey),
      amount * LAMPORTS_PER_SOL
    );
    console.log(`Airdrop requested! Tx: https://explorer.solana.com/tx/${sig}?cluster=${cluster}`);
  } catch (err) {
    console.error("Airdrop failed:", err);
  }
}
// test commit 1
// test commit 2
// test commit 3
// test commit 5
main().catch((err) => console.error(err));
