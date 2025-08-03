// Copyright (c) 2025 Sui Fusion Plus
// SPDX-License-Identifier: MIT

module atomic_swap::escrow_dst;

// === Imports ===
use sui::event;
use sui::coin::{Coin, into_balance};
use sui::hash::{keccak256};
use sui::clock::{timestamp_ms, Clock};
use sui::balance::{Self, Balance};
use atomic_swap::timelocks::{Self, Timelock};

// === Errors ===
const EInvalidSecret: u64 = 1;
const EInvalidTaker: u64 = 2;
const EInvalidTimelock: u64 = 3;

// === Structs ===

/// Represents a destination escrow that holds assets for atomic swap.
/// The escrow can be withdrawn by the taker with the correct secret or cancelled by the maker.
public struct EscrowDst<phantom T> has key {
    id: UID,
    order_hash: vector<u8>,
    hashlock: vector<u8>,
    maker: address,
    taker: address,
    balance: Balance<T>,
}

// === Events ===

/// Emitted when an escrow is withdrawn with the correct secret.
public struct EscrowWithdrawal has copy, drop {
    secret: vector<u8>
}

/// Emitted when an escrow is cancelled.
public struct EscrowCancelled has copy, drop {}

// === Public Functions ===

/// Creates a new destination escrow with the specified parameters.
/// The escrow holds the deposited asset and safety deposit until withdrawn or cancelled.
public(package) fun create_escrow_dst<T>(
    order_hash: vector<u8>,
    hashlock: vector<u8>,
    maker: address, // the user who deposit first
    taker: address, // the resolver
    asset: Coin<T>,
    clock: &Clock, 
    ctx: &mut TxContext
) {
    let balance = into_balance(asset);
    let escrow = EscrowDst<T>{
        id: object::new(ctx),
        order_hash: order_hash,
        hashlock: hashlock,
        maker: maker,
        taker: taker,
        balance: balance,
    };
    timelocks::init_timelock(object::id(&escrow), clock, 0, 0, 0, 0, 5, 10, 15, ctx);
    transfer::share_object(escrow);
}

/// Allows the taker to withdraw the escrow with the correct secret.
/// The withdrawal must occur within the valid timelock window.
entry fun withdraw<T>(
    escrow: &mut EscrowDst<T>,
    secret: vector<u8>,
    timelock: &Timelock,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(ctx.sender() == escrow.taker, EInvalidTaker);

    assert!(timelock.get_escrow_id() == object::id(escrow), EInvalidTimelock);
    assert!(timelock.get_deployed_at() + timelock.get_withdraw_dst() < timestamp_ms(clock), EInvalidTimelock);
    assert!(timelock.get_deployed_at() + timelock.get_cancel_dst() > timestamp_ms(clock), EInvalidTimelock);

    withdraw_helper<T>(escrow, secret, ctx);
}

/// Allows anyone to withdraw the escrow after the public withdrawal timelock has passed.
/// The withdrawal must occur before the cancel timelock.
entry fun public_withdraw<T>(
    escrow: &mut EscrowDst<T>,
    secret: vector<u8>,
    timelock: &Timelock,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(timelock.get_escrow_id() == object::id(escrow), EInvalidTimelock);
    assert!(timelock.get_deployed_at() + timelock.get_public_withdraw_dst() < timestamp_ms(clock), EInvalidTimelock);
    assert!(timelock.get_deployed_at() + timelock.get_cancel_dst() > timestamp_ms(clock), EInvalidTimelock);
    
    withdraw_helper<T>(escrow, secret, ctx);
}

/// Allows the taker to cancel the escrow and return funds to the taker.
/// The cancellation must occur within the valid timelock window.
entry fun cancel<T>(
    escrow: &mut EscrowDst<T>,
    timelock: &Timelock,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(ctx.sender() == escrow.taker, EInvalidTaker);
    
    assert!(timelock.get_escrow_id() == object::id(escrow), EInvalidTimelock);
    assert!(timelock.get_deployed_at() + timelock.get_cancel_dst() < timestamp_ms(clock), EInvalidTimelock);

    cancel_helper<T>(escrow, ctx);
}

// === Private Helpers ===

/// Internal helper function for withdrawing escrow funds.
/// Validates the secret against the hashlock and transfers funds to the target.
#[allow(lint(self_transfer))]
fun withdraw_helper<T>(
    escrow: &mut EscrowDst<T>,
    secret: vector<u8>,
    ctx: &mut TxContext
) {
    // TODO: check immutables here
    assert!(keccak256(&secret) == escrow.hashlock, EInvalidSecret);

    let asset = balance::withdraw_all(&mut escrow.balance).into_coin(ctx);
    transfer::public_transfer(asset, escrow.maker);


    event::emit(EscrowWithdrawal {secret: secret });
}

/// Internal helper function for cancelling escrow.
/// Returns the main asset to the taker and safety deposit to the caller.
#[allow(lint(self_transfer))]
fun cancel_helper<T>(
    escrow: &mut EscrowDst<T>,
    ctx: &mut TxContext
) {
    // TODO: check immutables here

    let asset = balance::withdraw_all(&mut escrow.balance).into_coin(ctx);
    transfer::public_transfer(asset, escrow.taker);

    event::emit(EscrowCancelled{});
}

