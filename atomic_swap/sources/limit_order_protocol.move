// Copyright (c) 2025 Sui Fusion Plus
// SPDX-License-Identifier: MIT

module atomic_swap::limit_order_protocol;


// === Imports ===
use sui::event;
use sui::dynamic_object_field as dof;
use sui::coin::{Self, Coin, into_balance};
use sui::hash::{keccak256};
use sui::clock::{timestamp_ms, Clock};
use sui::balance::{Self, Balance};
use sui::sui::SUI;
use usdc::usdc::USDC;
use atomic_swap::timelocks::{Self, Timelock};
use atomic_swap::escrow_src::{Self, create_escrow_src<T>};

// === Structs ===
/// Represents the protocol admin capabilities for atomic swaps.
/// This object is used to manage protocol-level operations and is stored in the admin's account.
public struct ProtocolCap has key, store {
    id: UID,
}

public struct Auction_Winner has key {
    id: UID,
}

// TODO: Some Params Discussion
public struct MakerTrait has key, store {
    id: UID,
}

// Order for Sui
public struct Order<T> has key{
    id: UID,
    salt: u256,
    maker: address,
    receiver: address,
    makerAsset: Balance<T>,
    takerAsset: String,
    makingAmount: u256,
    takingAmount: u256,
    makerTrait: MakerTrait,
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
public fun deploy_limit<T>(
    in: Coin<T>,
    out: String,
    makingAmount: u256,
    takingAmount: u256,
    ctx: &mut TxContext
) {
    let makerTrait = MakerTrait {
        id: object::new(ctx),
    };
    let limit_order = Order<T>{
        id: object::new(ctx),
        salt: 0,
        maker: ctx.sender(),
        receiver: ctx.sender(), // For simplicity, receiver is the same as maker
        makerAsset: into_balance(in),
        takerAsset: out,
        makingAmount: makingAmount,
        takingAmount: takingAmount,
        makerTrait: makerTrait,
    };
    transfer::share_object(limit_order);
}

public fun fill_order<T>(
    order: &mut Order<T>,
    takerAsset: Coin<T>,
) {
    orderHash = keccak256(order); //placeholder for actual hash function
    create_escrow_src(orderHash, , takerAsset);
}