'use client';

import { useEffect, useState } from 'react';
import useDataStore from 'store/useDataStore';

import { Card } from '@/components/Card/Card';

import { ArrowButton } from 'ui/ArrowButton/ArrowButton';
import { ProgressBar } from 'ui/ProgressBar/ProgressBar';

export default function ArraysPage() {
    const { arraysList, fetchAllArraysList, loadingAllArrays, errorAllArrays } = useDataStore();
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [progress, setProgress] = useState(0); // Прогресс

    useEffect(() => {
        if (arraysList.length === 0) {
            fetchAllArraysList();
        }
    }, []);

    useEffect(() => {
        // Обновляем прогресс в зависимости от текущего индекса карточки
        setProgress(cardIndex);
    }, [cardIndex]);

    if (loadingAllArrays) {
        return <div>Загрузка данных...</div>;
    }

    if (errorAllArrays) {
        return <div>Ошибка: {errorAllArrays}</div>;
    }

    const handleNextCard = () => {
        setIsFlipped(false);
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 700);

        setCardIndex((prev) => (prev + 1) % arraysList.length);
    };

    const handlePrevCard = () => {
        setIsFlipped(false);
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 700);

        setCardIndex((prev) => {
            const newIndex = (prev - 1 + arraysList.length) % arraysList.length;
            return newIndex;
        });
    };

    return (
        <>
            <h1 className="text-center">Изучаем методы массивов</h1>

            {arraysList.length > 0 ? (
                <>
                    <div className="flex items-center gap-5 justify-center">
                        <ArrowButton onClick={handlePrevCard} direction="Left" />
                        <Card data={arraysList[cardIndex]} isFlipped={isFlipped} setIsFlipped={setIsFlipped} rolledOut={rolledOut} />
                        <ArrowButton onClick={handleNextCard} direction="Right" />
                    </div>
                    <div className="flex justify-center">
                        <ProgressBar value={progress} max={arraysList.length - 1} />
                    </div>
                </>
            ) : (
                <div>Нет доступных данных.</div>
            )}
        </>
    );
}
