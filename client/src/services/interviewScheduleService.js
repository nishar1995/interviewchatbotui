// fuction of get interview schedule by id
export async function fetchDataById(interviewScheduleId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/interviewSchedule?InterviewScheduleId=${interviewScheduleId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by interviewSchedule id");
    }
}

// fuction of add interview schedule 
export async function postData(data) {
    try {
        const response = await fetch('http://intapp.learninginbits.com:8080/interviewSchedule', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error add interviewSchedule:', error);
        throw new Error('Failed to add interviewSchedule');
    }
}

// function of update interview schedule 
export async function updateData(interviewScheduleId, data) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/InterviewSchedule?interviewScheduleId=${interviewScheduleId}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        const responseData = await response.json();
        return responseData;

    } catch (error) {
        console.error('error update interviewSchedule:', error);
        throw new Error('failed to update interviewSchedule');
    }

}

// function of delete interview schedule  
export async function deleteData(interviewScheduleId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/InterviewSchedule?interviewScheduleId=${interviewScheduleId}`, {
            method: 'DELETE',

        });
        return response;

    } catch (error) {
        console.error('error delete interviewSchedule:', error);
        throw new Error('failed to delete interviewSchedule');
    }

}