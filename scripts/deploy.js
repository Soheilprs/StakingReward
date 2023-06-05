const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

import { STAKING_TOKEN, REWARD_TOKEN } from "../constants";

async function main() {
  const StakingRewardsContract = await ethers.getContractFactory(
    "StakingRewards"
  );

  const deployedStakingRewardsContract = await StakingRewardsContract.deploy(
    STAKING_TOKEN,
    REWARD_TOKEN
  );

  await deployedStakingRewardsContract.deployed();

  console.log(
    "Staking Reward Contract Address:",
    deployedStakingRewardsContract.address
  );

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployedStakingRewardsContract.address,
    constructorArguments: [STAKING_TOKEN, REWARD_TOKEN],
  });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
