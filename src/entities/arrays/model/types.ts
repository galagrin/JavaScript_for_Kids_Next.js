export interface ArrayMethod {
    id: number;
    name: string;
    description: string;
    syntax: string;
    adultExample: string;
    childExample: string;
    childExplanation: string;
}

export interface ArraysState {
    arraysList: ArrayMethod[];
    loadingAllArrays: boolean;
    errorAllArrays: string | null;
    lastFetchTime: number;
    cacheExpiry: number;
}

export interface ArraysActions {
    fetchAllArraysList: (force?: boolean) => Promise<void>;
}
