import axiosInterceptorInstance from './authInterceptorService';

// export async function getInterViewQuestions() {
//     try {
//         const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/conduct_interview/?candidate_id=9&job_id=5`, {
//             mode: 'no-cors',
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         return response;
//     } catch (error) {
//         console.error("error", error);
//         throw new error("error by question");
//     }
    
// }
// 

export async function getInterViewQuestions() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/intbot/?candidate_id=1&job_id=1`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by question");
    }
    
}


export async function captureResponse(data) {
    try {
        const response = await axiosInterceptorInstance.post('http://127.0.0.1:8000/api/intbot/', data);
        // const responseData = await response.json();
        return response.data;
    } catch (error) {
        console.error('Error capture response:', error);
        throw new Error('Failed to capture response');
    }
}