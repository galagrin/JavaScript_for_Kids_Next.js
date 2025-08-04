import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchStrings } from '@/shared/api/apiBase';

import { StringsActions, StringsState } from './types';

type StringsStore = StringsState & StringsActions;

export const useStringsStore = create<StringsStore>()(
    persist(
        (set) => ({
            stringsList: [],
            loadingAllStrings: false,
            errorAllStrings: null,

            fetchAllStringsList: async () => {
                set({ loadingAllStrings: true, errorAllStrings: null });
                try {
                    const response = await fetchStrings();
                    set({
                        stringsList: response,
                        loadingAllStrings: false,
                    });
                } catch (error) {
                    set({
                        errorAllStrings: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllStrings: false,
                    });
                }
            },
        }),
        {
            name: 'strings-storage',
            partialize: (state) => ({
                stringsList: state.stringsList,
            }),
        }
    )
); 