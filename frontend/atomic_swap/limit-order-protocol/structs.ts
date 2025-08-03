import { String } from "../../../../atomic_swap/_dependencies/onchain/0x1/string/structs";
import { Balance } from "../../../../atomic_swap/_dependencies/onchain/0x2/balance/structs";
import {
  ID,
  UID,
} from "../../../../atomic_swap/_dependencies/onchain/0x2/object/structs";
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
  phantom,
} from "../../../../atomic_swap/_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from "../../../../atomic_swap/_framework/util";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64, fromHEX, toHEX } from "@mysten/sui/utils";

/* ============================== AuctionWinner =============================== */

export function isAuctionWinner(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::limit_order_protocol::AuctionWinner`;
}

export interface AuctionWinnerFields {
  id: ToField<UID>;
  amount: ToField<"u256">;
  orderId: ToField<ID>;
}

export type AuctionWinnerReified = Reified<AuctionWinner, AuctionWinnerFields>;

export class AuctionWinner implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::limit_order_protocol::AuctionWinner`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = AuctionWinner.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::limit_order_protocol::AuctionWinner`;
  readonly $typeArgs: [];
  readonly $isPhantom = AuctionWinner.$isPhantom;

  readonly id: ToField<UID>;
  readonly amount: ToField<"u256">;
  readonly orderId: ToField<ID>;

  private constructor(typeArgs: [], fields: AuctionWinnerFields) {
    this.$fullTypeName = composeSuiType(
      AuctionWinner.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limit_order_protocol::AuctionWinner`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.amount = fields.amount;
    this.orderId = fields.orderId;
  }

  static reified(): AuctionWinnerReified {
    return {
      typeName: AuctionWinner.$typeName,
      fullTypeName: composeSuiType(
        AuctionWinner.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::limit_order_protocol::AuctionWinner`,
      typeArgs: [] as [],
      isPhantom: AuctionWinner.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        AuctionWinner.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        AuctionWinner.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => AuctionWinner.fromBcs(data),
      bcs: AuctionWinner.bcs,
      fromJSONField: (field: any) => AuctionWinner.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => AuctionWinner.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        AuctionWinner.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        AuctionWinner.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        AuctionWinner.fetch(client, id),
      new: (fields: AuctionWinnerFields) => {
        return new AuctionWinner([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return AuctionWinner.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<AuctionWinner>> {
    return phantom(AuctionWinner.reified());
  }
  static get p() {
    return AuctionWinner.phantom();
  }

  static get bcs() {
    return bcs.struct("AuctionWinner", {
      id: UID.bcs,
      amount: bcs.u256(),
      order_id: ID.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): AuctionWinner {
    return AuctionWinner.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      amount: decodeFromFields("u256", fields.amount),
      orderId: decodeFromFields(ID.reified(), fields.order_id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): AuctionWinner {
    if (!isAuctionWinner(item.type)) {
      throw new Error("not a AuctionWinner type");
    }

    return AuctionWinner.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      amount: decodeFromFieldsWithTypes("u256", item.fields.amount),
      orderId: decodeFromFieldsWithTypes(ID.reified(), item.fields.order_id),
    });
  }

  static fromBcs(data: Uint8Array): AuctionWinner {
    return AuctionWinner.fromFields(AuctionWinner.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      amount: this.amount.toString(),
      orderId: this.orderId,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): AuctionWinner {
    return AuctionWinner.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      amount: decodeFromJSONField("u256", field.amount),
      orderId: decodeFromJSONField(ID.reified(), field.orderId),
    });
  }

  static fromJSON(json: Record<string, any>): AuctionWinner {
    if (json.$typeName !== AuctionWinner.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return AuctionWinner.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): AuctionWinner {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isAuctionWinner(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a AuctionWinner object`
      );
    }
    return AuctionWinner.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): AuctionWinner {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isAuctionWinner(data.bcs.type)
      ) {
        throw new Error(`object at is not a AuctionWinner object`);
      }

      return AuctionWinner.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return AuctionWinner.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<AuctionWinner> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching AuctionWinner object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isAuctionWinner(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a AuctionWinner object`);
    }

    return AuctionWinner.fromSuiObjectData(res.data);
  }
}

/* ============================== MakerTraits =============================== */

export function isMakerTraits(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::limit_order_protocol::MakerTraits`;
}

export interface MakerTraitsFields {
  id: ToField<UID>;
}

export type MakerTraitsReified = Reified<MakerTraits, MakerTraitsFields>;

export class MakerTraits implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::limit_order_protocol::MakerTraits`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = MakerTraits.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::limit_order_protocol::MakerTraits`;
  readonly $typeArgs: [];
  readonly $isPhantom = MakerTraits.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: MakerTraitsFields) {
    this.$fullTypeName = composeSuiType(
      MakerTraits.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limit_order_protocol::MakerTraits`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): MakerTraitsReified {
    return {
      typeName: MakerTraits.$typeName,
      fullTypeName: composeSuiType(
        MakerTraits.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::limit_order_protocol::MakerTraits`,
      typeArgs: [] as [],
      isPhantom: MakerTraits.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        MakerTraits.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        MakerTraits.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => MakerTraits.fromBcs(data),
      bcs: MakerTraits.bcs,
      fromJSONField: (field: any) => MakerTraits.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => MakerTraits.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        MakerTraits.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        MakerTraits.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        MakerTraits.fetch(client, id),
      new: (fields: MakerTraitsFields) => {
        return new MakerTraits([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return MakerTraits.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<MakerTraits>> {
    return phantom(MakerTraits.reified());
  }
  static get p() {
    return MakerTraits.phantom();
  }

  static get bcs() {
    return bcs.struct("MakerTraits", {
      id: UID.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): MakerTraits {
    return MakerTraits.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): MakerTraits {
    if (!isMakerTraits(item.type)) {
      throw new Error("not a MakerTraits type");
    }

    return MakerTraits.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): MakerTraits {
    return MakerTraits.fromFields(MakerTraits.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): MakerTraits {
    return MakerTraits.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON(json: Record<string, any>): MakerTraits {
    if (json.$typeName !== MakerTraits.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return MakerTraits.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): MakerTraits {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMakerTraits(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a MakerTraits object`
      );
    }
    return MakerTraits.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): MakerTraits {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isMakerTraits(data.bcs.type)) {
        throw new Error(`object at is not a MakerTraits object`);
      }

      return MakerTraits.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MakerTraits.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<MakerTraits> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching MakerTraits object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isMakerTraits(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a MakerTraits object`);
    }

    return MakerTraits.fromSuiObjectData(res.data);
  }
}

/* ============================== Order =============================== */

export function isOrder(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${PKG_V1}::limit_order_protocol::Order` + "<");
}

export interface OrderFields<T0 extends PhantomTypeArgument> {
  id: ToField<UID>;
  salt: ToField<"u256">;
  maker: ToField<"address">;
  srcToken: ToField<Balance<T0>>;
  dstToken: ToField<String>;
  srcAmount: ToField<"u256">;
  dstAmount: ToField<"u256">;
  makerTraits: ToField<MakerTraits>;
}

export type OrderReified<T0 extends PhantomTypeArgument> = Reified<
  Order<T0>,
  OrderFields<T0>
>;

export class Order<T0 extends PhantomTypeArgument> implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::limit_order_protocol::Order`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = Order.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::limit_order_protocol::Order<${PhantomToTypeStr<T0>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T0>];
  readonly $isPhantom = Order.$isPhantom;

  readonly id: ToField<UID>;
  readonly salt: ToField<"u256">;
  readonly maker: ToField<"address">;
  readonly srcToken: ToField<Balance<T0>>;
  readonly dstToken: ToField<String>;
  readonly srcAmount: ToField<"u256">;
  readonly dstAmount: ToField<"u256">;
  readonly makerTraits: ToField<MakerTraits>;

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>],
    fields: OrderFields<T0>
  ) {
    this.$fullTypeName = composeSuiType(
      Order.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limit_order_protocol::Order<${PhantomToTypeStr<T0>}>`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.salt = fields.salt;
    this.maker = fields.maker;
    this.srcToken = fields.srcToken;
    this.dstToken = fields.dstToken;
    this.srcAmount = fields.srcAmount;
    this.dstAmount = fields.dstAmount;
    this.makerTraits = fields.makerTraits;
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): OrderReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: Order.$typeName,
      fullTypeName: composeSuiType(
        Order.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::limit_order_protocol::Order<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>
      ],
      isPhantom: Order.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) => Order.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        Order.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => Order.fromBcs(T0, data),
      bcs: Order.bcs,
      fromJSONField: (field: any) => Order.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => Order.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        Order.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        Order.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) =>
        Order.fetch(client, T0, id),
      new: (fields: OrderFields<ToPhantomTypeArgument<T0>>) => {
        return new Order([extractType(T0)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return Order.reified;
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<Order<ToPhantomTypeArgument<T0>>>> {
    return phantom(Order.reified(T0));
  }
  static get p() {
    return Order.phantom;
  }

  static get bcs() {
    return bcs.struct("Order", {
      id: UID.bcs,
      salt: bcs.u256(),
      maker: bcs
        .bytes(32)
        .transform({
          input: (val: string) => fromHEX(val),
          output: (val: Uint8Array) => toHEX(val),
        }),
      src_token: Balance.bcs,
      dst_token: String.bcs,
      src_amount: bcs.u256(),
      dst_amount: bcs.u256(),
      maker_traits: MakerTraits.bcs,
    });
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): Order<ToPhantomTypeArgument<T0>> {
    return Order.reified(typeArg).new({
      id: decodeFromFields(UID.reified(), fields.id),
      salt: decodeFromFields("u256", fields.salt),
      maker: decodeFromFields("address", fields.maker),
      srcToken: decodeFromFields(Balance.reified(typeArg), fields.src_token),
      dstToken: decodeFromFields(String.reified(), fields.dst_token),
      srcAmount: decodeFromFields("u256", fields.src_amount),
      dstAmount: decodeFromFields("u256", fields.dst_amount),
      makerTraits: decodeFromFields(MakerTraits.reified(), fields.maker_traits),
    });
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): Order<ToPhantomTypeArgument<T0>> {
    if (!isOrder(item.type)) {
      throw new Error("not a Order type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return Order.reified(typeArg).new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      salt: decodeFromFieldsWithTypes("u256", item.fields.salt),
      maker: decodeFromFieldsWithTypes("address", item.fields.maker),
      srcToken: decodeFromFieldsWithTypes(
        Balance.reified(typeArg),
        item.fields.src_token
      ),
      dstToken: decodeFromFieldsWithTypes(
        String.reified(),
        item.fields.dst_token
      ),
      srcAmount: decodeFromFieldsWithTypes("u256", item.fields.src_amount),
      dstAmount: decodeFromFieldsWithTypes("u256", item.fields.dst_amount),
      makerTraits: decodeFromFieldsWithTypes(
        MakerTraits.reified(),
        item.fields.maker_traits
      ),
    });
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): Order<ToPhantomTypeArgument<T0>> {
    return Order.fromFields(typeArg, Order.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      salt: this.salt.toString(),
      maker: this.maker,
      srcToken: this.srcToken.toJSONField(),
      dstToken: this.dstToken,
      srcAmount: this.srcAmount.toString(),
      dstAmount: this.dstAmount.toString(),
      makerTraits: this.makerTraits.toJSONField(),
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
  ): Order<ToPhantomTypeArgument<T0>> {
    return Order.reified(typeArg).new({
      id: decodeFromJSONField(UID.reified(), field.id),
      salt: decodeFromJSONField("u256", field.salt),
      maker: decodeFromJSONField("address", field.maker),
      srcToken: decodeFromJSONField(Balance.reified(typeArg), field.srcToken),
      dstToken: decodeFromJSONField(String.reified(), field.dstToken),
      srcAmount: decodeFromJSONField("u256", field.srcAmount),
      dstAmount: decodeFromJSONField("u256", field.dstAmount),
      makerTraits: decodeFromJSONField(
        MakerTraits.reified(),
        field.makerTraits
      ),
    });
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): Order<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== Order.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(Order.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    );

    return Order.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): Order<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isOrder(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a Order object`
      );
    }
    return Order.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): Order<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isOrder(data.bcs.type)) {
        throw new Error(`object at is not a Order object`);
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

      return Order.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return Order.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<Order<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching Order object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isOrder(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a Order object`);
    }

    return Order.fromSuiObjectData(typeArg, res.data);
  }
}

/* ============================== OrderCap =============================== */

export function isOrderCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::limit_order_protocol::OrderCap`;
}

export interface OrderCapFields {
  id: ToField<UID>;
  orderId: ToField<ID>;
}

export type OrderCapReified = Reified<OrderCap, OrderCapFields>;

export class OrderCap implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::limit_order_protocol::OrderCap`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = OrderCap.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::limit_order_protocol::OrderCap`;
  readonly $typeArgs: [];
  readonly $isPhantom = OrderCap.$isPhantom;

  readonly id: ToField<UID>;
  readonly orderId: ToField<ID>;

  private constructor(typeArgs: [], fields: OrderCapFields) {
    this.$fullTypeName = composeSuiType(
      OrderCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limit_order_protocol::OrderCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
    this.orderId = fields.orderId;
  }

  static reified(): OrderCapReified {
    return {
      typeName: OrderCap.$typeName,
      fullTypeName: composeSuiType(
        OrderCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::limit_order_protocol::OrderCap`,
      typeArgs: [] as [],
      isPhantom: OrderCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) => OrderCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        OrderCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => OrderCap.fromBcs(data),
      bcs: OrderCap.bcs,
      fromJSONField: (field: any) => OrderCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => OrderCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        OrderCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        OrderCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        OrderCap.fetch(client, id),
      new: (fields: OrderCapFields) => {
        return new OrderCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return OrderCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<OrderCap>> {
    return phantom(OrderCap.reified());
  }
  static get p() {
    return OrderCap.phantom();
  }

  static get bcs() {
    return bcs.struct("OrderCap", {
      id: UID.bcs,
      order_id: ID.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): OrderCap {
    return OrderCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
      orderId: decodeFromFields(ID.reified(), fields.order_id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): OrderCap {
    if (!isOrderCap(item.type)) {
      throw new Error("not a OrderCap type");
    }

    return OrderCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
      orderId: decodeFromFieldsWithTypes(ID.reified(), item.fields.order_id),
    });
  }

  static fromBcs(data: Uint8Array): OrderCap {
    return OrderCap.fromFields(OrderCap.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
      orderId: this.orderId,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): OrderCap {
    return OrderCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
      orderId: decodeFromJSONField(ID.reified(), field.orderId),
    });
  }

  static fromJSON(json: Record<string, any>): OrderCap {
    if (json.$typeName !== OrderCap.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return OrderCap.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): OrderCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isOrderCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a OrderCap object`
      );
    }
    return OrderCap.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): OrderCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isOrderCap(data.bcs.type)) {
        throw new Error(`object at is not a OrderCap object`);
      }

      return OrderCap.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return OrderCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<OrderCap> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching OrderCap object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isOrderCap(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a OrderCap object`);
    }

    return OrderCap.fromSuiObjectData(res.data);
  }
}

/* ============================== ProtocolCap =============================== */

export function isProtocolCap(type: string): boolean {
  type = compressSuiType(type);
  return type === `${PKG_V1}::limit_order_protocol::ProtocolCap`;
}

export interface ProtocolCapFields {
  id: ToField<UID>;
}

export type ProtocolCapReified = Reified<ProtocolCap, ProtocolCapFields>;

export class ProtocolCap implements StructClass {
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::limit_order_protocol::ProtocolCap`;
  static readonly $numTypeParams = 0;
  static readonly $isPhantom = [] as const;

  readonly $typeName = ProtocolCap.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::limit_order_protocol::ProtocolCap`;
  readonly $typeArgs: [];
  readonly $isPhantom = ProtocolCap.$isPhantom;

  readonly id: ToField<UID>;

  private constructor(typeArgs: [], fields: ProtocolCapFields) {
    this.$fullTypeName = composeSuiType(
      ProtocolCap.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::limit_order_protocol::ProtocolCap`;
    this.$typeArgs = typeArgs;

    this.id = fields.id;
  }

  static reified(): ProtocolCapReified {
    return {
      typeName: ProtocolCap.$typeName,
      fullTypeName: composeSuiType(
        ProtocolCap.$typeName,
        ...[]
      ) as `${typeof PKG_V1}::limit_order_protocol::ProtocolCap`,
      typeArgs: [] as [],
      isPhantom: ProtocolCap.$isPhantom,
      reifiedTypeArgs: [],
      fromFields: (fields: Record<string, any>) =>
        ProtocolCap.fromFields(fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        ProtocolCap.fromFieldsWithTypes(item),
      fromBcs: (data: Uint8Array) => ProtocolCap.fromBcs(data),
      bcs: ProtocolCap.bcs,
      fromJSONField: (field: any) => ProtocolCap.fromJSONField(field),
      fromJSON: (json: Record<string, any>) => ProtocolCap.fromJSON(json),
      fromSuiParsedData: (content: SuiParsedData) =>
        ProtocolCap.fromSuiParsedData(content),
      fromSuiObjectData: (content: SuiObjectData) =>
        ProtocolCap.fromSuiObjectData(content),
      fetch: async (client: SuiClient, id: string) =>
        ProtocolCap.fetch(client, id),
      new: (fields: ProtocolCapFields) => {
        return new ProtocolCap([], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return ProtocolCap.reified();
  }

  static phantom(): PhantomReified<ToTypeStr<ProtocolCap>> {
    return phantom(ProtocolCap.reified());
  }
  static get p() {
    return ProtocolCap.phantom();
  }

  static get bcs() {
    return bcs.struct("ProtocolCap", {
      id: UID.bcs,
    });
  }

  static fromFields(fields: Record<string, any>): ProtocolCap {
    return ProtocolCap.reified().new({
      id: decodeFromFields(UID.reified(), fields.id),
    });
  }

  static fromFieldsWithTypes(item: FieldsWithTypes): ProtocolCap {
    if (!isProtocolCap(item.type)) {
      throw new Error("not a ProtocolCap type");
    }

    return ProtocolCap.reified().new({
      id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id),
    });
  }

  static fromBcs(data: Uint8Array): ProtocolCap {
    return ProtocolCap.fromFields(ProtocolCap.bcs.parse(data));
  }

  toJSONField() {
    return {
      id: this.id,
    };
  }

  toJSON() {
    return {
      $typeName: this.$typeName,
      $typeArgs: this.$typeArgs,
      ...this.toJSONField(),
    };
  }

  static fromJSONField(field: any): ProtocolCap {
    return ProtocolCap.reified().new({
      id: decodeFromJSONField(UID.reified(), field.id),
    });
  }

  static fromJSON(json: Record<string, any>): ProtocolCap {
    if (json.$typeName !== ProtocolCap.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }

    return ProtocolCap.fromJSONField(json);
  }

  static fromSuiParsedData(content: SuiParsedData): ProtocolCap {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isProtocolCap(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a ProtocolCap object`
      );
    }
    return ProtocolCap.fromFieldsWithTypes(content);
  }

  static fromSuiObjectData(data: SuiObjectData): ProtocolCap {
    if (data.bcs) {
      if (data.bcs.dataType !== "moveObject" || !isProtocolCap(data.bcs.type)) {
        throw new Error(`object at is not a ProtocolCap object`);
      }

      return ProtocolCap.fromBcs(fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return ProtocolCap.fromSuiParsedData(data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch(client: SuiClient, id: string): Promise<ProtocolCap> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching ProtocolCap object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isProtocolCap(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a ProtocolCap object`);
    }

    return ProtocolCap.fromSuiObjectData(res.data);
  }
}
