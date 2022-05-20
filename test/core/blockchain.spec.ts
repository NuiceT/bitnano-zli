import { expect } from "chai";
import Block from "../../src/core/block";
import Blockchain from "../../src/core/blockchain";

Blockchain.instance.addBlock(new Block(1, new Date().toUTCString(), [], ""));
Blockchain.instance.addBlock(new Block(2, new Date().toUTCString(), [], ""));
Blockchain.instance.addBlock(new Block(3, new Date().toUTCString(), [], ""));
Blockchain.instance.addBlock(new Block(4, new Date().toUTCString(), [], ""));

describe("⛓ Test Blockchain", (): void => {
  it("✅ Verify valid Blockchain", (): void => {
    expect(Blockchain.instance.valid).to.be.true;
  });
  it("❌ Verify broken Blockchain", (): void => {
    expect(Blockchain.instance.valid).to.be.false;
  });
});
