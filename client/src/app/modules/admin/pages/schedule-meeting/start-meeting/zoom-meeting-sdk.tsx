'use client'
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { ZoomMtg } from '@zoomus/websdk';
import { getMeetingById, startMeeting, addHostJoin } from "@/services/meetingScheduleService";
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded';
import { useRouter } from "next/router";
import { routes } from '@/config/routes';

// ZoomMtg.preLoadWasm();
// ZoomMtg.prepareWebSDK();

var authToken = ""
var userEmail = "jatindersingla@gmail.com"
var registrantToken = ''
var zakToken = ''
var leaveUrl = `http://localhost:3000`
const antIcon = <LoadingOutlined />;
var meetingUserDetails: any

const MeetingComponent = ({ id }: any) => {
    console.log("meeting id", id)
    const client = ZoomMtgEmbedded.createClient();
    useEffect(() => {
        if (id) {
            getMeetingDetailsId();
        }
        // const fetchSignatureAndStartMeeting = async () => {
        //     await getSignature();
        // };
        // fetchSignatureAndStartMeeting();
    });

    const getMeetingDetailsId = async () => {
        try {
            const response = await getMeetingById(id)
            console.log("response//////", response.data)
            if (response.data) {
                //let meetingDetails = response.data;
                meetingUserDetails = response.data;
                getSignature(meetingUserDetails);
            }
        }
        catch (error) {
            console.log("errror", error)
        }
    }

    const hostJoin = async (meetingDetails: any) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const router = useRouter();
        let data = {
            meeting_no: meetingDetails.meeting_id,
            role: meetingDetails.role,
            password: meetingDetails.password
        }
        try {
            const response = await addHostJoin(data);
            console.log("host join.......", response);
            const hostJoinUrl = `/host-meeting?meeting_no=${meetingDetails.meeting_id}&password=${meetingDetails.password}`;

            // Open the host join URL in a new window/tab
            window.open(hostJoinUrl, '_blank');

        } catch (error) {
            console.log("error", error)
        }
    }
    const getSignature = async (meetingDetails: any) => {
        let data = {
            meeting_no: meetingDetails.meeting_id,
            role: meetingDetails.role,
            password: meetingDetails.password
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
    }
    const initMeeting = async (data: any) => {
        console.log("data......", data)
        let meetingSDKElement = document.getElementById('meetingSDKElement');
        if (meetingSDKElement) {
            client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', patchJsMedia: true, leaveOnPageUnload: true }).then(() => {
                client.join({
                    signature: data.token,
                    sdkKey: data.sdkKey,
                    meetingNumber: data.meeting_no,
                    password: data.password,
                    userName: meetingUserDetails.username,
                    userEmail: userEmail,
                    tk: registrantToken,
                    zak: zakToken
                }).then(() => {
                    console.log('joined successfully');
                    //hostJoin(meetingUserDetails)

                }).catch((error) => {
                    console.log(error)
                })
            }).catch((error) => {
                console.log(error)
            })
        }

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