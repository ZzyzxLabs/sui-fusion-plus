import * as reified from "../../../../_framework/reified";
import {PhantomReified, PhantomToTypeStr, PhantomTypeArgument, Reified, StructClass, ToField, ToPhantomTypeArgument, ToTypeStr, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, phantom, ToTypeStr as ToPhantom} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {ID, UID} from "../../0x2/object/structs";
import {PKG_V1} from "../index";
import {TwoStepRole} from "../two-step-role/structs";
import {bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== AdminRole =============================== */

export function isAdminRole(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::AdminRole` + '<'); }

export interface AdminRoleFields<T0 extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type AdminRoleReified<T0 extends PhantomTypeArgument> = Reified< AdminRole<T0>, AdminRoleFields<T0> >;

export class AdminRole<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::AdminRole`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = AdminRole.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = AdminRole.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: AdminRoleFields<T0>, ) { this.$fullTypeName = composeSuiType( AdminRole.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): AdminRoleReified<ToPhantomTypeArgument<T0>> { return { typeName: AdminRole.$typeName, fullTypeName: composeSuiType( AdminRole.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::AdminRole<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: AdminRole.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => AdminRole.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AdminRole.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => AdminRole.fromBcs( T0, data, ), bcs: AdminRole.bcs, fromJSONField: (field: any) => AdminRole.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => AdminRole.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => AdminRole.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => AdminRole.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => AdminRole.fetch( client, T0, id, ), new: ( fields: AdminRoleFields<ToPhantomTypeArgument<T0>>, ) => { return new AdminRole( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AdminRole.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<AdminRole<ToPhantomTypeArgument<T0>>>> { return phantom(AdminRole.reified( T0 )); } static get p() { return AdminRole.phantom }

 static get bcs() { return bcs.struct("AdminRole", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): AdminRole<ToPhantomTypeArgument<T0>> { return AdminRole.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): AdminRole<ToPhantomTypeArgument<T0>> { if (!isAdminRole(item.type)) { throw new Error("not a AdminRole type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AdminRole.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): AdminRole<ToPhantomTypeArgument<T0>> { return AdminRole.fromFields( typeArg, AdminRole.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): AdminRole<ToPhantomTypeArgument<T0>> { return AdminRole.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): AdminRole<ToPhantomTypeArgument<T0>> { if (json.$typeName !== AdminRole.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AdminRole.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AdminRole.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): AdminRole<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAdminRole(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AdminRole object`); } return AdminRole.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): AdminRole<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAdminRole(data.bcs.type)) { throw new Error(`object at is not a AdminRole object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AdminRole.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AdminRole.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<AdminRole<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AdminRole object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAdminRole(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AdminRole object`); }

 return AdminRole.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== AuthorizeUpgrade =============================== */

export function isAuthorizeUpgrade(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::AuthorizeUpgrade` + '<'); }

export interface AuthorizeUpgradeFields<T0 extends PhantomTypeArgument> { packageId: ToField<ID>; policy: ToField<"u8"> }

export type AuthorizeUpgradeReified<T0 extends PhantomTypeArgument> = Reified< AuthorizeUpgrade<T0>, AuthorizeUpgradeFields<T0> >;

export class AuthorizeUpgrade<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::AuthorizeUpgrade`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = AuthorizeUpgrade.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = AuthorizeUpgrade.$isPhantom;

 readonly packageId: ToField<ID>; readonly policy: ToField<"u8">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: AuthorizeUpgradeFields<T0>, ) { this.$fullTypeName = composeSuiType( AuthorizeUpgrade.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.packageId = fields.packageId;; this.policy = fields.policy; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): AuthorizeUpgradeReified<ToPhantomTypeArgument<T0>> { return { typeName: AuthorizeUpgrade.$typeName, fullTypeName: composeSuiType( AuthorizeUpgrade.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::AuthorizeUpgrade<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: AuthorizeUpgrade.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => AuthorizeUpgrade.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => AuthorizeUpgrade.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => AuthorizeUpgrade.fromBcs( T0, data, ), bcs: AuthorizeUpgrade.bcs, fromJSONField: (field: any) => AuthorizeUpgrade.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => AuthorizeUpgrade.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => AuthorizeUpgrade.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => AuthorizeUpgrade.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => AuthorizeUpgrade.fetch( client, T0, id, ), new: ( fields: AuthorizeUpgradeFields<ToPhantomTypeArgument<T0>>, ) => { return new AuthorizeUpgrade( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return AuthorizeUpgrade.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<AuthorizeUpgrade<ToPhantomTypeArgument<T0>>>> { return phantom(AuthorizeUpgrade.reified( T0 )); } static get p() { return AuthorizeUpgrade.phantom }

 static get bcs() { return bcs.struct("AuthorizeUpgrade", {

 package_id: ID.bcs, policy: bcs.u8()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { return AuthorizeUpgrade.reified( typeArg, ).new( { packageId: decodeFromFields(ID.reified(), fields.package_id), policy: decodeFromFields("u8", fields.policy) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { if (!isAuthorizeUpgrade(item.type)) { throw new Error("not a AuthorizeUpgrade type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return AuthorizeUpgrade.reified( typeArg, ).new( { packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id), policy: decodeFromFieldsWithTypes("u8", item.fields.policy) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { return AuthorizeUpgrade.fromFields( typeArg, AuthorizeUpgrade.bcs.parse(data) ) }

 toJSONField() { return {

 packageId: this.packageId,policy: this.policy,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { return AuthorizeUpgrade.reified( typeArg, ).new( { packageId: decodeFromJSONField(ID.reified(), field.packageId), policy: decodeFromJSONField("u8", field.policy) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { if (json.$typeName !== AuthorizeUpgrade.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(AuthorizeUpgrade.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return AuthorizeUpgrade.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isAuthorizeUpgrade(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a AuthorizeUpgrade object`); } return AuthorizeUpgrade.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): AuthorizeUpgrade<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isAuthorizeUpgrade(data.bcs.type)) { throw new Error(`object at is not a AuthorizeUpgrade object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return AuthorizeUpgrade.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return AuthorizeUpgrade.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<AuthorizeUpgrade<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching AuthorizeUpgrade object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isAuthorizeUpgrade(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a AuthorizeUpgrade object`); }

 return AuthorizeUpgrade.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== CommitUpgrade =============================== */

export function isCommitUpgrade(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::CommitUpgrade` + '<'); }

export interface CommitUpgradeFields<T0 extends PhantomTypeArgument> { packageId: ToField<ID> }

export type CommitUpgradeReified<T0 extends PhantomTypeArgument> = Reified< CommitUpgrade<T0>, CommitUpgradeFields<T0> >;

export class CommitUpgrade<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::CommitUpgrade`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = CommitUpgrade.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = CommitUpgrade.$isPhantom;

 readonly packageId: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: CommitUpgradeFields<T0>, ) { this.$fullTypeName = composeSuiType( CommitUpgrade.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.packageId = fields.packageId; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): CommitUpgradeReified<ToPhantomTypeArgument<T0>> { return { typeName: CommitUpgrade.$typeName, fullTypeName: composeSuiType( CommitUpgrade.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::CommitUpgrade<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: CommitUpgrade.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => CommitUpgrade.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => CommitUpgrade.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => CommitUpgrade.fromBcs( T0, data, ), bcs: CommitUpgrade.bcs, fromJSONField: (field: any) => CommitUpgrade.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => CommitUpgrade.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => CommitUpgrade.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => CommitUpgrade.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => CommitUpgrade.fetch( client, T0, id, ), new: ( fields: CommitUpgradeFields<ToPhantomTypeArgument<T0>>, ) => { return new CommitUpgrade( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return CommitUpgrade.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<CommitUpgrade<ToPhantomTypeArgument<T0>>>> { return phantom(CommitUpgrade.reified( T0 )); } static get p() { return CommitUpgrade.phantom }

 static get bcs() { return bcs.struct("CommitUpgrade", {

 package_id: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): CommitUpgrade<ToPhantomTypeArgument<T0>> { return CommitUpgrade.reified( typeArg, ).new( { packageId: decodeFromFields(ID.reified(), fields.package_id) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): CommitUpgrade<ToPhantomTypeArgument<T0>> { if (!isCommitUpgrade(item.type)) { throw new Error("not a CommitUpgrade type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return CommitUpgrade.reified( typeArg, ).new( { packageId: decodeFromFieldsWithTypes(ID.reified(), item.fields.package_id) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): CommitUpgrade<ToPhantomTypeArgument<T0>> { return CommitUpgrade.fromFields( typeArg, CommitUpgrade.bcs.parse(data) ) }

 toJSONField() { return {

 packageId: this.packageId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): CommitUpgrade<ToPhantomTypeArgument<T0>> { return CommitUpgrade.reified( typeArg, ).new( { packageId: decodeFromJSONField(ID.reified(), field.packageId) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): CommitUpgrade<ToPhantomTypeArgument<T0>> { if (json.$typeName !== CommitUpgrade.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(CommitUpgrade.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return CommitUpgrade.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): CommitUpgrade<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isCommitUpgrade(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a CommitUpgrade object`); } return CommitUpgrade.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): CommitUpgrade<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isCommitUpgrade(data.bcs.type)) { throw new Error(`object at is not a CommitUpgrade object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return CommitUpgrade.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return CommitUpgrade.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<CommitUpgrade<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching CommitUpgrade object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isCommitUpgrade(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a CommitUpgrade object`); }

 return CommitUpgrade.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpgradeCapDeposited =============================== */

export function isUpgradeCapDeposited(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeCapDeposited` + '<'); }

export interface UpgradeCapDepositedFields<T0 extends PhantomTypeArgument> { upgradeCapId: ToField<ID> }

export type UpgradeCapDepositedReified<T0 extends PhantomTypeArgument> = Reified< UpgradeCapDeposited<T0>, UpgradeCapDepositedFields<T0> >;

export class UpgradeCapDeposited<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapDeposited`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpgradeCapDeposited.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = UpgradeCapDeposited.$isPhantom;

 readonly upgradeCapId: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UpgradeCapDepositedFields<T0>, ) { this.$fullTypeName = composeSuiType( UpgradeCapDeposited.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.upgradeCapId = fields.upgradeCapId; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UpgradeCapDepositedReified<ToPhantomTypeArgument<T0>> { return { typeName: UpgradeCapDeposited.$typeName, fullTypeName: composeSuiType( UpgradeCapDeposited.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapDeposited<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: UpgradeCapDeposited.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => UpgradeCapDeposited.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeCapDeposited.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => UpgradeCapDeposited.fromBcs( T0, data, ), bcs: UpgradeCapDeposited.bcs, fromJSONField: (field: any) => UpgradeCapDeposited.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => UpgradeCapDeposited.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeCapDeposited.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeCapDeposited.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => UpgradeCapDeposited.fetch( client, T0, id, ), new: ( fields: UpgradeCapDepositedFields<ToPhantomTypeArgument<T0>>, ) => { return new UpgradeCapDeposited( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeCapDeposited.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<UpgradeCapDeposited<ToPhantomTypeArgument<T0>>>> { return phantom(UpgradeCapDeposited.reified( T0 )); } static get p() { return UpgradeCapDeposited.phantom }

 static get bcs() { return bcs.struct("UpgradeCapDeposited", {

 upgrade_cap_id: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { return UpgradeCapDeposited.reified( typeArg, ).new( { upgradeCapId: decodeFromFields(ID.reified(), fields.upgrade_cap_id) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { if (!isUpgradeCapDeposited(item.type)) { throw new Error("not a UpgradeCapDeposited type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpgradeCapDeposited.reified( typeArg, ).new( { upgradeCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.upgrade_cap_id) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { return UpgradeCapDeposited.fromFields( typeArg, UpgradeCapDeposited.bcs.parse(data) ) }

 toJSONField() { return {

 upgradeCapId: this.upgradeCapId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { return UpgradeCapDeposited.reified( typeArg, ).new( { upgradeCapId: decodeFromJSONField(ID.reified(), field.upgradeCapId) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { if (json.$typeName !== UpgradeCapDeposited.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpgradeCapDeposited.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpgradeCapDeposited.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeCapDeposited(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapDeposited object`); } return UpgradeCapDeposited.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): UpgradeCapDeposited<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeCapDeposited(data.bcs.type)) { throw new Error(`object at is not a UpgradeCapDeposited object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpgradeCapDeposited.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeCapDeposited.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<UpgradeCapDeposited<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeCapDeposited object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeCapDeposited(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeCapDeposited object`); }

 return UpgradeCapDeposited.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpgradeCapExtracted =============================== */

export function isUpgradeCapExtracted(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeCapExtracted` + '<'); }

export interface UpgradeCapExtractedFields<T0 extends PhantomTypeArgument> { upgradeCapId: ToField<ID> }

export type UpgradeCapExtractedReified<T0 extends PhantomTypeArgument> = Reified< UpgradeCapExtracted<T0>, UpgradeCapExtractedFields<T0> >;

export class UpgradeCapExtracted<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapExtracted`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpgradeCapExtracted.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = UpgradeCapExtracted.$isPhantom;

 readonly upgradeCapId: ToField<ID>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UpgradeCapExtractedFields<T0>, ) { this.$fullTypeName = composeSuiType( UpgradeCapExtracted.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.upgradeCapId = fields.upgradeCapId; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UpgradeCapExtractedReified<ToPhantomTypeArgument<T0>> { return { typeName: UpgradeCapExtracted.$typeName, fullTypeName: composeSuiType( UpgradeCapExtracted.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapExtracted<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: UpgradeCapExtracted.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => UpgradeCapExtracted.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeCapExtracted.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => UpgradeCapExtracted.fromBcs( T0, data, ), bcs: UpgradeCapExtracted.bcs, fromJSONField: (field: any) => UpgradeCapExtracted.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => UpgradeCapExtracted.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeCapExtracted.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeCapExtracted.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => UpgradeCapExtracted.fetch( client, T0, id, ), new: ( fields: UpgradeCapExtractedFields<ToPhantomTypeArgument<T0>>, ) => { return new UpgradeCapExtracted( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeCapExtracted.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<UpgradeCapExtracted<ToPhantomTypeArgument<T0>>>> { return phantom(UpgradeCapExtracted.reified( T0 )); } static get p() { return UpgradeCapExtracted.phantom }

 static get bcs() { return bcs.struct("UpgradeCapExtracted", {

 upgrade_cap_id: ID.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { return UpgradeCapExtracted.reified( typeArg, ).new( { upgradeCapId: decodeFromFields(ID.reified(), fields.upgrade_cap_id) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { if (!isUpgradeCapExtracted(item.type)) { throw new Error("not a UpgradeCapExtracted type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpgradeCapExtracted.reified( typeArg, ).new( { upgradeCapId: decodeFromFieldsWithTypes(ID.reified(), item.fields.upgrade_cap_id) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { return UpgradeCapExtracted.fromFields( typeArg, UpgradeCapExtracted.bcs.parse(data) ) }

 toJSONField() { return {

 upgradeCapId: this.upgradeCapId,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { return UpgradeCapExtracted.reified( typeArg, ).new( { upgradeCapId: decodeFromJSONField(ID.reified(), field.upgradeCapId) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { if (json.$typeName !== UpgradeCapExtracted.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpgradeCapExtracted.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpgradeCapExtracted.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeCapExtracted(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapExtracted object`); } return UpgradeCapExtracted.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): UpgradeCapExtracted<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeCapExtracted(data.bcs.type)) { throw new Error(`object at is not a UpgradeCapExtracted object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpgradeCapExtracted.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeCapExtracted.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<UpgradeCapExtracted<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeCapExtracted object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeCapExtracted(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeCapExtracted object`); }

 return UpgradeCapExtracted.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpgradeCapKey =============================== */

export function isUpgradeCapKey(type: string): boolean { type = compressSuiType(type); return type === `${PKG_V1}::upgrade_service::UpgradeCapKey`; }

export interface UpgradeCapKeyFields { dummyField: ToField<"bool"> }

export type UpgradeCapKeyReified = Reified< UpgradeCapKey, UpgradeCapKeyFields >;

export class UpgradeCapKey implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeCapKey`; static readonly $numTypeParams = 0; static readonly $isPhantom = [] as const;

 readonly $typeName = UpgradeCapKey.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`; readonly $typeArgs: []; readonly $isPhantom = UpgradeCapKey.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [], fields: UpgradeCapKeyFields, ) { this.$fullTypeName = composeSuiType( UpgradeCapKey.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified( ): UpgradeCapKeyReified { return { typeName: UpgradeCapKey.$typeName, fullTypeName: composeSuiType( UpgradeCapKey.$typeName, ...[] ) as `${typeof PKG_V1}::upgrade_service::UpgradeCapKey`, typeArgs: [ ] as [], isPhantom: UpgradeCapKey.$isPhantom, reifiedTypeArgs: [], fromFields: (fields: Record<string, any>) => UpgradeCapKey.fromFields( fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeCapKey.fromFieldsWithTypes( item, ), fromBcs: (data: Uint8Array) => UpgradeCapKey.fromBcs( data, ), bcs: UpgradeCapKey.bcs, fromJSONField: (field: any) => UpgradeCapKey.fromJSONField( field, ), fromJSON: (json: Record<string, any>) => UpgradeCapKey.fromJSON( json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeCapKey.fromSuiParsedData( content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeCapKey.fromSuiObjectData( content, ), fetch: async (client: SuiClient, id: string) => UpgradeCapKey.fetch( client, id, ), new: ( fields: UpgradeCapKeyFields, ) => { return new UpgradeCapKey( [], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeCapKey.reified() }

 static phantom( ): PhantomReified<ToTypeStr<UpgradeCapKey>> { return phantom(UpgradeCapKey.reified( )); } static get p() { return UpgradeCapKey.phantom() }

 static get bcs() { return bcs.struct("UpgradeCapKey", {

 dummy_field: bcs.bool()

}) };

 static fromFields( fields: Record<string, any> ): UpgradeCapKey { return UpgradeCapKey.reified( ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes( item: FieldsWithTypes ): UpgradeCapKey { if (!isUpgradeCapKey(item.type)) { throw new Error("not a UpgradeCapKey type");

 }

 return UpgradeCapKey.reified( ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs( data: Uint8Array ): UpgradeCapKey { return UpgradeCapKey.fromFields( UpgradeCapKey.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField( field: any ): UpgradeCapKey { return UpgradeCapKey.reified( ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON( json: Record<string, any> ): UpgradeCapKey { if (json.$typeName !== UpgradeCapKey.$typeName) { throw new Error("not a WithTwoGenerics json object") };

 return UpgradeCapKey.fromJSONField( json, ) }

 static fromSuiParsedData( content: SuiParsedData ): UpgradeCapKey { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeCapKey(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeCapKey object`); } return UpgradeCapKey.fromFieldsWithTypes( content ); }

 static fromSuiObjectData( data: SuiObjectData ): UpgradeCapKey { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeCapKey(data.bcs.type)) { throw new Error(`object at is not a UpgradeCapKey object`); }

 return UpgradeCapKey.fromBcs( fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeCapKey.fromSuiParsedData( data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch( client: SuiClient, id: string ): Promise<UpgradeCapKey> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeCapKey object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeCapKey(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeCapKey object`); }

 return UpgradeCapKey.fromSuiObjectData( res.data ); }

 }

/* ============================== UpgradeService =============================== */

export function isUpgradeService(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeService` + '<'); }

export interface UpgradeServiceFields<T0 extends PhantomTypeArgument> { id: ToField<UID>; admin: ToField<TwoStepRole<ToPhantom<AdminRole<T0>>>> }

export type UpgradeServiceReified<T0 extends PhantomTypeArgument> = Reified< UpgradeService<T0>, UpgradeServiceFields<T0> >;

export class UpgradeService<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeService`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpgradeService.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = UpgradeService.$isPhantom;

 readonly id: ToField<UID>; readonly admin: ToField<TwoStepRole<ToPhantom<AdminRole<T0>>>>

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UpgradeServiceFields<T0>, ) { this.$fullTypeName = composeSuiType( UpgradeService.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.id = fields.id;; this.admin = fields.admin; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UpgradeServiceReified<ToPhantomTypeArgument<T0>> { return { typeName: UpgradeService.$typeName, fullTypeName: composeSuiType( UpgradeService.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::UpgradeService<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: UpgradeService.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => UpgradeService.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeService.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => UpgradeService.fromBcs( T0, data, ), bcs: UpgradeService.bcs, fromJSONField: (field: any) => UpgradeService.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => UpgradeService.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeService.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeService.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => UpgradeService.fetch( client, T0, id, ), new: ( fields: UpgradeServiceFields<ToPhantomTypeArgument<T0>>, ) => { return new UpgradeService( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeService.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<UpgradeService<ToPhantomTypeArgument<T0>>>> { return phantom(UpgradeService.reified( T0 )); } static get p() { return UpgradeService.phantom }

 static get bcs() { return bcs.struct("UpgradeService", {

 id: UID.bcs, admin: TwoStepRole.bcs

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): UpgradeService<ToPhantomTypeArgument<T0>> { return UpgradeService.reified( typeArg, ).new( { id: decodeFromFields(UID.reified(), fields.id), admin: decodeFromFields(TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))), fields.admin) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): UpgradeService<ToPhantomTypeArgument<T0>> { if (!isUpgradeService(item.type)) { throw new Error("not a UpgradeService type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpgradeService.reified( typeArg, ).new( { id: decodeFromFieldsWithTypes(UID.reified(), item.fields.id), admin: decodeFromFieldsWithTypes(TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))), item.fields.admin) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): UpgradeService<ToPhantomTypeArgument<T0>> { return UpgradeService.fromFields( typeArg, UpgradeService.bcs.parse(data) ) }

 toJSONField() { return {

 id: this.id,admin: this.admin.toJSONField(),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): UpgradeService<ToPhantomTypeArgument<T0>> { return UpgradeService.reified( typeArg, ).new( { id: decodeFromJSONField(UID.reified(), field.id), admin: decodeFromJSONField(TwoStepRole.reified(reified.phantom(AdminRole.reified(typeArg))), field.admin) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): UpgradeService<ToPhantomTypeArgument<T0>> { if (json.$typeName !== UpgradeService.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpgradeService.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpgradeService.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): UpgradeService<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeService(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeService object`); } return UpgradeService.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): UpgradeService<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeService(data.bcs.type)) { throw new Error(`object at is not a UpgradeService object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpgradeService.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeService.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<UpgradeService<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeService object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeService(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeService object`); }

 return UpgradeService.fromSuiObjectData( typeArg, res.data ); }

 }

/* ============================== UpgradeServiceDestroyed =============================== */

export function isUpgradeServiceDestroyed(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V1}::upgrade_service::UpgradeServiceDestroyed` + '<'); }

export interface UpgradeServiceDestroyedFields<T0 extends PhantomTypeArgument> { dummyField: ToField<"bool"> }

export type UpgradeServiceDestroyedReified<T0 extends PhantomTypeArgument> = Reified< UpgradeServiceDestroyed<T0>, UpgradeServiceDestroyedFields<T0> >;

export class UpgradeServiceDestroyed<T0 extends PhantomTypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V1}::upgrade_service::UpgradeServiceDestroyed`; static readonly $numTypeParams = 1; static readonly $isPhantom = [true,] as const;

 readonly $typeName = UpgradeServiceDestroyed.$typeName; readonly $fullTypeName: `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<T0>}>`; readonly $typeArgs: [PhantomToTypeStr<T0>]; readonly $isPhantom = UpgradeServiceDestroyed.$isPhantom;

 readonly dummyField: ToField<"bool">

 private constructor(typeArgs: [PhantomToTypeStr<T0>], fields: UpgradeServiceDestroyedFields<T0>, ) { this.$fullTypeName = composeSuiType( UpgradeServiceDestroyed.$typeName, ...typeArgs ) as `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<T0>}>`; this.$typeArgs = typeArgs;

 this.dummyField = fields.dummyField; }

 static reified<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): UpgradeServiceDestroyedReified<ToPhantomTypeArgument<T0>> { return { typeName: UpgradeServiceDestroyed.$typeName, fullTypeName: composeSuiType( UpgradeServiceDestroyed.$typeName, ...[extractType(T0)] ) as `${typeof PKG_V1}::upgrade_service::UpgradeServiceDestroyed<${PhantomToTypeStr<ToPhantomTypeArgument<T0>>}>`, typeArgs: [ extractType(T0) ] as [PhantomToTypeStr<ToPhantomTypeArgument<T0>>], isPhantom: UpgradeServiceDestroyed.$isPhantom, reifiedTypeArgs: [T0], fromFields: (fields: Record<string, any>) => UpgradeServiceDestroyed.fromFields( T0, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => UpgradeServiceDestroyed.fromFieldsWithTypes( T0, item, ), fromBcs: (data: Uint8Array) => UpgradeServiceDestroyed.fromBcs( T0, data, ), bcs: UpgradeServiceDestroyed.bcs, fromJSONField: (field: any) => UpgradeServiceDestroyed.fromJSONField( T0, field, ), fromJSON: (json: Record<string, any>) => UpgradeServiceDestroyed.fromJSON( T0, json, ), fromSuiParsedData: (content: SuiParsedData) => UpgradeServiceDestroyed.fromSuiParsedData( T0, content, ), fromSuiObjectData: (content: SuiObjectData) => UpgradeServiceDestroyed.fromSuiObjectData( T0, content, ), fetch: async (client: SuiClient, id: string) => UpgradeServiceDestroyed.fetch( client, T0, id, ), new: ( fields: UpgradeServiceDestroyedFields<ToPhantomTypeArgument<T0>>, ) => { return new UpgradeServiceDestroyed( [extractType(T0)], fields ) }, kind: "StructClassReified", } }

 static get r() { return UpgradeServiceDestroyed.reified }

 static phantom<T0 extends PhantomReified<PhantomTypeArgument>>( T0: T0 ): PhantomReified<ToTypeStr<UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>>>> { return phantom(UpgradeServiceDestroyed.reified( T0 )); } static get p() { return UpgradeServiceDestroyed.phantom }

 static get bcs() { return bcs.struct("UpgradeServiceDestroyed", {

 dummy_field: bcs.bool()

}) };

 static fromFields<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, fields: Record<string, any> ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { return UpgradeServiceDestroyed.reified( typeArg, ).new( { dummyField: decodeFromFields("bool", fields.dummy_field) } ) }

 static fromFieldsWithTypes<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, item: FieldsWithTypes ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { if (!isUpgradeServiceDestroyed(item.type)) { throw new Error("not a UpgradeServiceDestroyed type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return UpgradeServiceDestroyed.reified( typeArg, ).new( { dummyField: decodeFromFieldsWithTypes("bool", item.fields.dummy_field) } ) }

 static fromBcs<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: Uint8Array ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { return UpgradeServiceDestroyed.fromFields( typeArg, UpgradeServiceDestroyed.bcs.parse(data) ) }

 toJSONField() { return {

 dummyField: this.dummyField,

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, field: any ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { return UpgradeServiceDestroyed.reified( typeArg, ).new( { dummyField: decodeFromJSONField("bool", field.dummyField) } ) }

 static fromJSON<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, json: Record<string, any> ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { if (json.$typeName !== UpgradeServiceDestroyed.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(UpgradeServiceDestroyed.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return UpgradeServiceDestroyed.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, content: SuiParsedData ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isUpgradeServiceDestroyed(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a UpgradeServiceDestroyed object`); } return UpgradeServiceDestroyed.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<T0 extends PhantomReified<PhantomTypeArgument>>( typeArg: T0, data: SuiObjectData ): UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isUpgradeServiceDestroyed(data.bcs.type)) { throw new Error(`object at is not a UpgradeServiceDestroyed object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return UpgradeServiceDestroyed.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return UpgradeServiceDestroyed.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<T0 extends PhantomReified<PhantomTypeArgument>>( client: SuiClient, typeArg: T0, id: string ): Promise<UpgradeServiceDestroyed<ToPhantomTypeArgument<T0>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching UpgradeServiceDestroyed object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isUpgradeServiceDestroyed(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a UpgradeServiceDestroyed object`); }

 return UpgradeServiceDestroyed.fromSuiObjectData( typeArg, res.data ); }

 }
