import axios from 'axios';

const API_URL = 'https://jsapi-alpha.vercel.app';
interface ApiMethod {
    id: number;
    name: string;
    description: string;
    syntax: string;
    adultExample: string;
    childExample: string;
    childExplanation: string;
}
export const fetchApi = async (endpoint: string): Promise<ApiMethod[]> => {
    try {
        const response = await axios.get(`${API_URL}/${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        throw error;
    }
};
