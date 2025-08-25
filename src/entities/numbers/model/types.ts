import { ApiMethod } from '@/shared/api/apiBase';

export interface NumbersState {
    numbersList: ApiMethod[];
    loadingAllNumbers: boolean;
    errorAllNumbers: string | null;
}

export interface NumbersActions {
    fetchAllNumbersList: () => Promise<void>;
} 