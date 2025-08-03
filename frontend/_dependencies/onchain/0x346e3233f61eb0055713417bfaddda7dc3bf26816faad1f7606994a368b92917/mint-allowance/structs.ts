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
} from "../../../../_framework/reified";
import {
  FieldsWithTypes,
  composeSuiType,
  compressSuiType,
  parseTypeName,
} from "../../../../_framework/util";
import { PKG_V1 } from "../index";
import { bcs } from "@mysten/sui/bcs";
import { SuiClient, SuiObjectData, SuiParsedData } from "@mysten/sui/client";
import { fromB64 } from "@mysten/sui/utils";

/* ============================== MintAllowance =============================== */

export function isMintAllowance(type: string): boolean {
  type = compressSuiType(type);
  return type.startsWith(`${PKG_V1}::mint_allowance::MintAllowance` + "<");
}

export interface MintAllowanceFields<T0 extends PhantomTypeArgument> {
  value: ToField<"u64">;
}

export type MintAllowanceReified<T0 extends PhantomTypeArgument> = Reified<
  MintAllowance<T0>,
  MintAllowanceFields<T0>
>;

export class MintAllowance<T0 extends PhantomTypeArgument>
  implements StructClass
{
  __StructClass = true as const;

  static readonly $typeName = `${PKG_V1}::mint_allowance::MintAllowance`;
  static readonly $numTypeParams = 1;
  static readonly $isPhantom = [true] as const;

  readonly $typeName = MintAllowance.$typeName;
  readonly $fullTypeName: `${typeof PKG_V1}::mint_allowance::MintAllowance<${PhantomToTypeStr<T0>}>`;
  readonly $typeArgs: [PhantomToTypeStr<T0>];
  readonly $isPhantom = MintAllowance.$isPhantom;

  readonly value: ToField<"u64">;

  private constructor(
    typeArgs: [PhantomToTypeStr<T0>],
    fields: MintAllowanceFields<T0>
  ) {
    this.$fullTypeName = composeSuiType(
      MintAllowance.$typeName,
      ...typeArgs
    ) as `${typeof PKG_V1}::mint_allowance::MintAllowance<${PhantomToTypeStr<T0>}>`;
    this.$typeArgs = typeArgs;

    this.value = fields.value;
  }

  static reified<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): MintAllowanceReified<ToPhantomTypeArgument<T0>> {
    return {
      typeName: MintAllowance.$typeName,
      fullTypeName: composeSuiType(
        MintAllowance.$typeName,
        ...[extractType(T0)]
      ) as `${typeof PKG_V1}::mint_allowance::MintAllowance<${PhantomToTypeStr<
        ToPhantomTypeArgument<T0>
      >}>`,
      typeArgs: [extractType(T0)] as [
        PhantomToTypeStr<ToPhantomTypeArgument<T0>>
      ],
      isPhantom: MintAllowance.$isPhantom,
      reifiedTypeArgs: [T0],
      fromFields: (fields: Record<string, any>) =>
        MintAllowance.fromFields(T0, fields),
      fromFieldsWithTypes: (item: FieldsWithTypes) =>
        MintAllowance.fromFieldsWithTypes(T0, item),
      fromBcs: (data: Uint8Array) => MintAllowance.fromBcs(T0, data),
      bcs: MintAllowance.bcs,
      fromJSONField: (field: any) => MintAllowance.fromJSONField(T0, field),
      fromJSON: (json: Record<string, any>) => MintAllowance.fromJSON(T0, json),
      fromSuiParsedData: (content: SuiParsedData) =>
        MintAllowance.fromSuiParsedData(T0, content),
      fromSuiObjectData: (content: SuiObjectData) =>
        MintAllowance.fromSuiObjectData(T0, content),
      fetch: async (client: SuiClient, id: string) =>
        MintAllowance.fetch(client, T0, id),
      new: (fields: MintAllowanceFields<ToPhantomTypeArgument<T0>>) => {
        return new MintAllowance([extractType(T0)], fields);
      },
      kind: "StructClassReified",
    };
  }

  static get r() {
    return MintAllowance.reified;
  }

  static phantom<T0 extends PhantomReified<PhantomTypeArgument>>(
    T0: T0
  ): PhantomReified<ToTypeStr<MintAllowance<ToPhantomTypeArgument<T0>>>> {
    return phantom(MintAllowance.reified(T0));
  }
  static get p() {
    return MintAllowance.phantom;
  }

  static get bcs() {
    return bcs.struct("MintAllowance", {
      value: bcs.u64(),
    });
  }

  static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    fields: Record<string, any>
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    return MintAllowance.reified(typeArg).new({
      value: decodeFromFields("u64", fields.value),
    });
  }

  static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    item: FieldsWithTypes
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    if (!isMintAllowance(item.type)) {
      throw new Error("not a MintAllowance type");
    }
    assertFieldsWithTypesArgsMatch(item, [typeArg]);

    return MintAllowance.reified(typeArg).new({
      value: decodeFromFieldsWithTypes("u64", item.fields.value),
    });
  }

  static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: Uint8Array
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    return MintAllowance.fromFields(typeArg, MintAllowance.bcs.parse(data));
  }

  toJSONField() {
    return {
      value: this.value.toString(),
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
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    return MintAllowance.reified(typeArg).new({
      value: decodeFromJSONField("u64", field.value),
    });
  }

  static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    json: Record<string, any>
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    if (json.$typeName !== MintAllowance.$typeName) {
      throw new Error("not a WithTwoGenerics json object");
    }
    assertReifiedTypeArgsMatch(
      composeSuiType(MintAllowance.$typeName, extractType(typeArg)),
      json.$typeArgs,
      [typeArg]
    );

    return MintAllowance.fromJSONField(typeArg, json);
  }

  static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    content: SuiParsedData
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    if (content.dataType !== "moveObject") {
      throw new Error("not an object");
    }
    if (!isMintAllowance(content.type)) {
      throw new Error(
        `object at ${(content.fields as any).id} is not a MintAllowance object`
      );
    }
    return MintAllowance.fromFieldsWithTypes(typeArg, content);
  }

  static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>(
    typeArg: T0,
    data: SuiObjectData
  ): MintAllowance<ToPhantomTypeArgument<T0>> {
    if (data.bcs) {
      if (
        data.bcs.dataType !== "moveObject" ||
        !isMintAllowance(data.bcs.type)
      ) {
        throw new Error(`object at is not a MintAllowance object`);
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

      return MintAllowance.fromBcs(typeArg, fromB64(data.bcs.bcsBytes));
    }
    if (data.content) {
      return MintAllowance.fromSuiParsedData(typeArg, data.content);
    }
    throw new Error(
      "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request."
    );
  }

  static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>(
    client: SuiClient,
    typeArg: T0,
    id: string
  ): Promise<MintAllowance<ToPhantomTypeArgument<T0>>> {
    const res = await client.getObject({ id, options: { showBcs: true } });
    if (res.error) {
      throw new Error(
        `error fetching MintAllowance object at id ${id}: ${res.error.code}`
      );
    }
    if (
      res.data?.bcs?.dataType !== "moveObject" ||
      !isMintAllowance(res.data.bcs.type)
    ) {
      throw new Error(`object at id ${id} is not a MintAllowance object`);
    }

    return MintAllowance.fromSuiObjectData(typeArg, res.data);
  }
}
