// fuction of get tenant by id

// http://127.0.0.1:8000/
import axiosInterceptorInstance from './authInterceptorService';
export async function fetchDataById(tenantId) {
    try {
        const response = await axiosInterceptorInstance.get(`http://intapp.learninginbits.com:8080/tenant?tenantId=${tenantId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by tenantBy id");
    }
}

// function of get all tenant

export async function fetchData() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/tenant/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by tenant");
    }
}

// fuction of add tenant
export async function addTenant(data) {
    try {
        const response = await axiosInterceptorInstance.post('http://127.0.0.1:8000/api/tenant/', data);
       // const responseData = await response.json();
        return response.data;
    } catch (error) {
        console.error('Error add tenant:', error);
        throw new Error('Failed to add tenant');
    }
}

// function of update tenant 
export async function updateData(tenantId, data) {
    try {
        const response = await axiosInterceptorInstance.put(`http://intapp.learninginbits.com:8080/tenant?tenantId=${tenantId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error update tenant:', error);
        throw new Error('failed to update tenant');
    }

}

// function of delete tenant 
export async function deleteData(tenantId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://intapp.learninginbits.com:8080/tenant?tenantId=${tenantId}`, {
            method: 'DELETE',

        });
        return response;

    } catch (error) {
        console.error('error delete tenant:', error);
        throw new Error('failed to delete tenant');
    }

}