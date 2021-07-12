
export interface ifOriginSource {
    source: string | null;
    line: number | null;
    column: number | null,
    name: string | null,
}

export interface ifDebugInfo {
    debug_source: string | null,
    debug_line: number | null;
    debug_column: number | null;
    find_source: string | null;
    find_line: number | null;
    find_column: number | null;
    find_name: string | null;
    find_lineContent: string | null;
}

export interface ifCallback {
    (source: string): ifDebugInfo | void;
}