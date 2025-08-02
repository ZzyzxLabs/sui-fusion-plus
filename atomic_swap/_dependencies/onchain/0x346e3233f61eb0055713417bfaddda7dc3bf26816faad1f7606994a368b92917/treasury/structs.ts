import * as reified from "../../../../_framework/reified";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, ToTypeStr as ToPhantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Vector} from "../../../../_framework/vector";
import {String as String1} from "../../0x1/ascii/structs";
import {String} from "../../0x1/string/structs";
import {ID, UID} from "../../0x2/object/structs";
import {Table} from "../../0x2/table/structs";
import {VecSet} from "../../0x2/vec-set/structs";
import {PKG_V1} from "../index";
import {MintAllowance} from "../mint-allowance/structs";
import {Roles} from "../roles/structs";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== Blocklisted =============================== */

export function isBlocklisted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Blocklisted` + '<'); }

export interface BlocklistedFields<T0 extends PhantomTypeArgument> { address: ToField<"address"> }

export type BlocklistedReified<T0 extends PhantomTypeArgument> = Reified< Blocklisted<T0>, BlocklistedFields<T0> >;

export class Blocklisted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Blocklisted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Blocklisted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Blocklisted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Blocklisted.$isPhantom;

 readonly address: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BlocklistedFields<T0>, ) { this.$fullTypeName = composeSuiType( Blocklisted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Blocklisted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.address = fields.address; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): BlocklistedReified<ToPhantomTypeArgument<T0>> { return { typeName: Blocklisted.$typeName, fullTypeName: composeSuiType( Blocklisted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Blocklisted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Blocklisted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Blocklisted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Blocklisted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Blocklisted.fromBcs( T0, data, ), bcs: Blocklisted.bcs, fromJSONField: (field: any) => Blocklisted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Blocklisted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Blocklisted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Blocklisted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Blocklisted.fetch( client, T0, id, ), new: ( fields: BlocklistedFields<ToPhantomTypeArgument<T0>>, ) => { return new Blocklisted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Blocklisted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Blocklisted<ToPhantomTypeArgument<T0>>>> { return phantom(Blocklisted.reified( T0 )); } static get p() { return Blocklisted.phantom }

 static get bcs() { return bcs.struct("Blocklisted", {

 address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Blocklisted<ToPhantomTypeArgument<T0>> { return Blocklisted.reified( typeArg, ).new( { address: decodeFromFields("address", fields.address) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Blocklisted<ToPhantomTypeArgument<T0>> { if (!isBlocklisted(item.type)) { throw new Error("not a Blocklisted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Blocklisted.reified( typeArg, ).new( { address: decodeFromFieldsWithTypes("address", item.fields.address) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Blocklisted<ToPhantomTypeArgument<T0>> { return Blocklisted.fromFields( typeArg, Blocklisted.bcs.parse(data) ) }

 toJSONField() { return {

 address: this.address,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Blocklisted<ToPhantomTypeArgument<T0>> { return Blocklisted.reified( typeArg, ).new( { address: decodeFromJSONField("address", field.address) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Blocklisted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Blocklisted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Blocklisted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Blocklisted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Blocklisted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBlocklisted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Blocklisted object`); } return Blocklisted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Blocklisted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBlocklisted(data.bcs.type)) { throw new Error(`object at is not a Blocklisted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Blocklisted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Blocklisted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Blocklisted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Blocklisted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBlocklisted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Blocklisted object`); }

 return Blocklisted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Burn =============================== */

export function isBurn(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Burn` + '<'); }

export interface BurnFields<T0 extends PhantomTypeArgument> { mintCap: ToField<ID>; amount: ToField<"u64"> }

export type BurnReified<T0 extends PhantomTypeArgument> = Reified< Burn<T0>, BurnFields<T0> >;

export class Burn<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Burn`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Burn.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Burn<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Burn.$isPhantom;

 readonly mintCap: ToField<ID>; readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BurnFields<T0>, ) { this.$fullTypeName = composeSuiType( Burn.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Burn<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.mintCap = fields.mintCap;; this.amount = fields.amount; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): BurnReified<ToPhantomTypeArgument<T0>> { return { typeName: Burn.$typeName, fullTypeName: composeSuiType( Burn.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Burn<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Burn.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Burn.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Burn.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Burn.fromBcs( T0, data, ), bcs: Burn.bcs, fromJSONField: (field: any) => Burn.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Burn.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Burn.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Burn.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Burn.fetch( client, T0, id, ), new: ( fields: BurnFields<ToPhantomTypeArgument<T0>>, ) => { return new Burn( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Burn.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Burn<ToPhantomTypeArgument<T0>>>> { return phantom(Burn.reified( T0 )); } static get p() { return Burn.phantom }

 static get bcs() { return bcs.struct("Burn", {

 mint_cap: ID.bcs, amount: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Burn<ToPhantomTypeArgument<T0>> { return Burn.reified( typeArg, ).new( { mintCap: decodeFromFields(ID.reified(), fields.mint_cap), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Burn<ToPhantomTypeArgument<T0>> { if (!isBurn(item.type)) { throw new Error("not a Burn type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Burn.reified( typeArg, ).new( { mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Burn<ToPhantomTypeArgument<T0>> { return Burn.fromFields( typeArg, Burn.bcs.parse(data) ) }

 toJSONField() { return {

 mintCap: this.mintCap,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Burn<ToPhantomTypeArgument<T0>> { return Burn.reified( typeArg, ).new( { mintCap: decodeFromJSONField(ID.reified(), field.mintCap), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Burn<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Burn.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Burn.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Burn.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Burn<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBurn(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Burn object`); } return Burn.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Burn<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBurn(data.bcs.type)) { throw new Error(`object at is not a Burn object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Burn.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Burn.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Burn<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Burn object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBurn(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Burn object`); }

 return Burn.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== ControllerConfigured =============================== */

export function isControllerConfigured(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::ControllerConfigured` + '<'); }

export interface ControllerConfiguredFields<T0 extends PhantomTypeArgument> { controller: ToField<"address">; mintCap: ToField<ID> }

export type ControllerConfiguredReified<T0 extends PhantomTypeArgument> = Reified< ControllerConfigured<T0>, ControllerConfiguredFields<T0> >;

export class ControllerConfigured<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::ControllerConfigured`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = ControllerConfigured.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::ControllerConfigured<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = ControllerConfigured.$isPhantom;

 readonly controller: ToField<"address">; readonly mintCap: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ControllerConfiguredFields<T0>, ) { this.$fullTypeName = composeSuiType( ControllerConfigured.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::ControllerConfigured<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.controller = fields.controller;; this.mintCap = fields.mintCap; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): ControllerConfiguredReified<ToPhantomTypeArgument<T0>> { return { typeName: ControllerConfigured.$typeName, fullTypeName: composeSuiType( ControllerConfigured.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::ControllerConfigured<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: ControllerConfigured.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ControllerConfigured.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ControllerConfigured.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ControllerConfigured.fromBcs( T0, data, ), bcs: ControllerConfigured.bcs, fromJSONField: (field: any) => ControllerConfigured.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ControllerConfigured.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ControllerConfigured.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ControllerConfigured.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ControllerConfigured.fetch( client, T0, id, ), new: ( fields: ControllerConfiguredFields<ToPhantomTypeArgument<T0>>, ) => { return new ControllerConfigured( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ControllerConfigured.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<ControllerConfigured<ToPhantomTypeArgument<T0>>>> { return phantom(ControllerConfigured.reified( T0 )); } static get p() { return ControllerConfigured.phantom }

 static get bcs() { return bcs.struct("ControllerConfigured", {

 controller: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mint_cap: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): ControllerConfigured<ToPhantomTypeArgument<T0>> { return ControllerConfigured.reified( typeArg, ).new( { controller: decodeFromFields("address", fields.controller), mintCap: decodeFromFields(ID.reified(), fields.mint_cap) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): ControllerConfigured<ToPhantomTypeArgument<T0>> { if (!isControllerConfigured(item.type)) { throw new Error("not a ControllerConfigured type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ControllerConfigured.reified( typeArg, ).new( { controller: decodeFromFieldsWithTypes("address", item.fields.controller), mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): ControllerConfigured<ToPhantomTypeArgument<T0>> { return ControllerConfigured.fromFields( typeArg, ControllerConfigured.bcs.parse(data) ) }

 toJSONField() { return {

 controller: this.controller,mintCap: this.mintCap,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): ControllerConfigured<ToPhantomTypeArgument<T0>> { return ControllerConfigured.reified( typeArg, ).new( { controller: decodeFromJSONField("address", field.controller), mintCap: decodeFromJSONField(ID.reified(), field.mintCap) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): ControllerConfigured<ToPhantomTypeArgument<T0>> { if (json.$typeName !== ControllerConfigured.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ControllerConfigured.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ControllerConfigured.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): ControllerConfigured<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isControllerConfigured(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ControllerConfigured object`); } return ControllerConfigured.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): ControllerConfigured<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isControllerConfigured(data.bcs.type)) { throw new Error(`object at is not a ControllerConfigured object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ControllerConfigured.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ControllerConfigured.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<ControllerConfigured<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ControllerConfigured object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isControllerConfigured(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ControllerConfigured object`); }

 return ControllerConfigured.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== ControllerRemoved =============================== */

export function isControllerRemoved(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::ControllerRemoved` + '<'); }

export interface ControllerRemovedFields<T0 extends PhantomTypeArgument> { controller: ToField<"address"> }

export type ControllerRemovedReified<T0 extends PhantomTypeArgument> = Reified< ControllerRemoved<T0>, ControllerRemovedFields<T0> >;

export class ControllerRemoved<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::ControllerRemoved`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = ControllerRemoved.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::ControllerRemoved<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = ControllerRemoved.$isPhantom;

 readonly controller: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: ControllerRemovedFields<T0>, ) { this.$fullTypeName = composeSuiType( ControllerRemoved.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::ControllerRemoved<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.controller = fields.controller; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): ControllerRemovedReified<ToPhantomTypeArgument<T0>> { return { typeName: ControllerRemoved.$typeName, fullTypeName: composeSuiType( ControllerRemoved.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::ControllerRemoved<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: ControllerRemoved.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => ControllerRemoved.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => ControllerRemoved.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => ControllerRemoved.fromBcs( T0, data, ), bcs: ControllerRemoved.bcs, fromJSONField: (field: any) => ControllerRemoved.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => ControllerRemoved.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => ControllerRemoved.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => ControllerRemoved.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => ControllerRemoved.fetch( client, T0, id, ), new: ( fields: ControllerRemovedFields<ToPhantomTypeArgument<T0>>, ) => { return new ControllerRemoved( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return ControllerRemoved.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<ControllerRemoved<ToPhantomTypeArgument<T0>>>> { return phantom(ControllerRemoved.reified( T0 )); } static get p() { return ControllerRemoved.phantom }

 static get bcs() { return bcs.struct("ControllerRemoved", {

 controller: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): ControllerRemoved<ToPhantomTypeArgument<T0>> { return ControllerRemoved.reified( typeArg, ).new( { controller: decodeFromFields("address", fields.controller) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): ControllerRemoved<ToPhantomTypeArgument<T0>> { if (!isControllerRemoved(item.type)) { throw new Error("not a ControllerRemoved type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return ControllerRemoved.reified( typeArg, ).new( { controller: decodeFromFieldsWithTypes("address", item.fields.controller) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): ControllerRemoved<ToPhantomTypeArgument<T0>> { return ControllerRemoved.fromFields( typeArg, ControllerRemoved.bcs.parse(data) ) }

 toJSONField() { return {

 controller: this.controller,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): ControllerRemoved<ToPhantomTypeArgument<T0>> { return ControllerRemoved.reified( typeArg, ).new( { controller: decodeFromJSONField("address", field.controller) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): ControllerRemoved<ToPhantomTypeArgument<T0>> { if (json.$typeName !== ControllerRemoved.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(ControllerRemoved.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return ControllerRemoved.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): ControllerRemoved<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isControllerRemoved(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a ControllerRemoved object`); } return ControllerRemoved.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): ControllerRemoved<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isControllerRemoved(data.bcs.type)) { throw new Error(`object at is not a ControllerRemoved object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return ControllerRemoved.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return ControllerRemoved.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<ControllerRemoved<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching ControllerRemoved object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isControllerRemoved(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a ControllerRemoved object`); }

 return ControllerRemoved.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== DenyCapKey =============================== */

export function isDenyCapKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::DenyCapKey`; }

export interface DenyCapKeyFields { dummyField: ToField<"bool"> }

export type DenyCapKeyReified = Reified< DenyCapKey, DenyCapKeyFields >;

export class DenyCapKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::DenyCapKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = DenyCapKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::DenyCapKey`; readonly $typeArgs: []; readonly $isPhantom = DenyCapKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: DenyCapKeyFields, ) { this.$fullTypeName = composeSuiType( DenyCapKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::DenyCapKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): DenyCapKeyReified { return { typeName: DenyCapKey.$typeName, fullTypeName: composeSuiType( DenyCapKey.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::DenyCapKey`, typeArgs: [ ] as [], isPhantom: DenyCapKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => DenyCapKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => DenyCapKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => DenyCapKey.fromBcs( data, ), bcs: DenyCapKey.bcs, fromJSONField: (field: any) => DenyCapKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => DenyCapKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => DenyCapKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => DenyCapKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => DenyCapKey.fetch( client, id, ), new: ( fields: DenyCapKeyFields, ) => { return new DenyCapKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return DenyCapKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<DenyCapKey>> { return phantom(DenyCapKey.reified( )); } static get p() { return DenyCapKey.phantom() }

 static get bcs() { return bcs.struct("DenyCapKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): DenyCapKey { return DenyCapKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): DenyCapKey { if (!isDenyCapKey(item.type)) { throw new Error("not a DenyCapKey type");

 }

 return DenyCapKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): DenyCapKey { return DenyCapKey.fromFields( DenyCapKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): DenyCapKey { return DenyCapKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): DenyCapKey { if (json.$typeName !== DenyCapKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return DenyCapKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): DenyCapKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isDenyCapKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a DenyCapKey object`); } return DenyCapKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): DenyCapKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isDenyCapKey(data.bcs.type)) { throw new Error(`object at is not a DenyCapKey object`); }

 return DenyCapKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return DenyCapKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<DenyCapKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching DenyCapKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isDenyCapKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a DenyCapKey object`); }

 return DenyCapKey.fromSuiObjectData( res.data ); }

 }

/* ============================== MetadataUpdated =============================== */

export function isMetadataUpdated(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MetadataUpdated` + '<'); }

export interface MetadataUpdatedFields<T0 extends PhantomTypeArgument> { name: ToField<String>; symbol: ToField<String1>; description: ToField<String>; iconUrl: ToField<String1> }

export type MetadataUpdatedReified<T0 extends PhantomTypeArgument> = Reified< MetadataUpdated<T0>, MetadataUpdatedFields<T0> >;

export class MetadataUpdated<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MetadataUpdated`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MetadataUpdated.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MetadataUpdated<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MetadataUpdated.$isPhantom;

 readonly name: ToField<String>; readonly symbol: ToField<String1>; readonly description: ToField<String>; readonly iconUrl: ToField<String1>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MetadataUpdatedFields<T0>, ) { this.$fullTypeName = composeSuiType( MetadataUpdated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MetadataUpdated<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.name = fields.name;; this.symbol = fields.symbol;; this.description = fields.description;; this.iconUrl = fields.iconUrl; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MetadataUpdatedReified<ToPhantomTypeArgument<T0>> { return { typeName: MetadataUpdated.$typeName, fullTypeName: composeSuiType( MetadataUpdated.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MetadataUpdated<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MetadataUpdated.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MetadataUpdated.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MetadataUpdated.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MetadataUpdated.fromBcs( T0, data, ), bcs: MetadataUpdated.bcs, fromJSONField: (field: any) => MetadataUpdated.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MetadataUpdated.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MetadataUpdated.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MetadataUpdated.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MetadataUpdated.fetch( client, T0, id, ), new: ( fields: MetadataUpdatedFields<ToPhantomTypeArgument<T0>>, ) => { return new MetadataUpdated( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MetadataUpdated.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MetadataUpdated<ToPhantomTypeArgument<T0>>>> { return phantom(MetadataUpdated.reified( T0 )); } static get p() { return MetadataUpdated.phantom }

 static get bcs() { return bcs.struct("MetadataUpdated", {

 name: String.bcs, symbol: String1.bcs, description: String.bcs, icon_url: String1.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MetadataUpdated<ToPhantomTypeArgument<T0>> { return MetadataUpdated.reified( typeArg, ).new( { name: decodeFromFields(String.reified(), fields.name), symbol: decodeFromFields(String1.reified(), fields.symbol), description: decodeFromFields(String.reified(), fields.description), iconUrl: decodeFromFields(String1.reified(), fields.icon_url) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MetadataUpdated<ToPhantomTypeArgument<T0>> { if (!isMetadataUpdated(item.type)) { throw new Error("not a MetadataUpdated type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MetadataUpdated.reified( typeArg, ).new( { name: decodeFromFieldsWithTypes(String.reified(), item.fields.name), symbol: decodeFromFieldsWithTypes(String1.reified(), item.fields.symbol), description: decodeFromFieldsWithTypes(String.reified(), item.fields.description), iconUrl: decodeFromFieldsWithTypes(String1.reified(), item.fields.icon_url) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MetadataUpdated<ToPhantomTypeArgument<T0>> { return MetadataUpdated.fromFields( typeArg, MetadataUpdated.bcs.parse(data) ) }

 toJSONField() { return {

 name: this.name,symbol: this.symbol,description: this.description,iconUrl: this.iconUrl,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MetadataUpdated<ToPhantomTypeArgument<T0>> { return MetadataUpdated.reified( typeArg, ).new( { name: decodeFromJSONField(String.reified(), field.name), symbol: decodeFromJSONField(String1.reified(), field.symbol), description: decodeFromJSONField(String.reified(), field.description), iconUrl: decodeFromJSONField(String1.reified(), field.iconUrl) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MetadataUpdated<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MetadataUpdated.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MetadataUpdated.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MetadataUpdated.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MetadataUpdated<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMetadataUpdated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MetadataUpdated object`); } return MetadataUpdated.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MetadataUpdated<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMetadataUpdated(data.bcs.type)) { throw new Error(`object at is not a MetadataUpdated object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MetadataUpdated.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MetadataUpdated.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MetadataUpdated<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MetadataUpdated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMetadataUpdated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MetadataUpdated object`); }

 return MetadataUpdated.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MigrationAborted =============================== */

export function isMigrationAborted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MigrationAborted` + '<'); }

export interface MigrationAbortedFields<T0 extends PhantomTypeArgument> { compatibleVersions: ToField<Vector<"u64">> }

export type MigrationAbortedReified<T0 extends PhantomTypeArgument> = Reified< MigrationAborted<T0>, MigrationAbortedFields<T0> >;

export class MigrationAborted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MigrationAborted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MigrationAborted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MigrationAborted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MigrationAborted.$isPhantom;

 readonly compatibleVersions: ToField<Vector<"u64">>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MigrationAbortedFields<T0>, ) { this.$fullTypeName = composeSuiType( MigrationAborted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MigrationAborted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.compatibleVersions = fields.compatibleVersions; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MigrationAbortedReified<ToPhantomTypeArgument<T0>> { return { typeName: MigrationAborted.$typeName, fullTypeName: composeSuiType( MigrationAborted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MigrationAborted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MigrationAborted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MigrationAborted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MigrationAborted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MigrationAborted.fromBcs( T0, data, ), bcs: MigrationAborted.bcs, fromJSONField: (field: any) => MigrationAborted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MigrationAborted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MigrationAborted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MigrationAborted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MigrationAborted.fetch( client, T0, id, ), new: ( fields: MigrationAbortedFields<ToPhantomTypeArgument<T0>>, ) => { return new MigrationAborted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MigrationAborted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MigrationAborted<ToPhantomTypeArgument<T0>>>> { return phantom(MigrationAborted.reified( T0 )); } static get p() { return MigrationAborted.phantom }

 static get bcs() { return bcs.struct("MigrationAborted", {

 compatible_versions: bcs.vector(bcs.u64())

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MigrationAborted<ToPhantomTypeArgument<T0>> { return MigrationAborted.reified( typeArg, ).new( { compatibleVersions: decodeFromFields(reified.vector("u64"), fields.compatible_versions) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MigrationAborted<ToPhantomTypeArgument<T0>> { if (!isMigrationAborted(item.type)) { throw new Error("not a MigrationAborted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MigrationAborted.reified( typeArg, ).new( { compatibleVersions: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.compatible_versions) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MigrationAborted<ToPhantomTypeArgument<T0>> { return MigrationAborted.fromFields( typeArg, MigrationAborted.bcs.parse(data) ) }

 toJSONField() { return {

 compatibleVersions: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.compatibleVersions),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MigrationAborted<ToPhantomTypeArgument<T0>> { return MigrationAborted.reified( typeArg, ).new( { compatibleVersions: decodeFromJSONField(reified.vector("u64"), field.compatibleVersions) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MigrationAborted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MigrationAborted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MigrationAborted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MigrationAborted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MigrationAborted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMigrationAborted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MigrationAborted object`); } return MigrationAborted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MigrationAborted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMigrationAborted(data.bcs.type)) { throw new Error(`object at is not a MigrationAborted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MigrationAborted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MigrationAborted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MigrationAborted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MigrationAborted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMigrationAborted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MigrationAborted object`); }

 return MigrationAborted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MigrationCompleted =============================== */

export function isMigrationCompleted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MigrationCompleted` + '<'); }

export interface MigrationCompletedFields<T0 extends PhantomTypeArgument> { compatibleVersions: ToField<Vector<"u64">> }

export type MigrationCompletedReified<T0 extends PhantomTypeArgument> = Reified< MigrationCompleted<T0>, MigrationCompletedFields<T0> >;

export class MigrationCompleted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MigrationCompleted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MigrationCompleted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MigrationCompleted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MigrationCompleted.$isPhantom;

 readonly compatibleVersions: ToField<Vector<"u64">>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MigrationCompletedFields<T0>, ) { this.$fullTypeName = composeSuiType( MigrationCompleted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MigrationCompleted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.compatibleVersions = fields.compatibleVersions; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MigrationCompletedReified<ToPhantomTypeArgument<T0>> { return { typeName: MigrationCompleted.$typeName, fullTypeName: composeSuiType( MigrationCompleted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MigrationCompleted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MigrationCompleted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MigrationCompleted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MigrationCompleted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MigrationCompleted.fromBcs( T0, data, ), bcs: MigrationCompleted.bcs, fromJSONField: (field: any) => MigrationCompleted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MigrationCompleted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MigrationCompleted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MigrationCompleted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MigrationCompleted.fetch( client, T0, id, ), new: ( fields: MigrationCompletedFields<ToPhantomTypeArgument<T0>>, ) => { return new MigrationCompleted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MigrationCompleted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MigrationCompleted<ToPhantomTypeArgument<T0>>>> { return phantom(MigrationCompleted.reified( T0 )); } static get p() { return MigrationCompleted.phantom }

 static get bcs() { return bcs.struct("MigrationCompleted", {

 compatible_versions: bcs.vector(bcs.u64())

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MigrationCompleted<ToPhantomTypeArgument<T0>> { return MigrationCompleted.reified( typeArg, ).new( { compatibleVersions: decodeFromFields(reified.vector("u64"), fields.compatible_versions) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MigrationCompleted<ToPhantomTypeArgument<T0>> { if (!isMigrationCompleted(item.type)) { throw new Error("not a MigrationCompleted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MigrationCompleted.reified( typeArg, ).new( { compatibleVersions: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.compatible_versions) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MigrationCompleted<ToPhantomTypeArgument<T0>> { return MigrationCompleted.fromFields( typeArg, MigrationCompleted.bcs.parse(data) ) }

 toJSONField() { return {

 compatibleVersions: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.compatibleVersions),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MigrationCompleted<ToPhantomTypeArgument<T0>> { return MigrationCompleted.reified( typeArg, ).new( { compatibleVersions: decodeFromJSONField(reified.vector("u64"), field.compatibleVersions) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MigrationCompleted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MigrationCompleted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MigrationCompleted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MigrationCompleted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MigrationCompleted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMigrationCompleted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MigrationCompleted object`); } return MigrationCompleted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MigrationCompleted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMigrationCompleted(data.bcs.type)) { throw new Error(`object at is not a MigrationCompleted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MigrationCompleted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MigrationCompleted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MigrationCompleted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MigrationCompleted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMigrationCompleted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MigrationCompleted object`); }

 return MigrationCompleted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MigrationStarted =============================== */

export function isMigrationStarted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MigrationStarted` + '<'); }

export interface MigrationStartedFields<T0 extends PhantomTypeArgument> { compatibleVersions: ToField<Vector<"u64">> }

export type MigrationStartedReified<T0 extends PhantomTypeArgument> = Reified< MigrationStarted<T0>, MigrationStartedFields<T0> >;

export class MigrationStarted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MigrationStarted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MigrationStarted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MigrationStarted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MigrationStarted.$isPhantom;

 readonly compatibleVersions: ToField<Vector<"u64">>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MigrationStartedFields<T0>, ) { this.$fullTypeName = composeSuiType( MigrationStarted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MigrationStarted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.compatibleVersions = fields.compatibleVersions; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MigrationStartedReified<ToPhantomTypeArgument<T0>> { return { typeName: MigrationStarted.$typeName, fullTypeName: composeSuiType( MigrationStarted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MigrationStarted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MigrationStarted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MigrationStarted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MigrationStarted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MigrationStarted.fromBcs( T0, data, ), bcs: MigrationStarted.bcs, fromJSONField: (field: any) => MigrationStarted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MigrationStarted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MigrationStarted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MigrationStarted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MigrationStarted.fetch( client, T0, id, ), new: ( fields: MigrationStartedFields<ToPhantomTypeArgument<T0>>, ) => { return new MigrationStarted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MigrationStarted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MigrationStarted<ToPhantomTypeArgument<T0>>>> { return phantom(MigrationStarted.reified( T0 )); } static get p() { return MigrationStarted.phantom }

 static get bcs() { return bcs.struct("MigrationStarted", {

 compatible_versions: bcs.vector(bcs.u64())

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MigrationStarted<ToPhantomTypeArgument<T0>> { return MigrationStarted.reified( typeArg, ).new( { compatibleVersions: decodeFromFields(reified.vector("u64"), fields.compatible_versions) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MigrationStarted<ToPhantomTypeArgument<T0>> { if (!isMigrationStarted(item.type)) { throw new Error("not a MigrationStarted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MigrationStarted.reified( typeArg, ).new( { compatibleVersions: decodeFromFieldsWithTypes(reified.vector("u64"), item.fields.compatible_versions) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MigrationStarted<ToPhantomTypeArgument<T0>> { return MigrationStarted.fromFields( typeArg, MigrationStarted.bcs.parse(data) ) }

 toJSONField() { return {

 compatibleVersions: fieldToJSON<Vector<"u64">>(`vector<u64>`, this.compatibleVersions),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MigrationStarted<ToPhantomTypeArgument<T0>> { return MigrationStarted.reified( typeArg, ).new( { compatibleVersions: decodeFromJSONField(reified.vector("u64"), field.compatibleVersions) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MigrationStarted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MigrationStarted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MigrationStarted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MigrationStarted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MigrationStarted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMigrationStarted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MigrationStarted object`); } return MigrationStarted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MigrationStarted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMigrationStarted(data.bcs.type)) { throw new Error(`object at is not a MigrationStarted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MigrationStarted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MigrationStarted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MigrationStarted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MigrationStarted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMigrationStarted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MigrationStarted object`); }

 return MigrationStarted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Mint =============================== */

export function isMint(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Mint` + '<'); }

export interface MintFields<T0 extends PhantomTypeArgument> { mintCap: ToField<ID>; recipient: ToField<"address">; amount: ToField<"u64"> }

export type MintReified<T0 extends PhantomTypeArgument> = Reified< Mint<T0>, MintFields<T0> >;

export class Mint<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Mint`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Mint.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Mint<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Mint.$isPhantom;

 readonly mintCap: ToField<ID>; readonly recipient: ToField<"address">; readonly amount: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MintFields<T0>, ) { this.$fullTypeName = composeSuiType( Mint.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Mint<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.mintCap = fields.mintCap;; this.recipient = fields.recipient;; this.amount = fields.amount; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MintReified<ToPhantomTypeArgument<T0>> { return { typeName: Mint.$typeName, fullTypeName: composeSuiType( Mint.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Mint<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Mint.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Mint.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Mint.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Mint.fromBcs( T0, data, ), bcs: Mint.bcs, fromJSONField: (field: any) => Mint.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Mint.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Mint.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Mint.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Mint.fetch( client, T0, id, ), new: ( fields: MintFields<ToPhantomTypeArgument<T0>>, ) => { return new Mint( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Mint.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Mint<ToPhantomTypeArgument<T0>>>> { return phantom(Mint.reified( T0 )); } static get p() { return Mint.phantom }

 static get bcs() { return bcs.struct("Mint", {

 mint_cap: ID.bcs, recipient: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), amount: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Mint<ToPhantomTypeArgument<T0>> { return Mint.reified( typeArg, ).new( { mintCap: decodeFromFields(ID.reified(), fields.mint_cap), recipient: decodeFromFields("address", fields.recipient), amount: decodeFromFields("u64", fields.amount) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Mint<ToPhantomTypeArgument<T0>> { if (!isMint(item.type)) { throw new Error("not a Mint type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Mint.reified( typeArg, ).new( { mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap), recipient: decodeFromFieldsWithTypes("address", item.fields.recipient), amount: decodeFromFieldsWithTypes("u64", item.fields.amount) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Mint<ToPhantomTypeArgument<T0>> { return Mint.fromFields( typeArg, Mint.bcs.parse(data) ) }

 toJSONField() { return {

 mintCap: this.mintCap,recipient: this.recipient,amount: this.amount.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Mint<ToPhantomTypeArgument<T0>> { return Mint.reified( typeArg, ).new( { mintCap: decodeFromJSONField(ID.reified(), field.mintCap), recipient: decodeFromJSONField("address", field.recipient), amount: decodeFromJSONField("u64", field.amount) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Mint<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Mint.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Mint.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Mint.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Mint<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMint(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Mint object`); } return Mint.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Mint<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMint(data.bcs.type)) { throw new Error(`object at is not a Mint object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Mint.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Mint.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Mint<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Mint object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMint(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Mint object`); }

 return Mint.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MintCap =============================== */

export function isMintCap(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MintCap` + '<'); }

export interface MintCapFields<T0 extends PhantomTypeArgument> { id: ToField<UID> }

export type MintCapReified<T0 extends PhantomTypeArgument> = Reified< MintCap<T0>, MintCapFields<T0> >;

export class MintCap<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MintCap`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MintCap.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MintCap<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MintCap.$isPhantom;

 readonly id: ToField<UID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MintCapFields<T0>, ) { this.$fullTypeName = composeSuiType( MintCap.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MintCap<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MintCapReified<ToPhantomTypeArgument<T0>> { return { typeName: MintCap.$typeName, fullTypeName: composeSuiType( MintCap.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MintCap<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MintCap.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MintCap.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintCap.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MintCap.fromBcs( T0, data, ), bcs: MintCap.bcs, fromJSONField: (field: any) => MintCap.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MintCap.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MintCap.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MintCap.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MintCap.fetch( client, T0, id, ), new: ( fields: MintCapFields<ToPhantomTypeArgument<T0>>, ) => { return new MintCap( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintCap.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MintCap<ToPhantomTypeArgument<T0>>>> { return phantom(MintCap.reified( T0 )); } static get p() { return MintCap.phantom }

 static get bcs() { return bcs.struct("MintCap", {

 id: UID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MintCap<ToPhantomTypeArgument<T0>> { return MintCap.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MintCap<ToPhantomTypeArgument<T0>> { if (!isMintCap(item.type)) { throw new Error("not a MintCap type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MintCap.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MintCap<ToPhantomTypeArgument<T0>> { return MintCap.fromFields( typeArg, MintCap.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MintCap<ToPhantomTypeArgument<T0>> { return MintCap.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MintCap<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MintCap.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MintCap.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MintCap.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MintCap<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintCap(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintCap object`); } return MintCap.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MintCap<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintCap(data.bcs.type)) { throw new Error(`object at is not a MintCap object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MintCap.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintCap.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MintCap<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintCap object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintCap(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintCap object`); }

 return MintCap.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MintCapCreated =============================== */

export function isMintCapCreated(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MintCapCreated` + '<'); }

export interface MintCapCreatedFields<T0 extends PhantomTypeArgument> { mintCap: ToField<ID> }

export type MintCapCreatedReified<T0 extends PhantomTypeArgument> = Reified< MintCapCreated<T0>, MintCapCreatedFields<T0> >;

export class MintCapCreated<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MintCapCreated`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MintCapCreated.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MintCapCreated<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MintCapCreated.$isPhantom;

 readonly mintCap: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MintCapCreatedFields<T0>, ) { this.$fullTypeName = composeSuiType( MintCapCreated.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MintCapCreated<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.mintCap = fields.mintCap; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MintCapCreatedReified<ToPhantomTypeArgument<T0>> { return { typeName: MintCapCreated.$typeName, fullTypeName: composeSuiType( MintCapCreated.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MintCapCreated<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MintCapCreated.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MintCapCreated.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MintCapCreated.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MintCapCreated.fromBcs( T0, data, ), bcs: MintCapCreated.bcs, fromJSONField: (field: any) => MintCapCreated.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MintCapCreated.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MintCapCreated.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MintCapCreated.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MintCapCreated.fetch( client, T0, id, ), new: ( fields: MintCapCreatedFields<ToPhantomTypeArgument<T0>>, ) => { return new MintCapCreated( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MintCapCreated.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MintCapCreated<ToPhantomTypeArgument<T0>>>> { return phantom(MintCapCreated.reified( T0 )); } static get p() { return MintCapCreated.phantom }

 static get bcs() { return bcs.struct("MintCapCreated", {

 mint_cap: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MintCapCreated<ToPhantomTypeArgument<T0>> { return MintCapCreated.reified( typeArg, ).new( { mintCap: decodeFromFields(ID.reified(), fields.mint_cap) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MintCapCreated<ToPhantomTypeArgument<T0>> { if (!isMintCapCreated(item.type)) { throw new Error("not a MintCapCreated type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MintCapCreated.reified( typeArg, ).new( { mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MintCapCreated<ToPhantomTypeArgument<T0>> { return MintCapCreated.fromFields( typeArg, MintCapCreated.bcs.parse(data) ) }

 toJSONField() { return {

 mintCap: this.mintCap,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MintCapCreated<ToPhantomTypeArgument<T0>> { return MintCapCreated.reified( typeArg, ).new( { mintCap: decodeFromJSONField(ID.reified(), field.mintCap) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MintCapCreated<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MintCapCreated.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MintCapCreated.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MintCapCreated.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MintCapCreated<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMintCapCreated(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MintCapCreated object`); } return MintCapCreated.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MintCapCreated<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMintCapCreated(data.bcs.type)) { throw new Error(`object at is not a MintCapCreated object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MintCapCreated.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MintCapCreated.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MintCapCreated<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MintCapCreated object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMintCapCreated(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MintCapCreated object`); }

 return MintCapCreated.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MinterAllowanceIncremented =============================== */

export function isMinterAllowanceIncremented(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MinterAllowanceIncremented` + '<'); }

export interface MinterAllowanceIncrementedFields<T0 extends PhantomTypeArgument> { controller: ToField<"address">; mintCap: ToField<ID>; allowanceIncrement: ToField<"u64">; newAllowance: ToField<"u64"> }

export type MinterAllowanceIncrementedReified<T0 extends PhantomTypeArgument> = Reified< MinterAllowanceIncremented<T0>, MinterAllowanceIncrementedFields<T0> >;

export class MinterAllowanceIncremented<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MinterAllowanceIncremented`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MinterAllowanceIncremented.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MinterAllowanceIncremented<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MinterAllowanceIncremented.$isPhantom;

 readonly controller: ToField<"address">; readonly mintCap: ToField<ID>; readonly allowanceIncrement: ToField<"u64">; readonly newAllowance: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MinterAllowanceIncrementedFields<T0>, ) { this.$fullTypeName = composeSuiType( MinterAllowanceIncremented.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MinterAllowanceIncremented<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.controller = fields.controller;; this.mintCap = fields.mintCap;; this.allowanceIncrement = fields.allowanceIncrement;; this.newAllowance = fields.newAllowance; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MinterAllowanceIncrementedReified<ToPhantomTypeArgument<T0>> { return { typeName: MinterAllowanceIncremented.$typeName, fullTypeName: composeSuiType( MinterAllowanceIncremented.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MinterAllowanceIncremented<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MinterAllowanceIncremented.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MinterAllowanceIncremented.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MinterAllowanceIncremented.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MinterAllowanceIncremented.fromBcs( T0, data, ), bcs: MinterAllowanceIncremented.bcs, fromJSONField: (field: any) => MinterAllowanceIncremented.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MinterAllowanceIncremented.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MinterAllowanceIncremented.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MinterAllowanceIncremented.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MinterAllowanceIncremented.fetch( client, T0, id, ), new: ( fields: MinterAllowanceIncrementedFields<ToPhantomTypeArgument<T0>>, ) => { return new MinterAllowanceIncremented( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MinterAllowanceIncremented.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MinterAllowanceIncremented<ToPhantomTypeArgument<T0>>>> { return phantom(MinterAllowanceIncremented.reified( T0 )); } static get p() { return MinterAllowanceIncremented.phantom }

 static get bcs() { return bcs.struct("MinterAllowanceIncremented", {

 controller: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mint_cap: ID.bcs, allowance_increment: bcs.u64(), new_allowance: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { return MinterAllowanceIncremented.reified( typeArg, ).new( { controller: decodeFromFields("address", fields.controller), mintCap: decodeFromFields(ID.reified(), fields.mint_cap), allowanceIncrement: decodeFromFields("u64", fields.allowance_increment), newAllowance: decodeFromFields("u64", fields.new_allowance) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { if (!isMinterAllowanceIncremented(item.type)) { throw new Error("not a MinterAllowanceIncremented type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MinterAllowanceIncremented.reified( typeArg, ).new( { controller: decodeFromFieldsWithTypes("address", item.fields.controller), mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap), allowanceIncrement: decodeFromFieldsWithTypes("u64", item.fields.allowance_increment), newAllowance: decodeFromFieldsWithTypes("u64", item.fields.new_allowance) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { return MinterAllowanceIncremented.fromFields( typeArg, MinterAllowanceIncremented.bcs.parse(data) ) }

 toJSONField() { return {

 controller: this.controller,mintCap: this.mintCap,allowanceIncrement: this.allowanceIncrement.toString(),newAllowance: this.newAllowance.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { return MinterAllowanceIncremented.reified( typeArg, ).new( { controller: decodeFromJSONField("address", field.controller), mintCap: decodeFromJSONField(ID.reified(), field.mintCap), allowanceIncrement: decodeFromJSONField("u64", field.allowanceIncrement), newAllowance: decodeFromJSONField("u64", field.newAllowance) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MinterAllowanceIncremented.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MinterAllowanceIncremented.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MinterAllowanceIncremented.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMinterAllowanceIncremented(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MinterAllowanceIncremented object`); } return MinterAllowanceIncremented.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MinterAllowanceIncremented<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMinterAllowanceIncremented(data.bcs.type)) { throw new Error(`object at is not a MinterAllowanceIncremented object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MinterAllowanceIncremented.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MinterAllowanceIncremented.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MinterAllowanceIncremented<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MinterAllowanceIncremented object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMinterAllowanceIncremented(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MinterAllowanceIncremented object`); }

 return MinterAllowanceIncremented.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MinterConfigured =============================== */

export function isMinterConfigured(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MinterConfigured` + '<'); }

export interface MinterConfiguredFields<T0 extends PhantomTypeArgument> { controller: ToField<"address">; mintCap: ToField<ID>; allowance: ToField<"u64"> }

export type MinterConfiguredReified<T0 extends PhantomTypeArgument> = Reified< MinterConfigured<T0>, MinterConfiguredFields<T0> >;

export class MinterConfigured<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MinterConfigured`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MinterConfigured.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MinterConfigured<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MinterConfigured.$isPhantom;

 readonly controller: ToField<"address">; readonly mintCap: ToField<ID>; readonly allowance: ToField<"u64">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MinterConfiguredFields<T0>, ) { this.$fullTypeName = composeSuiType( MinterConfigured.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MinterConfigured<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.controller = fields.controller;; this.mintCap = fields.mintCap;; this.allowance = fields.allowance; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MinterConfiguredReified<ToPhantomTypeArgument<T0>> { return { typeName: MinterConfigured.$typeName, fullTypeName: composeSuiType( MinterConfigured.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MinterConfigured<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MinterConfigured.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MinterConfigured.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MinterConfigured.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MinterConfigured.fromBcs( T0, data, ), bcs: MinterConfigured.bcs, fromJSONField: (field: any) => MinterConfigured.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MinterConfigured.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MinterConfigured.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MinterConfigured.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MinterConfigured.fetch( client, T0, id, ), new: ( fields: MinterConfiguredFields<ToPhantomTypeArgument<T0>>, ) => { return new MinterConfigured( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MinterConfigured.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MinterConfigured<ToPhantomTypeArgument<T0>>>> { return phantom(MinterConfigured.reified( T0 )); } static get p() { return MinterConfigured.phantom }

 static get bcs() { return bcs.struct("MinterConfigured", {

 controller: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mint_cap: ID.bcs, allowance: bcs.u64()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MinterConfigured<ToPhantomTypeArgument<T0>> { return MinterConfigured.reified( typeArg, ).new( { controller: decodeFromFields("address", fields.controller), mintCap: decodeFromFields(ID.reified(), fields.mint_cap), allowance: decodeFromFields("u64", fields.allowance) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MinterConfigured<ToPhantomTypeArgument<T0>> { if (!isMinterConfigured(item.type)) { throw new Error("not a MinterConfigured type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MinterConfigured.reified( typeArg, ).new( { controller: decodeFromFieldsWithTypes("address", item.fields.controller), mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap), allowance: decodeFromFieldsWithTypes("u64", item.fields.allowance) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MinterConfigured<ToPhantomTypeArgument<T0>> { return MinterConfigured.fromFields( typeArg, MinterConfigured.bcs.parse(data) ) }

 toJSONField() { return {

 controller: this.controller,mintCap: this.mintCap,allowance: this.allowance.toString(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MinterConfigured<ToPhantomTypeArgument<T0>> { return MinterConfigured.reified( typeArg, ).new( { controller: decodeFromJSONField("address", field.controller), mintCap: decodeFromJSONField(ID.reified(), field.mintCap), allowance: decodeFromJSONField("u64", field.allowance) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MinterConfigured<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MinterConfigured.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MinterConfigured.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MinterConfigured.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MinterConfigured<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMinterConfigured(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MinterConfigured object`); } return MinterConfigured.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MinterConfigured<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMinterConfigured(data.bcs.type)) { throw new Error(`object at is not a MinterConfigured object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MinterConfigured.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MinterConfigured.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MinterConfigured<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MinterConfigured object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMinterConfigured(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MinterConfigured object`); }

 return MinterConfigured.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MinterRemoved =============================== */

export function isMinterRemoved(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::MinterRemoved` + '<'); }

export interface MinterRemovedFields<T0 extends PhantomTypeArgument> { controller: ToField<"address">; mintCap: ToField<ID> }

export type MinterRemovedReified<T0 extends PhantomTypeArgument> = Reified< MinterRemoved<T0>, MinterRemovedFields<T0> >;

export class MinterRemoved<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::MinterRemoved`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MinterRemoved.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::MinterRemoved<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MinterRemoved.$isPhantom;

 readonly controller: ToField<"address">; readonly mintCap: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MinterRemovedFields<T0>, ) { this.$fullTypeName = composeSuiType( MinterRemoved.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::MinterRemoved<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.controller = fields.controller;; this.mintCap = fields.mintCap; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MinterRemovedReified<ToPhantomTypeArgument<T0>> { return { typeName: MinterRemoved.$typeName, fullTypeName: composeSuiType( MinterRemoved.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::MinterRemoved<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MinterRemoved.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MinterRemoved.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MinterRemoved.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MinterRemoved.fromBcs( T0, data, ), bcs: MinterRemoved.bcs, fromJSONField: (field: any) => MinterRemoved.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MinterRemoved.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MinterRemoved.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MinterRemoved.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MinterRemoved.fetch( client, T0, id, ), new: ( fields: MinterRemovedFields<ToPhantomTypeArgument<T0>>, ) => { return new MinterRemoved( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MinterRemoved.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MinterRemoved<ToPhantomTypeArgument<T0>>>> { return phantom(MinterRemoved.reified( T0 )); } static get p() { return MinterRemoved.phantom }

 static get bcs() { return bcs.struct("MinterRemoved", {

 controller: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), mint_cap: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MinterRemoved<ToPhantomTypeArgument<T0>> { return MinterRemoved.reified( typeArg, ).new( { controller: decodeFromFields("address", fields.controller), mintCap: decodeFromFields(ID.reified(), fields.mint_cap) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MinterRemoved<ToPhantomTypeArgument<T0>> { if (!isMinterRemoved(item.type)) { throw new Error("not a MinterRemoved type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MinterRemoved.reified( typeArg, ).new( { controller: decodeFromFieldsWithTypes("address", item.fields.controller), mintCap: decodeFromFieldsWithTypes(ID.reified(), item.fields.mint_cap) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MinterRemoved<ToPhantomTypeArgument<T0>> { return MinterRemoved.fromFields( typeArg, MinterRemoved.bcs.parse(data) ) }

 toJSONField() { return {

 controller: this.controller,mintCap: this.mintCap,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MinterRemoved<ToPhantomTypeArgument<T0>> { return MinterRemoved.reified( typeArg, ).new( { controller: decodeFromJSONField("address", field.controller), mintCap: decodeFromJSONField(ID.reified(), field.mintCap) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MinterRemoved<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MinterRemoved.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MinterRemoved.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MinterRemoved.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MinterRemoved<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMinterRemoved(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MinterRemoved object`); } return MinterRemoved.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MinterRemoved<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMinterRemoved(data.bcs.type)) { throw new Error(`object at is not a MinterRemoved object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MinterRemoved.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MinterRemoved.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MinterRemoved<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MinterRemoved object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMinterRemoved(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MinterRemoved object`); }

 return MinterRemoved.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Pause =============================== */

export function isPause(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Pause` + '<'); }

export interface PauseFields<T0 extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type PauseReified<T0 extends PhantomTypeArgument> = Reified< Pause<T0>, PauseFields<T0> >;

export class Pause<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Pause`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Pause.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Pause<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Pause.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: PauseFields<T0>, ) { this.$fullTypeName = composeSuiType( Pause.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Pause<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PauseReified<ToPhantomTypeArgument<T0>> { return { typeName: Pause.$typeName, fullTypeName: composeSuiType( Pause.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Pause<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Pause.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Pause.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Pause.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Pause.fromBcs( T0, data, ), bcs: Pause.bcs, fromJSONField: (field: any) => Pause.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Pause.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Pause.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Pause.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Pause.fetch( client, T0, id, ), new: ( fields: PauseFields<ToPhantomTypeArgument<T0>>, ) => { return new Pause( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Pause.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Pause<ToPhantomTypeArgument<T0>>>> { return phantom(Pause.reified( T0 )); } static get p() { return Pause.phantom }

 static get bcs() { return bcs.struct("Pause", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Pause<ToPhantomTypeArgument<T0>> { return Pause.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Pause<ToPhantomTypeArgument<T0>> { if (!isPause(item.type)) { throw new Error("not a Pause type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Pause.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Pause<ToPhantomTypeArgument<T0>> { return Pause.fromFields( typeArg, Pause.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Pause<ToPhantomTypeArgument<T0>> { return Pause.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Pause<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Pause.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Pause.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Pause.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Pause<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPause(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Pause object`); } return Pause.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Pause<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPause(data.bcs.type)) { throw new Error(`object at is not a Pause object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Pause.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Pause.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Pause<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Pause object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPause(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Pause object`); }

 return Pause.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Treasury =============================== */

export function isTreasury(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Treasury` + '<'); }

export interface TreasuryFields<T0 extends PhantomTypeArgument> { id: ToField<UID>; controllers: ToField<Table<"address", ToPhantom<ID>>>; mintAllowances: ToField<Table<ToPhantom<ID>, ToPhantom<MintAllowance<T0>>>>; roles: ToField<Roles<T0>>; compatibleVersions: ToField<VecSet<"u64">> }

export type TreasuryReified<T0 extends PhantomTypeArgument> = Reified< Treasury<T0>, TreasuryFields<T0> >;

export class Treasury<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Treasury`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Treasury.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Treasury<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Treasury.$isPhantom;

 readonly id: ToField<UID>; readonly controllers: ToField<Table<"address", ToPhantom<ID>>>; readonly mintAllowances: ToField<Table<ToPhantom<ID>, ToPhantom<MintAllowance<T0>>>>; readonly roles: ToField<Roles<T0>>; readonly compatibleVersions: ToField<VecSet<"u64">>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: TreasuryFields<T0>, ) { this.$fullTypeName = composeSuiType( Treasury.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Treasury<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.controllers = fields.controllers;; this.mintAllowances = fields.mintAllowances;; this.roles = fields.roles;; this.compatibleVersions = fields.compatibleVersions; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): TreasuryReified<ToPhantomTypeArgument<T0>> { return { typeName: Treasury.$typeName, fullTypeName: composeSuiType( Treasury.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Treasury<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Treasury.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Treasury.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Treasury.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Treasury.fromBcs( T0, data, ), bcs: Treasury.bcs, fromJSONField: (field: any) => Treasury.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Treasury.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Treasury.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Treasury.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Treasury.fetch( client, T0, id, ), new: ( fields: TreasuryFields<ToPhantomTypeArgument<T0>>, ) => { return new Treasury( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Treasury.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Treasury<ToPhantomTypeArgument<T0>>>> { return phantom(Treasury.reified( T0 )); } static get p() { return Treasury.phantom }

 static get bcs() { return bcs.struct("Treasury", {

 id: UID.bcs, controllers: Table.bcs, mint_allowances: Table.bcs, roles: Roles.bcs, compatible_versions: VecSet.bcs(bcs.u64())

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Treasury<ToPhantomTypeArgument<T0>> { return Treasury.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), controllers: decodeFromFields(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), fields.controllers), mintAllowances: decodeFromFields(Table.reified(reified.phantom(ID.reified()), reified.phantom(MintAllowance.reified(typeArg))), fields.mint_allowances), roles: decodeFromFields(Roles.reified(typeArg), fields.roles), compatibleVersions: decodeFromFields(VecSet.reified("u64"), fields.compatible_versions) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Treasury<ToPhantomTypeArgument<T0>> { if (!isTreasury(item.type)) { throw new Error("not a Treasury type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Treasury.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), controllers: decodeFromFieldsWithTypes(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), item.fields.controllers), mintAllowances: decodeFromFieldsWithTypes(Table.reified(reified.phantom(ID.reified()), reified.phantom(MintAllowance.reified(typeArg))), item.fields.mint_allowances), roles: decodeFromFieldsWithTypes(Roles.reified(typeArg), item.fields.roles), compatibleVersions: decodeFromFieldsWithTypes(VecSet.reified("u64"), item.fields.compatible_versions) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Treasury<ToPhantomTypeArgument<T0>> { return Treasury.fromFields( typeArg, Treasury.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,controllers: this.controllers.toJSONField(),mintAllowances: this.mintAllowances.toJSONField(),roles: this.roles.toJSONField(),compatibleVersions: this.compatibleVersions.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Treasury<ToPhantomTypeArgument<T0>> { return Treasury.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), controllers: decodeFromJSONField(Table.reified(reified.phantom("address"), reified.phantom(ID.reified())), field.controllers), mintAllowances: decodeFromJSONField(Table.reified(reified.phantom(ID.reified()), reified.phantom(MintAllowance.reified(typeArg))), field.mintAllowances), roles: decodeFromJSONField(Roles.reified(typeArg), field.roles), compatibleVersions: decodeFromJSONField(VecSet.reified("u64"), field.compatibleVersions) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Treasury<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Treasury.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Treasury.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Treasury.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Treasury<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasury(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Treasury object`); } return Treasury.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Treasury<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasury(data.bcs.type)) { throw new Error(`object at is not a Treasury object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Treasury.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Treasury.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Treasury<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Treasury object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasury(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Treasury object`); }

 return Treasury.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== TreasuryCapKey =============================== */

export function isTreasuryCapKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::treasury::TreasuryCapKey`; }

export interface TreasuryCapKeyFields { dummyField: ToField<"bool"> }

export type TreasuryCapKeyReified = Reified< TreasuryCapKey, TreasuryCapKeyFields >;

export class TreasuryCapKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::TreasuryCapKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = TreasuryCapKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::TreasuryCapKey`; readonly $typeArgs: []; readonly $isPhantom = TreasuryCapKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: TreasuryCapKeyFields, ) { this.$fullTypeName = composeSuiType( TreasuryCapKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::TreasuryCapKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): TreasuryCapKeyReified { return { typeName: TreasuryCapKey.$typeName, fullTypeName: composeSuiType( TreasuryCapKey.$typeName, ...[] ) as `${typeof PKG_V1}::treasury::TreasuryCapKey`, typeArgs: [ ] as [], isPhantom: TreasuryCapKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => TreasuryCapKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TreasuryCapKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => TreasuryCapKey.fromBcs( data, ), bcs: TreasuryCapKey.bcs, fromJSONField: (field: any) => TreasuryCapKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => TreasuryCapKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => TreasuryCapKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => TreasuryCapKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => TreasuryCapKey.fetch( client, id, ), new: ( fields: TreasuryCapKeyFields, ) => { return new TreasuryCapKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return TreasuryCapKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<TreasuryCapKey>> { return phantom(TreasuryCapKey.reified( )); } static get p() { return TreasuryCapKey.phantom() }

 static get bcs() { return bcs.struct("TreasuryCapKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): TreasuryCapKey { return TreasuryCapKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): TreasuryCapKey { if (!isTreasuryCapKey(item.type)) { throw new Error("not a TreasuryCapKey type");

 }

 return TreasuryCapKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): TreasuryCapKey { return TreasuryCapKey.fromFields( TreasuryCapKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): TreasuryCapKey { return TreasuryCapKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): TreasuryCapKey { if (json.$typeName !== TreasuryCapKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return TreasuryCapKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): TreasuryCapKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTreasuryCapKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TreasuryCapKey object`); } return TreasuryCapKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): TreasuryCapKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTreasuryCapKey(data.bcs.type)) { throw new Error(`object at is not a TreasuryCapKey object`); }

 return TreasuryCapKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TreasuryCapKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<TreasuryCapKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TreasuryCapKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTreasuryCapKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TreasuryCapKey object`); }

 return TreasuryCapKey.fromSuiObjectData( res.data ); }

 }

/* ============================== Unblocklisted =============================== */

export function isUnblocklisted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Unblocklisted` + '<'); }

export interface UnblocklistedFields<T0 extends PhantomTypeArgument> { address: ToField<"address"> }

export type UnblocklistedReified<T0 extends PhantomTypeArgument> = Reified< Unblocklisted<T0>, UnblocklistedFields<T0> >;

export class Unblocklisted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Unblocklisted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Unblocklisted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Unblocklisted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Unblocklisted.$isPhantom;

 readonly address: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UnblocklistedFields<T0>, ) { this.$fullTypeName = composeSuiType( Unblocklisted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Unblocklisted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.address = fields.address; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UnblocklistedReified<ToPhantomTypeArgument<T0>> { return { typeName: Unblocklisted.$typeName, fullTypeName: composeSuiType( Unblocklisted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Unblocklisted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Unblocklisted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Unblocklisted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Unblocklisted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Unblocklisted.fromBcs( T0, data, ), bcs: Unblocklisted.bcs, fromJSONField: (field: any) => Unblocklisted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Unblocklisted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Unblocklisted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Unblocklisted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Unblocklisted.fetch( client, T0, id, ), new: ( fields: UnblocklistedFields<ToPhantomTypeArgument<T0>>, ) => { return new Unblocklisted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Unblocklisted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Unblocklisted<ToPhantomTypeArgument<T0>>>> { return phantom(Unblocklisted.reified( T0 )); } static get p() { return Unblocklisted.phantom }

 static get bcs() { return bcs.struct("Unblocklisted", {

 address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Unblocklisted<ToPhantomTypeArgument<T0>> { return Unblocklisted.reified( typeArg, ).new( { address: decodeFromFields("address", fields.address) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Unblocklisted<ToPhantomTypeArgument<T0>> { if (!isUnblocklisted(item.type)) { throw new Error("not a Unblocklisted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Unblocklisted.reified( typeArg, ).new( { address: decodeFromFieldsWithTypes("address", item.fields.address) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Unblocklisted<ToPhantomTypeArgument<T0>> { return Unblocklisted.fromFields( typeArg, Unblocklisted.bcs.parse(data) ) }

 toJSONField() { return {

 address: this.address,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Unblocklisted<ToPhantomTypeArgument<T0>> { return Unblocklisted.reified( typeArg, ).new( { address: decodeFromJSONField("address", field.address) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Unblocklisted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Unblocklisted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Unblocklisted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Unblocklisted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Unblocklisted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUnblocklisted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Unblocklisted object`); } return Unblocklisted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Unblocklisted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUnblocklisted(data.bcs.type)) { throw new Error(`object at is not a Unblocklisted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Unblocklisted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Unblocklisted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Unblocklisted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Unblocklisted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUnblocklisted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Unblocklisted object`); }

 return Unblocklisted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== Unpause =============================== */

export function isUnpause(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::treasury::Unpause` + '<'); }

export interface UnpauseFields<T0 extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type UnpauseReified<T0 extends PhantomTypeArgument> = Reified< Unpause<T0>, UnpauseFields<T0> >;

export class Unpause<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::treasury::Unpause`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Unpause.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::treasury::Unpause<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Unpause.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UnpauseFields<T0>, ) { this.$fullTypeName = composeSuiType( Unpause.$typeName, ...typeArgs ) as `${typeof PKG_V1}::treasury::Unpause<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UnpauseReified<ToPhantomTypeArgument<T0>> { return { typeName: Unpause.$typeName, fullTypeName: composeSuiType( Unpause.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::treasury::Unpause<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Unpause.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Unpause.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Unpause.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Unpause.fromBcs( T0, data, ), bcs: Unpause.bcs, fromJSONField: (field: any) => Unpause.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Unpause.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Unpause.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Unpause.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Unpause.fetch( client, T0, id, ), new: ( fields: UnpauseFields<ToPhantomTypeArgument<T0>>, ) => { return new Unpause( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Unpause.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Unpause<ToPhantomTypeArgument<T0>>>> { return phantom(Unpause.reified( T0 )); } static get p() { return Unpause.phantom }

 static get bcs() { return bcs.struct("Unpause", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Unpause<ToPhantomTypeArgument<T0>> { return Unpause.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Unpause<ToPhantomTypeArgument<T0>> { if (!isUnpause(item.type)) { throw new Error("not a Unpause type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Unpause.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Unpause<ToPhantomTypeArgument<T0>> { return Unpause.fromFields( typeArg, Unpause.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Unpause<ToPhantomTypeArgument<T0>> { return Unpause.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Unpause<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Unpause.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Unpause.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Unpause.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Unpause<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUnpause(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Unpause object`); } return Unpause.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Unpause<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUnpause(data.bcs.type)) { throw new Error(`object at is not a Unpause object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Unpause.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Unpause.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Unpause<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Unpause object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUnpause(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Unpause object`); }

 return Unpause.fromSuiObjectData( typeArg, res.data ); }

 }
