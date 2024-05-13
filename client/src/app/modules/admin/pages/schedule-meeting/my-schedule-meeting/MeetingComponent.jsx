// import React, { Fragment, useEffect, useState } from "react";
// import axios from "axios";
// import { LoadingOutlined } from '@ant-design/icons';

// const userEmail = "preeti.sidana@aiinfox.com"; // Should ideally be managed via context or props
// const leaveUrl = `http://localhost:3000`;

// const MeetingComponent = () => {
//     const [loading, setLoading] = useState(true);
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         let isMounted = true; // To handle cleanup and prevent setting state on unmounted component

//         const getSignature = async () => {
//             try {
//                 const response = await axios.get(`/meeting/authorize`, {
//                     params: { meeting_no: 12345678901, role: 0 },
//                     headers: {
//                         Authorization: "Bearer Your_JWT_Token" // Securely manage your token
//                     }
//                 });
//                 if (isMounted) {
//                     initMeeting(response.data);
//                 }
//             } catch (error) {
//                 console.error("Error fetching signature:", error);
//                 if (isMounted) {
//                     setErrorMessage("Failed to get the meeting signature.");
//                     setLoading(false);
//                 }
//             }
//         };

//         getSignature();

//         return () => {
//             isMounted = false; // Set isMounted to false when component unmounts
//         };
//     }, []);

//     const initMeeting = (data) => {
//         const { ZoomMtg } = window.Zoom;
//         ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av');
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareWebSDK();
//         ZoomMtg.i18n.load('en-US');
//         ZoomMtg.i18n.reload('en-US');

//         ZoomMtg.init({
//             leaveUrl: leaveUrl,
//             success: () => {
//                 ZoomMtg.join({
//                     signature: data.token,
//                     sdkKey: data.sdkKey,
//                     meetingNumber: data.meeting_no,
//                     passWord: data.password,
//                     userName: "Your Name", // Replace with dynamic data if available
//                     userEmail: userEmail,
//                     success: (success) => {
//                         console.log("Meeting join success:", success);
//                         setLoading(false);
//                     },
//                     error: (error) => {
//                         console.error("Meeting join error:", error);
//                         setErrorMessage("Failed to join the meeting.");
//                         setLoading(false);
//                     }
//                 });
//             },
//             error: (error) => {
//                 console.error("Meeting init error:", error);
//                 setErrorMessage("Failed to initialize the meeting.");
//                 setLoading(false);
//             }
//         });
//     };

//     if (loading) {
//         return <LoadingOutlined style={{ fontSize: 24 }} spin />;
//     }

//     if (errorMessage) {
//         return <div>Error: {errorMessage}</div>;
//     }

//     return <Fragment>Meeting Ready</Fragment>;
// };

// export default MeetingComponent;





import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';

const userEmail = "preeti.sidana@aiinfox.com"; // Should ideally be managed via context or props
const leaveUrl = `http://localhost:3000`;

const MeetingComponent = () => {
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        let isMounted = true; // To handle cleanup and prevent setting state on unmounted components

        const fetchToken = async () => {
            try {
                const response = await axios.get('/api/auth/token'); // Adjust the endpoint as necessary
                if (isMounted) {
                    setToken(response.data.token);
                }
            } catch (error) {
                console.error("Error fetching JWT token:", error);
                if (isMounted) {
                    setErrorMessage("Failed to get JWT token.");
                    setLoading(false);
                }
            }
        };

        fetchToken();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, []);

    useEffect(() => {
        let isMounted = true; // To handle cleanup and prevent setting state on unmounted components

        const getSignature = async () => {
            if (token) { // Only proceed if the token has been set
                try {
                    const response = await axios.get(`/meeting/authorize`, {
                        params: { meeting_no: 12345678901, role: 0 },
                        headers: {
                            Authorization: `Bearer ${token}` // Use the dynamically fetched token
                        }
                    });
                    if (isMounted) {
                        initMeeting(response.data);
                    }
                } catch (error) {
                    console.error("Error fetching signature:", error);
                    if (isMounted) {
                        setErrorMessage("Failed to get the meeting signature.");
                        setLoading(false);
                    }
                }
            }
        };

        getSignature();

        return () => {
            isMounted = false; // Cleanup on unmount
        };
    }, [token]); // Dependency on token ensures this runs when token is set

    const initMeeting = (data) => {
        const { ZoomMtg } = window.Zoom;
        ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av');
        ZoomMtg.preLoadWasm();
        ZoomMtg.prepareWebSDK();
        ZoomMtg.i18n.load('en-US');
        ZoomMtg.i18n.reload('en-US');

        ZoomMtg.init({
            leaveUrl: leaveUrl,
            success: () => {
                ZoomMtg.join({
                    signature: data.token,
                    sdkKey: data.sdkKey,
                    meetingNumber: data.meeting_no,
                    passWord: data.password,
                    userName: userEmail,
                    userEmail: userEmail,
                    success: (success) => {
                        console.log("Meeting join success:", success);
                        setLoading(false);
                    },
                    error: (error) => {
                        console.error("Meeting join error:", error);
                        setErrorMessage("Failed to join the meeting.");
                        setLoading(false);
                    }
                });
            },
            error: (error) => {
                console.error("Meeting init error:", error);
                setErrorMessage("Failed to initialize the meeting.");
                setLoading(false);
            }
        });
    };

    if (loading) {
        return <LoadingOutlined style={{ fontSize: 24 }} spin />;
    }

    if (errorMessage) {
        return <div>Error: {errorMessage}</div>;
    }

    return <Fragment>Meeting Ready</Fragment>;
};

export default MeetingComponent;
