import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8000', // set URL backend
	withCredentials: true, // set pengiriman cookie
});

export default api;
