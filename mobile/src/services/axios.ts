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
        const originalRequest = error?.config || error;
        const requestStatus = error?.response?.status || null;

        if (requestStatus === 401) {
            const refreshToken = await AuthHelper.getItem('@refreshToken');

            const { data } = await api.post('/auth/refreshToken', {
                refreshToken,
            });

            const { accessToken, refreshToken: newRefreshToken } = data;

            await AuthHelper.setItem('@token', accessToken);
            await AuthHelper.setItem('@refreshToken', newRefreshToken);

            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return api.request(originalRequest);
        }

        return Promise.reject(error);
    },
);
