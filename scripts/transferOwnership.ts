import { roles, MULTISIG_ADDRESS } from "../utils/constants"
import { task } from "hardhat/config";
import { Contract } from "ethers";

// command to execute script:
// yarn transferOwnership <network name>

// This script only works if the deployer is the admin of the contract

const DEFAULT_ADMIN_ROLE = roles.DEFAULT_ADMIN_ROLE;
const MINTER_ROLE = roles.MINTER_ROLE;
const PAUSER_ROLE = roles.PAUSER_ROLE;

task("transferOwnership", "Transfer ownership of the contract to another address and revoke the deployer's admin role")
    .setAction(async () => {
        // Get contract
        const arkefiToken: Contract = await ethers.getContract("ArkefiToken");

        console.log("Multisig address: ", MULTISIG_ADDRESS);
        console.log("Deployer address: ", await arkefiToken.signer.getAddress());

        console.log("\nTransfering token ownership...\n");

        try {
            console.log("Granting admin role...");
            let tx = await arkefiToken.grantRole(DEFAULT_ADMIN_ROLE, MULTISIG_ADDRESS);
            await tx.wait();

            console.log("Granting minter role...");
            tx = await arkefiToken.grantRole(MINTER_ROLE, MULTISIG_ADDRESS);
            await tx.wait();

            console.log("Granting pauser role...");
            tx = await arkefiToken.grantRole(PAUSER_ROLE, MULTISIG_ADDRESS);
            await tx.wait();

            console.log("Revoking deployer's pauser role...");
            tx = await arkefiToken.revokeRole(PAUSER_ROLE, await arkefiToken.signer.getAddress());
            await tx.wait();

            console.log("Revoking deployer's minter role...");
            tx = await arkefiToken.revokeRole(MINTER_ROLE, await arkefiToken.signer.getAddress());
            await tx.wait();

            if(await arkefiToken.hasRole(DEFAULT_ADMIN_ROLE, MULTISIG_ADDRESS)){
                console.log("Revoking deployer's admin role...");
                tx = await arkefiToken.revokeRole(DEFAULT_ADMIN_ROLE, await arkefiToken.signer.getAddress());
                await tx.wait();
            }

            console.log("\nToken ownership transfered successfully\n");

        } catch (error) {
            console.log("Deployer is not the admin of the token contract");
        }

        // ProxyAdmin
        const ProxyAdmin = await ethers.getContract("DefaultProxyAdmin");

        console.log("Transfering ProxyAdmin ownership...");

        try{
            let tx = await ProxyAdmin.transferOwnership(MULTISIG_ADDRESS);
            await tx.wait();

            console.log("\nProxyAdmin ownership transfered successfully\n");

        }catch(e){
            console.log("Deployer is not the admin of the ProxyAdmin contract");
        }
    });

