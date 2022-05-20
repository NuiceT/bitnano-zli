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
    transactions: Transaction[],
    previousHash: string
  ) {
    this.index = index;
    this.timestamp = timestamp;
    this.nonce = 0;
    this.transactions = transactions;
    this.hash = this.calculateHash();
    this.previousHash = previousHash;
  }

  calculateHash = (): string => {
    return crypto
      .createHash("sha256")
      .update(
        this.index +
          this.timestamp +
          this.nonce +
          this.transactions +
          this.previousHash
      )
      .end()
      .digest("hex");
  };

  mineBlock = (difficulty: number): void => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
      console.log(this.nonce);
    }
    console.log(`Block mined ${this.hash}`);
  };
}
