import axiosInterceptorInstance from './authInterceptorService';

// fuction of get meeting schedule list
export async function getMeetingScheduleList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/schedule/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by meeting schedule");
    }

}

// fuction of add meeting
export async function addMeeting(data) {
    try {
        const response = await axiosInterceptorInstance.post('http://127.0.0.1:8000/api/schedule/', data);
        return response.data;
    } catch (error) {
        console.error('Error add tenant:', error);
        throw new Error('Failed to add meeting');
    }
}