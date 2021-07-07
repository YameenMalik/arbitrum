### How to? 
Clone the repo and initialize submodules like this:
```
git clone -b moonbeam https://github.com/offchainlabs/arbitrum.git
cd arbitrum
git submodule update --init --recursive
yarn
yarn build
```

- Kindly look at .env_example to create a proper .env 
- Deploy arb-eth-bridge contracts on any evm supported L1 chain using: `yarn deploy:eth_bridge`. Provide `DEPLOY_ON` flag in env for the chain to deploy on.
- Build validator nodes and arbitrum config using: `yarn rollup:initialize`
- Get validator nodes running for arb chain by: `yarn rollup:deploy`. When deploying the first time it will first build and then up the validator and aggregator nodes. You might be greeted with this error: 
```
arb-validator1_1  | {"level":"error","component":"arb-validator","stack":[{"func":"startup","line":"265","source":"arb-validator.go"},{"func":"main","line":"99","source":"arb-validator.go"},{"func":"main","line":"204","source":"proc.go"},{"func":"goexit","line":"1374","source":"asm_amd64.s"}],"error":"error checking initial chain state: Post \"http://3.93.36.125:5348/\": EOF","time":"2021-07-02T17:44:50Z","caller":"/home/user/arb-node-core/cmd/arb-validator/arb-validator.go:100","message":"Error running validator"}
arbitrum_arb-validator1_1 exited with code 0
```
Kindly stop the dockers and redeploy with `--up` flag like this: `yarn rollup:deploy:rinkeby --up` 

- You can transfer funds from L1 to L2 using funding script: `yarn fundL2Wallet` which accepts the following params:

```
Options:
  --help         Show help                                             [boolean]
  --version      Show version number                                   [boolean]
  --wallet, -w   wallet address of the account to be funded on L2
                                                             [string] [required]
  --amount, -a   amount to be funded                         [string] [required]
  --inbox, -i    inbox contract address on L1                [string] [required]
  --faucet, -f   private key of the faucet account on L1 (if not provided will
                 be read from .env)                          [string] [required]
  --network, -n  url of L1 network                           [string] [required]

e.g:
 yarn fundL2Wallet -w 0x8f42300a0Ba2883312347Cb1a748207453F735aC -a 1 -i 0x89F7e32e47A123e1e7E0ba86DFd0f1cCa578Af11 -f 7540d48032c731b3a17947b63a04763492d84aef854246d355a703adc9b54ce9 -n http://3.93.36.125:5348
```


- Alternatively fund transfers can be done using hardhat task specified in arb-bridge-eth package to deposit money to accounts on Arbitrum:
```
Usage: hardhat [GLOBAL OPTIONS] deposit inboxAddress privkey dest amount

POSITIONAL ARGUMENTS:

  inboxAddress  The rollup chain's address 
  privkey       The private key of the depositer 
  dest          The destination account's address 
  amount        The amount to deposit 

deposit: Deposit coins into ethbridge

e.g:
npx hardhat deposit 0x3ff177D812534deE562738841DD1CdcE38c86F2C 7540d48032c731b3a17947b63a04763492d84aef854246d355a703adc9b54ce9 0x931d6514C8d5522C7489aad7aCCFfC20E6A92E57 1000000000000000000 
```

### To do:
- Finish `setup.sh` script.
