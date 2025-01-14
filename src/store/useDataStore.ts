import axios, { AxiosError } from 'axios';
import { fetchAllArrays } from 'services/api';
import { ApiTypes } from 'types/apiTypes';
import { create } from 'zustand';

// Определяем интерфейс DataStore, который описывает структуру состояния нашего хранилища.
interface DataStore {
    arraysList: ApiTypes[];
    fetchAllArraysList: () => Promise<void>;
    loading: boolean;
    error: string | null;
}

// Создаем Zustand store с помощью функции create, передавая в нее функцию, которая принимает метод set для обновления состояния.
const useDataStore = create<DataStore>((set) => ({
    arraysList: [], // Изначально массив данных пустой.
    loading: true, // Изначально состояние загрузки установлено в true.
    error: null, // Изначально ошибок нет.


    fetchAllArraysList: async () => {

        set({ loading: true, error: null });
        try {

            const response = await fetchAllArrays();

            set({ loading: false, arraysList: response });
        } catch (error: unknown) {

            if (axios.isAxiosError(error)) {
                set({ error: error.message, loading: false });
            } else {
                set({ error: 'Что-то пошло не так', loading: false });
            }
        }
    },
}));

export default useDataStore;
