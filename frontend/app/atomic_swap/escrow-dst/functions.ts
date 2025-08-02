import { PUBLISHED_AT } from "..";
import { obj, pure } from "../../../../atomic_swap/_framework/util";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
} from "@mysten/sui/transactions";

export interface CancelArgs {
  escrowDst: TransactionObjectInput;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function cancel(tx: Transaction, typeArg: string, args: CancelArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::cancel`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowDst),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export function cancelHelper(
  tx: Transaction,
  typeArg: string,
  escrowDst: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::cancel_helper`,
    typeArguments: [typeArg],
    arguments: [obj(tx, escrowDst)],
  });
}

export interface CreateEscrowDstArgs {
  vecU81: Array<number | TransactionArgument> | TransactionArgument;
  vecU82: Array<number | TransactionArgument> | TransactionArgument;
  address1: string | TransactionArgument;
  address2: string | TransactionArgument;
  coin1: TransactionObjectInput;
  coin2: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function createEscrowDst(
  tx: Transaction,
  typeArg: string,
  args: CreateEscrowDstArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::create_escrow_dst`,
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

export interface PublicWithdrawArgs {
  escrowDst: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function publicWithdraw(
  tx: Transaction,
  typeArg: string,
  args: PublicWithdrawArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::public_withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowDst),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export interface WithdrawArgs {
  escrowDst: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function withdraw(tx: Transaction, typeArg: string, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowDst),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export interface WithdrawHelperArgs {
  escrowDst: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
}

export function withdrawHelper(
  tx: Transaction,
  typeArg: string,
  args: WithdrawHelperArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_dst::withdraw_helper`,
    typeArguments: [typeArg],
    arguments: [obj(tx, args.escrowDst), pure(tx, args.vecU8, `vector<u8>`)],
  });
}
