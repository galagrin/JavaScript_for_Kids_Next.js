import { ApiMethod } from '@/shared/api/apiBase';

export interface DatesState {
    datesList: ApiMethod[];
    loadingAllDates: boolean;
    errorAllDates: string | null;
}

export interface DatesActions {
    fetchAllDatesList: () => Promise<void>;
} 