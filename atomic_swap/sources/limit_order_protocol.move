// Copyright (c) 2025 Sui Fusion Plus
// SPDX-License-Identifier: MIT

module atomic_swap::limit_order_protocol;


// === Imports ===
use sui::event;
use sui::coin::{Self, Coin, into_balance, from_balance};
use sui::hash::{keccak256};
use sui::clock::{Clock};
use sui::balance::{Balance};
use usdc::usdc::USDC;
use atomic_swap::escrow_src::{create_escrow_src};
use std::string::{String};

// === Errors ===
const EWrongOrder: u64 = 1;
// === Structs ===
/// Represents the protocol admin capabilities for atomic swaps.
/// This object is used to manage protocol-level operations and is stored in the admin's account.
public struct ProtocolCap has key, store {
    id: UID,
}
/// Represents the winner of an auction in the atomic swap protocol.
/// This struct holds the auction winner's ID and the amount they won.
public struct AuctionWinner has key {
    id: UID,
    amount: u256,
    order_id: ID
}

// TODO: Some Params Discussion
public struct MakerTraits has key, store {
    id: UID,
}

// Order When Sui is the Source Chain
public struct Order<phantom T> has key{
    id: UID,
    salt: u256,
    maker: address,
    src_token: Balance<T>,
    dst_token: String,
    src_amount: u256,
    dst_amount: u256,
    maker_traits: MakerTraits,
}

public struct OrderCap has key, store {
    id: UID,
    order_id: ID
}

// === Events ===

public struct OrderCreated has copy, drop {
    order_id: ID
}

// === Init Functions ===
fun init(
    ctx: &mut TxContext
) {
    // Initialize the protocol capabilities and other necessary setup.
    let protocol_cap = ProtocolCap {
        id: object::new(ctx),
    };
    transfer::transfer(protocol_cap, ctx.sender());
}

// === Public Functions ===
// maker creates a limit order for atomic swap
#[allow(lint(self_transfer))]
public fun create_order<T>(
    src_token: Coin<T>,
    dst_token: String,
    src_amount: u256,
    dst_amount: u256,
    ctx: &mut TxContext
) {
    let makerTrait = MakerTraits {
        id: object::new(ctx),
    };
    let limit_order = Order<T>{
        id: object::new(ctx),
        salt: 0,
        maker: ctx.sender(),
        src_token: into_balance(src_token),
        dst_token: dst_token,
        src_amount: src_amount,
        dst_amount: dst_amount,
        maker_traits: makerTrait,
    };
    let order_cap = OrderCap {
        id: object::new(ctx),
        order_id: object::id(&limit_order),
    };
    
    event::emit(OrderCreated { order_id: object::id(&limit_order) });
    transfer::public_transfer(order_cap, ctx.sender());
    transfer::share_object(limit_order);
}

// Relayer create an auction winner for the taker
public fun mint_auction_winner<T>(
    _protocol_cap: &ProtocolCap,
    order: &Order<T>,
    amount: u256,
    winner: address,
    ctx: &mut TxContext
) {
    let auction_winner = AuctionWinner {
        id: object::new(ctx),
        order_id: object::id(order),
        amount: amount,
    };
    transfer::transfer(auction_winner, winner);
}

// Taker fills an order in the atomic swap protocol with the auction winner.
public(package) fun fill_order<T>(
    order: &mut Order<T>,
    order_hash: vector<u8>,
    winner: &AuctionWinner,
    safety_deposit: Coin<USDC>,
    hashlock: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    assert!(object::id(order) == winner.order_id, EWrongOrder);
    let coin_to_escrow = coin::take<T>(&mut order.src_token, (winner.amount as u64), ctx);
    let order_hash: vector<u8> = keccak256(&order_hash);
    create_escrow_src<T>(
        order_hash,
        hashlock,
        order.maker,
        ctx.sender(),
        coin_to_escrow,
        safety_deposit,
        clock,
        ctx
    );
}

// Maker cancel an order onchain
#[allow(lint(self_transfer))]
public fun cancel_order<T>(
    order_cap: &OrderCap,
    order: Order<T>,
    ctx: &mut TxContext
) {
    assert!(object::id(&order) == order_cap.order_id, EWrongOrder);
    let Order {
        id,
        salt: _,
        maker: _,
        src_token,
        dst_token: _,
        src_amount: _,
        dst_amount: _,
        maker_traits,
    } = order;
    transfer::public_transfer(from_balance(src_token, ctx), ctx.sender());
    object::delete(id);
    let MakerTraits {
        id,
    } = maker_traits;
    object::delete(id);
    

}