module atomic_swap::escrow;

use sui::event;
use sui::dynamic_object_field as dof;
use sui::coin::{Self, Coin, into_balance};
use sui::hash::{keccak256};
use sui::clock::{timestamp_ms, Clock};
use sui::balance::{Self, Balance};
use sui::sui::SUI;
use usdc::usdc::USDC;

const EInvalidHashlock: u64 = 1;
const EInvalidTimelock: u64 = 2;
const EAlreadyClaimed: u64 = 3;

public struct EscrowSrc<phantom T> has key {
    id: UID,
    orderHash: vector<u8>,
    hashlock: vector<u8>,
    maker: address,
    taker: address,
    balance: Balance<T>,
    safetyDeposit: Balance<USDC>,
    timelock: u64,
}

// public struct EscrowDst<phantom T> has key {
//     id: UID,
//     orderHash: vector<u8>,
//     hashlock: vector<u8>,
//     maker: address,
//     taker: address,
//     balance: Balance<T>,
//     safetyDeposit: u64,
//     timelock: u64,
//     resolverFee: u64,
// }

public(package) fun createEscrowSrc<T>(
    orderHash: vector<u8>,
    hashlock: vector<u8>,
    maker: address, // the user who deposit first
    taker: address, // the resolver
    asset: Coin<T>,
    safetyDeposit: Coin<USDC>,
    clock: &Clock, // TODO: add timelocks
    ctx: &mut TxContext
) {
    let balance = into_balance(asset);
    let depositBalance = into_balance(safetyDeposit);
    let escrow = EscrowSrc<T>{
        id: object::new(ctx),
        orderHash: orderHash,
        hashlock: hashlock,
        maker: maker,
        taker: taker,
        balance: balance,
        safetyDeposit: depositBalance,
        timelock: timestamp_ms(clock),
    };
    transfer::share_object(escrow);
}

public(package) fun withdraw<T>(
    escrow: &mut EscrowSrc<T>,
    secret: &vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    
}

entry fun publicWithdraw() {}

public fun cancel() {}

entry fun publicCancel() {}



