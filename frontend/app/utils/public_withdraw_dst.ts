import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const publicWithdrawDst = (escrow, secret, timelock, coinType) => {
    const tx = new Transaction();
    tx.moveCall({
        target: `${package}::escrow_dst::public_withdraw`,
        arguments: [
            tx.object(escrow),
            tx.pure(`vector<u8>`, secret),
            tx.object(timelock)
        ],
        typeArguments: [coinType]
    });
    return tx;
}