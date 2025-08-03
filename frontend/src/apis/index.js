import axios from 'axios';
import axiosInstance from '../axiosInstance';



// Path for API calls
const BASE_URL = 'http://127.0.0.1:8000/api/';


// SnapFack APIs
export function getCategoryList() {
	return axios.get(BASE_URL + 'categories/');
}

export function getRandomFactByCategory(categoryId) {
	return axios.get(BASE_URL + 'categories/' + categoryId + '/random_fact/');
}

// Stocks APIs
export function predictTicker(ticker) {
	return axiosInstance.post('predict/', { ticker });
}

export function getProtectedData() {
	return axiosInstance.get('protected-view/');
}
