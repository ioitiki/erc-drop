const Valiant = artifacts.require("./Valiant.sol");
const ValiantFactory = artifacts.require("./ValiantFactory.sol");

module.exports = async (deployer, network, addresses) => {
  // OpenSea proxy registry addresses for rinkeby and mainnet.
  let proxyRegistryAddress = "";
  if (network === 'rinkeby') {
    proxyRegistryAddress = "0xf57b2c51ded3a29e6891aba85459d600256cf317";
  } else {
    proxyRegistryAddress = "0xa5409ec958c83c3f309868babaca7c86dcb077c1";
  }

  await deployer.deploy(Valiant, proxyRegistryAddress, { gas: 5000000 });

  await deployer.deploy(ValiantFactory, proxyRegistryAddress, Valiant.address, { gas: 7000000 });
  const valiant = await Valiant.deployed();
  await valiant.transferOwnership(ValiantFactory.address);
};
