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
  try {
    const sendValueHuman = "0.01";
    const gasPrice = await providerTestnet.getGasPrice();
    const nonce = await providerTestnet.getTransactionCount(myAddress); // Dynamically fetch the nonce

    const txBuild = {
      from: myAddress, // from,
      to: "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", // to (WETH on Sepolia Test Network),
      value: ethers.utils.parseEther(sendValueHuman), // value,
      nonce: nonce, // nonce,
      gasPrice: gasPrice, // gas price
    };

    // Estimate gas limit
    const gasLimit = await providerTestnet.estimateGas(txBuild);
    txBuild.gasLimit = gasLimit;

    // SEND Transaction
    const txSend = await walletSigner.sendTransaction(txBuild);

    console.log("");
    console.log("TX SEND");
    console.log(txSend);
  } catch (error) {
    console.error("Error sending transaction:", error);
  }
};

exchangeETH();
