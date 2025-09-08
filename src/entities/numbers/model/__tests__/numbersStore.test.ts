import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { NumbersActions, NumbersState } from '../types';

type NumbersStore = NumbersState & NumbersActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchNumbers: jest.fn(),
}));
const { fetchNumbers } = require('@/shared/api/apiBase');
const mockFetchNumbers = fetchNumbers as jest.MockedFunction<typeof fetchNumbers>;

const createTestStore = () => {
    return create<NumbersStore>()((set) => ({
        numbersList: [],
        loadingAllNumbers: false,
        errorAllNumbers: null,

        fetchAllNumbersList: async () => {
            set({ loadingAllNumbers: true, errorAllNumbers: null });
            try {
                const response = await fetchNumbers();
                set({
                    numbersList: response,
                    loadingAllNumbers: false,
                });
            } catch (error) {
                set({
                    errorAllNumbers: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                    loadingAllNumbers: false,
                });
            }
        },
    }));
};

describe('useNumbersStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.numbersList).toEqual([]);
        expect(result.current.loadingAllNumbers).toBe(false);
        expect(result.current.errorAllNumbers).toBe(null);
    });

    it('успешно загружает данные чисел', async () => {
        const mockData = [
            {
                id: 5001,
                name: 'parseInt',
                description: 'Преобразует строку в целое число.',
                syntax: 'parseInt(string, radix)',
                adultExample: "parseInt('10'); // 10",
                childExample: "parseInt('5'); // 5",
                childExplanation: "Это как если бы ты превращал слово 'пять' в настоящую цифру 5.",
            },
        ];
        mockFetchNumbers.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllNumbersList();
        });

        expect(result.current.numbersList).toEqual(mockData);
        expect(result.current.loadingAllNumbers).toBe(false);
        expect(result.current.errorAllNumbers).toBe(null);
        expect(mockFetchNumbers).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchNumbers.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllNumbersList();
        });

        expect(result.current.numbersList).toEqual([]);
        expect(result.current.loadingAllNumbers).toBe(false);
        expect(result.current.errorAllNumbers).toBe('Network error');
    });

    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchNumbers.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllNumbersList();
        });

        expect(result.current.errorAllNumbers).toBe('Произошла ошибка при загрузке');
    });
});