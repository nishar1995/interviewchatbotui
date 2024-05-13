'use client';

import { Button, Title, Tooltip } from 'rizzui';
import cn from '@/utils/class-names';
import { PiPlusLight } from 'react-icons/pi';
import Calendar from 'react-calendar';
import { useState } from 'react';

function calculatePercentage(total: number, value: number) {
  const percentage = (value / total) * 100;
  return percentage.toFixed(2);
}

const data = [
  {
    title: 'Interviews',
    value: 380,
    total: 580,
    color: '#2B7F75',
  },
  {
    title: 'Meeting',
    value: 523,
    total: 923,
    color: '#176B87',
  },
  // {
  //   title: 'Surgery',
  //   value: 180,
  //   total: 456,
  //   color: '#FFD66B',
  // },
];

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function ScheduleList({ className }: { className?: string }) {
  const [value, onChange] = useState<Value>(new Date());
  return (
    <div
      className={cn(
        'flex flex-col overflow-hidden rounded-lg border border-muted bg-gray-0  @lg:flex-row dark:bg-gray-50',
        className
      )}
    >
      <div className="grow p-5 @lg:w-3/5 lg:p-7">
        <Title
          as="h3"
          className="pb-4 font-inter text-base font-semibold text-gray-800 sm:text-lg"
        >
          Schedule list
        </Title>
        <Calendar
          onChange={onChange}
          value={value}
          prev2Label={false}
          next2Label={false}
          className="!w-full !border-0 !bg-transparent !font-inter !text-base"
        />
      </div>
      <div className="flex flex-col justify-between bg-gray-50 px-5 py-7 @lg:w-2/5 dark:bg-gray-100">
        <div className="mb-10 space-y-6 @lg:pt-2">
          {data.map((item) => (
            <Slider
              key={item.title}
              title={item.title}
              total={item.total}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>
        <Button
          variant="outline"
          rounded="lg"
          className="fill-gray-900 text-gray-900"
        >
          <PiPlusLight className="me-1.5 h-4 w-4" /> Add New
        </Button>
      </div>
    </div>
  );
}

function Slider({
  title,
  total,
  value,
  color,
}: {
  title: string;
  total: number;
  value: number;
  color: string;
}) {
  const percentage = calculatePercentage(total, value);
  return (
    <div className="group">
      <div className="mb-2.5 flex items-center justify-between">
        <p className="font-medium text-gray-700">{title}</p>
        <div className="flex items-center">
          <span className="font-medium text-gray-700">{value}</span> &nbsp;
          <span>/ {total}</span>
        </div>
      </div>
      <div className="relative h-2.5 w-full rounded-lg bg-gray-100 dark:bg-gray-200">
        <div
          style={{ width: `${percentage}%`, backgroundColor: color }}
          className="h-full rounded-lg "
        />
        <div className="absolute left-0 top-1/2 flex h-0 w-full -translate-y-1/2 items-center bg-black/50">
          <div className="max-auto relative w-full">
            <Tooltip
              className="dark:bg-gray-200 dark:text-gray-900"
              placement="top"
              content={<span>{percentage}%</span>}
            >
              <span
                style={{ left: `${percentage}%`, backgroundColor: color }}
                className="absolute top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 scale-75 cursor-pointer rounded-full border-[5.5px] border-gray-0  opacity-0 shadow-md duration-100 group-hover:scale-100 group-hover:opacity-100 dark:border-muted"
              />
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
}
