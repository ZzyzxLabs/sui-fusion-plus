import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Option} from "../../0x1/option/structs";
import {PKG_V1} from "../index";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64, fromHEX, toHEX} from "@mysten/sui/utils";

/* ============================== RoleTransferStarted =============================== */

export function isRoleTransferStarted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::two_step_role::RoleTransferStarted` + '<'); }

export interface RoleTransferStartedFields<T0 extends PhantomTypeArgument> { oldAddress: ToField<"address">; newAddress: ToField<"address"> }

export type RoleTransferStartedReified<T0 extends PhantomTypeArgument> = Reified< RoleTransferStarted<T0>, RoleTransferStartedFields<T0> >;

export class RoleTransferStarted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::two_step_role::RoleTransferStarted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = RoleTransferStarted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = RoleTransferStarted.$isPhantom;

 readonly oldAddress: ToField<"address">; readonly newAddress: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RoleTransferStartedFields<T0>, ) { this.$fullTypeName = composeSuiType( RoleTransferStarted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldAddress = fields.oldAddress;; this.newAddress = fields.newAddress; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): RoleTransferStartedReified<ToPhantomTypeArgument<T0>> { return { typeName: RoleTransferStarted.$typeName, fullTypeName: composeSuiType( RoleTransferStarted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::two_step_role::RoleTransferStarted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: RoleTransferStarted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => RoleTransferStarted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RoleTransferStarted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => RoleTransferStarted.fromBcs( T0, data, ), bcs: RoleTransferStarted.bcs, fromJSONField: (field: any) => RoleTransferStarted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => RoleTransferStarted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => RoleTransferStarted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => RoleTransferStarted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => RoleTransferStarted.fetch( client, T0, id, ), new: ( fields: RoleTransferStartedFields<ToPhantomTypeArgument<T0>>, ) => { return new RoleTransferStarted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return RoleTransferStarted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<RoleTransferStarted<ToPhantomTypeArgument<T0>>>> { return phantom(RoleTransferStarted.reified( T0 )); } static get p() { return RoleTransferStarted.phantom }

 static get bcs() { return bcs.struct("RoleTransferStarted", {

 old_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { return RoleTransferStarted.reified( typeArg, ).new( { oldAddress: decodeFromFields("address", fields.old_address), newAddress: decodeFromFields("address", fields.new_address) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { if (!isRoleTransferStarted(item.type)) { throw new Error("not a RoleTransferStarted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return RoleTransferStarted.reified( typeArg, ).new( { oldAddress: decodeFromFieldsWithTypes("address", item.fields.old_address), newAddress: decodeFromFieldsWithTypes("address", item.fields.new_address) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { return RoleTransferStarted.fromFields( typeArg, RoleTransferStarted.bcs.parse(data) ) }

 toJSONField() { return {

 oldAddress: this.oldAddress,newAddress: this.newAddress,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { return RoleTransferStarted.reified( typeArg, ).new( { oldAddress: decodeFromJSONField("address", field.oldAddress), newAddress: decodeFromJSONField("address", field.newAddress) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== RoleTransferStarted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(RoleTransferStarted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return RoleTransferStarted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRoleTransferStarted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RoleTransferStarted object`); } return RoleTransferStarted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): RoleTransferStarted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRoleTransferStarted(data.bcs.type)) { throw new Error(`object at is not a RoleTransferStarted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return RoleTransferStarted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return RoleTransferStarted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<RoleTransferStarted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RoleTransferStarted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRoleTransferStarted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RoleTransferStarted object`); }

 return RoleTransferStarted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== RoleTransferred =============================== */

export function isRoleTransferred(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::two_step_role::RoleTransferred` + '<'); }

export interface RoleTransferredFields<T0 extends PhantomTypeArgument> { oldAddress: ToField<"address">; newAddress: ToField<"address"> }

export type RoleTransferredReified<T0 extends PhantomTypeArgument> = Reified< RoleTransferred<T0>, RoleTransferredFields<T0> >;

export class RoleTransferred<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::two_step_role::RoleTransferred`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = RoleTransferred.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = RoleTransferred.$isPhantom;

 readonly oldAddress: ToField<"address">; readonly newAddress: ToField<"address">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: RoleTransferredFields<T0>, ) { this.$fullTypeName = composeSuiType( RoleTransferred.$typeName, ...typeArgs ) as `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.oldAddress = fields.oldAddress;; this.newAddress = fields.newAddress; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): RoleTransferredReified<ToPhantomTypeArgument<T0>> { return { typeName: RoleTransferred.$typeName, fullTypeName: composeSuiType( RoleTransferred.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::two_step_role::RoleTransferred<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: RoleTransferred.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => RoleTransferred.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => RoleTransferred.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => RoleTransferred.fromBcs( T0, data, ), bcs: RoleTransferred.bcs, fromJSONField: (field: any) => RoleTransferred.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => RoleTransferred.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => RoleTransferred.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => RoleTransferred.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => RoleTransferred.fetch( client, T0, id, ), new: ( fields: RoleTransferredFields<ToPhantomTypeArgument<T0>>, ) => { return new RoleTransferred( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return RoleTransferred.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<RoleTransferred<ToPhantomTypeArgument<T0>>>> { return phantom(RoleTransferred.reified( T0 )); } static get p() { return RoleTransferred.phantom }

 static get bcs() { return bcs.struct("RoleTransferred", {

 old_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), new_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), })

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): RoleTransferred<ToPhantomTypeArgument<T0>> { return RoleTransferred.reified( typeArg, ).new( { oldAddress: decodeFromFields("address", fields.old_address), newAddress: decodeFromFields("address", fields.new_address) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): RoleTransferred<ToPhantomTypeArgument<T0>> { if (!isRoleTransferred(item.type)) { throw new Error("not a RoleTransferred type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return RoleTransferred.reified( typeArg, ).new( { oldAddress: decodeFromFieldsWithTypes("address", item.fields.old_address), newAddress: decodeFromFieldsWithTypes("address", item.fields.new_address) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): RoleTransferred<ToPhantomTypeArgument<T0>> { return RoleTransferred.fromFields( typeArg, RoleTransferred.bcs.parse(data) ) }

 toJSONField() { return {

 oldAddress: this.oldAddress,newAddress: this.newAddress,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): RoleTransferred<ToPhantomTypeArgument<T0>> { return RoleTransferred.reified( typeArg, ).new( { oldAddress: decodeFromJSONField("address", field.oldAddress), newAddress: decodeFromJSONField("address", field.newAddress) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): RoleTransferred<ToPhantomTypeArgument<T0>> { if (json.$typeName !== RoleTransferred.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(RoleTransferred.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return RoleTransferred.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): RoleTransferred<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isRoleTransferred(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a RoleTransferred object`); } return RoleTransferred.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): RoleTransferred<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isRoleTransferred(data.bcs.type)) { throw new Error(`object at is not a RoleTransferred object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return RoleTransferred.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return RoleTransferred.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<RoleTransferred<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching RoleTransferred object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isRoleTransferred(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a RoleTransferred object`); }

 return RoleTransferred.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== TwoStepRole =============================== */

export function isTwoStepRole(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::two_step_role::TwoStepRole` + '<'); }

export interface TwoStepRoleFields<T0 extends PhantomTypeArgument> { activeAddress: ToField<"address">; pendingAddress: ToField<Option<"address">> }

export type TwoStepRoleReified<T0 extends PhantomTypeArgument> = Reified< TwoStepRole<T0>, TwoStepRoleFields<T0> >;

export class TwoStepRole<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::two_step_role::TwoStepRole`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = TwoStepRole.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = TwoStepRole.$isPhantom;

 readonly activeAddress: ToField<"address">; readonly pendingAddress: ToField<Option<"address">>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: TwoStepRoleFields<T0>, ) { this.$fullTypeName = composeSuiType( TwoStepRole.$typeName, ...typeArgs ) as `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.activeAddress = fields.activeAddress;; this.pendingAddress = fields.pendingAddress; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): TwoStepRoleReified<ToPhantomTypeArgument<T0>> { return { typeName: TwoStepRole.$typeName, fullTypeName: composeSuiType( TwoStepRole.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::two_step_role::TwoStepRole<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: TwoStepRole.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => TwoStepRole.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => TwoStepRole.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => TwoStepRole.fromBcs( T0, data, ), bcs: TwoStepRole.bcs, fromJSONField: (field: any) => TwoStepRole.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => TwoStepRole.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => TwoStepRole.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => TwoStepRole.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => TwoStepRole.fetch( client, T0, id, ), new: ( fields: TwoStepRoleFields<ToPhantomTypeArgument<T0>>, ) => { return new TwoStepRole( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return TwoStepRole.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<TwoStepRole<ToPhantomTypeArgument<T0>>>> { return phantom(TwoStepRole.reified( T0 )); } static get p() { return TwoStepRole.phantom }

 static get bcs() { return bcs.struct("TwoStepRole", {

 active_address: bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }), pending_address: Option.bcs(bcs.bytes(32).transform({ input: (val: string) => fromHEX(val), output: (val: Uint8Array) => toHEX(val), }))

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): TwoStepRole<ToPhantomTypeArgument<T0>> { return TwoStepRole.reified( typeArg, ).new( { activeAddress: decodeFromFields("address", fields.active_address), pendingAddress: decodeFromFields(Option.reified("address"), fields.pending_address) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): TwoStepRole<ToPhantomTypeArgument<T0>> { if (!isTwoStepRole(item.type)) { throw new Error("not a TwoStepRole type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return TwoStepRole.reified( typeArg, ).new( { activeAddress: decodeFromFieldsWithTypes("address", item.fields.active_address), pendingAddress: decodeFromFieldsWithTypes(Option.reified("address"), item.fields.pending_address) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): TwoStepRole<ToPhantomTypeArgument<T0>> { return TwoStepRole.fromFields( typeArg, TwoStepRole.bcs.parse(data) ) }

 toJSONField() { return {

 activeAddress: this.activeAddress,pendingAddress: fieldToJSON<Option<"address">>(`${Option.$typeName}<address>`, this.pendingAddress),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): TwoStepRole<ToPhantomTypeArgument<T0>> { return TwoStepRole.reified( typeArg, ).new( { activeAddress: decodeFromJSONField("address", field.activeAddress), pendingAddress: decodeFromJSONField(Option.reified("address"), field.pendingAddress) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): TwoStepRole<ToPhantomTypeArgument<T0>> { if (json.$typeName !== TwoStepRole.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(TwoStepRole.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return TwoStepRole.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): TwoStepRole<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isTwoStepRole(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a TwoStepRole object`); } return TwoStepRole.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): TwoStepRole<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isTwoStepRole(data.bcs.type)) { throw new Error(`object at is not a TwoStepRole object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return TwoStepRole.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return TwoStepRole.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<TwoStepRole<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching TwoStepRole object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isTwoStepRole(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a TwoStepRole object`); }

 return TwoStepRole.fromSuiObjectData( typeArg, res.data ); }

 }
