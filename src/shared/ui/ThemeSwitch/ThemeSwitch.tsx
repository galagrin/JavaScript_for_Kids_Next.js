import styles from './ThemeSwitch.module.scss';

interface ThemeSwitchProps {
    toggleTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeSwitch = ({ toggleTheme }: ThemeSwitchProps) => {
    const handleSunClick = () => {
        toggleTheme('light');
    };

    const handleMoonClick = () => {
        toggleTheme('dark');
    };

    return (
        <div className={styles.themeswitch}>
            <label className={styles.label}>
                <svg
                    width="24"
                    height="24"
                    className={styles.sun}
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleSunClick}
                >
                    <path
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path d="M22 12L23 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 2V1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 23V22" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20 20L19 19" stroke="currentColor" strokeLinecap="round" />
                    <path d="M20 4L19 5" stroke="currentColor" strokeLinecap="round" />
                    <path d="M4 20L5 19" stroke="currentColor" strokeLinecap="round" />
                    <path d="M4 4L5 5" stroke="currentColor" strokeLinecap="round" />
                    <path d="M1 12L2 12" stroke="currentColor" strokeLinecap="round" />
                </svg>
                <svg
                    width="24"
                    height="24"
                    className={styles.moon}
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleMoonClick}
                >
                    <path
                        d="M3 11.5066C3 16.7497 7.25034 21 12.4934 21C16.2209 21 19.4466 18.8518 21 15.7259C12.4934 15.7259 8.27411 11.5066 8.27411 3C5.14821 4.55344 3 7.77915 3 11.5066Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <div className={styles.ball}></div>
            </label>
        </div>
    );
};
