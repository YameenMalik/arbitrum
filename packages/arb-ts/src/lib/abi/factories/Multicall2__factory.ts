/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from 'ethers'
import { Provider, TransactionRequest } from '@ethersproject/providers'
import type { Multicall2, Multicall2Interface } from '../Multicall2'

const _abi = [
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'aggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes[]',
        name: 'returnData',
        type: 'bytes[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'blockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    name: 'getBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBlockNumber',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockCoinbase',
    outputs: [
      {
        internalType: 'address',
        name: 'coinbase',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockDifficulty',
    outputs: [
      {
        internalType: 'uint256',
        name: 'difficulty',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockGasLimit',
    outputs: [
      {
        internalType: 'uint256',
        name: 'gaslimit',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCurrentBlockTimestamp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'timestamp',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'addr',
        type: 'address',
      },
    ],
    name: 'getEthBalance',
    outputs: [
      {
        internalType: 'uint256',
        name: 'balance',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getLastBlockHash',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryAggregate',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bool',
        name: 'requireSuccess',
        type: 'bool',
      },
      {
        components: [
          {
            internalType: 'address',
            name: 'target',
            type: 'address',
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Call[]',
        name: 'calls',
        type: 'tuple[]',
      },
    ],
    name: 'tryBlockAndAggregate',
    outputs: [
      {
        internalType: 'uint256',
        name: 'blockNumber',
        type: 'uint256',
      },
      {
        internalType: 'bytes32',
        name: 'blockHash',
        type: 'bytes32',
      },
      {
        components: [
          {
            internalType: 'bool',
            name: 'success',
            type: 'bool',
          },
          {
            internalType: 'bytes',
            name: 'returnData',
            type: 'bytes',
          },
        ],
        internalType: 'struct Multicall2.Result[]',
        name: 'returnData',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'function',
  },
]

const _bytecode =
  '0x608060405234801561001057600080fd5b50610942806100206000396000f3fe608060405234801561001057600080fd5b50600436106100b45760003560e01c806372425d9d1161007157806372425d9d1461013d57806386d516e814610145578063a8b0574e1461014d578063bce38bd714610162578063c3077fa914610182578063ee82ac5e14610195576100b4565b80630f28c97d146100b9578063252dba42146100d757806327e86d6e146100f8578063399542e91461010057806342cbb15c146101225780634d2301cc1461012a575b600080fd5b6100c16101a8565b6040516100ce9190610760565b60405180910390f35b6100ea6100e53660046105e4565b6101ac565b6040516100ce9291906107df565b6100c16102ea565b61011361010e36600461061e565b6102f3565b6040516100ce93929190610847565b6100c161030b565b6100c16101383660046105b6565b61030f565b6100c161031c565b6100c1610320565b610155610324565b6040516100ce9190610739565b61017561017036600461061e565b610328565b6040516100ce919061074d565b6101136101903660046105e4565b61047d565b6100c16101a336600461066f565b61049a565b4290565b805143906060906001600160401b03811180156101c857600080fd5b506040519080825280602002602001820160405280156101fc57816020015b60608152602001906001900390816101e75790505b50905060005b83518110156102e4576000606085838151811061021b57fe5b6020026020010151600001516001600160a01b031686848151811061023c57fe5b602002602001015160200151604051610255919061071d565b6000604051808303816000865af19150503d8060008114610292576040519150601f19603f3d011682016040523d82523d6000602084013e610297565b606091505b5091509150816102c25760405162461bcd60e51b81526004016102b9906107aa565b60405180910390fd5b808484815181106102cf57fe5b60209081029190910101525050600101610202565b50915091565b60001943014090565b43804060606103028585610328565b90509250925092565b4390565b6001600160a01b03163190565b4490565b4590565b4190565b606081516001600160401b038111801561034157600080fd5b5060405190808252806020026020018201604052801561037b57816020015b61036861049e565b8152602001906001900390816103605790505b50905060005b8251811015610476576000606084838151811061039a57fe5b6020026020010151600001516001600160a01b03168584815181106103bb57fe5b6020026020010151602001516040516103d4919061071d565b6000604051808303816000865af19150503d8060008114610411576040519150601f19603f3d011682016040523d82523d6000602084013e610416565b606091505b5091509150851561043e578161043e5760405162461bcd60e51b81526004016102b990610769565b604051806040016040528083151581526020018281525084848151811061046157fe5b60209081029190910101525050600101610381565b5092915050565b600080606061048d6001856102f3565b9196909550909350915050565b4090565b60408051808201909152600081526060602082015290565b600082601f8301126104c6578081fd5b81356001600160401b03808211156104dc578283fd5b60206104eb818285020161086f565b838152935080840185820160005b858110156105aa5781358801604080601f19838d0301121561051a57600080fd5b6105238161086f565b86830135610530816108f4565b8152828201358881111561054357600080fd5b8084018d603f82011261055557600080fd5b88810135945061056c61056786610895565b61086f565b91508482528d8486830101111561058257600080fd5b610591858a84018684016108b8565b50818801528552505091830191908301906001016104f9565b50505050505092915050565b6000602082840312156105c7578081fd5b81356001600160a01b03811681146105dd578182fd5b9392505050565b6000602082840312156105f5578081fd5b81356001600160401b0381111561060a578182fd5b610616848285016104b6565b949350505050565b60008060408385031215610630578081fd5b8235801515811461063f578182fd5b915060208301356001600160401b03811115610659578182fd5b610665858286016104b6565b9150509250929050565b600060208284031215610680578081fd5b5035919050565b6000815180845260208085018081965082840281019150828601855b858110156106e4578284038952815160408151151586528682015181888801526106cf828801826106f1565b9b88019b9650505091850191506001016106a3565b5091979650505050505050565b600081518084526107098160208601602086016108c4565b601f01601f19169290920160200192915050565b6000825161072f8184602087016108c4565b9190910192915050565b6001600160a01b0391909116815260200190565b6000602082526105dd6020830184610687565b90815260200190565b60208082526021908201527f4d756c746963616c6c32206167677265676174653a2063616c6c206661696c656040820152601960fa1b606082015260800190565b6020808252818101527f4d756c746963616c6c206167677265676174653a2063616c6c206661696c6564604082015260600190565b600060408201848352602060408185015281855180845260608601915060608382028701019350828701855b8281101561083957605f198887030184526108278683516106f1565b9550928401929084019060010161080b565b509398975050505050505050565b6000848252836020830152606060408301526108666060830184610687565b95945050505050565b6040518181016001600160401b038111828210171561088d57600080fd5b604052919050565b60006001600160401b038211156108aa578081fd5b50601f01601f191660200190565b82818337506000910152565b60005b838110156108df5781810151838201526020016108c7565b838111156108ee576000848401525b50505050565b6001600160a01b038116811461090957600080fd5b5056fea2646970667358221220bd51f475e23e39d276a28854ddbde7f2c6d59be50a6bc8a1582140b25f6c7cd164736f6c634300060b0033'

export class Multicall2__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer)
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Multicall2> {
    return super.deploy(overrides || {}) as Promise<Multicall2>
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {})
  }
  attach(address: string): Multicall2 {
    return super.attach(address) as Multicall2
  }
  connect(signer: Signer): Multicall2__factory {
    return super.connect(signer) as Multicall2__factory
  }
  static readonly bytecode = _bytecode
  static readonly abi = _abi
  static createInterface(): Multicall2Interface {
    return new utils.Interface(_abi) as Multicall2Interface
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Multicall2 {
    return new Contract(address, _abi, signerOrProvider) as Multicall2
  }
}
