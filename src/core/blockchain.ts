import Block from "./block";
import Transaction from "./transaction";

export default class Blockchain {
  public static instance = new Blockchain();

  private blockchain: Block[];
  private difficulty: number;

  private pendingTransactions: Transaction[];

  private reward: number;

  constructor() {
    this.difficulty = 2;
    this.blockchain = [new Block(0, new Date().toUTCString(), [], "0")];
    this.pendingTransactions = [];
    this.reward = 25;
  }

  public get latestBlock(): Block {
    return this.blockchain[this.blockchain.length - 1];
  }

  public get valid(): boolean {
    for (let i = 1; i < this.blockchain.length; i++) {
      if (this.blockchain[i].hash !== this.blockchain[i].calculateHash())
        return false;
      if (this.blockchain[i].previousHash !== this.blockchain[i - 1].hash)
        return false;
    }
    return true;
  }

  addBlock(block: Block): void {
    block.previousHash = this.latestBlock.hash;
    block.mineBlock(this.difficulty);
    this.blockchain.push(block);
  }

  addTransaction(transaction: Transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalance(address: string) {
    let balance = 0;
    this.blockchain.forEach((block: Block): void => {
      block.transactions.forEach((transaction: Transaction): void => {
        if (transaction.fromAddress === address) balance -= transaction.amount;
        if (transaction.toAddress === address) balance += transaction.amount;
      });
    });
    return balance;
  }

  mineTransactions(rewardAddress: string): void {
    const block = new Block(
      this.blockchain.length,
      new Date().toUTCString(),
      this.pendingTransactions,
      this.latestBlock.hash
    );

    this.pendingTransactions.unshift(
      new Transaction("", rewardAddress, this.reward)
    );

    block.mineBlock(this.difficulty);
    this.blockchain.push(block);
    this.pendingTransactions = [];
  }
}
