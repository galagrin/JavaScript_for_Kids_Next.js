import axios, { AxiosError } from 'axios';
import { fetchAllArrays, fetchAllObjects, fetchAllStrings } from 'services/api';
import { ApiTypes } from 'types/apiTypes';
import { create } from 'zustand';

// Определяем интерфейс DataStore, который описывает структуру состояния нашего хранилища.
interface DataStore {
    arraysList: ApiTypes[];
    fetchAllArraysList: () => Promise<void>;
    loadingAllArrays: boolean;
    errorAllArrays: string | null;
    objectsList: ApiTypes[];
    fetchAllObjectsList: () => Promise<void>;
    loadingAllObjects: boolean;
    errorAllObjects: string | null;
}

// Создаем Zustand store с помощью функции create, передавая в нее функцию, которая принимает метод set для обновления состояния.
const useDataStore = create<DataStore>((set) => ({
    arraysList: [], // Изначально массив данных пустой.
    loadingAllArrays: true, // Изначально состояние загрузки установлено в true.
    errorAllArrays: null, // Изначально ошибок нет.
    objectsList: [],
    loadingAllObjects: true,
    errorAllObjects: null,

    fetchAllArraysList: async () => {
        set({ loadingAllArrays: true, errorAllArrays: null });
        try {
            const response = await fetchAllArrays();

            set({ loadingAllArrays: false, arraysList: response });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                set({ errorAllArrays: error.message, loadingAllArrays: false });
            } else {
                set({ errorAllArrays: 'Что-то пошло не так', loadingAllArrays: false });
            }
        }
    },
    fetchAllObjectsList: async () => {
        set({ loadingAllObjects: true, errorAllObjects: null });
        try {
            const response = await fetchAllObjects();
            set({ loadingAllObjects: false, objectsList: response });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                set({ errorAllObjects: error.message, loadingAllObjects: false });
            } else {
                set({ errorAllArrays: 'Что-то пошло не так', loadingAllArrays: false });
            }
        }
    },
}));

export default useDataStore;
