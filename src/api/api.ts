import { TodoGroup } from "./todoGroup";
import { Todos } from "./todo";
import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const axiosApi = axios.create({
    baseURL,
});

// // Request interceptor for API calls
// axiosApi.interceptors.request.use(
// 	(config) => {
// 		return config
// 	},
// 	(error) => {
// 		Promise.reject(error)
// 	}
// )

// // if a 401 happens, when token is expired
// const interceptorId = axiosApi.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config

// 		if (error && error.response && error.response.status === 401) {
// 			originalRequest._retry = true

// 			axios.interceptors.response.eject(interceptorId)

// 			originalRequest.headers.token = "jscanvas"

// 			return axios(originalRequest)
// 		}
// 		return Promise.reject(error)
// 	}
// )

export default axiosApi;

export const API = {
    Todos,
    TodoGroup,
};
