import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { Header } from 'widgets/Header/ui/Header';
import { DataPreloader } from '@/shared/ui/DataPreloader/DataPreloader';

import './styles/globals.scss';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

const inter = Inter({
    subsets: ['cyrillic'],
    variable: '--font-inter',
});

export const metadata: Metadata = {
    title: 'JS for Kids',
    description: 'Приложение для изучения javascript для детей',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}>
                <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem>
                    <DataPreloader />
                    <Header />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
