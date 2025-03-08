import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const useThemeChange = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = (newTheme: 'light' | 'dark') => {
        setTheme(newTheme);
    };

    return {
        mounted,
        theme,
        toggleTheme,
    };
};
