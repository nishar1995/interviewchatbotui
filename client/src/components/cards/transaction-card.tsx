'use client';

import cn from '@/utils/class-names';
import { IconType } from 'react-icons/lib';
import { PiArrowDownRight, PiArrowUpRight } from 'react-icons/pi';

export type TransactionType = {
  icon: IconType;
  title: string;
  amount: string;
  increased: boolean;
  percentage: string;
  iconWrapperFill?: string;
  className?: string;
};

export type TransactionCardProps = {
  className?: string;
  transaction: TransactionType;
};

export default function TransactionCard({
  className,
  transaction,
}: TransactionCardProps) {
  const { icon, title, amount, increased, percentage, iconWrapperFill } =
    transaction;
  const Icon = icon;
  return (
    <div
      className={cn(
        'w-full rounded-[10px] border border-gray-300 px-6 py-7 @container',
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
        <div className="space-y-2">
          <p className="text-gray-500 ">{title}</p>
          {/* <p className="text-2xl font-medium text-gray-900 @[19rem]:text-3xl font-lexend"> */}
          <p className="font-lexend text-lg font-semibold text-gray-900 2xl:text-[20px] 3xl:text-[22px] dark:text-gray-700">
            {amount}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <div
          className={cn(
            'flex items-center gap-1 ',
            increased ? 'text-green-dark' : 'text-red-dark'
          )}
        >
          <span
            className={cn(
              'flex rounded-full  px-2.5 py-1.5 ',
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
          <span className="font-medium leading-none">
            {increased ? '+' : '-'}
            {percentage}%
          </span>
        </div>
        <span className="truncate leading-none text-gray-500">
          {increased ? 'Increased' : 'Decreased'}&nbsp; last month
        </span>
      </div>
    </div>
  );
}
