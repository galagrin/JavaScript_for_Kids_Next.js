import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { useArraysStore } from '@/entities/arrays/model/store';

export const useHomePage = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // const { loadingAllArrays, fetchAllArraysList, errorAllArrays } = useArraysStore();

    useEffect(() => {
        setMounted(true);
        // fetchAllArraysList();
    }, []);

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    return {
        mounted,
        theme,
        // loadingAllArrays,
        // errorAllArrays,
        toggleTheme,
    };
};
