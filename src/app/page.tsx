'use client';

import { useEffect } from 'react';
import useDataStore from 'store/useDataStore';

export default function Home() {
    const { arraysList, loading, error, fetchAllArraysList } = useDataStore();
    useEffect(() => {
        fetchAllArraysList();
    }, [fetchAllArraysList]);

    if (loading) {
        return <div>Идет загрузка</div>;
    }
    if (error) {
        return <div>Ошибка: {error}</div>;
    }
    return (
        <>
            <h1>JS for Kids</h1>
            <ul>
                {arraysList.map(({ id, name, description }) => {
                    return (
                        <li key={id}>
                            {description}, {name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
