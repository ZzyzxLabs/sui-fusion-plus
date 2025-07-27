module atomic_swap::timelocks;

use sui::clock::{Self, Clock};

public struct TimelockSrc has copy {
    escrow_id: ID,
    init_time: u64,
    withdraw: u64,
    public_withdraw: u64,
    cancel: u64,
    public_cancel: u64,
}

public struct TimelockDst has copy {
    escrow_id: ID,
    init_time: u64,
    withdraw: u64,
    public_withdraw: u64,
    cancel: u64,
    public_cancel: u64,
}

public(package) fun init_timelock_src(escrow_id: ID, clock: &Clock) : TimelockSrc {
    let init_time = clock::timestamp_ms(clock);
    TimelockSrc { 
        escrow_id: escrow_id,
        init_time: init_time, 
        withdraw: init_time+5,
        public_withdraw: init_time+10,
        cancel: init_time+15,
        public_cancel: init_time+20,
    }
}