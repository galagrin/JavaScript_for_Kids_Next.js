'use client';

import { useEffect, useRef, useState } from 'react';

import NavLink from '@/entities/navlink/ui/NavLink';

import styles from './NavigationMenu.module.scss';

export const NavigationMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                closeMenu();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    return (
        <nav className={styles.navigation} ref={menuRef}>
            <button
                className={styles.burgerButton}
                onClick={toggleMenu}
                aria-label={isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMenuOpen}
            >
                <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive : ''}`}></span>
                <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive : ''}`}></span>
                <span className={`${styles.burgerLine} ${isMenuOpen ? styles.burgerLineActive : ''}`}></span>
            </button>

            <ul className={`${styles.navigationList} ${isMenuOpen ? styles.navigationListOpen : ''}`}>
                <li>
                    <NavLink href="/" exact className={styles.navigationLink} onClick={closeMenu}>
                        Домой
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/arrays" className={styles.navigationLink} onClick={closeMenu}>
                        Массивы
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/strings" className={styles.navigationLink} onClick={closeMenu}>
                        Строки
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/objects" className={styles.navigationLink} onClick={closeMenu}>
                        Объекты
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/dates" className={styles.navigationLink} onClick={closeMenu}>
                        Даты
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/promises" className={styles.navigationLink} onClick={closeMenu}>
                        Промисы
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/numbers" className={styles.navigationLink} onClick={closeMenu}>
                        Числа
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/datatypes" className={styles.navigationLink} onClick={closeMenu}>
                        Типы данных
                    </NavLink>
                </li>
                <li>
                    <NavLink href="/quiz" className={styles.navigationLink} onClick={closeMenu}>
                        Викторина
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
