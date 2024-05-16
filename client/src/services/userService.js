import axiosInterceptorInstance from './authInterceptorService';

// fuction of get user list
export async function getUsersList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/user/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by users");
    }

}