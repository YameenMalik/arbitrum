/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import type { TypedEventFilter, TypedEvent, TypedListener } from './common'

interface OneStepProofCommonInterface extends ethers.utils.Interface {
  functions: {
    'executeStep(address[2],uint256,bytes32[2],bytes,bytes)': FunctionFragment
    'executeStepDebug(address[2],uint256,bytes32[2],bytes,bytes)': FunctionFragment
  }

  encodeFunctionData(
    functionFragment: 'executeStep',
    values: [
      [string, string],
      BigNumberish,
      [BytesLike, BytesLike],
      BytesLike,
      BytesLike
    ]
  ): string
  encodeFunctionData(
    functionFragment: 'executeStepDebug',
    values: [
      [string, string],
      BigNumberish,
      [BytesLike, BytesLike],
      BytesLike,
      BytesLike
    ]
  ): string

  decodeFunctionResult(functionFragment: 'executeStep', data: BytesLike): Result
  decodeFunctionResult(
    functionFragment: 'executeStepDebug',
    data: BytesLike
  ): Result

  events: {}
}

export class OneStepProofCommon extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: OneStepProofCommonInterface

  functions: {
    executeStep(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, [string, string, string, string]] & {
        gas: BigNumber
        afterMessagesRead: BigNumber
        fields: [string, string, string, string]
      }
    >

    executeStepDebug(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { startMachine: string; afterMachine: string }
    >
  }

  executeStep(
    bridges: [string, string],
    initialMessagesRead: BigNumberish,
    accs: [BytesLike, BytesLike],
    proof: BytesLike,
    bproof: BytesLike,
    overrides?: CallOverrides
  ): Promise<
    [BigNumber, BigNumber, [string, string, string, string]] & {
      gas: BigNumber
      afterMessagesRead: BigNumber
      fields: [string, string, string, string]
    }
  >

  executeStepDebug(
    bridges: [string, string],
    initialMessagesRead: BigNumberish,
    accs: [BytesLike, BytesLike],
    proof: BytesLike,
    bproof: BytesLike,
    overrides?: CallOverrides
  ): Promise<[string, string] & { startMachine: string; afterMachine: string }>

  callStatic: {
    executeStep(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [BigNumber, BigNumber, [string, string, string, string]] & {
        gas: BigNumber
        afterMessagesRead: BigNumber
        fields: [string, string, string, string]
      }
    >

    executeStepDebug(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<
      [string, string] & { startMachine: string; afterMachine: string }
    >
  }

  filters: {}

  estimateGas: {
    executeStep(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>

    executeStepDebug(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>
  }

  populateTransaction: {
    executeStep(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>

    executeStepDebug(
      bridges: [string, string],
      initialMessagesRead: BigNumberish,
      accs: [BytesLike, BytesLike],
      proof: BytesLike,
      bproof: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
