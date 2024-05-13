
import axios from "axios";
import refreshToken from '../services/authService';
import { env } from "../env.local";

const axiosInterceptorInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://intapp.learninginbits.com:8080/',

});

axiosInterceptorInstance.interceptors.request.use((config) => {
    console.log("interceptor file.....");
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, async (error) => {
    if (error.res && error.res.status === 401) {
        try {
            const response = await refreshToken(token)
            if (response) {
                config.headers['Authorization'] = `Bearer ${response.token}`;
            }
        } catch (error) {
            console.log("error occur in refresh token", error);
        }
    }
    return Promise.reject(error);
})

export default axiosInterceptorInstance;























//     if (token) {
//         if (res.headers) {
//             res.headers.token = token
//         }

//     }
//     return res
// }, (error) => {
//     if (error.res && error.res.status === 401) {

//     }