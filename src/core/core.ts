import Blockchain from "./blockchain";
import * as fs from "fs";

if (fs.readFileSync("blockchain.json", "utf-8").length == 0) {
  fs.writeFileSync("blockchain.json", '{"blockchain":[]}\n');
}

const blockchain = Blockchain.instance;

while (true) {
  blockchain.mineTransactions(
    "042ac38e462bee36a17066627e6d6fe061103a93363f99d21e2b0e33ad0f2b951dc4577dd25b46aa4b498e24aecdf5df18f2189eca32270fb4bef42611cd63d97a"
  );
  fs.writeFileSync("blockchain.json", `${blockchain.toString()}`);
}

// console.log(blockchain.valid);
