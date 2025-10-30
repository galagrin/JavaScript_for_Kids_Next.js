'use client';

import { create } from 'zustand';

// 1. Импортируем только то, что действительно нужно.
import { ApiMethod } from '@/shared/api/apiBase';

import { QuizActions, QuizQuestion, QuizState } from './types';

// Определяем полный тип нашего хранилища
type QuizStore = QuizState & QuizActions;

// Лимит вопросов на сессию
const MAX_QUESTIONS = 10;

// Функция для перемешивания массива (алгоритм Фишера–Йетса)
function shuffle<T>(arr: T[]): T[] {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

// Функция для выбора N случайных элементов из массива
function pickN<T>(arr: T[], n: number): T[] {
    n = Math.max(0, Math.min(n, arr.length));
    if (n === 0) return [];
    if (n === arr.length) return arr.slice();

    const a = arr.slice();
    for (let i = a.length - 1; i >= a.length - n; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.slice(a.length - n);
}

// --- Создание хранилища Zustand ---

export const useQuizStore = create<QuizStore>((set, get) => ({
    // --- Состояние (State) ---
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

    // --- Действия (Actions) ---

    // НОВАЯ, УПРОЩЕННАЯ функция загрузки данных
    loadAllMethods: async () => {
        set({ loading: true, error: null });
        try {
            // Делаем всего ОДИН сетевой запрос к нашему внутреннему API
            const response = await fetch('/api/quiz-data');

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || 'Не удалось получить данные для викторины с сервера');
            }

            const allMethods: ApiMethod[] = await response.json();

            if (!allMethods || allMethods.length === 0) {
                throw new Error('Получены пустые данные для викторины');
            }

            // Сохраняем все полученные методы в состояние
            set({ allMethods, loading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'Ошибка загрузки данных',
                loading: false,
            });
        }
    },

    startGame: () => {
        set({
            gameStarted: true,
            gameEnded: false,
            score: 0,
            totalQuestions: 0,
            answered: false,
            selectedAnswer: null,
            showResult: false,
            questionSeq: 0,
        });
        // После сброса состояния генерируем первый вопрос
        get().generateRandomQuestion();
    },

    generateRandomQuestion: () => {
        const { allMethods } = get();
        if (allMethods.length === 0) return;

        const randomMethod = allMethods[Math.floor(Math.random() * allMethods.length)];

        const pool = allMethods.filter((m) => m.name !== randomMethod.name);
        const wrongAnswers = pickN(
            pool.map((m) => m.name),
            3
        );

        const options = shuffle([randomMethod.name, ...wrongAnswers]);

        const question: QuizQuestion = {
            id: `q_${get().questionSeq + 1}`,
            method: randomMethod.name,
            description: randomMethod.description,
            correctAnswer: randomMethod.name,
            options,
            category: (randomMethod as any).category || 'unknown', // Добавим (as any) для TypeScript
        };

        set((state) => ({
            currentQuestion: question,
            questionSeq: state.questionSeq + 1,
            answered: false,
            selectedAnswer: null,
            showResult: false,
        }));
    },

    selectAnswer: (answer: string) => {
        const { currentQuestion, score, totalQuestions, answered } = get();
        if (!currentQuestion || answered) return;

        const isCorrect = answer === currentQuestion.correctAnswer;
        const answeredCount = totalQuestions + 1;

        set({
            selectedAnswer: answer,
            answered: true,
            showResult: true,
            score: isCorrect ? score + 1 : score,
            totalQuestions: answeredCount,
            gameEnded: answeredCount >= MAX_QUESTIONS,
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
}));
