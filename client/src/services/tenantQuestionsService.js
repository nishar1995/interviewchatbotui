// fuction of get tenant questions by id
export async function fetchDataById(questionId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/tenantQuestion?tenantQuestionId=${questionId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by questionId id");
    }
}

// fuction of get all  tenant questions 
export async function fetchDataById(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/tenantQuestion/all?tenantId=${tenantId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by not show the all tentent questions");
    }
}
 
// fuction of add tenant questions
export async function postData(data) {
    try {
        const response = await fetch('http://intapp.learninginbits.com:8080/tenantQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error add tenant questions:', error);
        throw new Error('Failed to add tenant questions');
    }
}

// function of update tenant questions
export async function updateData(tenantId, data) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/tenantQuestion?tenantId=${tenantId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error update tenantQuestion:', error);
        throw new Error('failed to update tenantQuestion');
    }

}

// function of delete tenant questions
export async function deleteData(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/tenantQuestion?tenantId=${tenantId}`, {
            method: 'DELETE',

        });
        return response;

    } catch (error) {
        console.error('error delete tenantQuestion:', error);
        throw new Error('failed to delete tenantQuestion');
    }

}