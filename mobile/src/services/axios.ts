import axios from 'axios';

export const api = axios.create({
    baseURL: '',
});

api.interceptors.request.use(async config => {
    console.log('inserir token');

    // const data = await AsyncStorage.getItem('@TOKEN');
    // if (data) {
    //     // const token = data != null ? JSON.parse(data) : null;
    //     config.headers.common.Authorization = data ? `Bearer ${data}` : '';
    // }

    return config;
});

api.interceptors.response.use(
    response => response,
    async error => {
        console.log('deslogar usuario');

        return Promise.reject(error);
    },
);
