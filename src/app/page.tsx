'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import useDataStore from 'store/useDataStore';

import { HexGallery } from '@/components/HexGallery/HexGallery';

export default function Home() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // const { arraysList, loadingAllArrays, errorAllArrays, fetchAllArraysList } = useDataStore();
    const loadingAllArrays = useDataStore((state) => state.loadingAllArrays);
    const fetchAllArraysList = useDataStore((state) => state.fetchAllArraysList);
    const errorAllArrays = useDataStore((state) => state.errorAllArrays);

    useEffect(() => {
        setMounted(true);
        fetchAllArraysList();
    }, [fetchAllArraysList]);

    // Предотвращаем гидратацию
    if (!mounted) return null;

    if (loadingAllArrays) {
        return <div>Идет загрузка</div>;
    }
    if (errorAllArrays) {
        return <div>Ошибка: {errorAllArrays}</div>;
    }
    return (
        <>
            <div>
                The current theme is: {theme}
                <button onClick={() => setTheme('light')}>Light Mode</button>
                <button onClick={() => setTheme('dark')}>Dark Mode</button>
            </div>
            <h1>JS for Kids</h1>
            <HexGallery />
        </>
    );
}
