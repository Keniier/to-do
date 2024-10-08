import axios from 'axios';

const instance = axios.create({
    // baseURL: 'http://127.0.0.1:8000/',
    // baseURL: 'http://127.0.0.1:8000/', cambiar a urlbase
    headers: {
        'Accept': 'application/json',
    },
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        if (!(config.data instanceof FormData)) {
            config.headers['Content-Type'] = 'application/json';
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
