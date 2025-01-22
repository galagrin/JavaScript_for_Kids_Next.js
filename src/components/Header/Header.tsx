import Link from 'next/link';

export const Header = () => {
    return (
        <div>
            <nav>
                <ul className="flex items-center justify-evenly pt-5 pb-5">
                    <li>Строки</li>
                    <Link href="/arrays">
                        <li>Массивы</li>
                    </Link>
                    <li>ссылка3</li>
                    <li>ссылка4</li>
                </ul>
            </nav>
        </div>
    );
};
