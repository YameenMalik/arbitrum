import * as ethers from 'ethers'
const yargs = require('yargs');

// argument parser
const argv = yargs.options({
    wallet: {
      type: 'string',
      alias: 'w',
      demandOption: true,
      description: 'wallet address of the account to be funded on L2'
    },
    amount: {
        type: 'string',
        alias: 'a',
        demandOption: true,
        description: 'amount to be funded'
      },
    inbox: {
        type: 'string',
        alias: 'i',
        demandOption: true,
        description: 'inbox contract address on L1'
      },
    faucet: {
        type: 'string',
        alias: 'f',
        demandOption: true,
        description: 'private key of the faucet account on L1 (if not provided will be read from .env)'
      },
    network: {
        type: 'string',
        alias: 'n',
        demandOption: true,
        description: 'url of L1 network'
      },

}).argv;

async function fundWallet(destAddress:string, amount:string, inboxAddress: string, faucetKey: string, network: string){
    amount = ethers.utils.parseEther(amount).toString();
    const inboxAbi = `[{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"messageNum","type":"uint256"},{"indexed":false,"internalType":"bytes","name":"data","type":"bytes"}],"name":"InboxMessageDelivered","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"uint256","name":"messageNum","type":"uint256"}],"name":"InboxMessageDeliveredFromOrigin","type":"event"},{"inputs":[],"name":"bridge","outputs":[{"internalType":"contract IBridge","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"uint256","name":"l2CallValue","type":"uint256"},{"internalType":"uint256","name":"maxSubmissionCost","type":"uint256"},{"internalType":"address","name":"excessFeeRefundAddress","type":"address"},{"internalType":"address","name":"callValueRefundAddress","type":"address"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"gasPriceBid","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"createRetryableTicket","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"destAddr","type":"address"}],"name":"depositEth","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"uint256","name":"maxSubmissionCost","type":"uint256"},{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"maxGasPrice","type":"uint256"}],"name":"depositEthRetryable","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"contract IBridge","name":"_bridge","type":"address"}],"name":"initialize","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"isMaster","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"gasPriceBid","type":"uint256"},{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendContractTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"gasPriceBid","type":"uint256"},{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendL1FundedContractTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendL1FundedUnsignedTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"messageData","type":"bytes"}],"name":"sendL2Message","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes","name":"messageData","type":"bytes"}],"name":"sendL2MessageFromOrigin","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"maxGas","type":"uint256"},{"internalType":"uint256","name":"gasPriceBid","type":"uint256"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"address","name":"destAddr","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"sendUnsignedTransaction","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"}]`
    const provider =  new ethers.providers.JsonRpcProvider(network);
    const contract = new ethers.Contract(inboxAddress, inboxAbi);
    const wallet = new ethers.Wallet(faucetKey, provider);
    console.log("Depositing money...")
    await contract.connect(wallet).depositEth(destAddress, { value: amount })
    console.info("Deposited... will take some time to reflect on L2 chain")    
}

if (require.main === module){ 
    console.log('-----------------------------------------')
    console.info("Destination wallet address:", argv.wallet);
    console.info("Amount to deposit:", argv.amount);
    console.info("Inbox address:", argv.inbox)
    console.info("Faucet key:", argv.faucet)
    console.info("Network url:", argv.network)
    console.log('-----------------------------------------')

    fundWallet(argv.wallet, argv.amount, argv.inbox, argv.faucet, argv.network);
}
    