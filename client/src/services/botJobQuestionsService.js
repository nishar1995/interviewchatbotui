// fuction of get candidate questions by id
export async function fetchCandidateQuestionsById(botJobCandidateQuestionId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/botJobCandidateQuestion?BotJobCandidateQuestionId=${botJobCandidateQuestionId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by candidate questions by id");
    }
}

// fuction of get all candidate questions
export async function fetchCandidateAllQuestions(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/botJobCandidateQuestion/tenant/all?tenantId=${tenantId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by candidate all questions ");
    }
}


// fuction of add bot candidate questions 
export async function postData(data) {
    try {
        const response = await fetch('http://intapp.learninginbits.com:8080/botJobCandidateQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error add bot job questions:', error);
        throw new Error('Failed to add bot job questions');
    }
}

// function of update bot job questions 
export async function updateData(tenantId, data) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/botJobCandidateQuestion?tenantId=${tenantId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error update bot job questions:', error);
        throw new Error('failed to update bot job questions');
    }

}

// function of delete bot job questions 
export async function deleteData(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/botJobCandidateQuestion?tenantId=${tenantId}`, {
            method: 'DELETE',

        });
        return response;

    } catch (error) {
        console.error('error delete bot job questions :', error);
        throw new Error('failed to delete bot job questions');
    }

}