import Blockchain from "./blockchain";
import * as fs from "fs";

if (fs.readFileSync("blockchain.json", "utf-8").length == 0) {
  fs.writeFileSync("blockchain.json", '{"blockchain":[]}\n');
}

const blockchain = Blockchain.instance;

while (true) {
  blockchain.mineTransactions(
    "046fbd5b01396d39ea4ddd52bb1717b58de28c858adc93147defa9d4e18f37c959c744145e23102cb05565548735d372ad45f4f1bed856167aadd988ceb8586fc8"
  );
  fs.writeFileSync("blockchain.json", `${blockchain.toString()}`);
}

// console.log(blockchain.valid);
