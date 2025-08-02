module atomic_swap::test;

#[test_only]
use sui::coin::{Self, Coin};
use sui::sui::SUI;
use sui::test_scenario::{Self as ts, Scenario};
use sui::clock::{Self, Clock};
use sui::hash::{keccak256};
use usdc::usdc::USDC;
use atomic_swap::limit_order_protocol;
use atomic_swap::escrow_src;
use atomic_swap::escrow_dst;
use atomic_swap::timelocks;

const ALICE: address = @0xA;
const BOB: address = @0xB;

fun test_sui(ts: &mut Scenario): Coin<SUI> {
	coin::mint_for_testing<SUI>(42, ts.ctx())
}

fun test_usdc(ts: &mut Scenario): Coin<USDC> {
	coin::mint_for_testing<USDC>(42, ts.ctx())
}

#[test]
fun test_create_escrowSrc() {
	let mut ts = ts::begin(@0xA);
	let sui: Coin<SUI> = test_sui(&mut ts);
    let usdc: Coin<USDC> = test_usdc(&mut ts);
	let clock = clock::create_for_testing(ts.ctx());
    let order_hash: vector<u8> = keccak256(&b"orderHash");
    let hashlock: vector<u8> = keccak256(&b"hashlock");

	escrow_src::createEscrowSrc<SUI>(
		order_hash,
		hashlock,
		ALICE,
		BOB,
		sui,
        usdc,
		&clock,
		ts.ctx()
	);

    clock::destroy_for_testing(clock);
    ts.end();
}

