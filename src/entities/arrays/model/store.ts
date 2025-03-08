import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import { ArrayMethod, ArraysActions, ArraysState } from './types';
import { fetchAllArrays } from '@/entities/arrays/api';

type ArrayStore = ArraysState & ArraysActions;

export const useArraysStore = create<ArrayStore>()(
    devtools(
        persist(
            (set) => ({
                arraysList: [],
                loadingAllArrays: false,
                errorAllArrays: null,

                fetchAllArraysList: async () => {
                    set({ loadingAllArrays: true, errorAllArrays: null });
                    try {
                        const response = await fetchAllArrays();
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

                reset: () =>
                    set({
                        arraysList: [],
                        loadingAllArrays: false,
                        errorAllArrays: null,
                    }),
            }),
            {
                name: 'arrays-storage',
                partialize: (state) => ({
                    arraysList: state.arraysList,
                }),
            }
        )
    )
);
