<p align="center"><img src="https://offchainlabs.com/c79291eee1a8e736eebd9a2c708dbe44.png" width="600"></p>

# Arbitrum Monorepo

[![CircleCI](https://circleci.com/gh/OffchainLabs/arbitrum.svg?style=svg)](https://circleci.com/gh/OffchainLabs/arbitrum) [![codecov](https://codecov.io/gh/OffchainLabs/arbitrum/branch/master/graph/badge.svg)](https://codecov.io/gh/OffchainLabs/arbitrum)

Arbitrum is a Layer 2 cryptocurrency platform that makes smart contracts scalable, fast, and private. Arbitrum interoperates closely with Ethereum, so Ethereum developers can easily cross-compile their contracts to run on Arbitrum. Arbitrum achieves these goals through a unique combination of incentives, network protocol design, and virtual machine architecture. Arbitrum has three modes: channels, AnyTrust sidechains, and rollup. Channels and sidechains provide the AnyTrust Guarantee which ensures that the code will run correctly as long as any validator is honest.

Want to learn more? Join the team on [Discord](https://discord.gg/ZpZuw7p), follow the [developer guide](https://developer.offchainlabs.com), and read the [white paper](https://offchainlabs.com/arbitrum.pdf)!

This repository is offered under the Apache 2.0 license. See LICENSE for details.

## Current Status

#### Arbitrum is currently Alpha software and should not be used in production environments.

## Quickstart

Follow [the guide](https://developer.offchainlabs.com/docs/Developer_Quickstart/) on our developer site to build a demo dapp on Arbitrum.


### How to? 
Navigate to arb-bridge-eth package and deposit money to accounts on Arbitrum using `deposit` task of hardhat:
```

Usage: hardhat [GLOBAL OPTIONS] deposit inboxAddress privkey dest amount

POSITIONAL ARGUMENTS:

  inboxAddress  The rollup chain's address 
  privkey       The private key of the depositer 
  dest          The destination account's address 
  amount        The amount to deposit 

deposit: Deposit coins into ethbridge

npx hardhat deposit 0x3ff177D812534deE562738841DD1CdcE38c86F2C 7540d48032c731b3a17947b63a04763492d84aef854246d355a703adc9b54ce9 0x38B6a47BbB8e55ff9Cb01442f63bE20eF1b2F0C5 1000000000000000000 
```
