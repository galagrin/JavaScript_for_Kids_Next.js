'use client';

import { useEffect } from 'react';

import { useNumbersStore } from '@/entities/numbers';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

export const NumbersPage = () => {
    const { numbersList, fetchAllNumbersList, loadingAllNumbers, errorAllNumbers } = useNumbersStore();
    
    useEffect(() => {
        if (numbersList.length === 0) {
            fetchAllNumbersList();
        }
    }, [numbersList, fetchAllNumbersList]);

    return <CardViewer items={numbersList.map(item => ({ ...item, id: String(item.id) }))} isLoading={loadingAllNumbers} error={errorAllNumbers} progressKey="numbers" />;
}; 