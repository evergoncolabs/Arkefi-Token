import * as dotenv from "dotenv";

dotenv.config();

export const accounts =
  !process.env.PRIVATE_KEY && !process.env.HDWALLET_MNEMONIC
    ? undefined
    : process.env.PRIVATE_KEY
    ? [process.env.PRIVATE_KEY]
    : {
        mnemonic: process.env.HDWALLET_MNEMONIC,
      };

export const ledgerAccounts = [
  "0x0",
];

export const SALT = process.env.SALT || "...";

export const INFURA_API_KEY = process.env.INFURA_API_KEY || "";

export const TOKEN_NAME = "Arkefi Token";

export const TOKEN_SYMBOL = "RKFI";

export const MULTISIG_ADDRESS = process.env.MULTISIG_ADDRESS || "0x0";

export const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "";
export const AVALANCHE_API_KEY = process.env.AVALANCHE_API_KEY || "";
export const OPTIMISM_API_KEY = process.env.OPTIMISM_API_KEY || "";
export const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || "";
export const ARBISCAN_API_KEY = process.env.ARBISCAN_API_KEY || "";
export const BSCSCAN_API_KEY = process.env.BSCSCAN_API_KEY || "";
export const GNOSIS_API_KEY = process.env.GNOSIS_API_KEY || "";
export const MAX_TOTAL_SUPPLY = "1000000000000000000000000000"; // cap is 1000M
