import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { shallow } from 'zustand/shallow';

import { useQuizStore } from '@/entities/quiz';

import { QuizGame } from '../../ui/QuizGame';
import { getCategoryName } from '../getCategoryName';

jest.mock('@/entities/quiz', () => ({
    useQuizStore: jest.fn(),
}));

jest.mock('../getCategoryName', () => ({
    getCategoryName: jest.fn((category: string) => category),
}));

//фабрика для создания стора
const makeStore = (overrides: Partial<ReturnType<typeof useQuizStore>> = {}) => ({
    currentQuestion: null,
    score: 0,
    totalQuestions: 0,
    gameStarted: false,
    gameEnded: false,
    answered: false,
    selectedAnswer: null,
    showResult: false,
    loading: false,
    error: null,
    startGame: jest.fn(),
    selectAnswer: jest.fn(),
    nextQuestion: jest.fn(),
    resetGame: jest.fn(),
    loadAllMethods: jest.fn(),
    ...overrides,
});
describe('QuizGame', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('вызывает loadAllMethods при монтировании', () => {
        const loadAllMethods = jest.fn();
        const store = makeStore({
            loadAllMethods,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);
        expect(loadAllMethods).toHaveBeenCalled();
    });

    it('показывает загрузку', () => {
        const store = makeStore({
            loading: true,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);
        render(<QuizGame />);

        expect(screen.getByText(/Загружаем данные для викторины.../i)).toBeInTheDocument();
    });

    it('показывает сообщение об ошибке и дает перезагрузить', async () => {
        const user = userEvent.setup();
        const loadAllMethods = jest.fn();

        const store = makeStore({
            error: 'Ошибка сети',
            loadAllMethods,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);
        render(<QuizGame />);

        expect(screen.getByText(/Попробовать снова/i)).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Попробовать снова/i }));
        expect(loadAllMethods).toHaveBeenCalled();
    });

    it('показывает приветственный экран и стартует игру', async () => {
        const user = userEvent.setup();
        const startGame = jest.fn();

        const store = makeStore({
            gameStarted: false,
            startGame,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);

        expect(screen.getByText(/JavaScript Викторина/i)).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Начать игру/i }));
        expect(startGame).toHaveBeenCalled();
    });

    it('показывает экран вопроса и отдаёт ответ в selectAnswer', async () => {
        const user = userEvent.setup();
        const question = {
            id: 'q1',
            method: 'push',
            description: 'Добавляет элементы',
            correctAnswer: 'push',
            options: ['push', 'pop', 'slice', 'charAt'],
            category: 'arrays',
        };
        const store = makeStore({
            gameStarted: true,
            currentQuestion: question,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);
        expect(screen.getByText('Вопрос 1')).toBeInTheDocument();
        expect(getCategoryName).toHaveBeenCalledWith('arrays');
        expect(screen.getByText('Добавляет элементы')).toBeInTheDocument();

        const popBtn = screen.getByRole('button', { name: /pop/i });
        await user.click(popBtn);
        expect(store.selectAnswer).toHaveBeenCalledWith('pop');
    });

    it('Показывает результат и дает нажать Следующий вопрос', async () => {
        const user = userEvent.setup();
        const question = {
            id: 'q1',
            method: 'push',
            description: 'Добавляет элементы',
            correctAnswer: 'push',
            options: ['push', 'pop', 'slice', 'charAt'],
            category: 'arrays',
        };
        const store = makeStore({
            gameStarted: true,
            currentQuestion: question,
            answered: true,
            selectedAnswer: 'push',
            showResult: true,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);
        expect(screen.getByText('Правильно!')).toBeInTheDocument();
        expect(screen.getByText('Следующий вопрос')).toBeInTheDocument();
        await user.click(screen.getByRole('button', { name: /Следующий вопрос/i }));
        expect(store.nextQuestion).toHaveBeenCalled();
    });

    it('На неправильный ответ выводит "Неправильно. Правильный ответ:"', () => {
        const question = {
            id: 'q1',
            method: 'push',
            description: 'Добавляет элементы',
            correctAnswer: 'push',
            options: ['push', 'pop', 'slice', 'charAt'],
            category: 'arrays',
        };
        const store = makeStore({
            gameStarted: true,
            currentQuestion: question,
            answered: true,
            selectedAnswer: 'pop',
            showResult: true,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);
        expect(screen.getByText('Неправильно. Правильный ответ:')).toBeInTheDocument();
    });

    it('показывает финальный экран и даёт перезапустить', async () => {
        const user = userEvent.setup();
        const store = makeStore({
            gameEnded: true,
            gameStarted: true,
            showResult: false,
            score: 2,
            totalQuestions: 2,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);
        render(<QuizGame />);

        expect(screen.getByText(/Игра окончена/i)).toBeInTheDocument();
        expect(screen.getByText(/Твой счёт: 2 из 2/)).toBeInTheDocument();

        await user.click(screen.getByRole('button', { name: /В меню/i }));
        expect(store.resetGame).toHaveBeenCalled();

        await user.click(screen.getByRole('button', { name: /Играть снова/i }));
        expect(store.startGame).toHaveBeenCalled();
    });

    it('кнопка "Заново"в футере вызывает resetGame', async () => {
        const user = userEvent.setup();
        const question = {
            id: 'q1',
            method: 'push',
            description: 'Добавляет элементы',
            correctAnswer: 'push',
            options: ['push', 'pop'],
            category: 'arrays',
        };
        const store = makeStore({
            gameStarted: true,
            currentQuestion: question,
            score: 1,
            totalQuestions: 1,
        });
        jest.mocked(useQuizStore).mockReturnValue(store);

        render(<QuizGame />);

        await user.click(screen.getByRole('button', { name: /Заново/i }));
        expect(store.resetGame).toHaveBeenCalled();
    });
});
