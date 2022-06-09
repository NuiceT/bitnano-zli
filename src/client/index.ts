import * as readline from "readline";
import * as fs from "fs";
import Wallet from "./wallet";

import blockchain from "../core/blockchain";

type clData = {
  wallets: Wallet[];
};

if (fs.readFileSync("client_data.json", "utf-8").length == 0) {
  fs.writeFileSync("client_data.json", '{"wallets":[]}\n');
}

import clientData from "../../client_data.json";
import Blockchain from "../core/blockchain";

const wallets: Wallet[] = [];
let quit = false;
let currentWallet: Wallet;

(clientData as clData).wallets.forEach((wallet): void => {
  wallets.push(new Wallet(wallet.name, wallet.privateKey));
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const printTitle = (): void => {
  console.log(
    " ____  _ _\n| __ )(_) |_ _ __   __ _ _ __   ___\n|  _ \\| | __| '_ \\ / _` | '_ \\ / _ \\\n| |_) | | |_| | | | (_| | | | | (_) |\n|____/|_|\\__|_| |_|\\__,_|_| |_|\\___/\nClient | Version " +
      process.env.npm_package_version
  );
};

const listWallets = (): void => {
  console.log("\nWallets:");
  wallets.forEach((wallet: Wallet) => {
    console.log(`[${wallets.indexOf(wallet)}] ${wallet.name}`);
  });
};

const createWallet = (): Promise<void> => {
  return new Promise<void>((resolve): void => {
    rl.question("Enter new Wallet name ('e' to exit): ", (input): void => {
      if (input.toUpperCase() == "E") {
        return resolve();
      }
      if (
        wallets
          .map((wallet) => {
            return wallet.name;
          })
          .includes(input)
      ) {
        console.error("\nWallet name already exists!");
        return resolve();
      }
      currentWallet = new Wallet(input);
      wallets.push(currentWallet);
      return resolve();
    });
  });
};

const selectWallet = (): Promise<void> => {
  return new Promise((resolve): void => {
    if (wallets.length == 0) {
      console.error("\nNo wallets found. Please create a new one.");
      createWallet()
        .then(() => {
          resolve();
        })
        .catch(() => {
          return;
        });
    }
    rl.question(
      "\nChoose an existing wallet, type 'c' to create a new one or 'q' to quit: ",
      (input) => {
        if (input.toUpperCase() == "C") {
          createWallet().then((): void => {
            resolve();
          });
          return;
        }
        if (input.toUpperCase() == "Q") {
          quit = true;
          return resolve();
        }
        if (wallets.includes(wallets[Number.parseInt(input)])) {
          currentWallet = wallets[Number.parseInt(input)];
          return resolve();
        }
        console.error("Invalid wallet, please try again");
        return resolve();
      }
    );
  });
};

const saveWallets = (): Promise<void> => {
  return new Promise((resolve): void => {
    fs.writeFile(
      "client_data.json",
      `{"wallets":${JSON.stringify(wallets)}}`,
      () => {
        return resolve();
      }
    );
  });
};

const selectAction = (): Promise<void> => {
  return new Promise((resolve): void => {
    rl.question(
      "\n1) Check balance\n2) Create Transaction\n3) Get Transaction History\n4) Delete wallet\n5) Get Wallet Address\nQ) Quit program\n\nSelect your action: ",
      async (input) => {
        if (input.toUpperCase() == "Q") {
          quit = true;
          return resolve();
        }
        if (input == "1") {
          checkBalance();
        }
        if (input == "4") {
          await deleteCurrentWallet();
        }
        if (input == "3") {
          getTxHistory();
        }
        if (input == "5") {
          console.log("\nWallet address: " + currentWallet.publicKey);
        }
        quit = true;
        return resolve();
      }
    );
  });
};

const checkBalance = (): void => {
  console.log(
    `\nCurrent balance: ${blockchain.instance.getBalance(
      currentWallet.publicKey
    )} Ƀ`
  );
};

const createTransaction = (): void => {
  // TODO: Create Transaction and push to chain
};

const getTxHistory = (): void => {
  console.log(
    Blockchain.instance.getFilteredTransactions(currentWallet.publicKey)
  );
};

const deleteCurrentWallet = (): Promise<void> => {
  return new Promise((resolve): void => {
    rl.question(
      `Are you sure to delete the wallet '${currentWallet.name}'? (y/n) `,
      (input): void => {
        if (input.toUpperCase() == "N") {
          quit = true;
          return resolve();
        }
        if (input.toUpperCase() == "Y") {
          wallets.splice(wallets.indexOf(currentWallet), 1);
          return resolve();
        }
      }
    );
  });
};

const startClient = async () => {
  printTitle();
  listWallets();
  while (!currentWallet && !quit) {
    await selectWallet();
  }
  while (!quit) {
    await selectAction();
  }
  await saveWallets();
  rl.close();
};

startClient();
