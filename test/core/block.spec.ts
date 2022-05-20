import { expect } from "chai";
import Block from "../../src/core/block";
import Transaction from "../../src/core/transaction";

describe("⛏ Test Block(s)", (): void => {
  it("#️⃣ Block Hash valid", (): void => {
    const block = new Block(
      0,
      new Date(2009, 1, 3, 18, 15, 0).toUTCString(),
      [new Transaction()],
      "000"
    );
    expect(block.hash).to.be.equal(
      "d932d2c6b565fdc5128ddc638ee5105346b3b83d318d93c2773748b04ef36044"
    );
  });
});
