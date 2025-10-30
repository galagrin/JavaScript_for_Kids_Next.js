'use client';

import { useEffect } from 'react';

import { useDatesStore } from '@/entities/dates';

import { CardViewer } from '@/widgets/CardViewer/ui/CardViewer';

const DatesPage = () => {
    const { datesList, fetchAllDatesList, loadingAllDates, errorAllDates } = useDatesStore();

    useEffect(() => {
        if (datesList.length === 0) {
            fetchAllDatesList();
        }
    }, [datesList, fetchAllDatesList]);

    return (
        <CardViewer
            items={datesList.map((item) => ({ ...item, id: String(item.id) }))}
            isLoading={loadingAllDates}
            error={errorAllDates}
            progressKey="dates"
        />
    );
};
export default DatesPage;
