import { PUBLISHED_AT } from "..";
import { obj, pure } from "../../../../atomic_swap/_framework/util";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
} from "@mysten/sui/transactions";

export interface DeployDstArgs {
  vecU81: Array<number | TransactionArgument> | TransactionArgument;
  vecU82: Array<number | TransactionArgument> | TransactionArgument;
  address1: string | TransactionArgument;
  address2: string | TransactionArgument;
  coin1: TransactionObjectInput;
  coin2: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function deployDst(
  tx: Transaction,
  typeArg: string,
  args: DeployDstArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::resolver::deploy_dst`,
    typeArguments: [typeArg],
    arguments: [
      pure(tx, args.vecU81, `vector<u8>`),
      pure(tx, args.vecU82, `vector<u8>`),
      pure(tx, args.address1, `address`),
      pure(tx, args.address2, `address`),
      obj(tx, args.coin1),
      obj(tx, args.coin2),
      obj(tx, args.clock),
    ],
  });
}

export interface DeploySrcArgs {
  order: TransactionObjectInput;
  vecU81: Array<number | TransactionArgument> | TransactionArgument;
  vecU82: Array<number | TransactionArgument> | TransactionArgument;
  auctionWinner: TransactionObjectInput;
  coin: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function deploySrc(
  tx: Transaction,
  typeArg: string,
  args: DeploySrcArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::resolver::deploy_src`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.order),
      pure(tx, args.vecU81, `vector<u8>`),
      pure(tx, args.vecU82, `vector<u8>`),
      obj(tx, args.auctionWinner),
      obj(tx, args.coin),
      obj(tx, args.clock),
    ],
  });
}
