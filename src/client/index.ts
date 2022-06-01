import * as readline from "readline";
import * as fs from "fs";
import Wallet from "./wallet";

type clData = {
  wallets: Wallet[];
};

if (fs.readFileSync("client_data.json", "utf-8").length == 0) {
  fs.writeFileSync("client_data.json", '{"wallets":[]}\n');
}

import clientData from "../../client_data.json";

const wallets: Wallet[] = (clientData as clData).wallets;
let currentWallet: Wallet;

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
      "\nChoose an existing wallet or type 'c' to create a new one: ",
      (input) => {
        if (input.toUpperCase() == "C") {
          createWallet().then((): void => {
            resolve();
          });
          return;
        }
        wallets.forEach((wallet): void => {
          if (!wallets[Number.parseInt(input)]) {
            console.error("Invalid wallet, please try again");
            return resolve();
          }
          currentWallet = wallet;
          resolve();
        });
      }
    );
  });
};

const saveWallets = (): void => {
  fs.writeFileSync(
    "client_data.json",
    `{"wallets":${JSON.stringify(wallets)}}`
  );
};

const startClient = async () => {
  printTitle();
  listWallets();
  while (!currentWallet) {
    await selectWallet();
  }
  saveWallets();
  rl.close();
};

startClient();
