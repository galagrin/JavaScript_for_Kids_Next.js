import { useEffect, useState } from 'react';

import { useArraysStore } from '@/entities/arrays/model/store';
import { ArrayMethod } from '@/entities/arrays/model/types';

export const useArrayPage = () => {
    const { arraysList, fetchAllArraysList, loadingAllArrays, errorAllArrays } = useArraysStore();

    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (arraysList.length === 0) {
            fetchAllArraysList();
        }
    }, [arraysList, fetchAllArraysList]);

    useEffect(() => {
        setProgress(cardIndex);
    }, [cardIndex]);

    const handleNextCard = () => {
        resetCardState();
        setCardIndex((prev) => (prev + 1) % arraysList.length);
    };

    const handlePrevCard = () => {
        resetCardState();
        setCardIndex((prev) => (prev - 1 + arraysList.length) % arraysList.length);
    };

    const resetCardState = () => {
        setIsFlipped(false);
        setRolledOut(true);
        setTimeout(() => setRolledOut(false), 700);
    };

    const getCurrentCard = (): ArrayMethod | null => (arraysList.length > 0 ? arraysList[cardIndex] : null);

    return {
        arraysList,
        loadingAllArrays,
        errorAllArrays,
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
