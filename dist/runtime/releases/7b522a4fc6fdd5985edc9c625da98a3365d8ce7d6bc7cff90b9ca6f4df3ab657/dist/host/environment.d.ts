import { type MooValue, type EncodedValue } from '../values/index.js';
export interface VirtualFile {
    path: string;
    kind: 'file' | 'directory';
    content: string;
    mode: string;
    created: number;
    accessed: number;
    modified: number;
}
export interface VirtualHandle {
    id: number;
    path: string;
    mode: string;
    offset: number;
    eof: boolean;
}
export interface VirtualConnection {
    player: string;
    name: string;
    input: string[];
    output: string[];
    connectedAt: number;
    lastActive: number;
    options: Record<string, boolean>;
    prefix: string;
    suffix: string;
}
export interface VirtualDatabase {
    id: number;
    path: string;
    data: string;
    options: number;
    lastRowId: string;
    open: boolean;
    limits: number[];
}
export interface ServiceFixture {
    builtin: string;
    args: EncodedValue[];
    result: EncodedValue;
}
export interface VirtualListener {
    object: string;
    port: number;
    print: boolean;
}
export interface HostEnvironment {
    fixtures?: ServiceFixture[];
    listeners?: VirtualListener[];
    serverOptions?: {
        fg_ticks: number;
        fg_seconds: number;
    };
    databases?: VirtualDatabase[];
    connections?: VirtualConnection[];
    logs?: string[];
    shutdown?: string;
    checkpoint?: string;
    version: 1;
    time: number;
    nextHandle: number;
    files: VirtualFile[];
    handles: VirtualHandle[];
}
export declare function initialEnvironment(): HostEnvironment;
export declare function validateEnvironment(value: unknown): asserts value is HostEnvironment;
export declare function freezeEnvironment(state: HostEnvironment): HostEnvironment;
export declare function virtualConnection(player: string, time?: number): VirtualConnection;
export declare function createHostEnvironment(options?: {
    connections?: {
        player: bigint | number;
        name?: string;
        input?: string[];
    }[];
    fixtures?: {
        builtin: string;
        args: MooValue[];
        result: MooValue;
    }[];
}): HostEnvironment;
