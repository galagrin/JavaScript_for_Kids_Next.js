import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchArrays } from '@/shared/api/apiBase';

import { ArraysActions, ArraysState } from './types';

type ArrayStore = ArraysState & ArraysActions;

export const useArraysStore = create<ArrayStore>()(
    persist(
        (set) => ({
            arraysList: [],
            loadingAllArrays: false,
            errorAllArrays: null,

            fetchAllArraysList: async () => {
                set({ loadingAllArrays: true, errorAllArrays: null });
                try {
                    const response = await fetchArrays();
                    set({
                        arraysList: response,
                        loadingAllArrays: false,
                    });
                } catch (error) {
                    set({
                        errorAllArrays: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllArrays: false,
                    });
                }
            },
        }),
        {
            name: 'arrays-storage',
            partialize: (state) => ({
                arraysList: state.arraysList,
            }),
        }
    )
);
