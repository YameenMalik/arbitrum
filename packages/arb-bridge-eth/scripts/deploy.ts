import { findEnv } from '../find-env';
import { Keyring } from '@polkadot/keyring';
import { waitReady } from '@polkadot/wasm-crypto';
import { ApiPromise, WsProvider } from "@polkadot/api";
import { SingleAccountSigner } from "../acala/SingleAccountSigner";
import { Provider, Signer } from "@acala-network/bodhi";
import registry from "../acala/typeRegistry";
import TestingSigner from "./TestingSigner.ts";

import * as dotenv from "dotenv";
dotenv.config({ path: findEnv() });

// mnemonic for wallet
const mnemonic:string = process.env['MNEMONIC'] || '';
const endPoint:string = process.env['ENDPOINT'] || '';

async function main(){
    console.log("Waiting for it to be ready!");
    await waitReady();
    const keyring = new Keyring({ type: 'sr25519' });
    const pair = keyring.addFromUri(mnemonic);
    console.log('Signer Address:', pair.address);

    const _provider = new WsProvider(endPoint);

    const sasg = new SingleAccountSigner(registry, pair);
    // const wallet = new Signer(evmProvider, accountList[1].address, sasg)
}

main();
