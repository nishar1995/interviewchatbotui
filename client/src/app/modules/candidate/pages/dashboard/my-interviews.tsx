'use client';
import { Button, Title } from 'rizzui';
import cn from '@/utils/class-names';
import axios from 'axios'; 
import { useEffect, useState } from 'react';
interface Interview {
  id: number;
  // candidate: {
  //   name: string;
  // };
  candidateName: string;
  meetingSchedule: string;
  interviewDateTime: string;
}

// const interviews = [
//   {
//     id: 1,
//     candidate: {
//       name: 'John Doe',
//     },
//     interviewFor: 'full stack',
//     interviewDateTime: '12/10/2024 2:30pm',
//   },
//   //   {
//   //     id: 2,
//   //     candidate: {
//   //       name: 'John Doe',
//   //     },
//   //     interviewFor: 'Frontend',
//   //     interviewDateTime: '12/08/2024 2:30pm',
//   //   },
//   //   {
//   //     id: 3,
//   //     candidate: {
//   //       name: 'John Doe',
//   //     },
//   //     interviewFor: 'Backend',
//   //     interviewDateTime: '12/10/2024 2:30pm',
//   //   },
//   //   {
//   //     id: 4,
//   //     candidate: {
//   //       name: 'John Doe',
//   //     },
//   //     interviewFor: 'full stack',
//   //     interviewDateTime: '12/10/2024 2:30pm',
//   //   },
//   //   {
//   //     id: 5,
//   //     candidate: {
//   //       name: 'John Doe',
//   //     },
//   //     interviewFor: 'full stack',
//   //     interviewDateTime: '12/10/2024 2:30pm',
//   //   },
//   //   {
//   //     id: 6,
//   //     candidate: {
//   //       name: 'John Doe',
//   //     },
//   //     interviewFor: 'full stack',
//   //     interviewDateTime: '12/10/2024 2:30pm',
//   //   },
// ];

export default function MyInterviews({ className }: { className?: string }) {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  // const interviews: Interview[] = [];
  // useEffect(() => {
  //   axios.get<Interview[]>('http://localhost:5000/upload_application_data')
  //     .then(response => {
  //       setInterviews(response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching interview data:', error);
  //     });
  // }, []); 
  return (
    <div className={className}>
      <div className="col-span-full mb-3 flex items-center justify-between 2xl:mb-5">
        <Title as="h3" className="text-lg font-semibold xl:text-xl">
          My interviews
        </Title>
      </div>

      <div className="flex flex-wrap gap-5">
        {interviews.map((interview) => (
          <Card
            key={interview.id}
            item={interview}
            onStart={() => null}
            className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
          />
        ))}
      </div>
    </div>
  );
}

export function Card({
  item,
  className,
  onStart,
}: {
  item: Interview;
  className?: string;
  onStart: () => void;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        className
      )}
    >
      <Title
        as="h4"
        className="mb-1 truncate text-sm font-medium text-gray-800"
      >
        {item.candidateName}
      </Title>
      <ul className="mb-1 flex list-inside list-disc gap-3.5">
        <li className="list-none text-sm text-gray-500">
          {item?.interviewDateTime}
        </li>
        <li className="text-sm text-gray-500">{item?.meetingSchedule}</li>
      </ul>
      <Button as="span" className="w-full @lg:w-auto ">
        Start
      </Button>
    </div>
  );
}

