### How to? 

- Deploy arb-eth-bridge contracts on L1 using: `yarn deploy:eth_bridge`
- Build validator nodes and arbitrum config using: `yarn rollup:initialize`
- Get validator nodes running for arb chain by: `yarn rollup:deploy:rinkeby`
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
npx hardhat deposit 0x3ff177D812534deE562738841DD1CdcE38c86F2C 7540d48032c731b3a17947b63a04763492d84aef854246d355a703adc9b54ce9 0x38B6a47BbB8e55ff9Cb01442f63bE20eF1b2F0C5 1000000000000000000 
```
