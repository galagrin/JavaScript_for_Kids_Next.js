import { ApiMethod } from '@/shared/api/apiBase';

export interface DataTypesState {
    dataTypesList: ApiMethod[];
    loadingAllDataTypes: boolean;
    errorAllDataTypes: string | null;
}

export interface DataTypesActions {
    fetchAllDataTypesList: () => Promise<void>;
} 