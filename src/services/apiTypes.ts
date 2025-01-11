import axios from 'axios';
import { ApiTypes } from 'types/api';

const API_URL = 'https://jsapi-alpha.vercel.app';

export const fetchAllArrays = async (): Promise<ApiTypes[]> => {
    const response = await axios.get(`${API_URL}/all-arrays`);
    console.log(response.data);
    return response.data;
};
