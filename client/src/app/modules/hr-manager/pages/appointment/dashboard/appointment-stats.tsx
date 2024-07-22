'use client';

import { Button } from 'rizzui';
import cn from '@/utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import { IconType } from 'react-icons/lib';
import {
  PiCalendarCheck,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCheckCircle,
  PiClock,
  PiPhoneSlash,
  PiArrowDownRight,
  PiArrowUpRight,
} from 'react-icons/pi';

import { useState, useEffect } from 'react';

type AppointmentStatsType = {
  className?: string;
};
export interface ScheduledCandidate {
  // Define properties of scheduled candidates
  // For example:
  id: number;
  name: string;
  // Add more properties as needed
}

const statData: StatType[] = [
  {
    title: 'Total Interviews',
    amount: '',
    // increased: true,
    // percentage: '32.40',
    icon: PiCalendarCheck,
  },
  {
    title: 'Scheduled Candidates',
    amount: '',
    // increased: true,
    // percentage: '32.40',
    icon: PiCheckCircle,
  },
  {
    title: 'Waiting List',
    amount: '8,503',
    // increased: false,
    // percentage: '32.40',
    icon: PiClock,
  },
  {
    title: 'Cancelled',
    amount: '2,430',
    // increased: true,
    // percentage: '32.40',
    icon: PiPhoneSlash,
  },
];

export type StatType = {
  icon: IconType;
  title: string;
  amount: string;
  // increased: boolean;
  // percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

export type StatCardProps = {
  className?: string;
  transaction: StatType;
};

function StatCard({ className, transaction }: StatCardProps) {
  const { icon, title, amount, iconWrapperFill } = transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        'group w-full rounded-[14px] border border-gray-300 px-6 py-7 @container first:bg-[#2B7F75]',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          className={cn(
            'flex rounded-[14px] bg-[#2B7F75] p-2.5 text-gray-0 group-first:bg-gray-0 group-first:text-[#2B7F75] dark:text-gray-900 dark:group-first:bg-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1.5">
          <p className="font-medium text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
            {title}
          </p>
          <p className="text-lg font-bold text-gray-900 group-first:text-gray-0 dark:text-gray-700 dark:group-first:text-gray-900 2xl:text-[20px] 3xl:text-3xl">
            {amount}
          </p>
        </div>
      </div>
      {/* <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1 ',
            increased ? 'text-green-dark ' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full  px-2.5 py-1.5 group-first:bg-gray-0 dark:group-first:bg-gray-900 dark:group-first:text-green-700',
              increased
                ? 'bg-green-lighter/70 dark:bg-green-dark/30'
                : 'bg-red-lighter/70 dark:bg-red-dark/30'
            )}
          >
            {increased ? (
              <PiArrowUpRight className="h-auto w-4" />
            ) : (
              <PiArrowDownRight className="h-auto w-4" />
            )}
          </span>
          <span className="font-semibold leading-none group-first:text-gray-0 dark:group-first:text-gray-900">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500 group-first:text-gray-100 dark:group-first:text-gray-800">
          {increased ? 'Increased' : 'Decreased'}&nbsp;last month
        </span>
      </div> */}
    </div>
  );
}

export function StatGrid({ scheduledCandidates, totalInterviews }: { 
  scheduledCandidates: ScheduledCandidate[]; 
  totalInterviews: number; 
}) {
  return (
    // <>
    //   {statData.map((stat: StatType, index: number) => {
    //     return (
    //       <StatCard
    //         key={'stat-card-' + index}
    //         transaction={stat}
    //         className="min-w-[300px]"
    //       />
    <>
    {statData.map((stat: StatType, index: number) => {
      // Update the amount for the "Total Interviews" stat
      if (stat.title === 'Total Interviews') {
        return (
          <StatCard
            key={'stat-card-' + index}
            transaction={{ ...stat, amount: totalInterviews.toString() }}
            className="min-w-[300px]"
          />
        );
      }
      return (
        <StatCard
          key={'stat-card-' + index}
          transaction={stat}
          className="min-w-[300px]"
        />
        );
      })}
    </>
  );
}

export default function AppointmentStats({ className }: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();
  const [scheduledCandidates, setScheduledCandidates] = useState<ScheduledCandidate[]>([]);
  const [totalInterviews, setTotalInterviews] = useState<number>(0);
  // useEffect(() => {
  //   // Fetch scheduled candidates data from your API endpoint
  //   fetchScheduledCandidatesData()
  //     .then((data) => {
  //       setScheduledCandidates(data as ScheduledCandidate[]);
  //         // Update the amount for the "Scheduled Candidates" stat
  //     const scheduledCandidatesAmount = data.length.toString();
  //     const updatedStatData = statData.map((stat) => {
  //       if (stat.title === 'Scheduled Candidates') {
  //         return { ...stat, amount: scheduledCandidatesAmount };
  //       }
  //       return stat;
  //     });
  //     // Update the state with the updated stat data
  //     statData.splice(1, 1, updatedStatData[1]);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching scheduled candidates data:', error);
  //     });
  // }, []); // Empty dependency array means this effect runs only once, similar to componentDidMount

  // Function to fetch scheduled candidates data
  // const fetchScheduledCandidatesData = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/upload_application_data');
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data');
  //     }
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // };



 // Effect to update total interviews count when scheduledCandidates change
 useEffect(() => {
  // Update total interviews count based on the length of scheduledCandidates array
  // setTotalInterviews(scheduledCandidates.length);
}, [scheduledCandidates]);

  return (
    <div
      className={cn(
        'relative flex w-auto items-center overflow-hidden',
        className
      )}
    >
      <Button
        title="Prev"
        variant="text"
        ref={sliderPrevBtn}
        onClick={() => scrollToTheLeft()}
        className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
      >
        <PiCaretLeftBold className="h-5 w-5" />
      </Button>
      <div className="w-full overflow-hidden">
        <div
          ref={sliderEl}
          className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
        >
          <StatGrid 
          scheduledCandidates={scheduledCandidates} 
          totalInterviews={totalInterviews}/>
        </div>
      </div>
      <Button
        title="Next"
        variant="text"
        ref={sliderNextBtn}
        onClick={() => scrollToTheRight()}
        className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden "
      >
        <PiCaretRightBold className="h-5 w-5" />
      </Button>
    </div>
  );
}
