import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { PromisesActions, PromisesState } from '../types';

type PromisesStore = PromisesState & PromisesActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchPromises: jest.fn(),
}));
const { fetchPromises } = require('@/shared/api/apiBase');
const mockFetchPromises = fetchPromises as jest.MockedFunction<typeof fetchPromises>;

const createTestStore = () => {
    return create<PromisesStore>()((set) => ({
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
    }));
};

describe('usePromisesStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.promisesList).toEqual([]);
        expect(result.current.loadingAllPromises).toBe(false);
        expect(result.current.errorAllPromises).toBe(null);
    });

    it('успешно загружает данные промисов', async () => {
        const mockData = [
            {
                id: 5001,
                name: 'Promise.resolve',
                description: 'Создает промис, который немедленно разрешается с указанным значением.',
                syntax: 'Promise.resolve(value)',
                adultExample: "Promise.resolve(42).then(x => console.log(x)); // 42",
                childExample: "Promise.resolve('привет').then(слово => console.log(слово)); // привет",
                childExplanation: "Это как если бы ты сразу получил подарок, который тебе обещали.",
            },
        ];
        mockFetchPromises.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllPromisesList();
        });

        expect(result.current.promisesList).toEqual(mockData);
        expect(result.current.loadingAllPromises).toBe(false);
        expect(result.current.errorAllPromises).toBe(null);
        expect(mockFetchPromises).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchPromises.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllPromisesList();
        });

        expect(result.current.promisesList).toEqual([]);
        expect(result.current.loadingAllPromises).toBe(false);
        expect(result.current.errorAllPromises).toBe('Network error');
    });

    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchPromises.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllPromisesList();
        });

        expect(result.current.errorAllPromises).toBe('Произошла ошибка при загрузке');
    });
});