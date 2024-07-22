// fuction of get tenant by id

// http://localhost:8000/
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
        const response = await axiosInterceptorInstance.get(`http://localhost:8000/api/tenant/`, {
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
        const response = await axiosInterceptorInstance.post('http://localhost:8000/api/tenant/', data);
        // const responseData = await response.json();
        return response.data;
    } catch (error) {
        console.error('Error add tenant:', error);
        throw new Error('Failed to add tenant');
    }
}

// function of update the tenant 
export async function updateTenant(tenantId, data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.put(`http://localhost:8000/api/tenant/${tenantId}/`, data
        );
        return response;
    } catch (error) {
        console.error('Error update tenant:', error);
        throw new Error('Failed to update tenant');
    }
}

// function of delete the tenant
export async function deleteTenant(tenantId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://localhost:8000/api/tenant/${tenantId}/`, {
            method: 'DELETE',
        });
        return response;

    } catch (error) {
        console.error('error delete tenant:', error);
        throw new Error('failed to delete tenant');
    }

}