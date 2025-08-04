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
}

export interface ArraysActions {
    fetchAllArraysList: () => Promise<void>;
}
