'use client';

import { useEffect } from 'react';

import { useQuizStore } from '@/entities/quiz';

import { getCategoryName } from '../model/getCategoryName';

import styles from './QuizGame.module.scss';

export const QuizGame = () => {
    const {
        currentQuestion,
        score,
        totalQuestions,
        gameStarted,
        gameEnded,
        answered,
        selectedAnswer,
        showResult,
        loading,
        error,
        startGame,
        selectAnswer,
        nextQuestion,
        resetGame,
        loadAllMethods,
    } = useQuizStore();

    useEffect(() => {
        loadAllMethods();
    }, [loadAllMethods]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <div className={styles.spinner}></div>
                    <p>Загружаем данные для викторины...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.error}>
                    <h2>Ошибка</h2>
                    <p>{error}</p>
                    <button onClick={() => loadAllMethods()} className={styles.retryButton}>
                        Попробовать снова
                    </button>
                </div>
            </div>
        );
    }

    if (!gameStarted) {
        return (
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <h1>JavaScript Викторина</h1>
                    <p>Проверь свои знания JavaScript методов!</p>
                    <div className={styles.rules}>
                        <h3>Правила игры:</h3>
                        <ul>
                            <li>Вопросы выбираются случайно</li>
                            <li>У тебя есть только одна попытка на каждый вопрос</li>
                            <li>Выбери правильное название метода по его описанию</li>
                            <li>Набирай очки за правильные ответы!</li>
                        </ul>
                    </div>
                    <button onClick={startGame} className={styles.startButton}>
                        Начать игру
                    </button>
                </div>
            </div>
        );
    }

    // Финальный экран после последнего вопроса
    if (gameEnded && !showResult) {
        return (
            <div className={styles.container}>
                <div className={styles.welcome}>
                    <h1>Игра окончена</h1>
                    <p>
                        Твой счёт: {score} из {totalQuestions}
                    </p>
                    <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                        <button onClick={startGame} className={styles.startButton}>
                            Играть снова
                        </button>
                        <button onClick={resetGame} className={styles.resetButton}>
                            В меню
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!currentQuestion) {
        return (
            <div className={styles.container}>
                <div className={styles.loading}>
                    <p>Генерируем вопрос...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.questionCard}>
                <div className={styles.questionHeader}>
                    <span className={styles.questionNumber}>Вопрос {totalQuestions + 1}</span>
                    <span className={styles.category}>{getCategoryName(currentQuestion.category)}</span>
                </div>

                <div className={styles.questionContent}>
                    <h2>Какой метод делает это?</h2>
                    <p className={styles.description}>{currentQuestion.description}</p>
                </div>

                <div className={styles.options}>
                    {currentQuestion.options.map((option, index) => {
                        let optionClass = styles.option;

                        if (answered) {
                            if (option === currentQuestion.correctAnswer) {
                                optionClass += ` ${styles.correct}`;
                            } else if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
                                optionClass += ` ${styles.incorrect}`;
                            } else {
                                optionClass += ` ${styles.disabled}`;
                            }
                        }

                        return (
                            <button key={index} className={optionClass} onClick={() => selectAnswer(option)} disabled={answered}>
                                <span className={styles.optionLetter}>{String.fromCharCode(65 + index)}</span>
                                <span className={styles.optionText}>{option}()</span>
                            </button>
                        );
                    })}
                </div>

                {showResult && (
                    <div className={styles.result}>
                        {selectedAnswer === currentQuestion.correctAnswer ? (
                            <div className={styles.correctResult}>
                                <span className={styles.emoji}>🎉</span>
                                <span>Правильно!</span>
                            </div>
                        ) : (
                            <div className={styles.incorrectResult}>
                                <span className={styles.emoji}>❌</span>
                                <span>
                                    Неправильно. Правильный ответ: <strong>{currentQuestion.correctAnswer}()</strong>
                                </span>
                            </div>
                        )}

                        <button onClick={nextQuestion} className={styles.nextButton}>
                            {gameEnded ? 'Завершить игру' : 'Следующий вопрос'}
                        </button>
                    </div>
                )}
            </div>

            <div className={styles.gameFooter}>
                <div className={styles.score}>
                    Счёт: {score} / {totalQuestions}
                </div>
                <button onClick={resetGame} className={styles.resetButton}>
                    Заново
                </button>
            </div>
        </div>
    );
};
