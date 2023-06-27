import { API_URL } from '@env';
import axios from 'axios';
import { AuthHelper } from '../helper/auth-helper';

export const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use(async config => {
    const token = await AuthHelper.getItem('@token');
    console.log('token', token);

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        console.log('erro', error);

        return Promise.reject(error);
    },
);
