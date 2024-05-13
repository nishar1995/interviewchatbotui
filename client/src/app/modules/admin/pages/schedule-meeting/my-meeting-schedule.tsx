'use client';
// import MyScheduleMeetingTable from '../schedule-meeting/my-schedule-meeting-table';
import ScheduleMeeting from './my-schedule-meeting/ScheduleMeeting'
export default function MyMeetingSchedule({ className }: { className?: string }) {
  return (
    <div className={className}>
      <ScheduleMeeting />
    </div>
  );
}
