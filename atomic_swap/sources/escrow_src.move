module atomic_swap::escrow_src;

use sui::event;
use sui::dynamic_object_field as dof;
use sui::coin::{Self, Coin, into_balance};
use sui::hash::{keccak256};
use sui::clock::{timestamp_ms, Clock};
use sui::balance::{Self, Balance};
use sui::sui::SUI;
use usdc::usdc::USDC;
// use sui::transfer;

const EInvalidSecret: u64 = 1;
const EInvalidTaker: u64 = 2;

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

public struct EscrowWithdrawal has copy, drop {
    secret: vector<u8>
}

public struct EscrowCancelled has copy, drop {}

public(package) fun create_escrow_src<T>(
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

// === Entry Functions ===

entry fun withdraw<T>(
    escrow: &mut EscrowSrc<T>,
    secret: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(ctx.sender() == escrow.taker, EInvalidTaker);

    // TODO: check timelock here

    withdraw_helper<T>(escrow, secret, ctx.sender(), clock, ctx);
}

entry fun withdraw_to<T>(
    escrow: &mut EscrowSrc<T>,
    secret: vector<u8>,
    target: address,
    clock:  &Clock,
    ctx: &mut TxContext
) {
    assert!(ctx.sender() == escrow.taker, EInvalidTaker);

    // TODO: check timelock here

    withdraw_helper<T>(escrow, secret, target, clock, ctx);
}

entry fun publicWithdraw<T>(
    escrow: &mut EscrowSrc<T>,
    secret: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    // TODO: check timelock here

    let taker = escrow.taker;
    withdraw_helper<T>(escrow, secret, taker, clock, ctx);
}

entry fun cancel<T>(
    escrow: &mut EscrowSrc<T>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(ctx.sender() == escrow.taker, EInvalidTaker);

    // TODO: check timelock here

    cancel_helper<T>(escrow, clock, ctx);
}

entry fun publicCancel<T>(
    escrow: &mut EscrowSrc<T>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    // TODO: check timelock here

    cancel_helper<T>(escrow, clock, ctx);
}

// === Private Helpers ===

/// withdraw helper
fun withdraw_helper<T>(
    escrow: &mut EscrowSrc<T>,
    secret: vector<u8>,
    target: address,
    clock: &Clock,
    ctx: &mut TxContext
) {
    // TODO: check immutables here
    assert!(keccak256(&secret) == escrow.hashlock, EInvalidSecret);

    let asset = balance::withdraw_all(&mut escrow.balance).into_coin(ctx);
    transfer::public_transfer(asset, target);

    event::emit(EscrowWithdrawal {secret: secret });
}

/// cancel helper
#[allow(lint(self_transfer))]
fun cancel_helper<T>(
    escrow: &mut EscrowSrc<T>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    // TODO: check immutables here

    let asset = balance::withdraw_all(&mut escrow.balance).into_coin(ctx);
    transfer::public_transfer(asset, escrow.maker);

    let safetyDeposit = balance::withdraw_all(&mut escrow.safetyDeposit).into_coin(ctx);
    transfer::public_transfer(safetyDeposit, ctx.sender());

    event::emit(EscrowCancelled{});
}




