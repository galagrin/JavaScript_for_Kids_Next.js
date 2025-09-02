export interface QuizQuestion {
    id: string;
    method: string;
    description: string;
    correctAnswer: string;
    options: string[];
    
    category: 'arrays' | 'strings' | 'objects' | 'dates' | 'promises' | 'numbers' | 'datatypes';
}

export interface QuizState {
    currentQuestion: QuizQuestion | null;
    score: number;
    totalQuestions: number;
    gameStarted: boolean;
    gameEnded: boolean;
    answered: boolean;
    selectedAnswer: string | null;
    showResult: boolean;
    questionSeq: number;
    allMethods: any[];
    loading: boolean;
    error: string | null;
}

export interface QuizActions {
    startGame: () => void;
    generateRandomQuestion: () => void;
    selectAnswer: (answer: string) => void;
    nextQuestion: () => void;
    resetGame: () => void;
    loadAllMethods: () => Promise<void>;
}
