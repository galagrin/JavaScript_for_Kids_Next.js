'use client';

import { HexGallery } from 'widgets/HexGallery/index';

import { useHomePage } from '../model/useHomePage';

export default function HomePage() {
    const { mounted, toggleTheme } = useHomePage();

    if (!mounted) return null;

    return (
        <>
            <div>
                <button onClick={() => toggleTheme('light')}>Light Mode</button>
                <button onClick={() => toggleTheme('dark')}>Dark Mode</button>
            </div>
            <HexGallery />
        </>
    );
}
