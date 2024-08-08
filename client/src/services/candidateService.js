import axiosInterceptorInstance from './authInterceptorService';

// fuction of get candidate by id
export async function getCandidateById(candidateId) {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/candidate/${candidateId}/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by candidate");
    }
}
// fuction of get candidate list
export async function candidateList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/candidate/`, {
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
// function get Candidate username
export async function getCandidateUsername() {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/candidate/usernames/`, {
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
// fuction of add candidate
export async function addCandidate(data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.post('http://13.233.184.104:8000/api/candidate/', data
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
export async function updateCandidate(candidateId, data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.put(`http://13.233.184.104:8000/api/candidate/${candidateId}/`, data
        );
        return response;
    } catch (error) {
        console.error('Error update candidate:', error);
        throw new Error('Failed to update candidate');
    }
}

// function of delete candidate 
export async function deleteCandidate(candidateId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://13.233.184.104:8000/api/candidate/${candidateId}/`, {
            method: 'DELETE',
        });
        return response;

    } catch (error) {
        console.error('error delete candidate:', error);
        throw new Error('failed to delete candidate');
    }

}