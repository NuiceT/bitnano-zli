import Blockchain from "./blockchain";

const blockchain = new Blockchain();

while (true) {
  blockchain.mineTransactions(
    "04d2e79d51dbbd62162008155898a1c7c0a69842655e8672ea5f25c05a3183254f22e28ad70822141922d6693593b94a19ac1e3f628b97d51dde9501372efa80af"
  );
}

export default blockchain;
