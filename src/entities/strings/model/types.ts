import { ApiMethod } from '@/shared/api/apiBase';

export interface StringsState {
    stringsList: ApiMethod[];
    loadingAllStrings: boolean;
    errorAllStrings: string | null;
}

export interface StringsActions {
    fetchAllStringsList: () => Promise<void>;
} 