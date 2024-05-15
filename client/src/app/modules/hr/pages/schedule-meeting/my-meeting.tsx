'use client';

import MyMeetingTable from "./my-schedule-meeting";



export default function MyMeeting({ className }: { className?: string }) {
  return (
    <div className={className}>
      <MyMeetingTable />
    </div>
  );
}
