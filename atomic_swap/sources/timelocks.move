module atomic_swap::timelocks;

use sui::clock::{Self, Clock};

public struct Timelock has key {
    id: UID,
    escrow_id: ID,
    deployed_at: u64,
    withdraw_src: u64,
    public_withdraw_src: u64,
    cancel_src: u64,
    public_cancel_src: u64,
    withdraw_dst: u64,
    public_withdraw_dst: u64,
    cancel_dst: u64,
}


public(package) fun init_timelock(
    escrow_id: ID, 
    clock: &Clock, 
    withdraw_src: u64, 
    public_withdraw_src: u64, 
    cancel_src: u64, 
    public_cancel_src: u64,
    withdraw_dst: u64, 
    public_withdraw_dst: u64, 
    cancel_dst: u64,
    ctx: &mut TxContext
) {
    let current_time = clock::timestamp_ms(clock);
    let timelock = Timelock { 
        id: object::new(ctx),
        escrow_id: escrow_id,
        deployed_at: current_time, 
        withdraw_src: withdraw_src,
        public_withdraw_src: public_withdraw_src,
        cancel_src: cancel_src,
        public_cancel_src: public_cancel_src,
        withdraw_dst: withdraw_dst,
        public_withdraw_dst: public_withdraw_dst,
        cancel_dst: cancel_dst,
    };
    transfer::share_object(timelock);
}

public(package) fun get_escrow_id(timelock: &Timelock) : ID {
    timelock.escrow_id
}

public(package) fun get_deployed_at(timelock: &Timelock) : u64 {
    timelock.deployed_at
}

public(package) fun get_withdraw_src(timelock: &Timelock) : u64 {
    timelock.withdraw_src
}

public(package) fun get_public_withdraw_src(timelock: &Timelock) : u64 {
    timelock.public_withdraw_src
}

public(package) fun get_cancel_src(timelock: &Timelock) : u64 {
    timelock.cancel_src
}

public(package) fun get_public_cancel_src(timelock: &Timelock) : u64 {
    timelock.public_cancel_src
}

public(package) fun get_withdraw_dst(timelock: &Timelock) : u64 {
    timelock.withdraw_dst
}

public(package) fun get_public_withdraw_dst(timelock: &Timelock) : u64 {
    timelock.public_withdraw_dst
}

public(package) fun get_cancel_dst(timelock: &Timelock) : u64 {
    timelock.cancel_dst
}