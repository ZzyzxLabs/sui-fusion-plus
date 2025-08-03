module atomic_swap::resolver;

use sui::coin::{Coin};
use sui::clock::{Clock};
use atomic_swap::escrow_dst::{create_escrow_dst};
use atomic_swap::limit_order_protocol::{fill_order, Order, AuctionWinner};

entry fun deploy_src<T>(
    order: &mut Order<T>,
    order_hash: vector<u8>,
    hashlock: vector<u8>,
    winner: &AuctionWinner,
    clock: &Clock,
    ctx: &mut TxContext
) {
    fill_order(order, order_hash, winner, hashlock, clock, ctx);
}


entry fun deploy_dst<T>(
    order_hash: vector<u8>,
    hashlock: vector<u8>,
    maker: address,
    resolver: address,
    dst_token: Coin<T>,
    clock: &Clock,
    ctx: &mut TxContext
) {
    create_escrow_dst(order_hash, hashlock, maker, resolver, dst_token, clock, ctx);
}

