import Transaction from "./transaction";
import * as crypto from "crypto";

export default class Block {
  index!: number;
  timestamp!: string;
  nonce!: number;
  transactions!: Transaction[];
  hash!: string;
  previousHash!: string;

  constructor(
    index: number,
    timestamp: string,
    nonce: number,
    transactions: Transaction[],
    previousHash: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.nonce = nonce;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.previousHash = previousHash;
  }
}
