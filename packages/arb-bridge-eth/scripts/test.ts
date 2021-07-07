const ethers = require('ethers');

// const providerURL = 'https://rpc.testnet.moonbeam.network';
// const providerURL = 'https://127.0.0.1:8547';
const providerURL = 'https://edg-dev-node-2.dtrade.org/';

const walletKey = "90121808028adae9d38f0ad2ab29929bb4a7dbed40aaa02e1b5f49572a297066"
// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider(providerURL);

// const ValidatorWalletCreatorABI = "[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"previousOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnershipTransferred\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[],\"name\":\"TemplateUpdated\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"walletAddress\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"userAddress\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"adminProxy\",\"type\":\"address\"}],\"name\":\"WalletCreated\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"createWallet\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"renounceOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_template\",\"type\":\"address\"}],\"name\":\"setTemplate\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"template\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"transferOwnership\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]"
// const ValidatorWalletCreatorAddress = "0xe4F6278E2554E29A187BDABeBe8D46335Df5dC2a";

// const wallet = new ethers.Wallet(walletKey, provider);
// const contract = new ethers.Contract(ValidatorWalletCreatorAddress, ValidatorWalletCreatorABI);

async function main(){
    console.log(+await provider.getBalance("0x19E7E376E7C213B7E7e7e46cc70A5dD086DAff2A"));
    // console.log(await contract.connect(wallet).owner());
    // const proxy = await contract.connect(wallet).createWallet();
    // await proxy.wait()
    // console.log(proxy);

}

main();
