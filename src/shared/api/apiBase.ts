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

export const fetchApi = async (endpoint: string): Promise<ApiMethod[]> => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`);

        if (!response.ok) {
            const message = await response.text().catch(() => 'Ошибка ответа сервера');
            throw new ApiError(message, response.status, endpoint);
        }

        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(error.message, undefined, endpoint);
        }
        throw new ApiError('Неизвестная ошибка при получении данных', undefined, endpoint);
    }
};

// Специализированные функции — forceRefresh больше не нужен
export const fetchArrays = async (): Promise<ApiMethod[]> => fetchApi('all-arrays');
export const fetchStrings = async (): Promise<ApiMethod[]> => fetchApi('strings');
export const fetchObjects = async (): Promise<ApiMethod[]> => fetchApi('objects');
export const fetchDates = async (): Promise<ApiMethod[]> => fetchApi('date');
export const fetchPromises = async (): Promise<ApiMethod[]> => fetchApi('promise');
export const fetchNumbers = async (): Promise<ApiMethod[]> => fetchApi('number');
export const fetchDataTypes = async (): Promise<ApiMethod[]> => fetchApi('datatypes');
