import axiosInterceptorInstance from './authInterceptorService';

// fuction of get user list
export async function getUsersList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/user/`, {
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


// fuction of get user count
export async function getUsersRoleCount() {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/user/user-role-count/`, {
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



// function of update the user
export async function updateUser(userId, data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.put(`http://13.233.184.104:8000/api/user/${userId}/`, data
        );
        return response;
    } catch (error) {
        console.error('Error update user:', error);
        throw new Error('Failed to update user');
    }
}


// function of delete the user
export async function deleteUser(userId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://13.233.184.104:8000/api/user/${userId}/`, {
            method: 'DELETE',
        });
        return response;

    } catch (error) {
        console.error('error delete user:', error);
        throw new Error('failed to delete user');
    }

}