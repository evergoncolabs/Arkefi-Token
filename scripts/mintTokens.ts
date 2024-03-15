import { task } from "hardhat/config";
import { Contract } from "ethers";

// command to execute script:
// yarn mintTokens <network name> <address> <amount>

// This script only works if the deployer is the admin of the contract

task("mintTokens", "Mint tokens to an address")
    .addPositionalParam("user")
    .addPositionalParam("amount")
    .setAction(async (taskArgs) => {
        // Get contract
        const arkefiToken: Contract = await ethers.getContract("ArkefiToken");

        console.log("Minting tokens...");

        const tx = await arkefiToken.mint(taskArgs.user, taskArgs.amount);
        await tx.wait();

        console.log("\nTokens minted successfully\n");
    });

