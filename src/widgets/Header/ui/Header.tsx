'use client';

import { NavigationMenu } from '../../../features/navigation/ui/NavigationMenu';

import styles from './Header.module.scss';
import { ThemeSwitch } from '@/shared/ui/ThemeSwitch/ThemeSwitch';
import { useThemeChange } from '@/widgets/Header/model/useThemeChange';

export const Header = () => {
    const { mounted, toggleTheme } = useThemeChange();

    if (!mounted) return null;

    return (
        <header className={styles.header}>
            <NavigationMenu />
            <ThemeSwitch toggleTheme={toggleTheme} />
        </header>
    );
};
