import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { verifyContract } from "../utils/verifyContract";
import { TOKEN_NAME, TOKEN_SYMBOL } from "../utils/constants";
import { ethers } from "ethers";
import { SALT, MAX_TOTAL_SUPPLY } from "../utils/constants";
import * as dotenv from "dotenv";

dotenv.config();

const version = "v1.0.0";
const contractName = "ArkefiToken";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  async function main() {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    console.log(`Use contract ${contractName}\n`);

    const { deployments, getNamedAccounts, network } = hre;

    const { deploy } = deployments;

    let { deployer, admin } = await getNamedAccounts();

    // Owner of the contract is the deployer
    if(process.argv.slice(4)[0] == "keepOwnership"){
      admin = deployer;
    }

    console.log(`Deploying ${contractName} ${version}\n`);

    const deployResult = await deploy(contractName, {
      from: deployer,
      deterministicDeployment: ethers.utils.formatBytes32String(SALT),
      args: [MAX_TOTAL_SUPPLY],
      proxy: {
        owner: admin,
        proxyContract: "OptimizedTransparentProxy",
        execute: {
          init: {
            methodName: "init",
            args: [TOKEN_NAME, TOKEN_SYMBOL, admin],
          },
        },
      },
      gasLimit: 4000000,
      log: true,
    });
    
    console.log(`\nDefaultProxyAdmin deployed to: ${deployResult.args![1]}\n`);

    console.log(`${contractName}_Implementation deployed to: ${deployResult.implementation}\n`);

    console.log(`Contract ${contractName} deployed to: ${deployResult.address}\n`);

    //await verifyContract(network, deployResult, contractName);

    return true;
  }

  // We recommend this pattern to be able to use async/await everywhere
  // and properly handle errors.
  await main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
};

const id = contractName + version;

export default func;
func.tags = [contractName, version, "upgrade", "keepOwnership"];
func.id = id;
