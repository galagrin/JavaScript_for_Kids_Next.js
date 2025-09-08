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

describe('QuizGame', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('вызывает loadAllMethods при монтировании', () => {
        const loadAllMethods = jest.fn();
        jest.mocked(useQuizStore).mockReturnValue({
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
            loadAllMethods,
        });

        render(<QuizGame />);
        expect(loadAllMethods).toHaveBeenCalled();
    });

    it('показывает загрузку', () => {
        jest.mocked(useQuizStore).mockReturnValue({
            currentQuestion: null,
            score: 0,
            totalQuestions: 0,
            gameStarted: false,
            gameEnded: false,
            answered: false,
            selectedAnswer: null,
            showResult: false,
            loading: true,
            error: null,
            startGame: jest.fn(),
            selectAnswer: jest.fn(),
            nextQuestion: jest.fn(),
            resetGame: jest.fn(),
            loadAllMethods: jest.fn(),
        });
        render(<QuizGame />);

        expect(screen.getByText(/Загружаем данные для викторины.../i)).toBeInTheDocument();
    });
});
