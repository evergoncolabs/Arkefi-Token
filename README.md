# Arkefi Token

## RKFI token contract
An upgradable ERC20 contract owned by a multi-signature wallet. Also, it allows creating snapshots, pausing it, support [EIP-2612](https://eips.ethereum.org/EIPS/eip-2612) and batch minting.

## Env variables
You will need to generate a `.env` file using `.env.example` as a boilerplate.
* `PrivateKey`, `Mnemonic` or `ledgerAddress` are required for live deployment but can be skipped for local development.
* `MultiSig` address is required for all deployments, as **the script will transfer ownership of the token to this address**.
* `SALT` is used for deterministic deployment (same token address across chains), if none is provided it will use the default from `utils/constants.ts`.
* `Token Symbol`, `Token Name`, and `Max Total Supply` are hardcoded within `utils/constants.ts`.

## Usage
Need node 18 installed and `yarn`.
First, install the dependencies
```bash
yarn install
```

Then compile the contracts to get types from typechain
```bash
yarn compile
```

To run tests use
```bash
yarn test
```
It will also show gas used

To check converage run
```bash
yarn coverage
```

## Deploy
To deploy and give the ownership to the multiSig address run
```bash
yarn deploy <NetworkName>
```
Where `NetworkName` is one of the networks configured in (hardhat.networks.ts)[./hardhat.networks.ts] (ledger option has `Ledger` at the end of the name).

## Deploy with mint
To deploy, mint and then transfer the ownership to the multiSig address run
```bash
yarn deployKeepOwnership <NetworkName>
yarn mintTokens <NetworkName> <UserAddress> <MintAmount>
yarn transferOwnership <NetworkName>
```
Where `UserAddress` is the user who will be minted the tokens and `MintAmount` is the amount of tokens to mint (parsed to ethers).

Deployment is deterministic, this means that it can be precalculated and that it will have the same address across all chains.
**Important to keep the same address, SALT and BYTECODE must be the same, bytecode includes not just the compiled contracts, but the parameters used in the constructor as well**

## Verification
The deployment script also verifies the smart contracts using `hardhat-etherscan`, but it needs the API KEY from the explorers, you will need to add them in the `.env` file. (this option is commented in the script)

If the network where you are deploying uses Blockscout, use Sourcify instead.
```bash
yarn hardhat --network <NetworkName> sourcify
```

## Minting (recommended only for test environments)
If the owner of the contract is the same as the deployer (i.e. if you don't set up a Multisig owner or if you set Multisig as the same address as the deployer address), you can mint tokens running the HardHat task [mintTokens.ts](./scripts/mintTokens.ts) by using:
```bash
yarn mintTokens <NetworkName> <UserAddress> <MintAmount>
```
