import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { DataTypesActions, DataTypesState } from '../types';

type DataTypesStore = DataTypesState & DataTypesActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchDataTypes: jest.fn(),
}));
const { fetchDataTypes } = require('@/shared/api/apiBase');
const mockFetchDataTypes = fetchDataTypes as jest.MockedFunction<typeof fetchDataTypes>;

const createTestStore = () => {
    return create<DataTypesStore>()((set) => ({
        dataTypesList: [],
        loadingAllDataTypes: false,
        errorAllDataTypes: null,

        fetchAllDataTypesList: async () => {
            set({ loadingAllDataTypes: true, errorAllDataTypes: null });
            try {
                const response = await fetchDataTypes();
                set({
                    dataTypesList: response,
                    loadingAllDataTypes: false,
                });
            } catch (error) {
                set({
                    errorAllDataTypes: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                    loadingAllDataTypes: false,
                });
            }
        },
    }));
};
describe('useArraysStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.dataTypesList).toEqual([]);
        expect(result.current.loadingAllDataTypes).toBe(false);
        expect(result.current.errorAllDataTypes).toBe(null);
    });

    it('успешно загружает данные', async () => {
        const mockData = [
            {
                id: 6001,
                name: 'typeof',
                description: 'Оператор, который возвращает тип значения.',
                syntax: 'typeof value',
                adultExample: "typeof 'hello'; // 'string'",
                childExample: "typeof 'котик'; // 'string'",
                childExplanation: "Это как если бы ты спрашивал: 'Что это такое?' Ты узнаешь, что 'котик' — это текст!",
            },
        ];
        mockFetchDataTypes.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDataTypesList();
        });

        expect(result.current.dataTypesList).toEqual(mockData);
        expect(result.current.loadingAllDataTypes).toBe(false);
        expect(result.current.errorAllDataTypes).toBe(null);
        expect(mockFetchDataTypes).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchDataTypes.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDataTypesList();
        });

        expect(result.current.dataTypesList).toEqual([]);
        expect(result.current.loadingAllDataTypes).toBe(false);
        expect(result.current.errorAllDataTypes).toBe('Network error');
    });

    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchDataTypes.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDataTypesList();
        });

        expect(result.current.errorAllDataTypes).toBe('Произошла ошибка при загрузке');
    });
});
