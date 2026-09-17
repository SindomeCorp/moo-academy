import { type Profile } from '../parser/index.js';
export declare const errorCodes: readonly ["E_NONE", "E_TYPE", "E_DIV", "E_PERM", "E_PROPNF", "E_VERBNF", "E_VARNF", "E_INVIND", "E_RECMOVE", "E_MAXREC", "E_RANGE", "E_ARGS", "E_NACC", "E_INVARG", "E_QUOTA", "E_FLOAT", "E_FILE", "E_EXEC", "E_INTRPT"];
export type ErrorCode = typeof errorCodes[number];
export type MooValue = Readonly<{
    type: 'int';
    value: bigint;
}> | Readonly<{
    type: 'float';
    value: number;
}> | Readonly<{
    type: 'string';
    value: string;
}> | Readonly<{
    type: 'object';
    value: bigint;
}> | Readonly<{
    type: 'error';
    value: ErrorCode;
}> | Readonly<{
    type: 'list';
    value: readonly MooValue[];
}> | Readonly<{
    type: 'map';
    value: readonly (readonly [MooValue, MooValue])[];
}>;
export type EncodedValue = {
    type: 'int' | 'object';
    value: string;
} | {
    type: 'float';
    value: number | '-0';
} | {
    type: 'string';
    value: string;
} | {
    type: 'error';
    value: ErrorCode;
} | {
    type: 'list';
    value: EncodedValue[];
} | {
    type: 'map';
    value: [EncodedValue, EncodedValue][];
};
/** Immutable constructors; nested collections cannot acquire host array aliases. */
export declare const moo: Readonly<{
    int(value: bigint | number): MooValue;
    float(value: number): MooValue;
    string(value: string): MooValue;
    object(value: bigint | number): MooValue;
    error(value: ErrorCode): MooValue;
    list(value: readonly MooValue[]): MooValue;
    map(value: readonly (readonly [MooValue, MooValue])[]): MooValue;
}>;
export interface CodecOptions {
    profile: Profile;
    maxDepth?: number;
    maxValues?: number;
    maxStringUnits?: number;
}
export declare function encodeValue(value: MooValue, options: CodecOptions): EncodedValue;
export declare function decodeValue(input: unknown, options: CodecOptions): MooValue;
