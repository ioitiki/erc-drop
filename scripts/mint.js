const HDWalletProvider = require("@truffle/hdwallet-provider");
const web3 = require("web3");
// const MNEMONIC = process.env.MNEMONIC;
const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;
const NODE_API_KEY = process.env.INFURA_KEY || process.env.ALCHEMY_KEY;
const isInfura = !!process.env.INFURA_KEY;
const FACTORY_CONTRACT_ADDRESS = process.env.FACTORY_CONTRACT_ADDRESS;
const NFT_CONTRACT_ADDRESS = process.env.NFT_CONTRACT_ADDRESS;
const OWNER_ADDRESS = process.env.OWNER_ADDRESS;
const NETWORK = process.env.NETWORK;
const NUM_VALIANTS = 1;
const NUM_LOOTBOXES = 0;
const DEFAULT_OPTION_ID = 0;
const LOOTBOX_OPTION_ID = 2;
const CONTRACT_JSON = require('../build/contracts/ValiantFactory.json')

if (!OWNER_PRIVATE_KEY || !NODE_API_KEY || !OWNER_ADDRESS || !NETWORK) {
  console.error(
    "Please set a mnemonic, Alchemy/Infura key, owner, network, and contract address."
  );
  return;
}

const NFT_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_to",
        type: "address",
      },
    ],
    name: "mintTo",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

const FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: "_optionId",
        type: "uint256",
      },
      {
        name: "_toAddress",
        type: "address",
      },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

async function main() {
  const network =
    NETWORK === "mainnet" || NETWORK === "live" ? "mainnet" : "rinkeby";
  const provider = new HDWalletProvider({
    privateKeys: [OWNER_PRIVATE_KEY],
    numberOfAddresses: 1,
    providerOrUrl: isInfura
      ? "https://" + network + ".infura.io/v3/" + NODE_API_KEY
      : "https://eth-" + network + ".alchemyapi.io/v2/" + NODE_API_KEY
  });
  const web3Instance = new web3(provider);

  const factoryContract = new web3Instance.eth.Contract(
    CONTRACT_JSON.abi,
    FACTORY_CONTRACT_ADDRESS,
    { gasLimit: "1000000" }
  );

  const result = await factoryContract.methods
    .tokenURI(1)
    .call({ from: OWNER_ADDRESS });

  console.log(result)




  // if (FACTORY_CONTRACT_ADDRESS) {
  //   const factoryContract = new web3Instance.eth.Contract(
  //     FACTORY_ABI,
  //     FACTORY_CONTRACT_ADDRESS,
  //     { gasLimit: "1000000" }
  //   );

  //   // Valiants issued directly to the owner.
  //   for (var i = 0; i < NUM_VALIANTS; i++) {
  //     const result = await factoryContract.methods
  //       .mint(DEFAULT_OPTION_ID, OWNER_ADDRESS)
  //       .send({ from: OWNER_ADDRESS });
  //     console.log("Minted valiant. Transaction: " + result.transactionHash);
  //   }

  //   // Lootboxes issued directly to the owner.
  //   for (var i = 0; i < NUM_LOOTBOXES; i++) {
  //     const result = await factoryContract.methods
  //       .mint(LOOTBOX_OPTION_ID, OWNER_ADDRESS)
  //       .send({ from: OWNER_ADDRESS });
  //     console.log("Minted lootbox. Transaction: " + result.transactionHash);
  //   }
  // } else if (NFT_CONTRACT_ADDRESS) {
  //   const nftContract = new web3Instance.eth.Contract(
  //     NFT_ABI,
  //     NFT_CONTRACT_ADDRESS,
  //     { gasLimit: "1000000" }
  //   );

  //   // Valiants issued directly to the owner.
  //   for (var i = 0; i < NUM_VALIANTS; i++) {
  //     const result = await nftContract.methods
  //       .mintTo(OWNER_ADDRESS)
  //       .send({ from: OWNER_ADDRESS });
  //     console.log("Minted valiant. Transaction: " + result.transactionHash);
  //   }
  // } else {
  //   console.error(
  //     "Add NFT_CONTRACT_ADDRESS or FACTORY_CONTRACT_ADDRESS to the environment variables"
  //   );
  // }
}

main();
