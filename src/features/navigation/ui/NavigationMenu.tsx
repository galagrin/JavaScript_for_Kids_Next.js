'use client';

import NavLink from '@/entities/navlink/ui/NavLink';

import styles from './NavigationMenu.module.scss';

export const NavigationMenu = () => {
    return (
        <nav>
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
                <li>
                    <NavLink href="/strings" className={styles.navigationLink}>
                         Строки
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/objects" className={styles.navigationLink}>
                         Объекты
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
