import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { fetchObjects } from '@/shared/api/apiBase';

import { ObjectsActions, ObjectsState } from './types';

type ObjectsStore = ObjectsState & ObjectsActions;

export const useObjectsStore = create<ObjectsStore>()(
    persist(
        (set) => ({
            objectsList: [],
            loadingAllObjects: false,
            errorAllObjects: null,

            fetchAllObjectsList: async () => {
                set({ loadingAllObjects: true, errorAllObjects: null });
                try {
                    const response = await fetchObjects();
                    set({
                        objectsList: response,
                        loadingAllObjects: false,
                    });
                } catch (error) {
                    set({
                        errorAllObjects: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                        loadingAllObjects: false,
                    });
                }
            },
        }),
        {
            name: 'objects-storage',
            partialize: (state) => ({
                objectsList: state.objectsList,
            }),
        }
    )
); 