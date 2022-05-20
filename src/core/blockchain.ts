import Block from "./block";

export default class Blockchain {
  public static instance = new Blockchain();

  private blockchain: Block[];
  private difficulty: number;

  constructor() {
    this.difficulty = 2;
    this.blockchain = [new Block(0, new Date().toUTCString(), [], "0")];
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
}
