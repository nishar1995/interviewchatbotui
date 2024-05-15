
import axios from "axios";
import refreshToken from '../services/authService';


const axiosInterceptorInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://intapp.learninginbits.com:8080/',

});

axiosInterceptorInstance.interceptors.request.use((config) => {
    console.log("interceptor file.....");
    // const token = JSON.parse(localStorage.getItem('token'));
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1NzgxOTI3LCJpYXQiOjE3MTU3NzgzMjcsImp0aSI6IjI4NjYxMjNkNTU2ZjQ3MTliNTI5Y2I5YTRmMDA1OWY3IiwidXNlcl9pZCI6Mn0.TrJz04hXtdOCeKm8K_LiHky9qxrO4R5-PRwGwi1CB5c';
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
                return axiosInterceptorInstance(config);
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