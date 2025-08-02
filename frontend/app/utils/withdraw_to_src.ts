import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const withdrawToSrc = (escrow, secret, target, timelock, coinType) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${package}::escrow_src::withdraw_to`,
        arguments: [
            tx.object(escrow),
            tx.pure(`vector<u8>`, secret),
            tx.pure.address(target),
            tx.object(timelock)
        ],
        typeArguments: [coinType]
    });
    return tx;
}