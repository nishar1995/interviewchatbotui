'use client';

import WidgetCard from '@/components/cards/widget-card';
import { AdvancedCheckbox, Button } from 'rizzui';
import cn from '@/utils/class-names';
import DropdownAction from '@/components/charts/dropdown-action';
import { PiCalendarBlank, PiCheckBold } from 'react-icons/pi';
import DateCell from '@/components/ui/date-cell';
import SimpleBar from 'simplebar-react';

const data = [
  {
    id: 1,
    patient: 'Martha Freese',
    doctor: 'Dr. Cameron Will',
    date: '2022-11-10T06:22:01.621Z',
  },
  {
    id: 2,
    patient: 'Gina Vanleuven',
    doctor: 'Dr. Inez Delima',
    date: '2022-11-10T06:22:01.621Z',
  },
  {
    id: 3,
    patient: 'Pearl Torres',
    doctor: 'Dr. Quinn Ellison',
    date: '2022-11-10T06:22:01.621Z',
  },
  {
    id: 4,
    patient: 'Alice Hinson',
    doctor: 'Dr. Cameron Will',
    date: '2022-11-10T06:22:01.621Z',
  },
  {
    id: 5,
    patient: 'Torres Pearl',
    doctor: 'Dr. Quinn Ellison',
    date: '2022-11-10T06:22:01.621Z',
  },
];
const COLORS = ['#2B7F75', '#FFD66B', '#64CCC5', '#176B87'];

const viewOptions = [
  {
    value: 'All',
    label: 'All',
  },
  {
    value: 'IT',
    label: 'IT',
  },
  {
    value: 'DigitalMarketing',
    label: 'Digital Marketing',
  },
  {
    value: 'ContentWriting',
    label: 'Content Writing',
  },
];

export default function AppointmentTodo({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      title="Today’s Interviews"
      titleClassName="text-gray-800 sm:text-lg font-inter"
      headerClassName="items-center"
      className={cn('overflow-hidden bg-gray-50 @container', className)}
      action={
        <DropdownAction
          className="rounded-lg border w-[calc(150px)]"
          options={viewOptions}
          onChange={handleChange}
          dropdownClassName="!z-0"
          prefixIconClassName="hidden"
        />
      }
    >
      <div className="mt-7 h-[22rem]">
        <SimpleBar className="relative -mx-3 -my-2 h-full w-[calc(100%+24px)]">
          <div className="relative before:absolute before:start-9 before:top-3 before:z-0 before:h-[calc(100%-24px)] before:w-1 before:translate-x-0.5 before:bg-gray-200">
            {data.map((item) => (
              <AdvancedCheckbox
                name="currency"
                value="pound"
                key={item.id}
                className="relative z-10 mt-0.5 px-3 py-1.5"
                inputClassName="[&:checked~.rizzui-advanced-checkbox]:ring-muted [&:checked~.rizzui-advanced-checkbox>span>svg]:opacity-100 [&:checked~.rizzui-advanced-checkbox>span]:border-[#2B7F75] [&:checked~.rizzui-advanced-checkbox>div>div>strong]:line-through [&:checked~.rizzui-advanced-checkbox>div>div>strong]:text-gray-500 [&:checked~.rizzui-advanced-checkbox>div>div>strong+span]:line-through"
                contentClassName="flex w-full bg-gray-0 dark:bg-gray-50 items-center @md:px-5 px-4 py-4 rounded-lg shadow hover:shadow-md transition-shadow border-0 @md:gap-5 gap-4"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#D9B34E]">
                  <PiCheckBold className="fill-[#2B7F75] opacity-0" />
                </span>
                <div className="block">
                  <div className="text-gray-600">
                    <strong className="font-semibold text-gray-900">
                      {item.patient}
                    </strong>{' '}
                    {/* <span>appointed to</span>{' '}
                    <span className="inline-block rounded-2xl bg-[#2B7F75] px-2.5 font-medium text-white">
                      {item.doctor}
                    </span> */}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                    <PiCalendarBlank className="shrink-0 text-base text-gray-400" />
                    <DateCell
                      //@ts-ignore
                      date={item.date}
                      dateClassName="font-normal text-gray-500"
                      className="flex gap-2"
                      timeClassName="text-sm"
                      dateFormat="M/D/YYYY"
                    />
                  </div>
                </div>
              </AdvancedCheckbox>
            ))}
          </div>
          <div className="fixed bottom-0 start-0 z-20 flex h-32 w-full items-end justify-center bg-gradient-to-t from-gray-50 via-gray-50 to-transparent pb-6">
            <Button
              className="bg-gray-0 text-gray-800 shadow-md transition-shadow hover:bg-gray-0 hover:shadow dark:hover:bg-gray-0"
              rounded="lg"
            >
              View All
            </Button>
          </div>
        </SimpleBar>
      </div>
    </WidgetCard>
  );
}
