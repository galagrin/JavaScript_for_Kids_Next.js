import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchPromises } from '@/shared/api/apiBase';

import { PromisesActions, PromisesState } from './types';

type PromisesStore = PromisesState & PromisesActions;

export const usePromisesStore = create<PromisesStore>()(
    persist(
        (set) => ({
            promisesList: [],
            loadingAllPromises: false,
            errorAllPromises: null,

            fetchAllPromisesList: async () => {
                set({ loadingAllPromises: true, errorAllPromises: null });
                try {
                    const response = await fetchPromises();
                    set({
                        promisesList: response,
                        loadingAllPromises: false,
                    });
                } catch (error) {
                    set({
                        errorAllPromises: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllPromises: false,
                    });
                }
            },
        }),
        {
            name: 'promises-storage',
            partialize: (state) => ({
                promisesList: state.promisesList,
            }),
        }
    )
); 