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
                <li>
                    <NavLink href="/dates" className={styles.navigationLink}>
                        Даты
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/promises" className={styles.navigationLink}>
                        Промисы
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/numbers" className={styles.navigationLink}>
                        Числа
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/datatypes" className={styles.navigationLink}>
                        Типы данных
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
