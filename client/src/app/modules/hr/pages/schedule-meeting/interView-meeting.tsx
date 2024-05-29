'use client';

import MyMeetingTable from "./my-schedule-meeting";
import MeetingComponent from "./start-meeting/zoom-meeting-sdk";
//import StartMeeting from "./start-meeting/zoom-meeting-sdk";



export default function InterviewMeeting({id}:any) {
  return (
    <div>
      <MeetingComponent id={id}/>
    </div>
  );
}
