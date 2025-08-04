'use client';

import { ArrowButton } from '@/shared/ui/ArrowButton/ArrowButton';
import { ProgressBar } from '@/shared/ui/ProgressBar/ProgressBar';

import { Card } from '@/features/Card/index';
import { CardData } from '@/features/Card/model/types';

import { useCardViewer } from '../model/useCardViewer';

import styles from './CardViewer.module.scss';

interface CardsViewerProps<T extends CardData> {
    items: T[];
    isLoading?: boolean;
    error?: string | null;
}

export const CardViewer = <T extends CardData>({ items, isLoading = false, error }: CardsViewerProps<T>) => {
    const { isFlipped, setIsFlipped, rolledOut, progress, handleNextCard, handlePrevCard, getCurrentCard } = useCardViewer(items);
    if (isLoading) return <div>Загрузка данных...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    const currentCard = getCurrentCard();

    return (
        <>
            {currentCard && (
                <>
                    <div className={styles.container}>
                        <ArrowButton onClick={handlePrevCard} direction="Left" />
                        <Card data={currentCard} isFlipped={isFlipped} setIsFlipped={setIsFlipped} rolledOut={rolledOut} />
                        <ArrowButton onClick={handleNextCard} direction="Right" />
                    </div>
                    <div className={styles.progressWrapper}>
                        <ProgressBar value={progress} max={items.length > 0 ? items.length - 1 : 0} />
                    </div>
                </>
            )}
        </>
    );
};
