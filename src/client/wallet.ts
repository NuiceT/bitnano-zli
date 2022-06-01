import * as crypto from "crypto";

export default class Wallet {
  name!: string;
  privateKey!: string;

  constructor(name: string, privateKey?: string) {
    this.name = name;
    if (!privateKey) {
      const ecdh = crypto.createECDH("secp256k1");
      ecdh.generateKeys();

      this.privateKey = ecdh.getPrivateKey("hex");
      return;
    }
    this.privateKey = privateKey;
  }

  public get publicKey(): string {
    const ecdh = crypto.createECDH("secp256k1");
    ecdh.setPrivateKey(this.privateKey, "hex");
    return ecdh.getPublicKey("hex");
  }
}
