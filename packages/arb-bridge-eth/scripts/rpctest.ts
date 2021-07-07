const ethers = require('ethers');

const providerURL = 'http://3.227.232.123:9933';
// Define Provider
const provider = new ethers.providers.StaticJsonRpcProvider(providerURL, {
    chainId: 1287,
    name: 'moonbase-alphanet'
});

async function main(){
    console.log(+await provider.getBalance("0x5fEf3e25c2c1c13A16CEb8b3F4199AbbA21b33D6"));
}

main();