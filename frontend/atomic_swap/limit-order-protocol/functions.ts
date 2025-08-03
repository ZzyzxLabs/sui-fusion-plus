import { PUBLISHED_AT } from "..";
import { String } from "../../_dependencies/onchain/0x1/string/structs";
import { obj, pure } from "../../_framework/util";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
} from "@mysten/sui/transactions";

export interface CancelOrderArgs {
  orderCap: TransactionObjectInput;
  order: TransactionObjectInput;
}

export function cancelOrder(
  tx: Transaction,
  typeArg: string,
  args: CancelOrderArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::limit_order_protocol::cancel_order`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.orderCap), obj(tx, args.order)],
  });
}

export interface CreateOrderArgs {
  coin: TransactionObjectInput;
  string: string | TransactionArgument;
  u2561: bigint | TransactionArgument;
  u2562: bigint | TransactionArgument;
}

export function createOrder(
  tx: Transaction,
  typeArg: string,
  args: CreateOrderArgs
) {
  console.log("createOrder function called with:", { typeArg, args });

  const result = tx.moveCall({
    target: `${PUBLISHED_AT}::limit_order_protocol::create_order`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.coin),
      pure(tx, args.string, `${String.$typeName}`),
      pure(tx, args.u2561, `u256`),
      pure(tx, args.u2562, `u256`),
    ],
  });

  console.log("createOrder result:", result);
  return result;
}

export interface FillOrderArgs {
  order: TransactionObjectInput;
  vecU81: Array<number | TransactionArgument> | TransactionArgument;
  auctionWinner: TransactionObjectInput;
  coin: TransactionObjectInput;
  vecU82: Array<number | TransactionArgument> | TransactionArgument;
  clock: TransactionObjectInput;
}

export function fillOrder(
  tx: Transaction,
  typeArg: string,
  args: FillOrderArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::limit_order_protocol::fill_order`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.order),
      pure(tx, args.vecU81, `vector<u8>`),
      obj(tx, args.auctionWinner),
      obj(tx, args.coin),
      pure(tx, args.vecU82, `vector<u8>`),
      obj(tx, args.clock),
    ],
  });
}

export function init(tx: Transaction) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::limit_order_protocol::init`,
    arguments: [],
  });
}

export interface MintAuctionWinnerArgs {
  protocolCap: TransactionObjectInput;
  order: TransactionObjectInput;
  u256: bigint | TransactionArgument;
  address: string | TransactionArgument;
}

export function mintAuctionWinner(
  tx: Transaction,
  typeArg: string,
  args: MintAuctionWinnerArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::limit_order_protocol::mint_auction_winner`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.protocolCap),
      obj(tx, args.order),
      pure(tx, args.u256, `u256`),
      pure(tx, args.address, `address`),
    ],
  });
}
