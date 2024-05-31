import cn from '@/utils/class-names';


import MyMeeting from './my-meeting';
import StartZoomMeeting from '../../../hr/pages/schedule-meeting/my-meeting'
import InterviewMeeting from './interView-meeting';


interface IndexProps {
  className?: string;
}

export default function ExecutiveStartMeetingDashboard({id}:any) {
  console.log("metting id//////",id)
  return (
    <div
      className={cn(
        'flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7',
        
      )}
    >
      {<InterviewMeeting id={id}/>}
      {/* {<MyMeeting/>} */}
    </div>
  );
}
