import * as reified from "../../../../_framework/reified";
import {PhantomReified, Reified, StructClass, ToField, ToTypeArgument, ToTypeStr, TypeArgument, assertFieldsWithTypesArgsMatch, assertReifiedTypeArgsMatch, decodeFromFields, decodeFromFieldsWithTypes, decodeFromJSONField, extractType, fieldToJSON, phantom, toBcs} from "../../../../_framework/reified";
import {FieldsWithTypes, composeSuiType, compressSuiType, parseTypeName} from "../../../../_framework/util";
import {Vector} from "../../../../_framework/vector";
import {PKG_V17} from "../index";
import {BcsType, bcs} from "@mysten/sui/bcs";
import {SuiClient, SuiObjectData, SuiParsedData} from "@mysten/sui/client";
import {fromB64} from "@mysten/sui/utils";

/* ============================== Option =============================== */

export function isOption(type: string): boolean { type = compressSuiType(type); return type.startsWith(`${PKG_V17}::option::Option` + '<'); }

export interface OptionFields<Element extends TypeArgument> { vec: ToField<Vector<Element>> }

export type OptionReified<Element extends TypeArgument> = Reified< Option<Element>, OptionFields<Element> >;

export class Option<Element extends TypeArgument> implements StructClass { __StructClass = true as const;

 static readonly $typeName = `${PKG_V17}::option::Option`; static readonly $numTypeParams = 1; static readonly $isPhantom = [false,] as const;

 __inner: Element = null as unknown as Element; // for type checking in reified.ts

; readonly $typeName = Option.$typeName; readonly $fullTypeName: `${typeof PKG_V17}::option::Option<${ToTypeStr<Element>}>`; readonly $typeArgs: [ToTypeStr<Element>]; readonly $isPhantom = Option.$isPhantom;

 readonly vec: ToField<Vector<Element>>

 private constructor(typeArgs: [ToTypeStr<Element>], fields: OptionFields<Element>, ) { this.$fullTypeName = composeSuiType( Option.$typeName, ...typeArgs ) as `${typeof PKG_V17}::option::Option<${ToTypeStr<Element>}>`; this.$typeArgs = typeArgs;

 this.vec = fields.vec; }

 static reified<Element extends Reified<TypeArgument, any>>( Element: Element ): OptionReified<ToTypeArgument<Element>> { return { typeName: Option.$typeName, fullTypeName: composeSuiType( Option.$typeName, ...[extractType(Element)] ) as `${typeof PKG_V17}::option::Option<${ToTypeStr<ToTypeArgument<Element>>}>`, typeArgs: [ extractType(Element) ] as [ToTypeStr<ToTypeArgument<Element>>], isPhantom: Option.$isPhantom, reifiedTypeArgs: [Element], fromFields: (fields: Record<string, any>) => Option.fromFields( Element, fields, ), fromFieldsWithTypes: (item: FieldsWithTypes) => Option.fromFieldsWithTypes( Element, item, ), fromBcs: (data: Uint8Array) => Option.fromBcs( Element, data, ), bcs: Option.bcs(toBcs(Element)), fromJSONField: (field: any) => Option.fromJSONField( Element, field, ), fromJSON: (json: Record<string, any>) => Option.fromJSON( Element, json, ), fromSuiParsedData: (content: SuiParsedData) => Option.fromSuiParsedData( Element, content, ), fromSuiObjectData: (content: SuiObjectData) => Option.fromSuiObjectData( Element, content, ), fetch: async (client: SuiClient, id: string) => Option.fetch( client, Element, id, ), new: ( fields: OptionFields<ToTypeArgument<Element>>, ) => { return new Option( [extractType(Element)], fields ) }, kind: "StructClassReified", } }

 static get r() { return Option.reified }

 static phantom<Element extends Reified<TypeArgument, any>>( Element: Element ): PhantomReified<ToTypeStr<Option<ToTypeArgument<Element>>>> { return phantom(Option.reified( Element )); } static get p() { return Option.phantom }

 static get bcs() { return <Element extends BcsType<any>>(Element: Element) => bcs.struct(`Option<${Element.name}>`, {

 vec: bcs.vector(Element)

}) };

 static fromFields<Element extends Reified<TypeArgument, any>>( typeArg: Element, fields: Record<string, any> ): Option<ToTypeArgument<Element>> { return Option.reified( typeArg, ).new( { vec: decodeFromFields(reified.vector(typeArg), fields.vec) } ) }

 static fromFieldsWithTypes<Element extends Reified<TypeArgument, any>>( typeArg: Element, item: FieldsWithTypes ): Option<ToTypeArgument<Element>> { if (!isOption(item.type)) { throw new Error("not a Option type");

 } assertFieldsWithTypesArgsMatch(item, [typeArg]);

 return Option.reified( typeArg, ).new( { vec: decodeFromFieldsWithTypes(reified.vector(typeArg), item.fields.vec) } ) }

 static fromBcs<Element extends Reified<TypeArgument, any>>( typeArg: Element, data: Uint8Array ): Option<ToTypeArgument<Element>> { const typeArgs = [typeArg];

 return Option.fromFields( typeArg, Option.bcs( toBcs(typeArgs[0]) ).parse(data) ) }

 toJSONField() { return {

 vec: fieldToJSON<Vector<Element>>(`vector<${this.$typeArgs[0]}>`, this.vec),

} }

 toJSON() { return { $typeName: this.$typeName, $typeArgs: this.$typeArgs, ...this.toJSONField() } }

 static fromJSONField<Element extends Reified<TypeArgument, any>>( typeArg: Element, field: any ): Option<ToTypeArgument<Element>> { return Option.reified( typeArg, ).new( { vec: decodeFromJSONField(reified.vector(typeArg), field.vec) } ) }

 static fromJSON<Element extends Reified<TypeArgument, any>>( typeArg: Element, json: Record<string, any> ): Option<ToTypeArgument<Element>> { if (json.$typeName !== Option.$typeName) { throw new Error("not a WithTwoGenerics json object") }; assertReifiedTypeArgsMatch( composeSuiType(Option.$typeName, extractType(typeArg)), json.$typeArgs, [typeArg], )

 return Option.fromJSONField( typeArg, json, ) }

 static fromSuiParsedData<Element extends Reified<TypeArgument, any>>( typeArg: Element, content: SuiParsedData ): Option<ToTypeArgument<Element>> { if (content.dataType !== "moveObject") { throw new Error("not an object"); } if (!isOption(content.type)) { throw new Error(`object at ${(content.fields as any).id} is not a Option object`); } return Option.fromFieldsWithTypes( typeArg, content ); }

 static fromSuiObjectData<Element extends Reified<TypeArgument, any>>( typeArg: Element, data: SuiObjectData ): Option<ToTypeArgument<Element>> { if (data.bcs) { if (data.bcs.dataType !== "moveObject" || !isOption(data.bcs.type)) { throw new Error(`object at is not a Option object`); }

 const gotTypeArgs = parseTypeName(data.bcs.type).typeArgs; if (gotTypeArgs.length !== 1) { throw new Error(`type argument mismatch: expected 1 type argument but got '${gotTypeArgs.length}'`); }; const gotTypeArg = compressSuiType(gotTypeArgs[0]); const expectedTypeArg = compressSuiType(extractType(typeArg)); if (gotTypeArg !== compressSuiType(extractType(typeArg))) { throw new Error(`type argument mismatch: expected '${expectedTypeArg}' but got '${gotTypeArg}'`); };

 return Option.fromBcs( typeArg, fromB64(data.bcs.bcsBytes) ); } if (data.content) { return Option.fromSuiParsedData( typeArg, data.content ) } throw new Error( "Both `bcs` and `content` fields are missing from the data. Include `showBcs` or `showContent` in the request." ); }

 static async fetch<Element extends Reified<TypeArgument, any>>( client: SuiClient, typeArg: Element, id: string ): Promise<Option<ToTypeArgument<Element>>> { const res = await client.getObject({ id, options: { showBcs: true, }, }); if (res.error) { throw new Error(`error fetching Option object at id ${id}: ${res.error.code}`); } if (res.data?.bcs?.dataType !== "moveObject" || !isOption(res.data.bcs.type)) { throw new Error(`object at id ${id} is not a Option object`); }

 return Option.fromSuiObjectData( typeArg, res.data ); }

 }
