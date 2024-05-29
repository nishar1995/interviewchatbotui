import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { ZoomMtg } from '@zoomus/websdk';
import { startMeeting } from "@/services/meetingScheduleService";
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

var authToken = ""
var userEmail = "jatindersingla@gmail.com"
var registrantToken = ''
var zakToken = ''
var leaveUrl = `http://localhost:3000`
const antIcon = <LoadingOutlined />;

const MeetingComponent = () => {
    const client = ZoomMtgEmbedded.createClient();
    useEffect(() => {
        const fetchSignatureAndStartMeeting = async () => {
            await getSignature();
        };
        fetchSignatureAndStartMeeting();
    }, []);
    const getSignature = async () => {
        let data = {
            meeting_no: 85367702858, role: 1, password: 'ReU3rN'
        }
        try {
            const response = await startMeeting(data);
            if (response) {
                console.log("join meeting", response);
                const value = response;
                initMeeting(value)
            }

        } catch (error) {
            console.log(error)
        }

        //  const ZoomMtgEmbedded =   await axios({
        //         method: 'post',
        //         url: `http://127.0.0.1:8000/api/meeting/authorize`,
        //         data: { meeting_no: 85656328923, role: 1 ,password:'Sz0X0r'}, // 0 = participant, 1 = host.
        //         headers: {
        //             Authorization: `Bearer ${authToken}` // Include the token in the Authorization header
        //           }
        //     }).then(res => {
        //         console.log(res)
        //         const data = res.data;
        //         initMeeting(data);
        //     }).catch((err) => {
        //         console.log(err)
        //     })
    }
    // 
    const initMeeting = async (data: any) => {
        console.log("data......",data)
        let meetingSDKElement = document.getElementById('meetingSDKElement');
        client.init({zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true}).then(() => {
            client.join({
              signature: data.token,
              sdkKey: data.sdkKey,
              meetingNumber: data.meeting_no,
              password: data.password,
              userName: 'jatinder',
              userEmail: userEmail,
              tk: registrantToken,
              zak: zakToken
            }).then(() => {
              console.log('joined successfully')
            }).catch((error) => {
              console.log(error)
            })
          }).catch((error) => {
            console.log(error)
          })
        // const zmmtgRoot = document.getElementById('zmmtg-root');
        // if (zmmtgRoot) {
        //     zmmtgRoot.style.display = 'block';
        // }
        // const { ZoomMtg } = await import('@zoomus/websdk');
        // ZoomMtg.setZoomJSLib('https://source.zoom.us/2.16.0/lib', '/av'); 
        // ZoomMtg.preLoadWasm();
        // ZoomMtg.prepareWebSDK();
        // ZoomMtg.i18n.load('en-US');
        // ZoomMtg.i18n.reload('en-US');
        // ZoomMtg.init({
        //     leaveUrl: 'http://localhost:3000', // Ensure this is a valid URL
        //     success: (success: any) => {
        //         console.log('ZoomMtg.init success', success);
        //         ZoomMtg.join({
        //             signature: data.token,
        //             sdkKey: data.sdkKey, // Use environment variables
        //             meetingNumber: data.meeting_no,
        //             passWord: data.password,
        //             userName: 'jatinder',
        //             userEmail: 'abc@gmail.com', // Use environment variables
        //             tk: '',
        //             zak: data.zakToken,
        //             success: (success: any) => {
        //                 console.log('ZoomMtg.join success', success);
        //             },
        //             error: (error: any) => {
        //                 console.error('ZoomMtg.join error', error);
        //             }
        //         });
        //     },
        //     error: (error: any) => {
        //         console.error('ZoomMtg.init error', error);
        //     }
        // });
    };

    return (
        <Fragment>
            <div id="meetingSDKElement"></div>
        </Fragment>
    );
}
export default MeetingComponent;