const ethers = require('ethers');

const url = process.argv[2];
console.log("url:", url);

// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider(url);

async function main(){
    const address = "0xA15c96A1Ed18B3173C988A098E957776c8Ba74A6";
    console.log("Network:", await provider.getNetwork())
    console.log("BlockNumber:", +await provider.getBlockNumber())
    console.log(`Balance of ${address}:`, +await provider.getBalance(address));
}

main();
