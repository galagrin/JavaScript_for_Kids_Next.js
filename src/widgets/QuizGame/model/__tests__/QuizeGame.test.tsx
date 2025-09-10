import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { useQuizStore } from '@/entities/quiz';

import { QuizGame } from '../../ui/QuizGame';

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
        jest.resetAllMocks();
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
});
