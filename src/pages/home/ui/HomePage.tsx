'use client';

import { HexGallery } from 'widgets/HexGallery/ui/HexGallery';

import { useHomePage } from '../model/useHomePage';

export default function HomePage() {
    const { mounted, theme, loadingAllArrays, errorAllArrays, toggleTheme } = useHomePage();

    if (!mounted) return null;
    if (loadingAllArrays) return <div>Идет загрузка</div>;
    if (errorAllArrays) return <div>Ошибка: {errorAllArrays}</div>;

    return (
        <>
            <div>
                The current theme is: {theme}
                <button onClick={() => toggleTheme('light')}>Light Mode</button>
                <button onClick={() => toggleTheme('dark')}>Dark Mode</button>
            </div>
            <HexGallery />
        </>
    );
}
