import axios from 'axios';

const API_URL = 'https://jsapi-alpha.vercel.app';

// Кэш для API запросов
const apiCache = new Map<string, { data: any; timestamp: number; expiry: number }>();

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

export const fetchApi = async (endpoint: string, forceRefresh = false): Promise<ApiMethod[]> => {
    const cacheKey = endpoint;
    const now = Date.now();
    
    // Проверяем кэш
    if (!forceRefresh && apiCache.has(cacheKey)) {
        const cached = apiCache.get(cacheKey)!;
        if (now - cached.timestamp < cached.expiry) {
            return cached.data;
        }
    }
    
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        const data = response.data;
        
        // Сохраняем в кэш на 5 минут
        apiCache.set(cacheKey, {
            data,
            timestamp: now,
            expiry: 5 * 60 * 1000 // 5 минут
        });
        
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || 'Произошла ошибка при получении данных';
            throw new ApiError(message, status, endpoint);
        }
        throw new ApiError('Неизвестная ошибка при получении данных', undefined, endpoint);
    }
};

// Функция для очистки кэша
export const clearApiCache = () => {
    apiCache.clear();
};

// Специализированные функции для каждого типа данных
export const fetchArrays = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('all-arrays', forceRefresh);
};

export const fetchStrings = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('strings', forceRefresh);
};

export const fetchObjects = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('objects', forceRefresh);
};

export const fetchDates = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('date', forceRefresh);
};

export const fetchPromises = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('promise', forceRefresh);
};

export const fetchNumbers = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('number', forceRefresh);
};

export const fetchDataTypes = async (forceRefresh = false): Promise<ApiMethod[]> => {
    return fetchApi('datatypes', forceRefresh);
};
