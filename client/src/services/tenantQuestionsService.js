import axiosInterceptorInstance from './authInterceptorService';
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

export async function getQuestions() {
    try {
        const response = await axiosInterceptorInstance.get(`http://13.233.184.104:8000/api/question/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by quesyions");
    }
}

// fuction of get all  tenant questions 
// export async function fetchDataById(tenantId) {
//     try {
//         const response = await fetch(`http://intapp.learninginbits.com:8080/tenantQuestion/all?tenantId=${tenantId}`);
//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error("error", error);
//         throw new error("error by not show the all tentent questions");
//     }
// }

// fuction of add tenant questions
export async function addQuestion(data) {
    try {
        const response = await axiosInterceptorInstance.post('http://13.233.184.104:8000/api/question/', data);
        // const responseData = await response.json();
        return response.data;
    } catch (error) {
        console.error('Error add Questions:', error);
        throw new Error('Failed to add Questions');
    }
}


export async function deleteQuestion(questionId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://13.233.184.104:8000/api/question/${questionId}/`
       );
        return response;

    } catch (error) {
        console.error('error delete questions:', error);
        throw new Error('failed to delete questions');
    }

}


// function of update tenant questions

export async function updateQuestions(jobId, data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.put(`http://13.233.184.104:8000/api/question/${jobId}/`, data
        );
        return response;
    } catch (error) {
        console.error('Error update questions:', error);
        throw new Error('Failed to update questions');
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