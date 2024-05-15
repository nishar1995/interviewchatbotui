import axiosInterceptorInstance from './authInterceptorService';

// fuction of get candidate by id
export async function fetchDataById(candidateId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/candidate?CandidateId=${candidateId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by candidate id");
    }
}
// fuction of get candidate list
export async function candidateList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/candidate`, {
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
    // try {
    //     const response = await fetch(`http://intapp.learninginbits.com:8080/candidate?CandidateId=${candidateId}`);
    //     const data = await response.json();
    //     return data;
    // } catch (error) {
    //     console.error("error", error);
    //     throw new error("error by candidate id");
    // }
}
// fuction of add candidate
export async function addCandidate(data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.post('http://127.0.0.1:8000/api/candidate/', data
            // method: 'POST',
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            // body: JSON.stringify(data),
        );
        // const responseData = await response.json();
        return response;
    } catch (error) {
        console.error('Error add candidate:', error);
        throw new Error('Failed to add candidate');
    }
}

// function of update candidate 
export async function updateData(tenantId, data) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/candidate?tenantId=${tenantId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error update candidate:', error);
        throw new Error('failed to update candidate');
    }

}

// function of delete candidate 
export async function deleteData(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/candidate?tenantId=${tenantId}`, {
            method: 'DELETE',

        });
        return response;

    } catch (error) {
        console.error('error delete candidate:', error);
        throw new Error('failed to delete candidate');
    }

}