### How to? 



- Deploy arb-eth-bridge contracts on L1 using: `yarn deploy:eth_bridge`
- Build validator nodes and arbitrum config using: `yarn rollup:initialize`
- Get validator nodes running for arb chain by: `yarn rollup:deploy:rinkeby`. When deploying the first time it will first build and then up the validator and aggregator nodes. You might be greeted with this error: 
```
arb-validator1_1  | {"level":"error","component":"arb-validator","stack":[{"func":"startup","line":"265","source":"arb-validator.go"},{"func":"main","line":"99","source":"arb-validator.go"},{"func":"main","line":"204","source":"proc.go"},{"func":"goexit","line":"1374","source":"asm_amd64.s"}],"error":"error checking initial chain state: Post \"http://3.93.36.125:5348/\": EOF","time":"2021-07-02T17:44:50Z","caller":"/home/user/arb-node-core/cmd/arb-validator/arb-validator.go:100","message":"Error running validator"}
arbitrum_arb-validator1_1 exited with code 0
```
Kindly stop the dockers and redeploy with `--up` flag like this: `yarn rollup:deploy:rinkeby --up` 

- Navigate to arb-bridge-eth package and deposit money to accounts on Arbitrum using `deposit` task of hardhat:
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
- Create a script to easily deposit money over the bridge to L2 accounts
