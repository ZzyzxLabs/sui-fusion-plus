import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const fill_order = (order, orderHash, winnerCap, safetyDeposit, hashlock, coinType) => {
    let tx = new Transaction();
    tx.moveCall({
        target: `${package}::limit_order_protocol::fill_order`,
        arguments: [
            tx.object(order),
            tx.pure(`vector<u8>`, orderHash),
            tx.object(winnerCap),
            tx.object(safetyDeposit),
            tx.pure(`vector<u8>`, hashlock)
        ],
        typeArguments: [coinType]
    });
    return tx;
};