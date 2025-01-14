import axios from 'axios';
import { ApiTypes } from 'types/apiTypes';

const API_URL = 'https://jsapi-alpha.vercel.app';

export const fetchAllArrays = async (): Promise<ApiTypes[]> => {
    try {
        const response = await axios.get<ApiTypes[]>(`${API_URL}/all-arrays`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
