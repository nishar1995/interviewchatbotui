import { user_hr } from "@/models/users";
import { user_admin } from "@/models/users";
import { user_hr_manager } from "@/models/users";
import { user_candidate } from "@/models/users";
import { hardcodedUsers } from '@/app/(hydrogen)/layout';


// fuction of get user list
export async function fetchData() {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8000/list`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by list");
    }
}
// fuction of get authenticate user
export async function fetchAuthenticateUserData() {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8000/authenticate`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by auth user");
    }
}

// fuction of add user
export async function login(data) {
    console.log("data", data)
    try {
        const response = await fetch('http://127.0.0.1:8000//api/user/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error add user:', error);
        // if (data.email === hardcodedUsers.admin.email){
        //     return  user_admin;

        // }
        // // throw new Error('Failed to add user');
        // if (data.email === hardcodedUsers.hr.email){
        //     return user_hr;

        // }
        // if (data.email === hardcodedUsers.hrManager.email){
        //     return user_hr_manager;

        // }
        // if (data.email === hardcodedUsers.candidate.email){
        //     return user_candidate;

        // }
    }
}

// fuction of registration
export async function registration(data) {

    try {
        const response = await fetch('http://127.0.0.1:8000//api/user/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error registration:', error);
        throw new Error('Failed to registration');
    }
}

// fuction of refresh token
export async function refreshToken(data) {
    try {
        const response = await fetch('http://intapp.learninginbits.com:8000/refresh', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error refresh token:', error);
        throw new Error('Failed to refresh token');
    }
}

// function of forgot password
export async function forgotPassword(data) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8000/register`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error forgot password:', error);
        throw new Error('failed to update password');
    }

}



