import { PUBLISHED_AT } from "..";
import { obj, pure } from "../../../../atomic_swap/_framework/util";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
} from "@mysten/sui/transactions";

export interface CancelArgs {
  escrowSrc: TransactionObjectInput;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function cancel(tx: Transaction, typeArg: string, args: CancelArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::cancel`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export function cancelHelper(
  tx: Transaction,
  typeArg: string,
  escrowSrc: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::cancel_helper`,
    typeArguments: [typeArg],
    arguments: [obj(tx, escrowSrc)],
  });
}

export interface CreateEscrowSrcArgs {
  vecU81: Array<number | TransactionArgument> | TransactionArgument;
  vecU82: Array<number | TransactionArgument> | TransactionArgument;
  address1: string | TransactionArgument;
  address2: string | TransactionArgument;
  coin1: TransactionObjectInput;
  coin2: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function createEscrowSrc(
  tx: Transaction,
  typeArg: string,
  args: CreateEscrowSrcArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::create_escrow_src`,
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

export interface PubliccancelArgs {
  escrowSrc: TransactionObjectInput;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function publiccancel(
  tx: Transaction,
  typeArg: string,
  args: PubliccancelArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::publicCancel`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export interface PublicwithdrawArgs {
  escrowSrc: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function publicwithdraw(
  tx: Transaction,
  typeArg: string,
  args: PublicwithdrawArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::publicWithdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export interface WithdrawArgs {
  escrowSrc: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function withdraw(tx: Transaction, typeArg: string, args: WithdrawArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::withdraw`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      pure(tx, args.vecU8, `vector<u8>`),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}

export interface WithdrawHelperArgs {
  escrowSrc: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  address: string | TransactionArgument;
}

export function withdrawHelper(
  tx: Transaction,
  typeArg: string,
  args: WithdrawHelperArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::withdraw_helper`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      pure(tx, args.vecU8, `vector<u8>`),
      pure(tx, args.address, `address`),
    ],
  });
}

export interface WithdrawToArgs {
  escrowSrc: TransactionObjectInput;
  vecU8: Array<number | TransactionArgument> | TransactionArgument;
  address: string | TransactionArgument;
  timelock: TransactionObjectInput;
  clock: TransactionObjectInput;
}

export function withdrawTo(
  tx: Transaction,
  typeArg: string,
  args: WithdrawToArgs
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::escrow_src::withdraw_to`,
    typeArguments: [typeArg],
    arguments: [
      obj(tx, args.escrowSrc),
      pure(tx, args.vecU8, `vector<u8>`),
      pure(tx, args.address, `address`),
      obj(tx, args.timelock),
      obj(tx, args.clock),
    ],
  });
}
