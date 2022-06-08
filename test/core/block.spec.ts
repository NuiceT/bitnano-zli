import { expect } from "chai";
import Block from "../../src/core/block";
import Transaction from "../../src/core/transaction";

describe("⛏ Test Block(s)", (): void => {
  it("#️⃣ Block Hash valid", (): void => {
    const block = new Block(
      0,
      new Date(2009, 1, 3, 18, 15, 0).toUTCString(),
      [],
      "000"
    );
    expect(block.hash).to.be.equal(
      "5a6e78939d265d99175e5f6fd1c1de2e6f8c05756434388dc5a97d1aa7216abe"
    );
  });
});
