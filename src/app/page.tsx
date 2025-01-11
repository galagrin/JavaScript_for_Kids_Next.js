'use client';

import { useEffect, useState } from 'react';
import { fetchAllArrays } from 'services/apiTypes';
import { ApiTypes } from 'types/api';

export default function Home() {
    const [data, setData] = useState<ApiTypes[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const arrays = await fetchAllArrays();
                setData(arrays);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <h1>JS for Kids</h1>
            <ul>
                {data.map(({ name, description }) => {
                    return <li key={name}>{description}</li>;
                })}
            </ul>
        </>
    );
}
