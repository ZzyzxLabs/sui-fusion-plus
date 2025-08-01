import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Bag} from "../../0x2/bag/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== BlocklisterChanged =============================== */

export function isBlocklisterChanged(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::BlocklisterChanged` + '<'); }

export interface BlocklisterChangedFields<T0 extends PhantomTypeArgument> { oldBlocklister: ToField<"address">; newBlocklister: ToField<"address"> }

export type BlocklisterChangedReified<T0 extends PhantomTypeArgument> = Reified< BlocklisterChanged<T0>, BlocklisterChangedFields<T0> >;

export class BlocklisterChanged<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::BlocklisterChanged`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = BlocklisterChanged.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::BlocklisterChanged<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = BlocklisterChanged.$isPhantom;

 readonly oldBlocklister: ToField<"address">; readonly newBlocklister: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: BlocklisterChangedFields<T0>, ) { this.$fullTypeName = composeSuiType( BlocklisterChanged.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::BlocklisterChanged<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldBlocklister = fields.oldBlocklister;; this.newBlocklister = fields.newBlocklister; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): BlocklisterChangedReified<ToPhantomTypeArgument<T0>> { return { typeName: BlocklisterChanged.$typeName, fullTypeName: composeSuiType( BlocklisterChanged.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::BlocklisterChanged<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: BlocklisterChanged.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => BlocklisterChanged.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BlocklisterChanged.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => BlocklisterChanged.fromBcs( T0, data, ), bcs: BlocklisterChanged.bcs, fromJSONField: (field: any) => BlocklisterChanged.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => BlocklisterChanged.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => BlocklisterChanged.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => BlocklisterChanged.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => BlocklisterChanged.fetch( client, T0, id, ), new: ( fields: BlocklisterChangedFields<ToPhantomTypeArgument<T0>>, ) => { return new BlocklisterChanged( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return BlocklisterChanged.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<BlocklisterChanged<ToPhantomTypeArgument<T0>>>> { return phantom(BlocklisterChanged.reified( T0 )); } static get p() { return BlocklisterChanged.phantom }

 static get bcs() { return bcs.struct("BlocklisterChanged", {

 old_blocklister: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_blocklister: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { return BlocklisterChanged.reified( typeArg, ).new( { oldBlocklister: decodeFromFields("address", fields.old_blocklister), newBlocklister: decodeFromFields("address", fields.new_blocklister) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { if (!isBlocklisterChanged(item.type)) { throw new Error("not a BlocklisterChanged type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return BlocklisterChanged.reified( typeArg, ).new( { oldBlocklister: decodeFromFieldsWithTypes("address", item.fields.old_blocklister), newBlocklister: decodeFromFieldsWithTypes("address", item.fields.new_blocklister) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { return BlocklisterChanged.fromFields( typeArg, BlocklisterChanged.bcs.parse(data) ) }

 toJSONField() { return {

 oldBlocklister: this.oldBlocklister,newBlocklister: this.newBlocklister,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { return BlocklisterChanged.reified( typeArg, ).new( { oldBlocklister: decodeFromJSONField("address", field.oldBlocklister), newBlocklister: decodeFromJSONField("address", field.newBlocklister) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { if (json.$typeName !== BlocklisterChanged.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(BlocklisterChanged.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return BlocklisterChanged.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBlocklisterChanged(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BlocklisterChanged object`); } return BlocklisterChanged.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): BlocklisterChanged<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBlocklisterChanged(data.bcs.type)) { throw new Error(`object at is not a BlocklisterChanged object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return BlocklisterChanged.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BlocklisterChanged.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<BlocklisterChanged<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BlocklisterChanged object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBlocklisterChanged(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BlocklisterChanged object`); }

 return BlocklisterChanged.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== BlocklisterKey =============================== */

export function isBlocklisterKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::roles::BlocklisterKey`; }

export interface BlocklisterKeyFields { dummyField: ToField<"bool"> }

export type BlocklisterKeyReified = Reified< BlocklisterKey, BlocklisterKeyFields >;

export class BlocklisterKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::BlocklisterKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = BlocklisterKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::BlocklisterKey`; readonly $typeArgs: []; readonly $isPhantom = BlocklisterKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: BlocklisterKeyFields, ) { this.$fullTypeName = composeSuiType( BlocklisterKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::BlocklisterKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): BlocklisterKeyReified { return { typeName: BlocklisterKey.$typeName, fullTypeName: composeSuiType( BlocklisterKey.$typeName, ...[] ) as `${typeof PKG_V1}::roles::BlocklisterKey`, typeArgs: [ ] as [], isPhantom: BlocklisterKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => BlocklisterKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => BlocklisterKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => BlocklisterKey.fromBcs( data, ), bcs: BlocklisterKey.bcs, fromJSONField: (field: any) => BlocklisterKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => BlocklisterKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => BlocklisterKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => BlocklisterKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => BlocklisterKey.fetch( client, id, ), new: ( fields: BlocklisterKeyFields, ) => { return new BlocklisterKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return BlocklisterKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<BlocklisterKey>> { return phantom(BlocklisterKey.reified( )); } static get p() { return BlocklisterKey.phantom() }

 static get bcs() { return bcs.struct("BlocklisterKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): BlocklisterKey { return BlocklisterKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): BlocklisterKey { if (!isBlocklisterKey(item.type)) { throw new Error("not a BlocklisterKey type");

 }

 return BlocklisterKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): BlocklisterKey { return BlocklisterKey.fromFields( BlocklisterKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): BlocklisterKey { return BlocklisterKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): BlocklisterKey { if (json.$typeName !== BlocklisterKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return BlocklisterKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): BlocklisterKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isBlocklisterKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a BlocklisterKey object`); } return BlocklisterKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): BlocklisterKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isBlocklisterKey(data.bcs.type)) { throw new Error(`object at is not a BlocklisterKey object`); }

 return BlocklisterKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return BlocklisterKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<BlocklisterKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching BlocklisterKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isBlocklisterKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a BlocklisterKey object`); }

 return BlocklisterKey.fromSuiObjectData( res.data ); }

 }

/* ============================== MasterMinterChanged =============================== */

export function isMasterMinterChanged(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::MasterMinterChanged` + '<'); }

export interface MasterMinterChangedFields<T0 extends PhantomTypeArgument> { oldMasterMinter: ToField<"address">; newMasterMinter: ToField<"address"> }

export type MasterMinterChangedReified<T0 extends PhantomTypeArgument> = Reified< MasterMinterChanged<T0>, MasterMinterChangedFields<T0> >;

export class MasterMinterChanged<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::MasterMinterChanged`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MasterMinterChanged.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::MasterMinterChanged<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MasterMinterChanged.$isPhantom;

 readonly oldMasterMinter: ToField<"address">; readonly newMasterMinter: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MasterMinterChangedFields<T0>, ) { this.$fullTypeName = composeSuiType( MasterMinterChanged.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::MasterMinterChanged<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldMasterMinter = fields.oldMasterMinter;; this.newMasterMinter = fields.newMasterMinter; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MasterMinterChangedReified<ToPhantomTypeArgument<T0>> { return { typeName: MasterMinterChanged.$typeName, fullTypeName: composeSuiType( MasterMinterChanged.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::MasterMinterChanged<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MasterMinterChanged.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MasterMinterChanged.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MasterMinterChanged.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MasterMinterChanged.fromBcs( T0, data, ), bcs: MasterMinterChanged.bcs, fromJSONField: (field: any) => MasterMinterChanged.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MasterMinterChanged.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MasterMinterChanged.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MasterMinterChanged.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MasterMinterChanged.fetch( client, T0, id, ), new: ( fields: MasterMinterChangedFields<ToPhantomTypeArgument<T0>>, ) => { return new MasterMinterChanged( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MasterMinterChanged.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MasterMinterChanged<ToPhantomTypeArgument<T0>>>> { return phantom(MasterMinterChanged.reified( T0 )); } static get p() { return MasterMinterChanged.phantom }

 static get bcs() { return bcs.struct("MasterMinterChanged", {

 old_master_minter: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_master_minter: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { return MasterMinterChanged.reified( typeArg, ).new( { oldMasterMinter: decodeFromFields("address", fields.old_master_minter), newMasterMinter: decodeFromFields("address", fields.new_master_minter) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { if (!isMasterMinterChanged(item.type)) { throw new Error("not a MasterMinterChanged type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MasterMinterChanged.reified( typeArg, ).new( { oldMasterMinter: decodeFromFieldsWithTypes("address", item.fields.old_master_minter), newMasterMinter: decodeFromFieldsWithTypes("address", item.fields.new_master_minter) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { return MasterMinterChanged.fromFields( typeArg, MasterMinterChanged.bcs.parse(data) ) }

 toJSONField() { return {

 oldMasterMinter: this.oldMasterMinter,newMasterMinter: this.newMasterMinter,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { return MasterMinterChanged.reified( typeArg, ).new( { oldMasterMinter: decodeFromJSONField("address", field.oldMasterMinter), newMasterMinter: decodeFromJSONField("address", field.newMasterMinter) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MasterMinterChanged.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MasterMinterChanged.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MasterMinterChanged.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMasterMinterChanged(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MasterMinterChanged object`); } return MasterMinterChanged.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MasterMinterChanged<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMasterMinterChanged(data.bcs.type)) { throw new Error(`object at is not a MasterMinterChanged object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MasterMinterChanged.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MasterMinterChanged.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MasterMinterChanged<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MasterMinterChanged object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMasterMinterChanged(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MasterMinterChanged object`); }

 return MasterMinterChanged.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MasterMinterKey =============================== */

export function isMasterMinterKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::roles::MasterMinterKey`; }

export interface MasterMinterKeyFields { dummyField: ToField<"bool"> }

export type MasterMinterKeyReified = Reified< MasterMinterKey, MasterMinterKeyFields >;

export class MasterMinterKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::MasterMinterKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = MasterMinterKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::MasterMinterKey`; readonly $typeArgs: []; readonly $isPhantom = MasterMinterKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: MasterMinterKeyFields, ) { this.$fullTypeName = composeSuiType( MasterMinterKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::MasterMinterKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): MasterMinterKeyReified { return { typeName: MasterMinterKey.$typeName, fullTypeName: composeSuiType( MasterMinterKey.$typeName, ...[] ) as `${typeof PKG_V1}::roles::MasterMinterKey`, typeArgs: [ ] as [], isPhantom: MasterMinterKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MasterMinterKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MasterMinterKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MasterMinterKey.fromBcs( data, ), bcs: MasterMinterKey.bcs, fromJSONField: (field: any) => MasterMinterKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MasterMinterKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MasterMinterKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => MasterMinterKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => MasterMinterKey.fetch( client, id, ), new: ( fields: MasterMinterKeyFields, ) => { return new MasterMinterKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MasterMinterKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MasterMinterKey>> { return phantom(MasterMinterKey.reified( )); } static get p() { return MasterMinterKey.phantom() }

 static get bcs() { return bcs.struct("MasterMinterKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): MasterMinterKey { return MasterMinterKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MasterMinterKey { if (!isMasterMinterKey(item.type)) { throw new Error("not a MasterMinterKey type");

 }

 return MasterMinterKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): MasterMinterKey { return MasterMinterKey.fromFields( MasterMinterKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MasterMinterKey { return MasterMinterKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): MasterMinterKey { if (json.$typeName !== MasterMinterKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MasterMinterKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MasterMinterKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMasterMinterKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MasterMinterKey object`); } return MasterMinterKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): MasterMinterKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMasterMinterKey(data.bcs.type)) { throw new Error(`object at is not a MasterMinterKey object`); }

 return MasterMinterKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MasterMinterKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<MasterMinterKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MasterMinterKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMasterMinterKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MasterMinterKey object`); }

 return MasterMinterKey.fromSuiObjectData( res.data ); }

 }

/* ============================== MetadataUpdaterChanged =============================== */

export function isMetadataUpdaterChanged(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::MetadataUpdaterChanged` + '<'); }

export interface MetadataUpdaterChangedFields<T0 extends PhantomTypeArgument> { oldMetadataUpdater: ToField<"address">; newMetadataUpdater: ToField<"address"> }

export type MetadataUpdaterChangedReified<T0 extends PhantomTypeArgument> = Reified< MetadataUpdaterChanged<T0>, MetadataUpdaterChangedFields<T0> >;

export class MetadataUpdaterChanged<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::MetadataUpdaterChanged`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = MetadataUpdaterChanged.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::MetadataUpdaterChanged<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = MetadataUpdaterChanged.$isPhantom;

 readonly oldMetadataUpdater: ToField<"address">; readonly newMetadataUpdater: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: MetadataUpdaterChangedFields<T0>, ) { this.$fullTypeName = composeSuiType( MetadataUpdaterChanged.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::MetadataUpdaterChanged<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldMetadataUpdater = fields.oldMetadataUpdater;; this.newMetadataUpdater = fields.newMetadataUpdater; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): MetadataUpdaterChangedReified<ToPhantomTypeArgument<T0>> { return { typeName: MetadataUpdaterChanged.$typeName, fullTypeName: composeSuiType( MetadataUpdaterChanged.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::MetadataUpdaterChanged<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: MetadataUpdaterChanged.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => MetadataUpdaterChanged.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MetadataUpdaterChanged.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => MetadataUpdaterChanged.fromBcs( T0, data, ), bcs: MetadataUpdaterChanged.bcs, fromJSONField: (field: any) => MetadataUpdaterChanged.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => MetadataUpdaterChanged.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => MetadataUpdaterChanged.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => MetadataUpdaterChanged.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => MetadataUpdaterChanged.fetch( client, T0, id, ), new: ( fields: MetadataUpdaterChangedFields<ToPhantomTypeArgument<T0>>, ) => { return new MetadataUpdaterChanged( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return MetadataUpdaterChanged.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<MetadataUpdaterChanged<ToPhantomTypeArgument<T0>>>> { return phantom(MetadataUpdaterChanged.reified( T0 )); } static get p() { return MetadataUpdaterChanged.phantom }

 static get bcs() { return bcs.struct("MetadataUpdaterChanged", {

 old_metadata_updater: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_metadata_updater: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { return MetadataUpdaterChanged.reified( typeArg, ).new( { oldMetadataUpdater: decodeFromFields("address", fields.old_metadata_updater), newMetadataUpdater: decodeFromFields("address", fields.new_metadata_updater) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { if (!isMetadataUpdaterChanged(item.type)) { throw new Error("not a MetadataUpdaterChanged type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return MetadataUpdaterChanged.reified( typeArg, ).new( { oldMetadataUpdater: decodeFromFieldsWithTypes("address", item.fields.old_metadata_updater), newMetadataUpdater: decodeFromFieldsWithTypes("address", item.fields.new_metadata_updater) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { return MetadataUpdaterChanged.fromFields( typeArg, MetadataUpdaterChanged.bcs.parse(data) ) }

 toJSONField() { return {

 oldMetadataUpdater: this.oldMetadataUpdater,newMetadataUpdater: this.newMetadataUpdater,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { return MetadataUpdaterChanged.reified( typeArg, ).new( { oldMetadataUpdater: decodeFromJSONField("address", field.oldMetadataUpdater), newMetadataUpdater: decodeFromJSONField("address", field.newMetadataUpdater) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { if (json.$typeName !== MetadataUpdaterChanged.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(MetadataUpdaterChanged.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return MetadataUpdaterChanged.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMetadataUpdaterChanged(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MetadataUpdaterChanged object`); } return MetadataUpdaterChanged.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): MetadataUpdaterChanged<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMetadataUpdaterChanged(data.bcs.type)) { throw new Error(`object at is not a MetadataUpdaterChanged object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return MetadataUpdaterChanged.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MetadataUpdaterChanged.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<MetadataUpdaterChanged<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MetadataUpdaterChanged object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMetadataUpdaterChanged(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MetadataUpdaterChanged object`); }

 return MetadataUpdaterChanged.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== MetadataUpdaterKey =============================== */

export function isMetadataUpdaterKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::roles::MetadataUpdaterKey`; }

export interface MetadataUpdaterKeyFields { dummyField: ToField<"bool"> }

export type MetadataUpdaterKeyReified = Reified< MetadataUpdaterKey, MetadataUpdaterKeyFields >;

export class MetadataUpdaterKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::MetadataUpdaterKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = MetadataUpdaterKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::MetadataUpdaterKey`; readonly $typeArgs: []; readonly $isPhantom = MetadataUpdaterKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: MetadataUpdaterKeyFields, ) { this.$fullTypeName = composeSuiType( MetadataUpdaterKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::MetadataUpdaterKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): MetadataUpdaterKeyReified { return { typeName: MetadataUpdaterKey.$typeName, fullTypeName: composeSuiType( MetadataUpdaterKey.$typeName, ...[] ) as `${typeof PKG_V1}::roles::MetadataUpdaterKey`, typeArgs: [ ] as [], isPhantom: MetadataUpdaterKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => MetadataUpdaterKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => MetadataUpdaterKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => MetadataUpdaterKey.fromBcs( data, ), bcs: MetadataUpdaterKey.bcs, fromJSONField: (field: any) => MetadataUpdaterKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => MetadataUpdaterKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => MetadataUpdaterKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => MetadataUpdaterKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => MetadataUpdaterKey.fetch( client, id, ), new: ( fields: MetadataUpdaterKeyFields, ) => { return new MetadataUpdaterKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return MetadataUpdaterKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<MetadataUpdaterKey>> { return phantom(MetadataUpdaterKey.reified( )); } static get p() { return MetadataUpdaterKey.phantom() }

 static get bcs() { return bcs.struct("MetadataUpdaterKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): MetadataUpdaterKey { return MetadataUpdaterKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): MetadataUpdaterKey { if (!isMetadataUpdaterKey(item.type)) { throw new Error("not a MetadataUpdaterKey type");

 }

 return MetadataUpdaterKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): MetadataUpdaterKey { return MetadataUpdaterKey.fromFields( MetadataUpdaterKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): MetadataUpdaterKey { return MetadataUpdaterKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): MetadataUpdaterKey { if (json.$typeName !== MetadataUpdaterKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return MetadataUpdaterKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): MetadataUpdaterKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isMetadataUpdaterKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a MetadataUpdaterKey object`); } return MetadataUpdaterKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): MetadataUpdaterKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isMetadataUpdaterKey(data.bcs.type)) { throw new Error(`object at is not a MetadataUpdaterKey object`); }

 return MetadataUpdaterKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return MetadataUpdaterKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<MetadataUpdaterKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching MetadataUpdaterKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isMetadataUpdaterKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a MetadataUpdaterKey object`); }

 return MetadataUpdaterKey.fromSuiObjectData( res.data ); }

 }

/* ============================== OwnerKey =============================== */

export function isOwnerKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::roles::OwnerKey`; }

export interface OwnerKeyFields { dummyField: ToField<"bool"> }

export type OwnerKeyReified = Reified< OwnerKey, OwnerKeyFields >;

export class OwnerKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::OwnerKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = OwnerKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::OwnerKey`; readonly $typeArgs: []; readonly $isPhantom = OwnerKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: OwnerKeyFields, ) { this.$fullTypeName = composeSuiType( OwnerKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::OwnerKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): OwnerKeyReified { return { typeName: OwnerKey.$typeName, fullTypeName: composeSuiType( OwnerKey.$typeName, ...[] ) as `${typeof PKG_V1}::roles::OwnerKey`, typeArgs: [ ] as [], isPhantom: OwnerKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => OwnerKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OwnerKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => OwnerKey.fromBcs( data, ), bcs: OwnerKey.bcs, fromJSONField: (field: any) => OwnerKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => OwnerKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => OwnerKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => OwnerKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => OwnerKey.fetch( client, id, ), new: ( fields: OwnerKeyFields, ) => { return new OwnerKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return OwnerKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<OwnerKey>> { return phantom(OwnerKey.reified( )); } static get p() { return OwnerKey.phantom() }

 static get bcs() { return bcs.struct("OwnerKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): OwnerKey { return OwnerKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): OwnerKey { if (!isOwnerKey(item.type)) { throw new Error("not a OwnerKey type");

 }

 return OwnerKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): OwnerKey { return OwnerKey.fromFields( OwnerKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): OwnerKey { return OwnerKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): OwnerKey { if (json.$typeName !== OwnerKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return OwnerKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): OwnerKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOwnerKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OwnerKey object`); } return OwnerKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): OwnerKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOwnerKey(data.bcs.type)) { throw new Error(`object at is not a OwnerKey object`); }

 return OwnerKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OwnerKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<OwnerKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OwnerKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOwnerKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OwnerKey object`); }

 return OwnerKey.fromSuiObjectData( res.data ); }

 }

/* ============================== OwnerRole =============================== */

export function isOwnerRole(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::OwnerRole` + '<'); }

export interface OwnerRoleFields<T0 extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type OwnerRoleReified<T0 extends PhantomTypeArgument> = Reified< OwnerRole<T0>, OwnerRoleFields<T0> >;

export class OwnerRole<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::OwnerRole`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = OwnerRole.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::OwnerRole<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = OwnerRole.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: OwnerRoleFields<T0>, ) { this.$fullTypeName = composeSuiType( OwnerRole.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::OwnerRole<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): OwnerRoleReified<ToPhantomTypeArgument<T0>> { return { typeName: OwnerRole.$typeName, fullTypeName: composeSuiType( OwnerRole.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::OwnerRole<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: OwnerRole.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => OwnerRole.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => OwnerRole.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => OwnerRole.fromBcs( T0, data, ), bcs: OwnerRole.bcs, fromJSONField: (field: any) => OwnerRole.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => OwnerRole.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => OwnerRole.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => OwnerRole.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => OwnerRole.fetch( client, T0, id, ), new: ( fields: OwnerRoleFields<ToPhantomTypeArgument<T0>>, ) => { return new OwnerRole( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return OwnerRole.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<OwnerRole<ToPhantomTypeArgument<T0>>>> { return phantom(OwnerRole.reified( T0 )); } static get p() { return OwnerRole.phantom }

 static get bcs() { return bcs.struct("OwnerRole", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): OwnerRole<ToPhantomTypeArgument<T0>> { return OwnerRole.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): OwnerRole<ToPhantomTypeArgument<T0>> { if (!isOwnerRole(item.type)) { throw new Error("not a OwnerRole type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return OwnerRole.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): OwnerRole<ToPhantomTypeArgument<T0>> { return OwnerRole.fromFields( typeArg, OwnerRole.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): OwnerRole<ToPhantomTypeArgument<T0>> { return OwnerRole.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): OwnerRole<ToPhantomTypeArgument<T0>> { if (json.$typeName !== OwnerRole.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(OwnerRole.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return OwnerRole.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): OwnerRole<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOwnerRole(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a OwnerRole object`); } return OwnerRole.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): OwnerRole<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOwnerRole(data.bcs.type)) { throw new Error(`object at is not a OwnerRole object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return OwnerRole.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return OwnerRole.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<OwnerRole<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching OwnerRole object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOwnerRole(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a OwnerRole object`); }

 return OwnerRole.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== PauserChanged =============================== */

export function isPauserChanged(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::PauserChanged` + '<'); }

export interface PauserChangedFields<T0 extends PhantomTypeArgument> { oldPauser: ToField<"address">; newPauser: ToField<"address"> }

export type PauserChangedReified<T0 extends PhantomTypeArgument> = Reified< PauserChanged<T0>, PauserChangedFields<T0> >;

export class PauserChanged<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::PauserChanged`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = PauserChanged.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::PauserChanged<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = PauserChanged.$isPhantom;

 readonly oldPauser: ToField<"address">; readonly newPauser: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: PauserChangedFields<T0>, ) { this.$fullTypeName = composeSuiType( PauserChanged.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::PauserChanged<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldPauser = fields.oldPauser;; this.newPauser = fields.newPauser; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PauserChangedReified<ToPhantomTypeArgument<T0>> { return { typeName: PauserChanged.$typeName, fullTypeName: composeSuiType( PauserChanged.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::PauserChanged<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: PauserChanged.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => PauserChanged.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PauserChanged.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => PauserChanged.fromBcs( T0, data, ), bcs: PauserChanged.bcs, fromJSONField: (field: any) => PauserChanged.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => PauserChanged.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => PauserChanged.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => PauserChanged.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => PauserChanged.fetch( client, T0, id, ), new: ( fields: PauserChangedFields<ToPhantomTypeArgument<T0>>, ) => { return new PauserChanged( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return PauserChanged.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<PauserChanged<ToPhantomTypeArgument<T0>>>> { return phantom(PauserChanged.reified( T0 )); } static get p() { return PauserChanged.phantom }

 static get bcs() { return bcs.struct("PauserChanged", {

 old_pauser: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_pauser: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): PauserChanged<ToPhantomTypeArgument<T0>> { return PauserChanged.reified( typeArg, ).new( { oldPauser: decodeFromFields("address", fields.old_pauser), newPauser: decodeFromFields("address", fields.new_pauser) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): PauserChanged<ToPhantomTypeArgument<T0>> { if (!isPauserChanged(item.type)) { throw new Error("not a PauserChanged type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return PauserChanged.reified( typeArg, ).new( { oldPauser: decodeFromFieldsWithTypes("address", item.fields.old_pauser), newPauser: decodeFromFieldsWithTypes("address", item.fields.new_pauser) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): PauserChanged<ToPhantomTypeArgument<T0>> { return PauserChanged.fromFields( typeArg, PauserChanged.bcs.parse(data) ) }

 toJSONField() { return {

 oldPauser: this.oldPauser,newPauser: this.newPauser,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): PauserChanged<ToPhantomTypeArgument<T0>> { return PauserChanged.reified( typeArg, ).new( { oldPauser: decodeFromJSONField("address", field.oldPauser), newPauser: decodeFromJSONField("address", field.newPauser) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): PauserChanged<ToPhantomTypeArgument<T0>> { if (json.$typeName !== PauserChanged.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(PauserChanged.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return PauserChanged.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): PauserChanged<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPauserChanged(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PauserChanged object`); } return PauserChanged.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): PauserChanged<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPauserChanged(data.bcs.type)) { throw new Error(`object at is not a PauserChanged object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return PauserChanged.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PauserChanged.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<PauserChanged<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PauserChanged object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPauserChanged(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PauserChanged object`); }

 return PauserChanged.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== PauserKey =============================== */

export function isPauserKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::roles::PauserKey`; }

export interface PauserKeyFields { dummyField: ToField<"bool"> }

export type PauserKeyReified = Reified< PauserKey, PauserKeyFields >;

export class PauserKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::PauserKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = PauserKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::PauserKey`; readonly $typeArgs: []; readonly $isPhantom = PauserKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: PauserKeyFields, ) { this.$fullTypeName = composeSuiType( PauserKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::PauserKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): PauserKeyReified { return { typeName: PauserKey.$typeName, fullTypeName: composeSuiType( PauserKey.$typeName, ...[] ) as `${typeof PKG_V1}::roles::PauserKey`, typeArgs: [ ] as [], isPhantom: PauserKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => PauserKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => PauserKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => PauserKey.fromBcs( data, ), bcs: PauserKey.bcs, fromJSONField: (field: any) => PauserKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => PauserKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => PauserKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => PauserKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => PauserKey.fetch( client, id, ), new: ( fields: PauserKeyFields, ) => { return new PauserKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return PauserKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<PauserKey>> { return phantom(PauserKey.reified( )); } static get p() { return PauserKey.phantom() }

 static get bcs() { return bcs.struct("PauserKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): PauserKey { return PauserKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): PauserKey { if (!isPauserKey(item.type)) { throw new Error("not a PauserKey type");

 }

 return PauserKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): PauserKey { return PauserKey.fromFields( PauserKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): PauserKey { return PauserKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): PauserKey { if (json.$typeName !== PauserKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return PauserKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): PauserKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isPauserKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a PauserKey object`); } return PauserKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): PauserKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isPauserKey(data.bcs.type)) { throw new Error(`object at is not a PauserKey object`); }

 return PauserKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return PauserKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<PauserKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching PauserKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isPauserKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a PauserKey object`); }

 return PauserKey.fromSuiObjectData( res.data ); }

 }

/* ============================== Roles =============================== */

export function isRoles(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::roles::Roles` + '<'); }

export interface RolesFields<T0 extends PhantomTypeArgument> { data: ToField<Bag> }

export type RolesReified<T0 extends PhantomTypeArgument> = Reified< Roles<T0>, RolesFields<T0> >;

export class Roles<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::roles::Roles`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = Roles.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::roles::Roles<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = Roles.$isPhantom;

 readonly data: ToField<Bag>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RolesFields<T0>, ) { this.$fullTypeName = composeSuiType( Roles.$typeName, ...typeArgs ) as `${typeof PKG_V1}::roles::Roles<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.data = fields.data; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): RolesReified<ToPhantomTypeArgument<T0>> { return { typeName: Roles.$typeName, fullTypeName: composeSuiType( Roles.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::roles::Roles<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: Roles.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => Roles.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Roles.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => Roles.fromBcs( T0, data, ), bcs: Roles.bcs, fromJSONField: (field: any) => Roles.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => Roles.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => Roles.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => Roles.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => Roles.fetch( client, T0, id, ), new: ( fields: RolesFields<ToPhantomTypeArgument<T0>>, ) => { return new Roles( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Roles.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<Roles<ToPhantomTypeArgument<T0>>>> { return phantom(Roles.reified( T0 )); } static get p() { return Roles.phantom }

 static get bcs() { return bcs.struct("Roles", {

 data: Bag.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): Roles<ToPhantomTypeArgument<T0>> { return Roles.reified( typeArg, ).new( { data: decodeFromFields(Bag.reified(), fields.data) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): Roles<ToPhantomTypeArgument<T0>> { if (!isRoles(item.type)) { throw new Error("not a Roles type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Roles.reified( typeArg, ).new( { data: decodeFromFieldsWithTypes(Bag.reified(), item.fields.data) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): Roles<ToPhantomTypeArgument<T0>> { return Roles.fromFields( typeArg, Roles.bcs.parse(data) ) }

 toJSONField() { return {

 data: this.data.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): Roles<ToPhantomTypeArgument<T0>> { return Roles.reified( typeArg, ).new( { data: decodeFromJSONField(Bag.reified(), field.data) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): Roles<ToPhantomTypeArgument<T0>> { if (json.$typeName !== Roles.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Roles.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Roles.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): Roles<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRoles(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Roles object`); } return Roles.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): Roles<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRoles(data.bcs.type)) { throw new Error(`object at is not a Roles object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Roles.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Roles.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<Roles<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Roles object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRoles(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Roles object`); }

 return Roles.fromSuiObjectData( typeArg, res.data ); }

 }
