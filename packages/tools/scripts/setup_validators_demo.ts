import 'dotenv/config'
import { findEnv } from '../find-env';
require('dotenv').config({ path: findEnv() });

import * as ethers from 'ethers'

import { EventFragment } from '@ethersproject/abi'
import { L1Bridge, RollupCreator__factory, Inbox__factory } from 'arb-ts'
import * as yargs from 'yargs'
import * as fs from 'fs-extra'
import { setupValidatorStates } from './setup_validators'

import * as addresses from '../../arb-bridge-eth/bridge_eth_addresses.json'
import { execSync } from 'child_process'

const network:string = process.env['DEPLOY_ON'] || '';
const network_url:string = process.env[network.toUpperCase() + "_NETWORK"] || '';
const pvtKey = process.env[network.toUpperCase() + "_PRIVATE_KEY"] || '';
console.log("Network:", network)
console.log("Network Url:", network_url)
console.log("Private Key:", pvtKey);

const provider = new ethers.providers.JsonRpcProvider(network_url)
const wallet = new ethers.Wallet(pvtKey, provider);

const root = '../../'
const rollupsPath = root + 'rollups/'

export interface RollupCreatedEvent {
  rollupAddress: string
  inboxAddress: string
}

async function setupRollup(
  sequencerAddress: string
): Promise<RollupCreatedEvent> {

  try {
    execSync(`yarn workspace arb-bridge-eth hardhat create-chain --sequencer ${sequencerAddress} --network ${network}`).toString();
 } catch (error) {
    console.log(`Status Code: ${error.status} with '${error.message}'`);
    process.exit()
 }
 
  const fileName = `rollup-${network}.json`
  const file = fs.readFileSync(`../arb-bridge-eth/${fileName}`).toString()
  const ev = JSON.parse(file)

  return {
    rollupAddress: ev.rollupAddress,
    inboxAddress: ev.inboxAddress,
  }
}

async function initializeWallets(count: number): Promise<ethers.Wallet[]> {
  const wallets: ethers.Wallet[] = []
  const waits = []
  for (let i = 0; i < count; i++) {
    const newWallet = ethers.Wallet.createRandom()
    console.log("New wallet address: ", newWallet.address);
    const tx = {
      to: newWallet.address,
      value: ethers.utils.parseEther('1'),
    }    

    const send = await wallet.sendTransaction(tx)
  
    wallets.push(newWallet)
    waits.push(send.wait())
  }
  await Promise.all(waits)
  return wallets
}

async function initializeClientWallets(inboxAddress: string): Promise<void> {
  const addresses = [
    '0xc7711f36b2C13E00821fFD9EC54B04A60AEfbd1b',
    '0x38299D74a169e68df4Da85Fb12c6Fd22246aDD9F',
  ]
  
  const inbox = Inbox__factory.connect(inboxAddress, wallet)
  const amount = ethers.utils.parseEther('1')

  for (const address of addresses) {
    await inbox.depositEth(address, { value: amount })
  }
}

async function setupValidators(
  count: number,
  blocktime: number,
  createClientWallets: boolean,
  force: boolean
): Promise<void> {
  const wallets = await initializeWallets(count);

  const { rollupAddress, inboxAddress } = await setupRollup(
    await wallets[0].getAddress()
  )
  console.log('Created rollup', rollupAddress)

  const validatorsPath = rollupsPath + `${network}/`

  if (count < 2) {
    throw Error('must create at least 1 validator')
  }

  if (!fs.existsSync(rollupsPath)) {
    fs.mkdirSync(rollupsPath)
  }

  if (fs.existsSync(validatorsPath)) {
    if (force) {
      fs.removeSync(validatorsPath)
    } else {
      throw Error(
        `${validatorsPath} already exists. First manually delete it or run with --force`
      )
    }
  }

  const config = {
    rollup_address: rollupAddress,
    inbox_address: inboxAddress,
    validator_utils_address: addresses['contracts']['ValidatorUtils'].address,
    validator_wallet_factory_address:
      addresses['contracts']['ValidatorWalletCreator'].address,
    eth_url: network_url,
    password: 'pass',
    blocktime: blocktime,
  }

  await setupValidatorStates(count, network, config)

  let i = 0
  for (const wallet of wallets) {
    const valPath = validatorsPath + 'validator' + i + '/'
    const walletPath = valPath + 'wallets/'
    fs.mkdirSync(walletPath)
    const encryptedWallet = await wallet.encrypt('pass')
    fs.writeFileSync(walletPath + wallet.address, encryptedWallet)
    i++
  }

  if (createClientWallets) {
    await initializeClientWallets(inboxAddress)
  }
  
}

if (require.main === module){

yargs.command(
  'init [rollup] [ethurl]',
  'initialize validators for the given rollup chain',
  yargsBuilder =>
    yargsBuilder.options({
      force: {
        description: 'clear any existing state',
        type: 'boolean',
        default: false,
      },
      validatorcount: {
        description: 'number of validators to deploy',
        default: 1,
      },
      blocktime: {
        description: 'expected length of time between blocks',
        default: 2,
      },
      createClientWallets: {
        description: 'creates wallets on L2 and fills them with eth to be used by clients',
        default: false,
      }
    }),
  args => {
    setupValidators(args.validatorcount + 1, args.blocktime, args.createClientWallets, args.force)
  }
).argv

}
