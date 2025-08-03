import * as reified from "../../../../atomic_swap/_framework/reified";
import { Balance } from "../../../../atomic_swap/_dependencies/onchain/0x2/balance/structs";
import { UID } from "../../../../atomic_swap/_dependencies/onchain/0x2/object/structs";
import { USDC } from "../../../../atomic_swap/_dependencies/onchain/0xa1ec7fc00a6f40db9693ad1415d0c193ad3906494428cf252621037bd7117e29/usdc/structs";
import {
  PhantomReified,
  PhantomToTypeStr,
  PhantomTypeArgument,
  Reified,
  StructClass,
  ToField,
  ToPhantomTypeArgument,
  ToTypeStr,
  assertFieldsWithTypesArgsMatch,
  assertReifiedTypeArgsMatch,
  decodeFromFields,
  decodeFromFieldsWithTypes,
  decodeFromJSONField,
  extractType,
  fieldToJSON,
  phantom,
  ToTypeStr as ToPhantom,
} from "../../../../atomic_swap/_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from "../../../../atomic_swap/_framework/util";
import { Vector } from "../../../../atomic_swap/_framework/vector";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64, fromHEX, toHEX } from "@mysten/sui/utils";

/* ============================== EscrowCancelled =============================== */

export function isEscrowCancelled(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::escrow_src::EscrowCancelled`;
}

export interface EscrowCancelledFields {
  dummyField: ToField<"bool">;
}

export type EscrowCancelledReified = Reified<
  EscrowCancelled,
  EscrowCancelledFields
>;

export class EscrowCancelled implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::escrow_src::EscrowCancelled`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = EscrowCancelled.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::escrow_src::EscrowCancelled`;
  readonly $typeArgs: [];
  readonly $isPhantom = EscrowCancelled.$isPhantom;

  readonly dummyField: ToField<"bool">;

  private constructor(typeArgs: [], fields: EscrowCancelledFields) {
    this.$fullTypeName = composeSuiType(
      EscrowCancelled.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::escrow_src::EscrowCancelled`;
    this.$typeArgs = typeArgs;

    this.dummyField = fields.dummyField;
  }

  static reified(): EscrowCancelledReified {
    return {
      typeName: EscrowCancelled.$typeName,
      fullTypeName: composeSuiType(
        EscrowCancelled.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::escrow_src::EscrowCancelled`,
      typeArgs: [] as [],
      isPhantom: EscrowCancelled.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        EscrowCancelled.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EscrowCancelled.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EscrowCancelled.fromBcs(data),
      bcs: EscrowCancelled.bcs,
      fromJSONField: (field: any) => EscrowCancelled.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EscrowCancelled.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        EscrowCancelled.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EscrowCancelled.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        EscrowCancelled.fetch(client, id),
      new: (fields: EscrowCancelledFields) => {
        return new EscrowCancelled([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return EscrowCancelled.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<EscrowCancelled>> {
    return phantom(EscrowCancelled.reified());
  }
  static get p() {
    return EscrowCancelled.phantom();
  }

  static get bcs() {
    return bcs.struct("EscrowCancelled", {
      dummy_field: bcs.bool(),
    });
  }

  static fromFields(fields: Record<string, any>): EscrowCancelled {
    return EscrowCancelled.reified().new({
      dummyField: decodeFromFields("bool", fields.dummy_field),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EscrowCancelled {
    if (!isEscrowCancelled(item.type)) {
      throw new Error("not a EscrowCancelled type");
    }

    return EscrowCancelled.reified().new({
      dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field),
    });
  }

  static fromBcs(data: Uint8Array): EscrowCancelled {
    return EscrowCancelled.fromFields(EscrowCancelled.bcs.parse(data));
  }

  toJSONField() {
    return {
      dummyField: this.dummyField,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): EscrowCancelled {
    return EscrowCancelled.reified().new({
      dummyField: decodeFromJSONField("bool", field.dummyField),
    });
  }

  static fromJSON(json: Record<string, any>): EscrowCancelled {
    if (json.$typeName !== EscrowCancelled.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return EscrowCancelled.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): EscrowCancelled {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isEscrowCancelled(content.type)) {
      throw new Error(
        `object at ${
          (content.fields as any).id
        } is not a EscrowCancelled object`
      );
    }
    return EscrowCancelled.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): EscrowCancelled {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isEscrowCancelled(data.bcs.type)
      ) {
        throw new Error(`object at is not a EscrowCancelled object`);
      }

      return EscrowCancelled.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return EscrowCancelled.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<EscrowCancelled> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching EscrowCancelled object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isEscrowCancelled(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a EscrowCancelled object`);
    }

    return EscrowCancelled.fromSuiObjectData(res.data);
  }
}

/* ============================== EscrowSrc =============================== */

export function isEscrowSrc(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${PKG_V1}::escrow_src::EscrowSrc` + "<");
}

export interface EscrowSrcFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>;
  orderHash: ToField<Vector<"u8">>;
  hashlock: ToField<Vector<"u8">>;
  maker: ToField<"address">;
  taker: ToField<"address">;
  balance: ToField<Balance<T0>>;
  safetyDeposit: ToField<Balance<ToPhantom<USDC>>>;
}

export type EscrowSrcReified<T0 extends PhantomTypeArgument> = Reified<
  EscrowSrc<T0>,
  EscrowSrcFields<T0>
>;

export class EscrowSrc<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::escrow_src::EscrowSrc`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = EscrowSrc.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::escrow_src::EscrowSrc<${PhantomToTypeStr<T0>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T0>];
  readonly $isPhantom = EscrowSrc.$isPhantom;

  readonly id: ToField<UID>;
  readonly orderHash: ToField<Vector<"u8">>;
  readonly hashlock: ToField<Vector<"u8">>;
  readonly maker: ToField<"address">;
  readonly taker: ToField<"address">;
  readonly balance: ToField<Balance<T0>>;
  readonly safetyDeposit: ToField<Balance<ToPhantom<USDC>>>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>],
    fields: EscrowSrcFields<T0>
  ) {
    this.$fullTypeName = composeSuiType(
      EscrowSrc.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::escrow_src::EscrowSrc<${PhantomToTypeStr<T0>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.orderHash = fields.orderHash;
    this.hashlock = fields.hashlock;
    this.maker = fields.maker;
    this.taker = fields.taker;
    this.balance = fields.balance;
    this.safetyDeposit = fields.safetyDeposit;
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): EscrowSrcReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: EscrowSrc.$typeName,
      fullTypeName: composeSuiType(
        EscrowSrc.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::escrow_src::EscrowSrc<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>
      ],
      isPhantom: EscrowSrc.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) =>
        EscrowSrc.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EscrowSrc.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => EscrowSrc.fromBcs(T0, data),
      bcs: EscrowSrc.bcs,
      fromJSONField: (field: any) => EscrowSrc.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => EscrowSrc.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        EscrowSrc.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EscrowSrc.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) =>
        EscrowSrc.fetch(client, T0, id),
      new: (fields: EscrowSrcFields<ToPhantomTypeArgument<T0>>) => {
        return new EscrowSrc([extractType(T0)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return EscrowSrc.reified;
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<EscrowSrc<ToPhantomTypeArgument<T0>>>> {
    return phantom(EscrowSrc.reified(T0));
  }
  static get p() {
    return EscrowSrc.phantom;
  }

  static get bcs() {
    return bcs.struct("EscrowSrc", {
      id: UID.bcs,
      order_hash: bcs.vector(bcs.u8()),
      hashlock: bcs.vector(bcs.u8()),
      maker: bcs
        .bytes(32)
        .transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
      taker: bcs
        .bytes(32)
        .transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
      balance: Balance.bcs,
      safety_deposit: Balance.bcs,
    });
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    return EscrowSrc.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      orderHash: decodeFromFields(reified.vector("u8"), fields.order_hash),
      hashlock: decodeFromFields(reified.vector("u8"), fields.hashlock),
      maker: decodeFromFields("address", fields.maker),
      taker: decodeFromFields("address", fields.taker),
      balance: decodeFromFields(Balance.reified(typeArg), fields.balance),
      safetyDeposit: decodeFromFields(
        Balance.reified(reified.phantom(USDC.reified())),
        fields.safety_deposit
      ),
    });
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    if (!isEscrowSrc(item.type)) {
      throw new Error("not a EscrowSrc type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return EscrowSrc.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      orderHash: decodeFromFieldsWithTypes(
        reified.vector("u8"),
        item.fields.order_hash
      ),
      hashlock: decodeFromFieldsWithTypes(
        reified.vector("u8"),
        item.fields.hashlock
      ),
      maker: decodeFromFieldsWithTypes("address", item.fields.maker),
      taker: decodeFromFieldsWithTypes("address", item.fields.taker),
      balance: decodeFromFieldsWithTypes(
        Balance.reified(typeArg),
        item.fields.balance
      ),
      safetyDeposit: decodeFromFieldsWithTypes(
        Balance.reified(reified.phantom(USDC.reified())),
        item.fields.safety_deposit
      ),
    });
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    return EscrowSrc.fromFields(typeArg, EscrowSrc.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      orderHash: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.orderHash),
      hashlock: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.hashlock),
      maker: this.maker,
      taker: this.taker,
      balance: this.balance.toJSONField(),
      safetyDeposit: this.safetyDeposit.toJSONField(),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    field: any
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    return EscrowSrc.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      orderHash: decodeFromJSONField(reified.vector("u8"), field.orderHash),
      hashlock: decodeFromJSONField(reified.vector("u8"), field.hashlock),
      maker: decodeFromJSONField("address", field.maker),
      taker: decodeFromJSONField("address", field.taker),
      balance: decodeFromJSONField(Balance.reified(typeArg), field.balance),
      safetyDeposit: decodeFromJSONField(
        Balance.reified(reified.phantom(USDC.reified())),
        field.safetyDeposit
      ),
    });
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== EscrowSrc.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(EscrowSrc.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    );

    return EscrowSrc.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isEscrowSrc(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a EscrowSrc object`
      );
    }
    return EscrowSrc.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): EscrowSrc<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isEscrowSrc(data.bcs.type)) {
        throw new Error(`object at is not a EscrowSrc object`);
      }

      const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs;
      if (gotTypeArgs.length !== 1) {
        throw new Error(
          `type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`
        );
      }
      const gotTypeArg = compressSuiType(gotTypeArgs[0]);
      const expectedTypeArg = compressSuiType(extractType(typeArg));
      if (gotTypeArg !== compressSuiType(extractType(typeArg))) {
        throw new Error(
          `type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`
        );
      }

      return EscrowSrc.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return EscrowSrc.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<EscrowSrc<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching EscrowSrc object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isEscrowSrc(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a EscrowSrc object`);
    }

    return EscrowSrc.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== EscrowWithdrawal =============================== */

export function isEscrowWithdrawal(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::escrow_src::EscrowWithdrawal`;
}

export interface EscrowWithdrawalFields {
  secret: ToField<Vector<"u8">>;
}

export type EscrowWithdrawalReified = Reified<
  EscrowWithdrawal,
  EscrowWithdrawalFields
>;

export class EscrowWithdrawal implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::escrow_src::EscrowWithdrawal`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = EscrowWithdrawal.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::escrow_src::EscrowWithdrawal`;
  readonly $typeArgs: [];
  readonly $isPhantom = EscrowWithdrawal.$isPhantom;

  readonly secret: ToField<Vector<"u8">>;

  private constructor(typeArgs: [], fields: EscrowWithdrawalFields) {
    this.$fullTypeName = composeSuiType(
      EscrowWithdrawal.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::escrow_src::EscrowWithdrawal`;
    this.$typeArgs = typeArgs;

    this.secret = fields.secret;
  }

  static reified(): EscrowWithdrawalReified {
    return {
      typeName: EscrowWithdrawal.$typeName,
      fullTypeName: composeSuiType(
        EscrowWithdrawal.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::escrow_src::EscrowWithdrawal`,
      typeArgs: [] as [],
      isPhantom: EscrowWithdrawal.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        EscrowWithdrawal.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        EscrowWithdrawal.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => EscrowWithdrawal.fromBcs(data),
      bcs: EscrowWithdrawal.bcs,
      fromJSONField: (field: any) => EscrowWithdrawal.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => EscrowWithdrawal.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        EscrowWithdrawal.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        EscrowWithdrawal.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        EscrowWithdrawal.fetch(client, id),
      new: (fields: EscrowWithdrawalFields) => {
        return new EscrowWithdrawal([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return EscrowWithdrawal.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<EscrowWithdrawal>> {
    return phantom(EscrowWithdrawal.reified());
  }
  static get p() {
    return EscrowWithdrawal.phantom();
  }

  static get bcs() {
    return bcs.struct("EscrowWithdrawal", {
      secret: bcs.vector(bcs.u8()),
    });
  }

  static fromFields(fields: Record<string, any>): EscrowWithdrawal {
    return EscrowWithdrawal.reified().new({
      secret: decodeFromFields(reified.vector("u8"), fields.secret),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): EscrowWithdrawal {
    if (!isEscrowWithdrawal(item.type)) {
      throw new Error("not a EscrowWithdrawal type");
    }

    return EscrowWithdrawal.reified().new({
      secret: decodeFromFieldsWithTypes(
        reified.vector("u8"),
        item.fields.secret
      ),
    });
  }

  static fromBcs(data: Uint8Array): EscrowWithdrawal {
    return EscrowWithdrawal.fromFields(EscrowWithdrawal.bcs.parse(data));
  }

  toJSONField() {
    return {
      secret: fieldToJSON<Vector<"u8">>(`vector<u8>`, this.secret),
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): EscrowWithdrawal {
    return EscrowWithdrawal.reified().new({
      secret: decodeFromJSONField(reified.vector("u8"), field.secret),
    });
  }

  static fromJSON(json: Record<string, any>): EscrowWithdrawal {
    if (json.$typeName !== EscrowWithdrawal.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return EscrowWithdrawal.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): EscrowWithdrawal {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isEscrowWithdrawal(content.type)) {
      throw new Error(
        `object at ${
          (content.fields as any).id
        } is not a EscrowWithdrawal object`
      );
    }
    return EscrowWithdrawal.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): EscrowWithdrawal {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isEscrowWithdrawal(data.bcs.type)
      ) {
        throw new Error(`object at is not a EscrowWithdrawal object`);
      }

      return EscrowWithdrawal.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return EscrowWithdrawal.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<EscrowWithdrawal> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching EscrowWithdrawal object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isEscrowWithdrawal(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a EscrowWithdrawal object`);
    }

    return EscrowWithdrawal.fromSuiObjectData(res.data);
  }
}
