import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { ObjectsActions, ObjectsState } from '../types';

type ObjectsStore = ObjectsState & ObjectsActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchObjects: jest.fn(),
}));
const { fetchObjects } = require('@/shared/api/apiBase');
const mockFetchObjects = fetchObjects as jest.MockedFunction<typeof fetchObjects>;

const createTestStore = () => {
    return create<ObjectsStore>()((set) => ({
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
    }));
};

describe('useObjectsStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        expect(result.current.objectsList).toEqual([]);
        expect(result.current.loadingAllObjects).toBe(false);
        expect(result.current.errorAllObjects).toBe(null);
    });

    it('успешно загружает данные объектов', async () => {
        const mockData = [
            {
                id: 3001,
                name: 'Object.keys',
                description: 'Возвращает массив ключей объекта.',
                syntax: 'Object.keys(obj)',
                adultExample: "Object.keys({a: 1, b: 2}); // ['a', 'b']",
                childExample: "Object.keys({имя: 'Вася', возраст: 10}); // ['имя', 'возраст']",
                childExplanation: "Это как если бы ты хотел узнать, какие ярлычки есть на коробках с игрушками.",
            },
        ];
        mockFetchObjects.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllObjectsList();
        });

        expect(result.current.objectsList).toEqual(mockData);
        expect(result.current.loadingAllObjects).toBe(false);
        expect(result.current.errorAllObjects).toBe(null);
        expect(mockFetchObjects).toHaveBeenCalledTimes(1);
    });

    it('обрабатывает ошибку (Error)', async () => {
        mockFetchObjects.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllObjectsList();
        });

        expect(result.current.objectsList).toEqual([]);
        expect(result.current.loadingAllObjects).toBe(false);
        expect(result.current.errorAllObjects).toBe('Network error');
    });

    it('обрабатывает ошибку (не Error)', async () => {
        mockFetchObjects.mockRejectedValueOnce('String error');

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.fetchAllObjectsList();
        });

        expect(result.current.errorAllObjects).toBe('Произошла ошибка при загрузке');
    });
});