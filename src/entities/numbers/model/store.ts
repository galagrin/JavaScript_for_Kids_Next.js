import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchNumbers } from '@/shared/api/apiBase';

import { NumbersActions, NumbersState } from './types';

type NumbersStore = NumbersState & NumbersActions;

export const useNumbersStore = create<NumbersStore>()(
    persist(
        (set) => ({
            numbersList: [],
            loadingAllNumbers: false,
            errorAllNumbers: null,

            fetchAllNumbersList: async () => {
                set({ loadingAllNumbers: true, errorAllNumbers: null });
                try {
                    const response = await fetchNumbers();
                    set({
                        numbersList: response,
                        loadingAllNumbers: false,
                    });
                } catch (error) {
                    set({
                        errorAllNumbers: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllNumbers: false,
                    });
                }
            },
        }),
        {
            name: 'numbers-storage',
            partialize: (state) => ({
                numbersList: state.numbersList,
            }),
        }
    )
); 