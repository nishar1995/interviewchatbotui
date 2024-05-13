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

type AppointmentStatsType = {
  className?: string;
};

const statData: StatType[] = [
  {
    title: 'Total Appointment',
    amount: '26,085',
    // increased: true,
    // percentage: '32.40',
    icon: PiCalendarCheck,
    iconWrapperFill: '#F5A623',
  },
  {
    title: 'Scheduled Patients',
    amount: '15,786',
    // increased: true,
    // percentage: '32.40',
    icon: PiCheckCircle,
    iconWrapperFill: '#11843C',
  },
  {
    title: 'Waiting List',
    amount: '8,503',
    // increased: false,
    // percentage: '32.40',
    icon: PiClock,
    iconWrapperFill: '#8A63D2',
  },
  {
    title: 'Cancelled',
    amount: '2,430',
    // increased: true,
    // percentage: '32.40',
    icon: PiPhoneSlash,
    iconWrapperFill: '#C50000',
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
        'w-full rounded-[14px] border border-gray-300 p-6 @container',
        className
      )}
    >
      <div className="mb-4 flex items-center gap-5">
        <span
          style={{ backgroundColor: iconWrapperFill }}
          className={cn(
            'flex rounded-[14px] p-2.5 text-gray-0 dark:text-gray-900'
          )}
        >
          <Icon className="h-auto w-[30px]" />
        </span>
        <div className="space-y-1">
          <p className="font-medium text-gray-500 ">{title}</p>
          <p className="text-lg font-bold text-gray-900 dark:text-gray-700 2xl:text-[20px] 3xl:text-3xl">
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
              'flex rounded-full  px-2.5 py-1.5',
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
          <span className="font-semibold leading-none ">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500">
          {increased ? 'Increased' : 'Decreased'}&nbsp;last month
        </span>
      </div> */}
    </div>
  );
}

export function StatGrid() {
  return (
    <>
      {statData.map((stat: StatType, index: number) => {
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

export default function AppointmentListStats({
  className,
}: AppointmentStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

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
          <StatGrid />
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
