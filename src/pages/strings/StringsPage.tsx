'use client';

import { useEffect } from 'react';

import { useStringsStore } from '@/entities/strings';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

import styles from './StringsPage.module.scss';

export const StringsPage = () => {
    const { stringsList, fetchAllStringsList, loadingAllStrings, errorAllStrings } = useStringsStore();
    
    useEffect(() => {
        if (stringsList.length === 0) {
            fetchAllStringsList();
        }
    }, [stringsList, fetchAllStringsList]);

    return <CardViewer items={stringsList.map(item => ({ ...item, id: String(item.id) }))} isLoading={loadingAllStrings} error={errorAllStrings} progressKey="strings" />;
};
