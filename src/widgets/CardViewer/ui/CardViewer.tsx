'use client';

import { ArrowButton } from '@/shared/ui/ArrowButton/ArrowButton';

import { Card, AdultDetails } from '@/features/Card/index';
import { CardData } from '@/features/Card/model/types';
import { AdultExplanationToggle } from '@/shared/ui/AdultExplanationToggle';

import { useCardViewer } from '../model/useCardViewer';

import styles from './CardViewer.module.scss';

interface CardsViewerProps<T extends CardData> {
    items: T[];
    isLoading?: boolean;
    error?: string | null;
    progressKey: string;
}

// Скелетон-компонент для карточки
const CardSkeleton = () => (
    <div className={styles.container}>
        <div className={styles.skeletonCard}>
            <div className={styles.skeletonTitle} />
            <div className={styles.skeletonText} />
            <div className={styles.skeletonText} />
        </div>
    </div>
);

export const CardViewer = <T extends CardData>({ items, isLoading = false, error, progressKey }: CardsViewerProps<T>) => {
    const {
        isFlipped,
        setIsFlipped,
        rolledOut,
        progress,
        handleNextCard,
        handlePrevCard,
        getCurrentCard,
        viewedIds,
        setViewedIds,
        resetProgress,
    } = useCardViewer(items, progressKey);
    
    if (isLoading) return <CardSkeleton />;
    if (error) return <div>Ошибка: {error}</div>;

    const currentCard = getCurrentCard();

    return (
        <>
            <div className={styles.progressMapWrapper}>
                <div className={styles.progressMap}>
                    {items.map((item, idx) => {
                        const dotClasses = [styles.progressDot];
                        if (viewedIds.has((item as CardData).id)) dotClasses.push(styles.progressDotViewed);
                        if (idx === progress) dotClasses.push(styles.progressDotCurrent);
                        return (
                            <div
                                key={(item as CardData).id}
                                className={dotClasses.join(' ')}
                                title={
                                    viewedIds.has((item as CardData).id)
                                        ? `Просмотрено: ${(item as CardData).name}`
                                        : `Не просмотрено: ${(item as CardData).name}`
                                }
                            />
                        );
                    })}
                </div>
                <button className={styles.resetBtn} onClick={resetProgress} title="Сбросить прогресс">
                    Сбросить прогресс
                </button>
                <span className={styles.progressInfo}>
                    Просмотрено: {viewedIds.size} из {items.length}
                </span>
            </div>
            {currentCard && (
                <>
                    <div className={styles.container}>
                        <ArrowButton onClick={handlePrevCard} direction="Left" />
                        <Card data={currentCard} isFlipped={isFlipped} setIsFlipped={setIsFlipped} rolledOut={rolledOut} />
                        <ArrowButton onClick={handleNextCard} direction="Right" />
                    </div>
                    
                    <AdultExplanationToggle storageKey={`${progressKey}-adult-open-${currentCard.id}`}>
                        <AdultDetails data={currentCard} />
                    </AdultExplanationToggle>
                </>
            )}
        </>
    );
};
