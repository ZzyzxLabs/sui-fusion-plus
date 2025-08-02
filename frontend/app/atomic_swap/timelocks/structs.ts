import {
  ID,
  UID,
} from "../../../../atomic_swap/_dependencies/onchain/0x2/object/structs";
import {
  PhantomReified,
  Reified,
  StructClass,
  ToField,
  ToTypeStr,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  phantom,
} from "../../../../atomic_swap/_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
} from "../../../../atomic_swap/_framework/util";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64 } from "@mysten/sui/utils";

/* ============================== Timelock =============================== */

export function isTimelock(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::timelocks::Timelock`;
}

export interface TimelockFields {
  id: ToField<UID>;
  escrowId: ToField<ID>;
  deployedAt: ToField<"u64">;
  withdrawSrc: ToField<"u64">;
  publicWithdrawSrc: ToField<"u64">;
  cancelSrc: ToField<"u64">;
  publicCancelSrc: ToField<"u64">;
  withdrawDst: ToField<"u64">;
  publicWithdrawDst: ToField<"u64">;
  cancelDst: ToField<"u64">;
}

export type TimelockReified = Reified<Timelock, TimelockFields>;

export class Timelock implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::timelocks::Timelock`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = Timelock.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::timelocks::Timelock`;
  readonly $typeArgs: [];
  readonly $isPhantom = Timelock.$isPhantom;

  readonly id: ToField<UID>;
  readonly escrowId: ToField<ID>;
  readonly deployedAt: ToField<"u64">;
  readonly withdrawSrc: ToField<"u64">;
  readonly publicWithdrawSrc: ToField<"u64">;
  readonly cancelSrc: ToField<"u64">;
  readonly publicCancelSrc: ToField<"u64">;
  readonly withdrawDst: ToField<"u64">;
  readonly publicWithdrawDst: ToField<"u64">;
  readonly cancelDst: ToField<"u64">;

  private constructor(typeArgs: [], fields: TimelockFields) {
    this.$fullTypeName = composeSuiType(
      Timelock.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::timelocks::Timelock`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.escrowId = fields.escrowId;
    this.deployedAt = fields.deployedAt;
    this.withdrawSrc = fields.withdrawSrc;
    this.publicWithdrawSrc = fields.publicWithdrawSrc;
    this.cancelSrc = fields.cancelSrc;
    this.publicCancelSrc = fields.publicCancelSrc;
    this.withdrawDst = fields.withdrawDst;
    this.publicWithdrawDst = fields.publicWithdrawDst;
    this.cancelDst = fields.cancelDst;
  }

  static reified(): TimelockReified {
    return {
      typeName: Timelock.$typeName,
      fullTypeName: composeSuiType(
        Timelock.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::timelocks::Timelock`,
      typeArgs: [] as [],
      isPhantom: Timelock.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => Timelock.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Timelock.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => Timelock.fromBcs(data),
      bcs: Timelock.bcs,
      fromJSONField: (field: any) => Timelock.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => Timelock.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        Timelock.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Timelock.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        Timelock.fetch(client, id),
      new: (fields: TimelockFields) => {
        return new Timelock([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return Timelock.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<Timelock>> {
    return phantom(Timelock.reified());
  }
  static get p() {
    return Timelock.phantom();
  }

  static get bcs() {
    return bcs.struct("Timelock", {
      id: UID.bcs,
      escrow_id: ID.bcs,
      deployed_at: bcs.u64(),
      withdraw_src: bcs.u64(),
      public_withdraw_src: bcs.u64(),
      cancel_src: bcs.u64(),
      public_cancel_src: bcs.u64(),
      withdraw_dst: bcs.u64(),
      public_withdraw_dst: bcs.u64(),
      cancel_dst: bcs.u64(),
    });
  }

  static fromFields(fields: Record<string, any>): Timelock {
    return Timelock.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      escrowId: decodeFromFields(ID.reified(), fields.escrow_id),
      deployedAt: decodeFromFields("u64", fields.deployed_at),
      withdrawSrc: decodeFromFields("u64", fields.withdraw_src),
      publicWithdrawSrc: decodeFromFields("u64", fields.public_withdraw_src),
      cancelSrc: decodeFromFields("u64", fields.cancel_src),
      publicCancelSrc: decodeFromFields("u64", fields.public_cancel_src),
      withdrawDst: decodeFromFields("u64", fields.withdraw_dst),
      publicWithdrawDst: decodeFromFields("u64", fields.public_withdraw_dst),
      cancelDst: decodeFromFields("u64", fields.cancel_dst),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): Timelock {
    if (!isTimelock(item.type)) {
      throw new Error("not a Timelock type");
    }

    return Timelock.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      escrowId: decodeFromFieldsWithTypes(ID.reified(), item.fields.escrow_id),
      deployedAt: decodeFromFieldsWithTypes("u64", item.fields.deployed_at),
      withdrawSrc: decodeFromFieldsWithTypes("u64", item.fields.withdraw_src),
      publicWithdrawSrc: decodeFromFieldsWithTypes(
        "u64",
        item.fields.public_withdraw_src
      ),
      cancelSrc: decodeFromFieldsWithTypes("u64", item.fields.cancel_src),
      publicCancelSrc: decodeFromFieldsWithTypes(
        "u64",
        item.fields.public_cancel_src
      ),
      withdrawDst: decodeFromFieldsWithTypes("u64", item.fields.withdraw_dst),
      publicWithdrawDst: decodeFromFieldsWithTypes(
        "u64",
        item.fields.public_withdraw_dst
      ),
      cancelDst: decodeFromFieldsWithTypes("u64", item.fields.cancel_dst),
    });
  }

  static fromBcs(data: Uint8Array): Timelock {
    return Timelock.fromFields(Timelock.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      escrowId: this.escrowId,
      deployedAt: this.deployedAt.toString(),
      withdrawSrc: this.withdrawSrc.toString(),
      publicWithdrawSrc: this.publicWithdrawSrc.toString(),
      cancelSrc: this.cancelSrc.toString(),
      publicCancelSrc: this.publicCancelSrc.toString(),
      withdrawDst: this.withdrawDst.toString(),
      publicWithdrawDst: this.publicWithdrawDst.toString(),
      cancelDst: this.cancelDst.toString(),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): Timelock {
    return Timelock.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      escrowId: decodeFromJSONField(ID.reified(), field.escrowId),
      deployedAt: decodeFromJSONField("u64", field.deployedAt),
      withdrawSrc: decodeFromJSONField("u64", field.withdrawSrc),
      publicWithdrawSrc: decodeFromJSONField("u64", field.publicWithdrawSrc),
      cancelSrc: decodeFromJSONField("u64", field.cancelSrc),
      publicCancelSrc: decodeFromJSONField("u64", field.publicCancelSrc),
      withdrawDst: decodeFromJSONField("u64", field.withdrawDst),
      publicWithdrawDst: decodeFromJSONField("u64", field.publicWithdrawDst),
      cancelDst: decodeFromJSONField("u64", field.cancelDst),
    });
  }

  static fromJSON(json: Record<string, any>): Timelock {
    if (json.$typeName !== Timelock.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return Timelock.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): Timelock {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isTimelock(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a Timelock object`
      );
    }
    return Timelock.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): Timelock {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isTimelock(data.bcs.type)) {
        throw new Error(`object at is not a Timelock object`);
      }

      return Timelock.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Timelock.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<Timelock> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching Timelock object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isTimelock(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a Timelock object`);
    }

    return Timelock.fromSuiObjectData(res.data);
  }
}
