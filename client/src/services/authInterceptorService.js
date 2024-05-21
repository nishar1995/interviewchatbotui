
import axios from "axios";
import refreshToken from '../services/authService';


const axiosInterceptorInstance = axios.create({
    //baseURL: process.env.BASE_URL || 'http://intapp.learninginbits.com:8080/',
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/'

});

axiosInterceptorInstance.interceptors.request.use((config) => {
    console.log("interceptor file.....");
    // const token = JSON.parse(localStorage.getItem('token'));
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE2Mjk3MjU4LCJpYXQiOjE3MTYyOTM2NTgsImp0aSI6Ijg4ZDcwYjEzZDE1NDRhMmI4ZDI2ZDJiYTdlZTEyMWViIiwidXNlcl9pZCI6MX0.UzfItriUcrUEDbtTrxVMBmih9Udmk0meGuMnWk_XSfc';
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