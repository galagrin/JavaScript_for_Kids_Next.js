import axios from 'axios';
import { ApiTypes } from 'types/apiTypes';

const API_URL = 'https://jsapi-alpha.vercel.app';

export const fetchAllArrays = async (): Promise<ApiTypes[]> => {
    try {
        const response = await axios.get<ApiTypes[]>(`${API_URL}/all-arrays`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const fetchAllObjects = async (): Promise<ApiTypes[]> => {
    try {
        const response = await axios.get<ApiTypes[]>(`${API_URL}/objects`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};

export const fetchAllStrings = async (): Promise<ApiTypes[]> => {
    try {
        const response = await axios.get<ApiTypes[]>(`${API_URL}/strings`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
