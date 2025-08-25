import axios from 'axios';

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
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            const message = error.response?.data?.message || error.message || 'Произошла ошибка при получении данных';
            throw new ApiError(message, status, endpoint);
        }
        throw new ApiError('Неизвестная ошибка при получении данных', undefined, endpoint);
    }
};

// Специализированные функции для каждого типа данных
export const fetchArrays = async (): Promise<ApiMethod[]> => {
    return fetchApi('all-arrays');
};

export const fetchStrings = async (): Promise<ApiMethod[]> => {
    return fetchApi('strings');
};

export const fetchObjects = async (): Promise<ApiMethod[]> => {
    return fetchApi('objects');
};

export const fetchDates = async (): Promise<ApiMethod[]> => {
    return fetchApi('date');
};

export const fetchPromises = async (): Promise<ApiMethod[]> => {
    return fetchApi('promise');
};

export const fetchNumbers = async (): Promise<ApiMethod[]> => {
    return fetchApi('number');
};

export const fetchDataTypes = async (): Promise<ApiMethod[]> => {
    return fetchApi('datatypes');
};
