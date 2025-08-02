export {
    EIP712TypedData,
    LimitOrderV4Struct,
    Address,
    NetworkEnum,
    MakerTraits,
    Extension,
    AuctionDetails,
    SettlementPostInteractionData,
    Interaction,
    AuctionCalculator,
    // Execution
    LimitOrderContract,
    TakerTraits,
    AmountMode,
    // helpers
    calcTakingAmount,
    calcMakingAmount,
    now,
    randBigInt,
    // connectors
    PrivateKeyProviderConnector,
    Web3ProviderConnector,
    BlockchainProviderConnector,
    HttpProviderConnector,
    WsProviderConnector,
    PingRpcEvent,
    GetAllowMethodsRpcEvent
} from '@1inch/fusion-sdk'
export * from './cross-chain-order'
export * from './escrow-factory'
export {SupportedChains, SupportedChain} from './chains'
export * from './immutables'
export * from './deployments'
export * from './sdk'
export * from './api'
export * from './ws-api'
import { keccak256, toUtf8Bytes } from 'ethers'

export function hashTo20Bytes(input: string): string {
    const fullHash = keccak256(toUtf8Bytes(input)); // 0x...
    const first20Bytes = "0x" + fullHash.slice(2, 2 + 40);
    return first20Bytes;
}
