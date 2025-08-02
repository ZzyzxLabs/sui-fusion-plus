import { Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";

const mintAuctionWinner = (protocolCap, order, amount, winner, coinType) => {
    let tx = new Transaction();
    const taking = bcs.u256().serialize(amount);
    tx.moveCall({
        target: `${package}::limit_order_protocol::mint_auction_winner`,
        arguments: [
            tx.object(protocolCap),
            tx.object(order),
            tx.pure(taking),
            tx.pure.address(winner)
        ],
        typeArguments: [coinType]
    });
    return tx;
}