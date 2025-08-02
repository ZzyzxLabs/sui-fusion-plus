import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const cancelOrder = (order_cap, order, coinType) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${package}::limit_order_protocol::cancel_order`,
        arguments: [
            tx.object(order_cap),
            tx.object(order)
        ],
        typeArguments: [coinType]
    });
    return tx;
}