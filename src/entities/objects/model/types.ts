import { ApiMethod } from '@/shared/api/apiBase';

export interface ObjectsState {
    objectsList: ApiMethod[];
    loadingAllObjects: boolean;
    errorAllObjects: string | null;
}

export interface ObjectsActions {
    fetchAllObjectsList: () => Promise<void>;
} 