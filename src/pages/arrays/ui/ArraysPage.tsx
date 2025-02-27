'use client';

import { useArrayPage } from '@/pages/arrays/model/useArrayPage';
import { ArrowButton } from '@/shared/ui/ArrowButton/ArrowButton';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';
import { Card } from '@/widgets/Card/ui/Card';

export default function ArraysPage() {
    const {
        loadingAllArrays,
        errorAllArrays,
        isFlipped,
        setIsFlipped,
        rolledOut,
        progress,
        handleNextCard,
        handlePrevCard,
        getCurrentCard,
        arraysList,
    } = useArrayPage();

    if (loadingAllArrays) return <div>Загрузка данных...</div>;
    if (errorAllArrays) return <div>Ошибка: {errorAllArrays}</div>;

    const currentCard = getCurrentCard();

    return (
        <>
            <h1 className="text-center">Изучаем методы массивов</h1>
            {currentCard && (
                <>
                    <div className="flex items-center gap-5 justify-center">
                        <ArrowButton onClick={handlePrevCard} direction="Left" />
                        <Card data={currentCard} isFlipped={isFlipped} setIsFlipped={setIsFlipped} rolledOut={rolledOut} />
                        <ArrowButton onClick={handleNextCard} direction="Right" />
                    </div>
                    <div className="flex justify-center">
                        <ProgressBar value={progress} max={arraysList.length > 0 ? arraysList.length - 1 : 0} />
                    </div>
                </>
            )}
        </>
    );
}
