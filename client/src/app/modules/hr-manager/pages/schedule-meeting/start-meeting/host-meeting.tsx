import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ZoomMtgEmbedded } from '@zoomus/websdk/embedded';

const client = ZoomMtgEmbedded.createClient();

const HostJoinPage = () => {
    const router = useRouter();
    console.log("router......",router)
    const { meeting_no, password } = router.query;

    useEffect(() => {
        if (meeting_no && password) {
            initHostMeeting({ meeting_no, password });
        }
    }, [meeting_no, password]);

    const initHostMeeting = async (data: any) => {
        console.log("data......", data);
        let meetingSDKElement = document.getElementById('meetingSDKElement');
        if (meetingSDKElement) {
            client.init({
                zoomAppRoot: meetingSDKElement,
                language: 'en-US',
                patchJsMedia: true,
                leaveOnPageUnload: true
            } as any).then(() => {
                client.join({
                    signature: data.token,
                    sdkKey: process.env.NEXT_PUBLIC_ZOOM_SDK_KEY,
                    meetingNumber: data.meeting_no,
                    password: data.password,
                    userName: 'Host', // Host details
                    userEmail: process.env.NEXT_PUBLIC_USER_EMAIL,
                    tk: '', // Optional
                    zak: data.zakToken // Ensure zakToken is passed correctly
                }).then(() => {
                    console.log('Host joined successfully');
                }).catch((error) => {
                    console.log("Error joining meeting as host:", error);
                });
            }).catch((error) => {
                console.log("Error initializing meeting:", error);
            });
        }
    };

    return (
        <div>
            <h1>Host Join Page</h1>
            <div id="meetingSDKElement" style={{ width: '100%', height: '100vh' }}></div>
        </div>
    );
};

export default HostJoinPage;
