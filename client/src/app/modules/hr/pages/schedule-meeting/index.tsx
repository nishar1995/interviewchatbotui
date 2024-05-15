import cn from '@/utils/class-names';


import MyMeeting from './my-meeting';


interface IndexProps {
  className?: string;
}

export default function ExecutiveMeetingDashboard({ className }: IndexProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-5 @container 2xl:gap-x-6 2xl:gap-y-7',
        className
      )}
    >

      {<MyMeeting/>}
     
    </div>
  );
}
