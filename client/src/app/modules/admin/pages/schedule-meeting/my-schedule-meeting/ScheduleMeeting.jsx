// import React, { useState } from 'react';
// import axios from "axios";


// function ScheduleMeeting() {
//   const [topic, setTopic] = useState(null);
//   const [agenda, setAgenda] = useState(null);
//   const [startTime, setStartTime] = useState(null);

//   const scheduleAPI = async () => {
//     await axios({
//       method: 'get',
//       url: `/meeting/create`,
//       data: { topic: topic, agenda: agenda, start_time: startTime }, // YYYY-MM-DD hh:mm
//       headers: {
//         Authorization: "your auth token here"
//       }
//     }).then(res => {
//       console.log("Meeting successfully created!")
//     }).catch((err) => {
//       console.log(err)
//     })
//   }
//   return (
//     <div style={{ textAlign: "center" }}>
//       <input onChange={(e) => setTopic(e.target.value)} placeholder='enter topic'></input> <br /><br />
//       <input onChange={(e) => setAgenda(e.target.value)} placeholder='enter agenda'></input><br /><br />
//       <input onChange={(e) => setStartTime(e.target.value)} placeholder='enter start datetime'></input><br />
//       <small>format: YYYY-MM-DD HH:mm</small>
//       <br /><br />
//       <button onClick={scheduleAPI}>Schedule</button>
//     </div>
//   );
// }
// export default ScheduleMeeting;





import React, { useState } from 'react';
import axios from 'axios';

function ScheduleMeeting() {
    const [topic, setTopic] = useState('');
    const [agenda, setAgenda] = useState('');
    const [startTime, setStartTime] = useState('');
    const [token, setToken] = useState('');
    const [message, setMessage] = useState('');

    const fetchToken = async () => {
        try {
            const response = await axios.get('/api/auth/token');
            setToken(response.data.token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const scheduleAPI = async () => {
        if (!token) {
            await fetchToken();
        }
        try {
            const response = await axios({
                method: 'post',
                url: '/meeting/create',
                data: { topic, agenda, start_time: startTime },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage("Meeting successfully created!");
            console.log(response.data);
        } catch (err) {
            setMessage("Error scheduling meeting.");
            console.error("Error scheduling meeting:", err);
        }
    };

    return (
        <div style={{ textAlign: "center" }}>
            <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder='Enter topic' /><br /><br />
            <input value={agenda} onChange={(e) => setAgenda(e.target.value)} placeholder='Enter agenda' /><br /><br />
            <input value={startTime} onChange={(e) => setStartTime(e.target.value)} placeholder='Enter start datetime' /><br />
            <small>Format: YYYY-MM-DD HH:mm</small><br /><br />
            <button onClick={scheduleAPI}>Schedule</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default ScheduleMeeting;
