import Block from "./block";

export default class Blockchain {
  public static instance = new Blockchain();

  private blockchain: Block[];
  private difficulty: number;

  constructor() {
    this.difficulty = 2;
    this.blockchain = [new Block(0, new Date().toUTCString(), [], "0")];
  }

}
