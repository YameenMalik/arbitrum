import { JsonRpcProvider } from '@ethersproject/providers'
import { Wallet } from '@ethersproject/wallet'
import { parseEther } from '@ethersproject/units'
import { Inbox__factory } from 'arb-ts'
import * as yargs from 'yargs'
import * as fs from 'fs-extra'
import { setupValidatorStates } from './setup_validators'

import * as addresses from '../../arb-bridge-eth/bridge_eth_addresses.json'
import { execSync } from 'child_process'
import { config } from "dotenv"; 
config({ path: "../../.env" });


const network:string = process.env['DEPLOY_ON'] || '';
const network_url:string = process.env[network.toUpperCase() + "_NETWORK"] || '';
const pvtKey = process.env[network.toUpperCase() + "_PRIVATE_KEY"] || '';
console.log("Network:", network)
console.log("Network Url:", network_url)
console.log("Private Key:", pvtKey);


const provider = new JsonRpcProvider(network_url)

const wallet = provider.getSigner(0)
const root = '../../'
const rollupsPath = root + 'rollups/'

export interface RollupCreatedEvent {
  rollupAddress: string
  inboxAddress: string
}

async function setupRollup(
  sequencerAddress: string
): Promise<RollupCreatedEvent> {
  execSync(
    `yarn workspace arb-bridge-eth hardhat create-chain --sequencer ${sequencerAddress} --network ${network}`
  )

  const fileName = `rollup-${network}.json`
  const file = fs.readFileSync(`../arb-bridge-eth/${fileName}`).toString()
  const ev = JSON.parse(file)

  return {
    rollupAddress: ev.rollupAddress,
    inboxAddress: ev.inboxAddress,
  }
}

async function initializeWallets(count: number): Promise<Wallet[]> {
  const wallets: Wallet[] = []
  const waits = []
  for (let i = 0; i < count; i++) {
    const newWallet = Wallet.createRandom()
    const tx = {
      to: newWallet.address,
      value: parseEther('5.0'),
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
    '0xAf40F7D235A9786a420bb89B188910958fD7EF93',
    '0xFcC598b3E3575CA937AF7F0E804a8BAb5E92a3f6',
    '0x755449b9901f91deC52DB39AF8c655206C63eD8e',
  ]

  const inbox = Inbox__factory.connect(inboxAddress, wallet)
  const amount = parseEther('100')

  for (const address of addresses) {
    await inbox.depositEth(address, { value: amount })
  }
}

async function setupValidators(
  count: number,
  blocktime: number,
  force: boolean
): Promise<void> {
  const wallets = await initializeWallets(count)
  const { rollupAddress, inboxAddress } = await setupRollup(
    await wallets[0].getAddress()
  )
  console.log('Created rollup', rollupAddress)

  const validatorsPath = rollupsPath + network + '/'

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
    validator_wallet_factory_address:addresses['contracts']['ValidatorWalletCreator'].address,
    bridge_utils_address: addresses['contracts']['BridgeUtils'].address,
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

  // await initializeClientWallets(inboxAddress)
}

if (require.main === module) {
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
      }),
    args => {
      setupValidators(args.validatorcount + 1, args.blocktime, args.force)
    }
  ).argv
}
