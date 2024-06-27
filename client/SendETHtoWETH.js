const { ethers } = require("ethers");
require("dotenv").config();

// TESTNET PROVIDER
const providerTestnet = new ethers.providers.JsonRpcProvider(
  process.env.SEPOLIA_ALCHEMY_URL
);

// CREATE SIGNER
const myAddress = process.env.SEPOLIA_ACCOUNT_ADDRESS;
const privateKey = process.env.SEPOLIA_PRIVATE_KEY;
const walletSigner = new ethers.Wallet(privateKey, providerTestnet);

const exchangeETH = async () => {
  const sendValueHuman = "0.01";
  const gasPrice = await providerTestnet.getGasPrice();
  const nonce = 11; // web3.eth.getTransactionCount(myAddress)
  const txBuild = {
    from: myAddress, // from,
    to: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // to (WETH on Sepolia Test Network),
    value: ethers.utils.parseEther(sendValueHuman), // value,
    nonce: nonce, // nonce,
    gasLimit: 100000, // gas limit,
    gasPrice: gasPrice, // gas price
  };

  // SEND Transaction
  const txSend = await walletSigner.sendTransaction(txBuild);

  console.log("");
  console.log("TX SEND");
  console.log(txSend);
};

exchangeETH();
