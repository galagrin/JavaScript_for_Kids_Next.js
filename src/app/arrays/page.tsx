'use client';

import { useEffect } from 'react';
import useDataStore from 'store/useDataStore';

import { Card } from '@/components/Card/Card';

export default function ArraysPage() {
    const { arraysList, fetchAllArraysList, loadingAllArrays, errorAllArrays } = useDataStore();

    useEffect(() => {
        if (arraysList.length === 0) {
            fetchAllArraysList();
        }
    }, [fetchAllArraysList, arraysList.length]);

    if (loadingAllArrays) {
        return <div>Загрузка данных...</div>;
    }

    if (errorAllArrays) {
        return <div>Ошибка: {errorAllArrays}</div>;
    }

    return (
        <>
            <h1>Изучаем методы массивов</h1>
            {arraysList.length > 0 ? <Card data={arraysList[0]} /> : <div>Нет доступных данных.</div>}
        </>
    );
}
