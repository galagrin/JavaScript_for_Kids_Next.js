import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { DatesActions, DatesState } from '../types';

type DatesStore = DatesState & DatesActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchDates: jest.fn(),
}));
const { fetchDates } = require('@/shared/api/apiBase');
const mockFetchDates = fetchDates as jest.MockedFunction<typeof fetchDates>;

const createTestStore = () => {
    return create<DatesStore>()((set) => ({
        datesList: [],
        loadingAllDates: false,
        errorAllDates: null,

        fetchAllDatesList: async () => {
            set({ loadingAllDates: true, errorAllDates: null });
            try {
                const response = await fetchDates();
                set({
                    datesList: response,
                    loadingAllDates: false,
                });
            } catch (error) {
                set({
                    errorAllDates: error instanceof Error ? error.message : 'Произошла ошибка при загрузке',
                    loadingAllDates: false,
                });
            }
        },
    }));
};

describe('useDatesStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.datesList).toEqual([]);
        expect(result.current.loadingAllDates).toBe(false);
        expect(result.current.errorAllDates).toBe(null);
    });

    it('успешно загружает данные дат', async () => {
        const mockData = [
            {
                id: 4001,
                name: 'new Date',
                description: 'Создает новый объект Date.',
                syntax: 'new Date()',
                adultExample: "new Date(); // текущая дата",
                childExample: "new Date(); // сегодняшний день",
                childExplanation: "Это как если бы ты посмотрел на календарь и узнал, какой сегодня день.",
            },
        ];
        mockFetchDates.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDatesList();
        });

        expect(result.current.datesList).toEqual(mockData);
        expect(result.current.loadingAllDates).toBe(false);
        expect(result.current.errorAllDates).toBe(null);
        expect(mockFetchDates).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchDates.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDatesList();
        });

        expect(result.current.datesList).toEqual([]);
        expect(result.current.loadingAllDates).toBe(false);
        expect(result.current.errorAllDates).toBe('Network error');
    });

    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchDates.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllDatesList();
        });

        expect(result.current.errorAllDates).toBe('Произошла ошибка при загрузке');
    });
});