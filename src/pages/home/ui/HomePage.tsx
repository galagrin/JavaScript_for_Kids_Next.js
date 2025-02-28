'use client';

import { HexGallery } from 'widgets/HexGallery/ui/HexGallery';

import { useHomePage } from '../model/useHomePage';

export default function HomePage() {
    // const { mounted, theme, loadingAllArrays, errorAllArrays, toggleTheme } = useHomePage();
    const { mounted, theme, toggleTheme } = useHomePage();

    if (!mounted) return null;

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
