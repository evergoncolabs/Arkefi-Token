import { task } from "hardhat/config";
import { Contract } from "ethers";

// command to execute script:
// yarn mintTokens <network name> <address> <amount>

// This script only works if the deployer is the admin of the contract

task("mintTokens", "Mint tokens to an address")
    .addPositionalParam("user")
    .addPositionalParam("amount")
    .setAction(async (taskArgs) => {
        const userToMint = taskArgs.user;

        const amountToMint = taskArgs.amount;

        // Get contract
        const arkefiToken: Contract = await ethers.getContract("ArkefiToken");

        console.log("Minting tokens...");

        const tx = await arkefiToken.batchMint([userToMint], [amountToMint]);
        await tx.wait();

        console.log("Tokens minted successfully");
    });

