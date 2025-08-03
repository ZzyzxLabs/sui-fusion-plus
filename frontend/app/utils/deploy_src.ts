import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";
import { package_addr } from './package';
export const fill_order = (order, orderHash, hashlock, winnerCap, coinType) => {

    let tx = new Transaction();
    tx.moveCall({
        target: `${package_addr}::resolver::deploy_src`,
        arguments: [
            tx.object(order),
            tx.pure(`vector<u8>`, Array.from(orderHash)),
            tx.pure(`vector<u8>`, Array.from(hashlock)),
            tx.object(winnerCap),
            tx.object(`0x6`)
        ],
        typeArguments: [coinType]
    });
    return tx;
};