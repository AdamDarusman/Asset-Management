import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
	baseURL: 'http://localhost:8000', // set URL backend
	withCredentials: true, // set pengiriman cookie
});

api.interceptors.request.use(config => {
	const authorization = getCookie('Authorization');
	config.headers.Authorization = authorization;
	return config;
});

export default api;
