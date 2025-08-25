import { useEffect, useState } from 'react';

import { CardData } from '@/features/Card/model/types';

export const useCardViewer = <T extends CardData>(items: T[], progressKey: string) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [progress, setProgress] = useState(0);
    const [viewedIds, setViewedIds] = useState<Set<string | number>>(new Set());

    // Загрузка прогресса из localStorage
    useEffect(() => {
        const saved = localStorage.getItem(`progress-${progressKey}`);
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                setViewedIds(new Set(arr));
            } catch {}
        }
    }, [progressKey]);

    // Сохранение прогресса
    useEffect(() => {
        localStorage.setItem(`progress-${progressKey}`, JSON.stringify(Array.from(viewedIds)));
    }, [viewedIds, progressKey]);

    useEffect(() => {
        setProgress(cardIndex);
        if (items[cardIndex]) {
            setViewedIds((prev) => new Set(prev).add(items[cardIndex].id));
        }
    }, [cardIndex, items]);

    const handleNextCard = () => {
        resetCardState();
        setCardIndex((prev) => (prev + 1) % items.length);
    };

    const handlePrevCard = () => {
        resetCardState();
        setCardIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    const resetCardState = () => {
        setIsFlipped(false);
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 700);
    };

    const getCurrentCard = (): T | null => (items.length > 0 ? items[cardIndex] : null);

    // Сброс прогресса
    const resetProgress = () => {
        setViewedIds(new Set());
        localStorage.removeItem(`progress-${progressKey}`);
    };

    return {
        cardIndex,
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
    };
};
