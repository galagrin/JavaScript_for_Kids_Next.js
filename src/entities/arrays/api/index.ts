import axios from 'axios';

import { ArrayMethod } from '../model/types';

// Перенесла все в shared
// const API_URL = 'https://jsapi-alpha.vercel.app';

// export const fetchAllArrays = async (): Promise<ArrayMethod[]> => {
//     try {
//         const response = await axios.get<ArrayMethod[]>(`${API_URL}/all-arrays`);
//         return response.data;
//     } catch (error) {
//         console.error('Ошибка при получении данных:', error);
//         throw error;
//     }
// };

// export const fetchArraysByType = async (type: string): Promise<ArrayMethod[]> => {
//     try {
//         const response = await axios.get<ArrayMethod[]>(`${API_URL}/${type}`);
//         return response.data;
//     } catch (error) {
//         console.error(`Ошибка при получении данных для ${type}:`, error);
//         throw error;
//     }
// };
