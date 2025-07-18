import axios from 'axios';
const axiosInstance = axios.create({
    baseURL: 'https://thomas-chatbot.onrender.com/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 403) &&
            window.location.pathname !== '/login'
        ) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;