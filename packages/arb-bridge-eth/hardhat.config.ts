import { task } from 'hardhat/config'
import * as fs from 'fs'
import { findEnv } from './find-env';
require('dotenv').config({ path: findEnv() });


import 'hardhat-deploy'

import '@nomiclabs/hardhat-waffle'
import 'hardhat-typechain'
import 'solidity-coverage'
import 'hardhat-spdx-license-identifier'
import 'hardhat-gas-reporter'
import '@nomiclabs/hardhat-etherscan'

const verifyTask = require('./scripts/verifyTask') // eslint-disable-line @typescript-eslint/no-var-requires
const setupVerifyTask = verifyTask.default
setupVerifyTask()

if (!process.env['DEVNET_PRIVKEY']) console.warn('No devnet privkey set')

task('accounts', 'Prints the list of accounts', async (taskArgs, bre) => {
  const accounts = await bre.ethers.getSigners()

  for (const account of accounts) {
    console.log(await account.getAddress())
  }
})

task('create-chain', 'Creates a rollup chain').setAction(
  async (taskArguments, hre) => {
    const machineHash = fs.readFileSync('../MACHINEHASH').toString()
    console.log(`Creating chain for machine with hash ${machineHash}`)
    const { deployments, ethers } = hre
    const [deployer] = await ethers.getSigners()
    const rollupCreatorDep = await deployments.get('RollupCreator')
    const RollupCreator = await ethers.getContractFactory('RollupCreator')
    const rollupCreator = RollupCreator.attach(
      rollupCreatorDep.address
    ).connect(deployer)
    const tx = await rollupCreator.createRollup(
      machineHash,
      900,
      0,
      2000000000,
      ethers.utils.parseEther('.1'),
      ethers.constants.AddressZero,
      await deployer.getAddress(),
      '0x'
    )
    const receipt = await tx.wait()
    const ev = rollupCreator.interface.parseLog(
      receipt.logs[receipt.logs.length - 1]
    )
    console.log(ev)
  }
)

task('deposit', 'Deposit coins into ethbridge')
  .addPositionalParam('inboxAddress', "The rollup chain's address")
  .addPositionalParam('privkey', 'The private key of the depositer')
  .addPositionalParam('dest', "The destination account's address")
  .addPositionalParam('amount', 'The amount to deposit')
  .setAction(async ({ inboxAddress, privkey, dest, amount }, bre) => {
    const { ethers } = bre
    const wallet = new ethers.Wallet(privkey, ethers.provider)
    const GlobalInbox = await ethers.getContractFactory('Inbox')
    const inbox = GlobalInbox.attach(inboxAddress).connect(wallet)
    await inbox.depositEth(dest, { value: amount })
  })

const config = {
  defaultNetwork: 'hardhat',
  paths: {
    artifacts: 'build/contracts',
  },
  solc: {
    version: '0.5.17',
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
  typechain: {
    outDir: 'build/types',
    target: 'ethers-v5',
  },
  spdxLicenseIdentifier: {
    overwrite: false,
    runOnCompile: true,
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 20,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      accounts: {
        accountsBalance: '10000000000000000000000000',
      },
    },
    local: {
      url: process.env['LOCAL_NETWORK'],
      accounts: [process.env['LOCAL_PRIVATE_KEY']]
    },
    moonbase: {
      url: process.env['MOONBASE_NETWORK'],
      accounts: [process.env['MOONBASE_PRIVATE_KEY']],
      chainId: 1287,
      timeout: 1000000,
    },   
    arbitrum: {
      url: 'http://127.0.0.1:8547',
      // url: 'https://kovan3.arbitrum.io/rpc',
      gas: 999999999999999,
      accounts: {
        mnemonic:
          'jar deny prosper gasp flush glass core corn alarm treat leg smart',
        path: "m/44'/60'/0'/0",
        initialIndex: 0,
        count: 10,
      },
      timeout: 100000,
    },
  },
  mocha: {
    timeout: 0,
  },
  etherscan: {
    apiKey: process.env['ETHERSCAN_API_KEY'],
  },
  solidity: {
    version: '0.6.11',
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
}

module.exports = config
