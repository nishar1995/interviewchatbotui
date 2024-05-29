// import axios from "axios";
// import refreshToken from '../services/authService';
// import Cookies from 'js-cookie';


// const axiosInterceptorInstance = axios.create({
//     //baseURL: process.env.BASE_URL || 'http://intapp.learninginbits.com:8080/',
//     baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/'

// });

// axiosInterceptorInstance.interceptors.request.use((config) => {
//     debugger
//     console.log("interceptor file.....");
//     const cookieValue = Cookies.get('token');
//     const token = cookieValue ? JSON.parse(cookieValue) : {};
//     console.log("get token",token)
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     console.log("comfig.....",config);
//     return config;
    
// }, async (error) => {
//     debugger
//     console.log("interceptor errorr",error)
//     if (error.res && error.res.status === 401) {
//         try {
//             const response = await refreshToken(token)
//             if (response) {
//                 config.headers['Authorization'] = `Bearer ${response.token}`;
//                 return axiosInterceptorInstance(config);
//             }
//         } catch (error) {
//             console.log("error occur in refresh token", error);
//         }
//     }
//     return Promise.reject(error);
// })

// export default axiosInterceptorInstance;



// import axios from "axios";
// import refreshToken from '../services/authService';
// import Cookies from 'js-cookie';

// const axiosInterceptorInstance = axios.create({
//     baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/'
// });

// axiosInterceptorInstance.interceptors.request.use(async (config) => {
//     console.log("interceptor file.....");
//     const cookieValue = Cookies.get('token');
//     const token = cookieValue ? JSON.parse(cookieValue) : null;
//     console.log("get token", token);
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     console.log("config.....", config);
//     return config;
    
// }, async (error) => {
//     console.log("interceptor error", error)
//     if (error.response && error.response.status === 401) {
//         try {
//             const cookieValue = Cookies.get('token');
//             const token = cookieValue ? JSON.parse(cookieValue) : null;
//             if (token) {
//                 const response = await refreshToken(token);
//                 if (response && response.token) {
//                     error.config.headers['Authorization'] = `Bearer ${response.token}`;
//                     return axiosInterceptorInstance(error.config);
//                 }
//             }
//         } catch (error) {
//             console.log("error occur in refresh token", error);
//         }
//     }
//     return Promise.reject(
//         "UNauthorized error",error);
// });

// export default axiosInterceptorInstance;



import axios from "axios";
import refreshToken from '../services/authService';
import Cookies from 'js-cookie';

const axiosInterceptorInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:8000/api/'
});

axiosInterceptorInstance.interceptors.request.use(async (config) => {
    console.log("interceptor file.....");
    const cookieValue = Cookies.get('token');
    const token = cookieValue ? JSON.parse(cookieValue) : null;
    console.log("get token", token);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    console.log("config.....", config);
    return config;
    
}, async (error) => {
    console.log("interceptor error", error)
    if (error.response && error.response.status === 401) {
        try {
            const cookieValue = Cookies.get('token');
            const token = cookieValue ? JSON.parse(cookieValue) : null;
            if (token) {
                const response = await refreshToken(token);
                if (response && response.token) {
                    // Update the token in cookies
                    Cookies.set('token', response.token);

                    // Retry the request with the new token
                    error.config.headers['Authorization'] = `Bearer ${response.token}`;
                    return axios.request(error.config); // Use axios to retry the request
                }
            }
        } catch (error) {
            console.log("error occur in refresh token", error);
        }
    }
    return Promise.reject(error); // Reject the request if refresh token fails or for any other errors
});

export default axiosInterceptorInstance;















// //     if (token) {
// //         if (res.headers) {
// //             res.headers.token = token
// //         }

// //     }
// //     return res
// // }, (error) => {
// //     if (error.res && error.res.status === 401) {

// //     }