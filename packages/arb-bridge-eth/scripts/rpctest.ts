const ethers = require('ethers');

const url = process.argv[2];
console.log("url:", url);

// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider(url, {
    chainId: 1287,
    name: 'moonbase-alphanet'
});

async function main(){
    console.log("Network:", await provider.getNetwork())
    console.log("BlockNumber:", +await provider.getBlockNumber())
    console.log("Balance of 0x5fEf3e25c2c1c13A16CEb8b3F4199AbbA21b33D6:", +await provider.getBalance("0x5fEf3e25c2c1c13A16CEb8b3F4199AbbA21b33D6"));
}

main();
