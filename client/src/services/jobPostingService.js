import axiosInterceptorInstance from './authInterceptorService';


// function to get job list
export async function getJobList() {
    try {
        const response = await axiosInterceptorInstance.get(`http://127.0.0.1:8000/api/job/`, {
            mode: 'no-cors',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response;
    } catch (error) {
        console.error("error", error);
        throw new error("error by job");
    }

}

// fuction of get job post by id
export async function fetchDataById(jobPostingId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/jobPosting?jobPostingId=${jobPostingId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by not get job post by id");
    }
}

// fuction of get all  job post
export async function fetchDataById(tenantId) {
    try {
        const response = await fetch(`http://intapp.learninginbits.com:8080/jobPosting/all?tenantId=${tenantId}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("error", error);
        throw new error("error by not show the all job post");
    }
}

// fuction of add job post
export async function addJob(data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.post('http://127.0.0.1:8000/api/job/', data);
        return response;
    } catch (error) {
        console.error('Error add job:', error);
        throw new Error('Failed to add job post');
    }
}


// function of update the job post
export async function updateJob(jobId, data) {
    try {
        console.log(data);
        const response = await axiosInterceptorInstance.put(`http://127.0.0.1:8000/api/job/${jobId}/`, data
        );
        return response;
    } catch (error) {
        console.error('Error update meeting:', error);
        throw new Error('Failed to update meeting');
    }
}

// function of delete the job post
export async function deleteJob(jobId) {
    try {
        const response = await axiosInterceptorInstance.delete(`http://127.0.0.1:8000/api/job/${jobId}/`, {
            method: 'DELETE',
        });
        return response;

    } catch (error) {
        console.error('error delete job:', error);
        throw new Error('failed to delete job');
    }

}