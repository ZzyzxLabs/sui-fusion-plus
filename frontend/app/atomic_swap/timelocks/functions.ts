import { PUBLISHED_AT } from "..";
import { ID } from "../../../../atomic_swap/_dependencies/onchain/0x2/object/structs";
import { obj, pure } from "../../../../atomic_swap/_framework/util";
import {
  Transaction,
  TransactionArgument,
  TransactionObjectInput,
} from "@mysten/sui/transactions";

export function getCancelDst(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_cancel_dst`,
    arguments: [obj(tx, timelock)],
  });
}

export function getCancelSrc(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_cancel_src`,
    arguments: [obj(tx, timelock)],
  });
}

export function getDeployedAt(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_deployed_at`,
    arguments: [obj(tx, timelock)],
  });
}

export function getEscrowId(tx: Transaction, timelock: TransactionObjectInput) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_escrow_id`,
    arguments: [obj(tx, timelock)],
  });
}

export function getPublicCancelSrc(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_public_cancel_src`,
    arguments: [obj(tx, timelock)],
  });
}

export function getPublicWithdrawDst(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_public_withdraw_dst`,
    arguments: [obj(tx, timelock)],
  });
}

export function getPublicWithdrawSrc(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_public_withdraw_src`,
    arguments: [obj(tx, timelock)],
  });
}

export function getWithdrawDst(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_withdraw_dst`,
    arguments: [obj(tx, timelock)],
  });
}

export function getWithdrawSrc(
  tx: Transaction,
  timelock: TransactionObjectInput
) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::get_withdraw_src`,
    arguments: [obj(tx, timelock)],
  });
}

export interface InitTimelockArgs {
  id: string | TransactionArgument;
  clock: TransactionObjectInput;
  u641: bigint | TransactionArgument;
  u642: bigint | TransactionArgument;
  u643: bigint | TransactionArgument;
  u644: bigint | TransactionArgument;
  u645: bigint | TransactionArgument;
  u646: bigint | TransactionArgument;
  u647: bigint | TransactionArgument;
}

export function initTimelock(tx: Transaction, args: InitTimelockArgs) {
  return tx.moveCall({
    target: `${PUBLISHED_AT}::timelocks::init_timelock`,
    arguments: [
      pure(tx, args.id, `${ID.$typeName}`),
      obj(tx, args.clock),
      pure(tx, args.u641, `u64`),
      pure(tx, args.u642, `u64`),
      pure(tx, args.u643, `u64`),
      pure(tx, args.u644, `u64`),
      pure(tx, args.u645, `u64`),
      pure(tx, args.u646, `u64`),
      pure(tx, args.u647, `u64`),
    ],
  });
}
