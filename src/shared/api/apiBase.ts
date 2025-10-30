const API_URL = 'https://jsapi-alpha.vercel.app';

export interface ApiMethod {
    id: number;
    name: string;
    description: string;
    syntax: string;
    adultExample: string;
    childExample: string;
    childExplanation: string;
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status?: number,
        public endpoint?: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

const fetchFromInternalApi = async (category: string): Promise<ApiMethod[]> => {
    try {
        // Делаем простой и быстрый запрос к нашему собственному API
        const response = await fetch(`/api/${category}`);

        if (!response.ok) {
            console.error(`Ошибка при запросе к /api/${category}. Статус: ${response.status}`);
            // Выбрасываем ошибку, чтобы вызывающий код мог ее обработать
            throw new Error(`Failed to fetch data for ${category}`);
        }
        return response.json();
    } catch (error) {
        console.error(`Критическая ошибка при запросе к /api/${category}:`, error);
        // Возвращаем пустой массив, чтобы приложение не упало полностью
        return [];
    }
};
export const fetchArrays = (): Promise<ApiMethod[]> => fetchFromInternalApi('arrays');
export const fetchStrings = (): Promise<ApiMethod[]> => fetchFromInternalApi('strings');
export const fetchObjects = (): Promise<ApiMethod[]> => fetchFromInternalApi('objects');
export const fetchDates = (): Promise<ApiMethod[]> => fetchFromInternalApi('dates');
export const fetchPromises = (): Promise<ApiMethod[]> => fetchFromInternalApi('promises');
export const fetchNumbers = (): Promise<ApiMethod[]> => fetchFromInternalApi('numbers');
export const fetchDataTypes = (): Promise<ApiMethod[]> => fetchFromInternalApi('datatypes');
