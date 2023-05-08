import Axios from 'axios';
import { getCookie } from 'cookies-next';

const axios = Axios.create({
	baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
	headers: {
		// Authorization: getCookie('auth'),
		'Access-Control-Allow-Origin': '*',
		'Content-Type': 'application/json',
	},
});

export default axios;
