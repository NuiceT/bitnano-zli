import { expect } from "chai";
import Block from "../../src/core/block";
import Blockchain from "../../src/core/blockchain";

describe("⛓ Test Blockchain", (): void => {
  it("✅ Verify valid Blockchain", (): void => {
    expect(Blockchain.instance.valid).to.be.true;
  });
  it("❌ Verify broken Blockchain", (): void => {
    const blockchain = Blockchain.instance;
    const block = new Block(1, "", [], "");
    block.mineBlock(1);
    blockchain.addBlock(block);
    block.mineBlock(0);
    blockchain.addBlock(block);
    expect(Blockchain.instance.valid).to.be.false;
  });
});
