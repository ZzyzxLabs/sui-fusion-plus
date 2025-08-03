import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";
import { package_addr } from './package';
const deploy_dst = (orderHash, hashlock, maker, resolver, dst_coin, coinType) => {
    let tx = new Transaction();
    tx.moveCall({
        target: `${package_addr}::resolver::deploy_dst`,
        arguments: [
            tx.pure(`vector<u8>`, orderHash),
            tx.pure(`vector<u8>`, hashlock),
            tx.pure.address(maker),
            tx.pure.address(resolver),
            tx.object(dst_coin),
        ],
        typeArguments: [coinType]
    });
    return tx;
};