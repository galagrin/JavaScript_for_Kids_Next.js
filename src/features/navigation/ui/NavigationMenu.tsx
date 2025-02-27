'use client';

import styles from './NavigationMenu.module.scss';
import NavLink from '@/entities/navlink/ui/NavLink';

export const NavigationMenu = () => {
    return (
        <nav className={styles.navigation}>
            <ul className={styles.navigationList}>
                <li>
                    <NavLink href="/" exact className={styles.navigationLink}>
                        Домой
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/arrays" className={styles.navigationLink}>
                        Массивы
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
