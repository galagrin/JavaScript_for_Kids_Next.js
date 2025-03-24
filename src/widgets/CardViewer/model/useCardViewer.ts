import { useEffect, useState } from 'react';

import { CardData } from '@/features/Card/model/types';

export const useCardViewer = <T extends CardData>(items: T[]) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        setProgress(cardIndex);
    }, [cardIndex]);

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

    return {
        cardIndex,
        isFlipped,
        setIsFlipped,
        rolledOut,
        progress,
        handleNextCard,
        handlePrevCard,
        getCurrentCard,
    };
};
