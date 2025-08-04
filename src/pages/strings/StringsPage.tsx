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

    return <CardViewer items={stringsList} isLoading={loadingAllStrings} error={errorAllStrings} />;
};
