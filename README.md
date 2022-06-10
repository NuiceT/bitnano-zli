# Bitnano - ZLI Final Project <!-- omit in toc -->

> The full documantation is available [here](docs/05-documentation.md).

## Table of contents <!-- omit in toc -->

- [Getting ready](#getting-ready)
  - [Node.js](#nodejs)
  - [Config files](#config-files)
- [Starting the core/client](#starting-the-coreclient)
- [Testing](#testing)
  - [Core](#core)
  - [Client](#client)

## Getting ready

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

## Testing

> The test cases are available [here](docs/04-tests.md).

### Core

_with npm:_

```bash
npm run test:core
```

_or with yarn:_

```bash
yarn test:core
```

### Client

_with npm:_

```bash
npm run test:client
```

_or with yarn:_

```bash
yarn test:client
```
