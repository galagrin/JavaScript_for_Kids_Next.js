import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchDates } from '@/shared/api/apiBase';

import { DatesActions, DatesState } from './types';

type DatesStore = DatesState & DatesActions;

export const useDatesStore = create<DatesStore>()(
    persist(
        (set) => ({
            datesList: [],
            loadingAllDates: false,
            errorAllDates: null,

            fetchAllDatesList: async () => {
                set({ loadingAllDates: true, errorAllDates: null });
                try {
                    const response = await fetchDates();
                    set({
                        datesList: response,
                        loadingAllDates: false,
                    });
                } catch (error) {
                    set({
                        errorAllDates: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllDates: false,
                    });
                }
            },
        }),
        {
            name: 'dates-storage',
            partialize: (state) => ({
                datesList: state.datesList,
            }),
        }
    )
); 