import { ApiMethod } from '@/shared/api/apiBase';

export interface PromisesState {
    promisesList: ApiMethod[];
    loadingAllPromises: boolean;
    errorAllPromises: string | null;
}

export interface PromisesActions {
    fetchAllPromisesList: () => Promise<void>;
} 