'use client';

import { useEffect } from 'react';

import { usePromisesStore } from '@/entities/promises';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

const PromisesPage = () => {
    const { promisesList, fetchAllPromisesList, loadingAllPromises, errorAllPromises } = usePromisesStore();

    useEffect(() => {
        if (promisesList.length === 0) {
            fetchAllPromisesList();
        }
    }, [promisesList, fetchAllPromisesList]);

    return (
        <CardViewer
            items={promisesList.map((item) => ({ ...item, id: String(item.id) }))}
            isLoading={loadingAllPromises}
            error={errorAllPromises}
            progressKey="promises"
        />
    );
};
export default PromisesPage;
