'use client';

import MyMeetingTable from "./my-schedule-meeting";
import StartMeeting from "./start-meeting/zoom-meeting-sdk";

export default function StartZoomMeeting({ className }: { className?: string }) {
  return (
    <div className={className}>
      {/* <StartMeeting /> */}
      <MyMeetingTable/>
    </div>
  );
}
