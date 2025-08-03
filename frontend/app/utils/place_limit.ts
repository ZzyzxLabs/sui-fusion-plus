import { coinWithBalance, Transaction } from '@mysten/sui/transactions';
import { bcs } from "@mysten/sui/bcs";
import { package_addr } from './package';
export const placeLimit = (inCoin, outCoin, makingAmount, takingAmount, coinType) => {
    let tx = new Transaction();
    if (coinType === "0x2::sui::SUI") {
        
        const sui = coinWithBalance({
            balance: makingAmount,
            useGasCoin: true,
        })

        const out = bcs.string().serialize(outCoin).toBytes();
        const making = bcs.u256().serialize(makingAmount);
        const taking = bcs.u256().serialize(takingAmount);
        tx.moveCall({
        target: `${package_addr}::limit_order_protocol::create_order`,
        arguments: [
            sui,
            tx.pure(out),
            tx.pure(making),
            tx.pure(taking)
        ],
        typeArguments: [coinType]
    });
    } else {
      if (!Array.isArray(inCoin) || inCoin.length === 0) {
        throw new Error("coinIds must be a non-empty array of object IDs");
      }

      const inCoins = inCoin.map((id) => tx.object(id));

      if (inCoins.length > 1) {
        tx.mergeCoins(inCoins[0], inCoins.slice(1));
      }

        const finalCoin = tx.splitCoins(inCoins[0], [makingAmount]);
        const out = bcs.string().serialize(outCoin).toBytes();
        const making = bcs.u256().serialize(makingAmount);
        const taking = bcs.u256().serialize(takingAmount);
        tx.moveCall({
        target: `${package_addr}::limit_order_protocol::create_order`,
            arguments: [
                finalCoin,
                tx.pure(out),
                tx.pure(making),
                tx.pure(taking)
            ],
            typeArguments: [coinType]
        });
    }
    return tx;
};