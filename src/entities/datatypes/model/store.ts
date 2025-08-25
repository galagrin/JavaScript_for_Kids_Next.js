import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchDataTypes } from '@/shared/api/apiBase';

import { DataTypesActions, DataTypesState } from './types';

type DataTypesStore = DataTypesState & DataTypesActions;

export const useDataTypesStore = create<DataTypesStore>()(
    persist(
        (set) => ({
            dataTypesList: [],
            loadingAllDataTypes: false,
            errorAllDataTypes: null,

            fetchAllDataTypesList: async () => {
                set({ loadingAllDataTypes: true, errorAllDataTypes: null });
                try {
                    const response = await fetchDataTypes();
                    set({
                        dataTypesList: response,
                        loadingAllDataTypes: false,
                    });
                } catch (error) {
                    set({
                        errorAllDataTypes: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllDataTypes: false,
                    });
                }
            },
        }),
        {
            name: 'datatypes-storage',
            partialize: (state) => ({
                dataTypesList: state.dataTypesList,
            }),
        }
    )
); 