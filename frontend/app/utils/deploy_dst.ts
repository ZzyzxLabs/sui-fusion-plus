import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const deploy_dst = (orderHash, hashlock, maker, resolver, dst_coin, safetyDeposit, coinType) => {
    let tx = new Transaction();
    tx.moveCall({
        target: `${package}::resolver::deploy_dst`,
        arguments: [
            tx.pure(`vector<u8>`, orderHash),
            tx.pure(`vector<u8>`, hashlock),
            tx.pure.address(maker),
            tx.pure.address(resolver),
            tx.object(dst_coin),
            tx.object(safetyDeposit)
        ],
        typeArguments: [coinType]
    });
    return tx;
};