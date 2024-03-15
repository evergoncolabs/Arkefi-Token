import { Contract } from "ethers";
import { ethers } from "hardhat";

let usersToMint: string[] = [""]; // Cannot be empty

let amountsToMint: string[] = [""]; // Cannot be empty

// command to execute script:
// yarn mintTokens <network name>

// This script only works if the deployer is the admin of the contract

export async function main() {

    // Get contract
    const arkefiToken: Contract = await ethers.getContract("ArkefiToken");

    if (usersToMint.length == 0) {
        throw new Error("usersToMint cannot be empty");
    }

    if (amountsToMint.length != usersToMint.length) {
        throw new Error("amountsToMint must have the same length as usersToMint");
    }

    console.log("Minting tokens...");

    const tx = await arkefiToken.batchMint(usersToMint, amountsToMint);
    await tx.wait();

    console.log("Tokens minted successfully");
}

main();
