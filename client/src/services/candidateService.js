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

// fuction of add candidate
export async function postData(data) {
    try {
        const response = await fetch('http://intapp.learninginbits.com:8080/candidate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
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