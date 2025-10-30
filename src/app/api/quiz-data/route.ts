import { NextResponse } from 'next/server';

const API_URL = 'https://jsapi-alpha.vercel.app';
const ENDPOINTS = {
    arrays: 'all-arrays',
    strings: 'strings',
    objects: 'objects',
    dates: 'date',
    promises: 'promise',
    numbers: 'number',
    datatypes: 'datatypes',
};

type ApiMethod = {
    id: number;
    name: string;
    description: string;
    syntax: string;
    adultExample: string;
    childExample: string;
    childExplanation: string;
};

export async function GET() {
    try {
        const fetchPromises = Object.entries(ENDPOINTS).map(async ([category, endpoint]) => {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                next: { revalidate: 3600 }, // Кэш на 1 час
            });

            if (!response.ok) {
                console.error(`Failed to fetch ${category}: ${response.status}`);
                return []; // Возвращаем пустой массив для упавшей категории
            }

            const data: ApiMethod[] = await response.json();
            // Добавляем поле категории к каждому методу
            return data.map((method) => ({ ...method, category }));
        });

        // Ждем выполнения всех запросов
        const results = await Promise.all(fetchPromises);

        // Объединяем все массивы в один
        const allMethods = results.flat();

        if (allMethods.length === 0) {
            // Если ВООБЩЕ ничего не загрузилось
            return NextResponse.json({ error: 'Failed to load any quiz data' }, { status: 500 });
        }

        // Отдаем клиенту один большой массив
        return NextResponse.json(allMethods);
    } catch (error) {
        console.error('Error in /api/quiz-data:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
