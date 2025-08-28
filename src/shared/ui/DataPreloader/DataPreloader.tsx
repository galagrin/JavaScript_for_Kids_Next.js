'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { fetchArrays, fetchStrings, fetchObjects, fetchDates, fetchPromises, fetchNumbers, fetchDataTypes } from '@/shared/api/apiBase';

export const DataPreloader = () => {
    const pathname = usePathname();

    useEffect(() => {
        // Предзагружаем данные в зависимости от текущего пути
        const preloadData = async () => {
            try {
                switch (pathname) {
                    case '/arrays':
                        await fetchArrays();
                        break;
                    case '/strings':
                        await fetchStrings();
                        break;
                    case '/objects':
                        await fetchObjects();
                        break;
                    case '/dates':
                        await fetchDates();
                        break;
                    case '/promises':
                        await fetchPromises();
                        break;
                    case '/numbers':
                        await fetchNumbers();
                        break;
                    case '/datatypes':
                        await fetchDataTypes();
                        break;
                    default:
                        // На главной странице предзагружаем все данные
                        if (pathname === '/') {
                            await Promise.all([
                                fetchArrays(),
                                fetchStrings(),
                                fetchObjects(),
                                fetchDates(),
                                fetchPromises(),
                                fetchNumbers(),
                                fetchDataTypes()
                            ]);
                        }
                        break;
                }
            } catch (error) {
                console.warn('Failed to preload data:', error);
            }
        };

        // Небольшая задержка, чтобы не блокировать основной поток
        const timeoutId = setTimeout(preloadData, 100);
        
        return () => clearTimeout(timeoutId);
    }, [pathname]);

    return null; // Компонент не рендерит ничего
}; 