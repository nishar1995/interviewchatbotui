import axios from "axios";
import refreshToken from '../services/authService';
import Cookies from 'js-cookie';

const axiosInterceptorInstance = axios.create({
    baseURL: process.env.BASE_URL || 'http://13.233.184.104:8000/api/'
    
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



// Response interceptor to handle errors
axiosInterceptorInstance.interceptors.response.use(
    
    (response) => {
        // If the response is successful, just return the response
        return response;
    },
    async (error) => {
        console.log("interceptor error", error)
        const originalRequest = error.config;

        // Check if the error is due to unauthorized access and the original request is not already retried
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const cookieValue = Cookies.get('token');
                const token = cookieValue ? JSON.parse(cookieValue) : null;
                if (token) {
                    const response = await refreshToken(token);
                    if (response && response.token) {
                        // Update the token in cookies
                        Cookies.set('token', JSON.stringify(response.token));

                        // Update the authorization header in the original request
                        originalRequest.headers['Authorization'] = `Bearer ${response.token}`;

                        // Retry the original request with the new token
                        return axiosInterceptorInstance(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                // Redirect to login page if token refresh fails
                window.location.href = '/shared/auth/signin'; // Adjust this as needed
            }
        }

        // Handle other response errors
        if (error.response && error.response.status === 403) {
            console.error('Access forbidden:', error.response.data);
            // Handle 403 Forbidden errors specifically
            // You can add logic to redirect to a specific page or show a message
        }

        if (error.response && error.response.status >= 500) {
            console.error('Server error:', error.response.data);
            // Handle 500 Internal Server Error and other server errors
            // You can add logic to retry the request, show a message, etc.
        }

        return Promise.reject(error); // Reject the request if refresh token fails or for any other errors
    }
);

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