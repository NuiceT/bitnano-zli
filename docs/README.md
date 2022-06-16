# Bitnano - Documentation <!-- omit in toc -->

> Note: The docs are also available here: https://nuicet.github.io/bitnano-zli/

## Table of contents <!-- omit in toc -->

- [Introduction](#introduction)
- [The idea](#the-idea)
  - [Description](#description)
  - [UML Diagrams](#uml-diagrams)
  - [Use case diagram](#use-case-diagram)
- [Class Diagram](#class-diagram)
- [Time schedule](#time-schedule)
- [Realization](#realization)
  - [Core](#core)
    - [Block](#block)
      - [Hash calculation](#hash-calculation)
      - [Block mining](#block-mining)
    - [Blockchain](#blockchain)
      - [Connection between Blocks](#connection-between-blocks)
      - [Don't trust, verify](#dont-trust-verify)
      - [Pending transaction](#pending-transaction)
  - [Client](#client)
    - [Choose/create Wallet](#choosecreate-wallet)
- [Getting started](#getting-started)
  - [Node.js](#nodejs)
  - [Config files](#config-files)
- [Starting the core/client](#starting-the-coreclient)
  - [Testing](#testing)
    - [Core](#core-1)
    - [Client](#client-1)
- [Test cases](#test-cases)
- [Reflection](#reflection)

## Introduction

The Bitcoin protocol is the most popular cryptographic protocol worldwide. Since I am a big fan of Bitcoin and its protocol, I always wanted to create something similar my own. This is how i came to [the idea](#the-idea) of Bitnano as a final project in the Zürcher Lehrbetriebsverband ICT.

## The idea

![idea](assets/01-the-idea.png)

### Description

Traditional banks need time and trust to process a transfer. Bitcoin replaces (central) banks with a decentral Blockchain. In the Bitcoin Blockchain, a Block has a maximum size of **1 MiB**. Approximately every **10 minutes** a new Block gets mined.
The idea of Bitnano is to create a faster Blockchain, but with a lower size of Blocks. The maximum size of a Bitnano-Block is **512 KiB**, with an average time of **5 minutes** per Block to mine.

For more information about the Bitcoin-Protocol: [https://bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)

### UML Diagrams

### Use case diagram

![uml1](assets/02-use-case.png)

## Class Diagram

![uml2](assets/02-uml.png)

## Time schedule

[![time](assets/03-time.png)](assets/03-time.png)

## Realization

### Core

For the core implementation, I got inspiration from this [YouTube Playlist](https://www.youtube.com/playlist?list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4). But he did it without Typescript and had no implemented client.

#### Block

The idea of a block, is to include transactions and getting mined by miners. As in Bitcoin, I wanted blocks including a hash and transactions. So I designed the [UML](#uml-diagrams) for the block and started programming immediately. I think there is nothing much more to say, as i got my inspiration from [Youtube](https://www.youtube.com/playlist?list=PLzvRQMJ9HDiTqZmbtFisdXFxul5k0F-Q4).

##### Hash calculation

To calculate a Block hash, I used a simple 256-bit SHA algorithm. The functionality looks like this:

![calculateHash](assets/04-calc-hash.png)

It's not really that hard, just implementation from the existing node.js [crypto](https://nodejs.org/api/crypto.html) library.

##### Block mining

To mine a block, you'll have to get the blockchains difficulty by providing it to the method. The difficulty is being set, by only allowing hashes, with a specific amount of zeros. For example: `000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f`<br>
After that, it really isn't hard to start the mining, it's just luck and performance. That's how proof-of-work works.

> For more information about the proof-of-work algorithm, see [https://bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)

![blockmine](assets/04-mine-block.png)

#### Blockchain

##### Connection between Blocks

As in every proof-of-work blockchain, the blocks are connected with their hash including the hash of the block before. For example:

![blockchain hash](assets/04-blockchain-hash.png)
Source: https://bitcoin.org/bitcoin.pdf

##### Don't trust, verify

To verify the blockchain, you can just recalculate the blocks with the same properties as the already calculated hash and compare it. With this, you don't have to trust and verify everything yourself.

![valid](assets/04-valid.png)

##### Pending transaction

Pending transactions are currently being saved in a JSON file. The core reads that file and includes the pending transaction into newly mined blocks. Afterwards, the pending transactions get purged.

![tx](assets/04-tx.png)

### Client

The idea of the client is to manage wallets and create transactions. After some considerations, I came to following CLI Design:

![cli](assets/04-cli.png)

#### Choose/create Wallet

After starting the client, you should be able to choose between multiple wallets or create a new one. The private keys will be saved into a JSON file

![wallets](assets/04-wallets.png)

## Getting started

> Note: Everything is also being described [here](../README.md)

### Node.js

If you're using nvm, make it use the specified version:

```bash
nvm use
```

Install the dependencies:

_with npm:_

```bash
npm install
```

_or with yarn:_

```bash
yarn install
```

### Config files

To start the client/core properly, you'll need to initialize the config files:

```sh
sh initrc
```

> Note: If you are on Windows, you'll need to use WSL in order to execute the script properly. <br> See: https://docs.microsoft.com/en-us/windows/wsl/install > <br><br>_It may run properly with [Git bash](https://gitforwindows.org/), but wasn't tested yet._

## Starting the core/client

Then run the **core**:

_with npm:_

```bash
npm run start:core
```

_or with yarn:_

```bash
yarn start:core
```

> Note: By starting the core, your machine will be automatically used to mine in the blockchain.

After that run the **client:**
_with npm:_

```bash
npm run start:client
```

_or with yarn:_

```bash
yarn start:client
```

### Testing

> The test cases are available [here](https://nuicet.github.io/bitnano-zli#test-cases).

#### Core

_with npm:_

```bash
npm run test:core
```

_or with yarn:_

```bash
yarn test:core
```

#### Client

_with npm:_

```bash
npm run test:client
```

_or with yarn:_

```bash
yarn test:client
```

## Test cases
