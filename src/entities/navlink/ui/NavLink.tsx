'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './NavLink.module.scss';

export default function NavLink({
    href,
    exact = false,
    children,
    className,
    onClick,
    ...props
}: {
    href: string;
    exact?: boolean;
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    const pathname = usePathname();

    const isActive = pathname ? (exact ? pathname === href : pathname.startsWith(href)) : false;

    const newClassName = isActive ? `${className} ${styles.active}` : className;

    return (
        <Link href={href} className={newClassName} onClick={onClick} {...props}>
            {children}
        </Link>
    );
}
