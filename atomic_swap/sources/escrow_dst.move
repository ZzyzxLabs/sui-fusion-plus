module atomic_swap::escrow_dst;

use sui::event;
use sui::dynamic_object_field as dof;
use sui::coin::{Self, Coin, into_balance};
use sui::hash::{keccak256};
use sui::clock::{timestamp_ms, Clock};
use sui::balance::{Self, Balance};
use sui::sui::SUI;
use usdc::usdc::USDC;

public struct EscrowDst<phantom T> has key {
    id: UID,
    orderHash: vector<u8>,
    hashlock: vector<u8>,
    maker: address,
    taker: address,
    balance: Balance<T>,
    safetyDeposit: Balance<USDC>,
}

public(package) fun createEscrowDst<T>(
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
    let escrow = EscrowDst<T>{
        id: object::new(ctx),
        orderHash: orderHash,
        hashlock: hashlock,
        maker: maker,
        taker: taker,
        balance: balance,
        safetyDeposit: depositBalance,
    };
    transfer::share_object(escrow);
}

public(package) fun withdraw<T>(
    escrow: &mut EscrowDst<T>,
    secret: &vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    
}

entry fun publicWithdraw() {}

public fun cancel() {}

entry fun publicCancel() {}


