'use client';

import { useEffect, useState } from 'react';
import { CgArrowLeftO, CgArrowRightO } from 'react-icons/cg';
import useDataStore from 'store/useDataStore';

import { Card } from '@/components/Card/Card';

export default function ArraysPage() {
    const { arraysList, fetchAllArraysList, loadingAllArrays, errorAllArrays } = useDataStore();
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        if (arraysList.length === 0) {
            fetchAllArraysList();
        }
    }, [fetchAllArraysList, arraysList.length]);

    if (loadingAllArrays) {
        return <div>Загрузка данных...</div>;
    }

    if (errorAllArrays) {
        return <div>Ошибка: {errorAllArrays}</div>;
    }

    const handleNextCard = () => {
        setIsFlipped(false)
        setCardIndex((prev) => (prev + 1) % arraysList.length);
    };
    const handlePrevCard = () => {
        setIsFlipped(false)
        setCardIndex((prev) => (prev - 1 + arraysList.length) % arraysList.length);
    };

    return (
        <>
            <h1>Изучаем методы массивов</h1>

            {arraysList.length > 0 ? (
                <div className="flex items-center gap-5">
                    <CgArrowLeftO onClick={handlePrevCard} />
                    <Card data={arraysList[cardIndex]} isFlipped ={isFlipped} setIsFlipped={setIsFlipped} />
                    <CgArrowRightO onClick={handleNextCard} />
                </div>
            ) : (
                <div>Нет доступных данных.</div>
            )}
        </>
    );
}
