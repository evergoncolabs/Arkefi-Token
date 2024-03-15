import * as dotenv from "dotenv";

dotenv.config();

// accounts used to deploy the contract (private key or mnemonic)
export const accounts =
  !process.env.PRIVATE_KEY && !process.env.HDWALLET_MNEMONIC
    ? undefined
    : process.env.PRIVATE_KEY
    ? [process.env.PRIVATE_KEY]
    : {
        mnemonic: process.env.HDWALLET_MNEMONIC,
      };

// ledgers used to deploy the contract
export const ledgerAccounts = [
  process.env.LEDGER_ADDRESS || "0x0"
];

// salt used to deploy the contract
export const SALT = process.env.SALT || "...";

export const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

export const TOKEN_NAME = "Arkefi Token";

export const TOKEN_SYMBOL = "RKFI";

// the address of the multisig wallet that will get the ownership of the contract
export const MULTISIG_ADDRESS = process.env.MULTISIG_ADDRESS || "0x0";

// api key to verify the contract
export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
export const AVALANCHE_API_KEY = process.env.AVALANCHE_API_KEY || "";
export const OPTIMISM_API_KEY = process.env.OPTIMISM_API_KEY || "";
export const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";
export const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";
export const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
export const GNOSIS_API_KEY = process.env.GNOSIS_API_KEY || "";

export const MAX_TOTAL_SUPPLY = "1000000000000000000000000000"; // cap is 1000M

// decode roles managed by the token contract, used in the transferOwnership task
export const roles: any = {
  // DEFAULT_ADMIN_ROLE = 0x00
  DEFAULT_ADMIN_ROLE: "0x0000000000000000000000000000000000000000000000000000000000000000",
  // MINTER_ROLE = keccak256("MINTER_ROLE")
  MINTER_ROLE: "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
  // PAUSER_ROLE = keccak256("PAUSER_ROLE")
  PAUSER_ROLE: "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a"
};