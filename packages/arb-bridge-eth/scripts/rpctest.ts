const ethers = require('ethers');

const url = process.argv[2];
console.log("url:", url);

// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider(url);

async function main(){
    // const address = "0x2574fFC5dB5F01246944e869ac49CBD22F2B614F";
    // const address = "0xa767415e11ace35175c573b9564344de7576699e";
    const address = "0x12850f9bfb0338ac1f7106cb0d9113c8ba4dacca";
    console.log("Network:", await provider.getNetwork())
    console.log("BlockNumber:", +await provider.getBlockNumber())
    console.log(`Balance of ${address}:`, +await provider.getBalance(address));
    
}

// yarn fundL2Wallet -w 0x2574fFC5dB5F01246944e869ac49CBD22F2B614F -a 1 -i 0x9b1c5AC4af7818BcEfd7Fb31e3Ba048AAAdF7992 -f c3c34ad757ca35acc2c70053e29cab1befebd3700fbca8784f2dac853649595d -n https://rpc.testnet.moonbeam.network


main();
