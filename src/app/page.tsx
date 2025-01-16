'use client';

import { useEffect } from 'react';
import useDataStore from 'store/useDataStore';

export default function Home() {
    const { arraysList, loadingAllArrays, errorAllArrays, fetchAllArraysList } = useDataStore();
    useEffect(() => {
        fetchAllArraysList();
    }, [fetchAllArraysList]);

    if (loadingAllArrays) {
        return <div>Идет загрузка</div>;
    }
    if (errorAllArrays) {
        return <div>Ошибка: {errorAllArrays}</div>;
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
