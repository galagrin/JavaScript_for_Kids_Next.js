import axios from 'axios';
import { fetchAllArrays } from 'services/api';
import { ApiTypes } from 'types/apiTypes';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface DataStore {
    arraysList: ApiTypes[];
    fetchAllArraysList: () => Promise<void>;
    loadingAllArrays: boolean;
    errorAllArrays: string | null;
}

// Изменена структура создания хранилища для использования persist
const useDataStore = create<DataStore>()(
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
                        set({ loadingAllArrays: false, arraysList: response });
                    } catch (error) {
                        if (axios.isAxiosError(error)) {
                            set({ errorAllArrays: error.message, loadingAllArrays: false });
                        } else {
                            set({ errorAllArrays: 'Что-то пошло не так', loadingAllArrays: false });
                        }
                    }
                },
            }),
            {
                name: 'data-storage',
            }
        )
    )
);

export default useDataStore;
