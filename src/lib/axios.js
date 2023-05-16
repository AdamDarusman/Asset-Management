import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
	headers: {
		Authorization: getCookie('authorization'),
	},
	baseURL: 'http://localhost:8000', // set URL backend
	withCredentials: true, // set pengiriman cookie
});

export default api;
