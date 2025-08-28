import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchArrays } from '@/shared/api/apiBase';

import { ArraysActions, ArraysState } from './types';

type ArrayStore = ArraysState & ArraysActions;

export const useArraysStore = create<ArrayStore>()(
    persist(
        (set, get) => ({
            arraysList: [],
            loadingAllArrays: false,
            errorAllArrays: null,
            lastFetchTime: 0,
            cacheExpiry: 5 * 60 * 1000, // 5 минут

            fetchAllArraysList: async (force = false) => {
                const state = get();
                const now = Date.now();
                
                // Проверяем кэш и время последнего запроса
                if (!force && 
                    state.arraysList.length > 0 && 
                    (now - state.lastFetchTime) < state.cacheExpiry) {
                    return; // Используем кэшированные данные
                }

                set({ loadingAllArrays: true, errorAllArrays: null });
                try {
                    const response = await fetchArrays();
                    set({
                        arraysList: response,
                        loadingAllArrays: false,
                        lastFetchTime: now,
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
                lastFetchTime: state.lastFetchTime,
            }),
        }
    )
);
