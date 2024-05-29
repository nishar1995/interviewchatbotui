'use client';

import MyMeetingTable from "./my-schedule-meeting";
import MeetingComponent from "./start-meeting/zoom-meeting-sdk";
//import StartMeeting from "./start-meeting/zoom-meeting-sdk";



export default function InterviewMeeting({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MeetingComponent/>
    </div>
  );
}
