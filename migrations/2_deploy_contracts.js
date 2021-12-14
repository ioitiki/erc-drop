const Valiant = artifacts.require("./Valiant.sol");
const ValiantFactory = artifacts.require("./ValiantFactory.sol");
const ValiantLootBox = artifacts.require("./ValiantLootBox.sol");
const ValiantAccessory = artifacts.require("../contracts/ValiantAccessory.sol");
const ValiantAccessoryFactory = artifacts.require("../contracts/ValiantAccessoryFactory.sol");
const ValiantAccessoryLootBox = artifacts.require(
  "../contracts/ValiantAccessoryLootBox.sol"
);
const LootBoxRandomness = artifacts.require(
  "../contracts/LootBoxRandomness.sol"
);

const setupValiantAccessories = require("../lib/setupValiantAccessories.js");

// If you want to hardcode what deploys, comment out process.env.X and use
// true/false;
const DEPLOY_ALL = true;
const DEPLOY_ACCESSORIES_SALE = false;
const DEPLOY_ACCESSORIES = false;
const DEPLOY_VALIANTS_SALE = true;
// Note that we will default to this unless DEPLOY_ACCESSORIES is set.
// This is to keep the historical behavior of this migration.
const DEPLOY_VALIANTS = true;

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  if (DEPLOY_VALIANTS) {
    await deployer.deploy(Valiant, proxyRegistryAddress, {gas: 5000000});
  }

  if (DEPLOY_VALIANTS_SALE) {
    await deployer.deploy(ValiantFactory, proxyRegistryAddress, Valiant.address, {gas: 7000000});
    const valiant = await Valiant.deployed();
    await valiant.transferOwnership(ValiantFactory.address);
  }

  if (DEPLOY_ACCESSORIES) {
    await deployer.deploy(
      ValiantAccessory,
      proxyRegistryAddress,
      { gas: 5000000 }
    );
    const accessories = await ValiantAccessory.deployed();
    await setupValiantAccessories.setupAccessory(
      accessories,
      addresses[0]
    );
  }

  if (DEPLOY_ACCESSORIES_SALE) {
    await deployer.deploy(LootBoxRandomness);
    await deployer.link(LootBoxRandomness, ValiantAccessoryLootBox);
    await deployer.deploy(
      ValiantAccessoryLootBox,
      proxyRegistryAddress,
      { gas: 6721975 }
    );
    const lootBox = await ValiantAccessoryLootBox.deployed();
    await deployer.deploy(
      ValiantAccessoryFactory,
      proxyRegistryAddress,
      ValiantAccessory.address,
      ValiantAccessoryLootBox.address,
      { gas: 5000000 }
    );
    const accessories = await ValiantAccessory.deployed();
    const factory = await ValiantAccessoryFactory.deployed();
    await accessories.transferOwnership(
      ValiantAccessoryFactory.address
    );
    await setupValiantAccessories.setupAccessoryLootBox(lootBox, factory);
    await lootBox.transferOwnership(factory.address);
  }
};
