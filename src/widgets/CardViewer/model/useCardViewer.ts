import { useCallback, useEffect, useRef, useState } from 'react';

import { CardData } from '@/features/Card/model/types';

export const useCardViewer = <T extends CardData>(items: T[], progressKey: string) => {
    const [cardIndex, setCardIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [rolledOut, setRolledOut] = useState(false);
    const [progress, setProgress] = useState(0);
    const [viewedIds, setViewedIds] = useState<Set<string | number>>(new Set());

    const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
    const rolloutTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); // NEW

    useEffect(() => {
        try {
            const saved = localStorage.getItem(`progress-${progressKey}`);
            if (saved) setViewedIds(new Set(JSON.parse(saved)));
        } catch (error) {
            console.warn('Failed to load progress from localStorage:', error);
        }
    }, [progressKey]);

    const saveProgress = useCallback(
        (newViewedIds: Set<string | number>) => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

            saveTimeoutRef.current = setTimeout(() => {
                try {
                    localStorage.setItem(`progress-${progressKey}`, JSON.stringify(Array.from(newViewedIds)));
                } catch (error) {
                    console.warn('Failed to save progress to localStorage:', error);
                }
            }, 300);
        },
        [progressKey]
    );

    useEffect(() => {
        setProgress(cardIndex);

        const current = items[cardIndex];
        if (!current) return;

        setViewedIds((prev) => {
            if (prev.has(current.id)) return prev;
            const newSet = new Set(prev);
            newSet.add(current.id);
            saveProgress(newSet);
            return newSet;
        });
    }, [cardIndex, items, saveProgress]);

    useEffect(() => {
        return () => {
            if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
            if (rolloutTimeoutRef.current) clearTimeout(rolloutTimeoutRef.current);
        };
    }, []);

    const resetCardState = useCallback(() => {
        setIsFlipped(false);
        setRolledOut(true);
        if (rolloutTimeoutRef.current) clearTimeout(rolloutTimeoutRef.current);
        rolloutTimeoutRef.current = setTimeout(() => setRolledOut(false), 700);
    }, []);

    const handleNextCard = useCallback(() => {
        if (items.length === 0) return;
        resetCardState();
        setCardIndex((prev) => (prev + 1) % items.length);
    }, [items.length, resetCardState]);

    const handlePrevCard = useCallback(() => {
        if (items.length === 0) return;
        resetCardState();
        setCardIndex((prev) => (prev - 1 + items.length) % items.length);
    }, [items.length, resetCardState]);

    const getCurrentCard = useCallback((): T | null => {
        return items.length > 0 ? items[cardIndex] : null;
    }, [items, cardIndex]);

    const resetProgress = useCallback(() => {
        setViewedIds(new Set());
        try {
            localStorage.removeItem(`progress-${progressKey}`);
        } catch (error) {
            console.warn('Failed to remove progress from localStorage:', error);
        }
    }, [progressKey]);

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
