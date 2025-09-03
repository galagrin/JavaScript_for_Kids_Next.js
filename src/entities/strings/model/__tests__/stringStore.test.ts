// model/arraysStore.test.ts
import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { StringsActions, StringsState } from '../types';

type StringsStore = StringsState & StringsActions;
jest.mock('@/shared/api/apiBase', () => ({
    fetchStrings: jest.fn(),
}));
const { fetchStrings } = require('@/shared/api/apiBase');
const mockFetchStrings = fetchStrings as jest.MockedFunction<typeof fetchStrings>;

const createTestStore = () =>
    create<StringsStore>((set, get) => ({
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
    }));

describe('useStringStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });
    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.stringsList).toEqual([]);
        expect(result.current.loadingAllStrings).toBe(false);
        expect(result.current.errorAllStrings).toBe(null);
    });

    it('успешно загружает данные', async () => {
        const mockData = [
            {
                id: 2001,
                name: 'charAt',
                description: 'Возвращает символ по указанному индексу.',
                syntax: 'string.charAt(index)',
                adultExample: "let str = 'Hello'; str.charAt(0); // 'H'",
                childExample: "let str = 'Котик'; str.charAt(2); // 'т'",
                childExplanation:
                    "Это как если бы ты хотел узнать, какая буква стоит на третьем месте в слове 'Котик'. Ты смотришь и видишь, что это 'т'.",
            },
        ];
        mockFetchStrings.mockResolvedValueOnce(mockData);
        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllStringsList();
        });
        expect(result.current.stringsList).toEqual(mockData);
        expect(result.current.loadingAllStrings).toBe(false);
        expect(result.current.errorAllStrings).toBe(null);
        expect(mockFetchStrings).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchStrings.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());
        await act(async () => {
            await result.current.fetchAllStringsList();
        });
        expect(result.current.stringsList).toEqual([]);
        expect(result.current.loadingAllStrings).toBe(false);
        expect(result.current.errorAllStrings).toBe('Network error');
    });
    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchStrings.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());
        await act(async () => {
            await result.current.fetchAllStringsList();
        });
        expect(result.current.errorAllStrings).toBe('Произошла ошибка при загрузке');
    });
});
