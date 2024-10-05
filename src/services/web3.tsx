import Web3 from "web3";
import ABI from "./ABI.json";

const CONTRACT_ADDRESS = "0x20458e31Bf31b2bbf62bc7aC89687a152EE77593";

export async function loginWithMetamask() {
  const hasMetamask = window.ethereum;

  if (!hasMetamask) throw new Error("Metamask not found");

  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  if (!accounts || accounts.length === 0)
    throw new Error("Metamask not authorized");

  localStorage.setItem("wallet", accounts[0]);

  return accounts[0];
}

export async function getContract() {
  const hasMetamask = window.ethereum;
  if (!hasMetamask) throw new Error("Metamask not found");

  const wallet = localStorage.getItem("wallet");
  if (!wallet) throw new Error("Wallet not found");

  const web3 = new Web3(window.ethereum);
  const contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS, {
    from: wallet,
  });

  return contract;
}

export async function getDispute(): Promise<Dispute> {
  const contract = await getContract();

  const dispute = (await contract.methods.dispute().call()) as Dispute;

  return dispute;
}

export async function bet(
  candidate: number,
  amountInEth: number
): Promise<unknown> {
  const contract = await getContract();

  const transaction = await contract.methods.bet(candidate).send({
    value: Web3.utils.toWei(amountInEth, "ether"),
    gas: "115691",
    gasPrice: "30070000014",
  });

  return transaction;
}

export async function claimPrize(): Promise<unknown> {
  const contract = await getContract();

  return await contract.methods.claim().send();
}

export type Dispute = {
  candidate1: number | string;
  candidate2: number | string;
  image1: string | string;
  image2: string;
  total1: number;
  total2: number;
  winner: number;
};
