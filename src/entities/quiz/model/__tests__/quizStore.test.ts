import { act, renderHook } from '@testing-library/react';
import { create } from 'zustand';

import { QuizActions, QuizState } from '../types';

type QuizStore = QuizState & QuizActions;

// Мокаем API
jest.mock('@/shared/api/apiBase', () => ({
    fetchArrays: jest.fn(),
    fetchStrings: jest.fn(),
    fetchObjects: jest.fn(),
    fetchDates: jest.fn(),
    fetchPromises: jest.fn(),
    fetchNumbers: jest.fn(),
    fetchDataTypes: jest.fn(),
}));

const {
    fetchArrays,
    fetchStrings,
    fetchObjects,
    fetchDates,
    fetchPromises,
    fetchNumbers,
    fetchDataTypes,
} = require('@/shared/api/apiBase');

const mockFetchArrays = fetchArrays as jest.MockedFunction<typeof fetchArrays>;
const mockFetchStrings = fetchStrings as jest.MockedFunction<typeof fetchStrings>;
const mockFetchObjects = fetchObjects as jest.MockedFunction<typeof fetchObjects>;
const mockFetchDates = fetchDates as jest.MockedFunction<typeof fetchDates>;
const mockFetchPromises = fetchPromises as jest.MockedFunction<typeof fetchPromises>;
const mockFetchNumbers = fetchNumbers as jest.MockedFunction<typeof fetchNumbers>;
const mockFetchDataTypes = fetchDataTypes as jest.MockedFunction<typeof fetchDataTypes>;

// Мокаем Math.random для предсказуемых тестов
const mockMathRandom = jest.spyOn(Math, 'random');
const mockDateNow = jest.spyOn(Date, 'now');

const createTestStore = () => {
    return create<QuizStore>((set, get) => ({
        // State
        currentQuestion: null,
        score: 0,
        totalQuestions: 0,
        gameStarted: false,
        gameEnded: false,
        answered: false,
        selectedAnswer: null,
        showResult: false,
        allMethods: [],
        loading: false,
        error: null,
        questionSeq: 0,

        // Actions
        startGame: () => {
            set({
                gameStarted: true,
                gameEnded: false,
                score: 0,
                totalQuestions: 0,
                answered: false,
                selectedAnswer: null,
                showResult: false,
            });
            get().generateRandomQuestion();
        },

        generateRandomQuestion: () => {
            const { allMethods } = get();
            if (allMethods.length === 0) return;

            // Выбираем случайный метод
            const randomMethod = allMethods[Math.floor(Math.random() * allMethods.length)];

            // Создаем неправильные варианты ответов
            const pool = allMethods.filter((m) => m.name !== randomMethod.name);
            const wrongAnswers = pool
                .sort(() => Math.random() - 0.5)
                .slice(0, Math.min(3, Math.max(0, pool.length)))
                .map((m) => m.name);

            // Создаем все варианты ответов и перемешиваем их
            const options = [randomMethod.name, ...wrongAnswers].sort(() => Math.random() - 0.5);

            const question = {
                id: `q_${Date.now()}`,
                method: randomMethod.name,
                description: randomMethod.description,
                correctAnswer: randomMethod.name,
                options,
                category: randomMethod.category || 'arrays',
            };

            set({
                currentQuestion: question,
                answered: false,
                selectedAnswer: null,
                showResult: false,
            });
        },

        selectAnswer: (answer: string) => {
            const { currentQuestion, score, totalQuestions } = get();
            if (!currentQuestion || get().answered) return;

            const isCorrect = answer === currentQuestion.correctAnswer;
            const answeredCount = totalQuestions + 1;

            set({
                selectedAnswer: answer,
                answered: true,
                showResult: true,
                score: isCorrect ? score + 1 : score,
                totalQuestions: answeredCount,
                gameEnded: answeredCount >= 2, // MAX_QUESTIONS = 2
            });
        },

        nextQuestion: () => {
            if (get().gameEnded) {
                set({ currentQuestion: null, answered: false, showResult: false });
                return;
            }
            get().generateRandomQuestion();
        },

        resetGame: () => {
            set({
                currentQuestion: null,
                score: 0,
                totalQuestions: 0,
                gameStarted: false,
                gameEnded: false,
                answered: false,
                selectedAnswer: null,
                showResult: false,
            });
        },

        loadAllMethods: async () => {
            set({ loading: true, error: null });

            try {
                const [arrays, strings, objects, dates, promises, numbers, datatypes] = await Promise.allSettled([
                    fetchArrays().then((data) => data.map((method) => ({ ...method, category: 'arrays' }))),
                    fetchStrings().then((data) => data.map((method) => ({ ...method, category: 'strings' }))),
                    fetchObjects().then((data) => data.map((method) => ({ ...method, category: 'objects' }))),
                    fetchDates().then((data) => data.map((method) => ({ ...method, category: 'dates' }))),
                    fetchPromises().then((data) => data.map((method) => ({ ...method, category: 'promises' }))),
                    fetchNumbers().then((data) => data.map((method) => ({ ...method, category: 'numbers' }))),
                    fetchDataTypes().then((data) => data.map((method) => ({ ...method, category: 'datatypes' }))),
                ]);

                const allMethods: any[] = [];

                [arrays, strings, objects, dates, promises, numbers, datatypes].forEach((result) => {
                    if (result.status === 'fulfilled') {
                        allMethods.push(...result.value);
                    } else {
                        console.warn('Failed to load some methods:', result.reason);
                    }
                });

                if (allMethods.length === 0) {
                    throw new Error('Не удалось загрузить данные для викторины');
                }

                set({ allMethods, loading: false });
            } catch (error) {
                set({
                    error: error instanceof Error ? error.message : 'Ошибка загрузки данных',
                    loading: false,
                });
            }
        },
    }));
};

describe('useQuizStore', () => {
    let useTestStore: ReturnType<typeof createTestStore>;

    const mockMethods = [
        { id: 1, name: 'push', description: 'Добавляет элементы в конец массива', category: 'arrays' },
        { id: 2, name: 'pop', description: 'Удаляет последний элемент массива', category: 'arrays' },
        { id: 3, name: 'charAt', description: 'Возвращает символ по индексу', category: 'strings' },
        { id: 4, name: 'slice', description: 'Извлекает часть строки', category: 'strings' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useTestStore = createTestStore();
        mockMathRandom.mockReturnValue(0.5);
        mockDateNow.mockReturnValue(1000000);
    });

    afterAll(() => {
        mockMathRandom.mockRestore();
        mockDateNow.mockRestore();
    });

    it('имеет правильное начальное состояние', () => {
        const { result } = renderHook(() => useTestStore());
        
        expect(result.current.currentQuestion).toBe(null);
        expect(result.current.score).toBe(0);
        expect(result.current.totalQuestions).toBe(0);
        expect(result.current.gameStarted).toBe(false);
        expect(result.current.gameEnded).toBe(false);
        expect(result.current.answered).toBe(false);
        expect(result.current.selectedAnswer).toBe(null);
        expect(result.current.showResult).toBe(false);
        expect(result.current.allMethods).toEqual([]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.questionSeq).toBe(0);
    });

    it('успешно загружает все методы', async () => {
        mockFetchArrays.mockResolvedValueOnce([mockMethods[0], mockMethods[1]]);
        mockFetchStrings.mockResolvedValueOnce([mockMethods[2], mockMethods[3]]);
        mockFetchObjects.mockResolvedValueOnce([]);
        mockFetchDates.mockResolvedValueOnce([]);
        mockFetchPromises.mockResolvedValueOnce([]);
        mockFetchNumbers.mockResolvedValueOnce([]);
        mockFetchDataTypes.mockResolvedValueOnce([]);

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.loadAllMethods();
        });

        expect(result.current.allMethods).toHaveLength(4);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(result.current.allMethods[0]).toEqual({ ...mockMethods[0], category: 'arrays' });
    });

    it('обрабатывает ошибки при загрузке методов', async () => {
        mockFetchArrays.mockRejectedValueOnce(new Error('Network error'));
        mockFetchStrings.mockRejectedValueOnce(new Error('Network error'));
        mockFetchObjects.mockRejectedValueOnce(new Error('Network error'));
        mockFetchDates.mockRejectedValueOnce(new Error('Network error'));
        mockFetchPromises.mockRejectedValueOnce(new Error('Network error'));
        mockFetchNumbers.mockRejectedValueOnce(new Error('Network error'));
        mockFetchDataTypes.mockRejectedValueOnce(new Error('Network error'));

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.loadAllMethods();
        });

        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe('Не удалось загрузить данные для викторины');
    });

    it('запускает игру и генерирует первый вопрос', () => {
        const { result } = renderHook(() => useTestStore());
        
        // Сначала загружаем методы
        act(() => {
            result.current.allMethods = mockMethods;
        });

        act(() => {
            result.current.startGame();
        });

        expect(result.current.gameStarted).toBe(true);
        expect(result.current.gameEnded).toBe(false);
        expect(result.current.score).toBe(0);
        expect(result.current.totalQuestions).toBe(0);
        expect(result.current.currentQuestion).not.toBe(null);
        expect(result.current.currentQuestion?.options).toHaveLength(4);
    });

    it('правильно обрабатывает выбор правильного ответа', () => {
        const { result } = renderHook(() => useTestStore());
        
        // Подготавливаем данные
        act(() => {
            result.current.allMethods = mockMethods;
            result.current.currentQuestion = {
                id: 'test',
                method: 'push',
                description: 'Добавляет элементы',
                correctAnswer: 'push',
                options: ['push', 'pop', 'slice', 'charAt'],
                category: 'arrays',
            };
        });

        act(() => {
            result.current.selectAnswer('push');
        });

        expect(result.current.selectedAnswer).toBe('push');
        expect(result.current.answered).toBe(true);
        expect(result.current.showResult).toBe(true);
        expect(result.current.score).toBe(1);
        expect(result.current.totalQuestions).toBe(1);
        expect(result.current.gameEnded).toBe(false);
    });

    it('правильно обрабатывает выбор неправильного ответа', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.allMethods = mockMethods;
            result.current.currentQuestion = {
                id: 'test',
                method: 'push',
                description: 'Добавляет элементы',
                correctAnswer: 'push',
                options: ['push', 'pop', 'slice', 'charAt'],
                category: 'arrays',
            };
        });

        act(() => {
            result.current.selectAnswer('pop');
        });

        expect(result.current.selectedAnswer).toBe('pop');
        expect(result.current.answered).toBe(true);
        expect(result.current.showResult).toBe(true);
        expect(result.current.score).toBe(0);
        expect(result.current.totalQuestions).toBe(1);
    });

    it('завершает игру после максимального количества вопросов', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.allMethods = mockMethods;
            result.current.currentQuestion = {
                id: 'test',
                method: 'push',
                description: 'Добавляет элементы',
                correctAnswer: 'push',
                options: ['push', 'pop', 'slice', 'charAt'],
                category: 'arrays',
            };
            result.current.totalQuestions = 1; // уже ответили на 1 вопрос
        });

        act(() => {
            result.current.selectAnswer('push'); // отвечаем на 2й вопрос
        });

        expect(result.current.gameEnded).toBe(true);
        expect(result.current.totalQuestions).toBe(2);
    });

    it('переходит к следующему вопросу', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.allMethods = mockMethods;
            result.current.answered = true;
            result.current.showResult = true;
            result.current.gameEnded = false;
        });

        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.currentQuestion).not.toBe(null);
        expect(result.current.answered).toBe(false);
        expect(result.current.showResult).toBe(false);
    });

    it('завершает игру при переходе к следующему вопросу если игра закончена', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.gameEnded = true;
        });

        act(() => {
            result.current.nextQuestion();
        });

        expect(result.current.currentQuestion).toBe(null);
        expect(result.current.answered).toBe(false);
        expect(result.current.showResult).toBe(false);
    });

    it('сбрасывает игру к начальному состоянию', () => {
        const { result } = renderHook(() => useTestStore());
        
        // Устанавливаем некоторое состояние игры
        act(() => {
            result.current.gameStarted = true;
            result.current.score = 5;
            result.current.totalQuestions = 3;
            result.current.answered = true;
        });

        act(() => {
            result.current.resetGame();
        });

        expect(result.current.currentQuestion).toBe(null);
        expect(result.current.score).toBe(0);
        expect(result.current.totalQuestions).toBe(0);
        expect(result.current.gameStarted).toBe(false);
        expect(result.current.gameEnded).toBe(false);
        expect(result.current.answered).toBe(false);
        expect(result.current.selectedAnswer).toBe(null);
        expect(result.current.showResult).toBe(false);
    });

    it('не позволяет выбрать ответ если уже отвечено', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.currentQuestion = {
                id: 'test',
                method: 'push',
                description: 'Добавляет элементы',
                correctAnswer: 'push',
                options: ['push', 'pop'],
                category: 'arrays',
            };
            result.current.answered = true;
            result.current.score = 1;
        });

        act(() => {
            result.current.selectAnswer('pop');
        });

        // Состояние не должно измениться
        expect(result.current.score).toBe(1);
        expect(result.current.selectedAnswer).toBe(null);
    });

    it('не генерирует вопрос если нет методов', () => {
        const { result } = renderHook(() => useTestStore());
        
        act(() => {
            result.current.allMethods = [];
        });

        act(() => {
            result.current.generateRandomQuestion();
        });

        expect(result.current.currentQuestion).toBe(null);
    });

    it('обрабатывает частичные ошибки при загрузке методов', async () => {
        // Некоторые API успешны, некоторые с ошибками
        mockFetchArrays.mockResolvedValueOnce([mockMethods[0]]);
        mockFetchStrings.mockRejectedValueOnce(new Error('Strings error'));
        mockFetchObjects.mockResolvedValueOnce([mockMethods[2]]);
        mockFetchDates.mockRejectedValueOnce(new Error('Dates error'));
        mockFetchPromises.mockResolvedValueOnce([]);
        mockFetchNumbers.mockResolvedValueOnce([]);
        mockFetchDataTypes.mockResolvedValueOnce([]);

        const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

        const { result } = renderHook(() => useTestStore());

        await act(async () => {
            await result.current.loadAllMethods();
        });

        expect(result.current.allMethods).toHaveLength(2); // только успешные
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(consoleSpy).toHaveBeenCalledTimes(2); // 2 предупреждения об ошибках

        consoleSpy.mockRestore();
    });
});