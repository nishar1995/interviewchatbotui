'use client';

import { useState } from 'react';
import { DatePicker } from '@/components/ui/datepicker';
import WidgetCard from '@/components/cards/widget-card';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';
import { Title } from 'rizzui';
import TrendingUpIcon from '@/components/icons/trending-up';
import SimpleBar from 'simplebar-react';

const data = [
  {
    name: 'Pregnancy',
    patients: 1000,
    fill: '#FFD66B',
  },
  {
    name: 'Cancer',
    patients: 900,
    fill: '#64CCC5',
  },
  {
    name: 'Dentist',
    patients: 800,
    fill: '#2B7F75',
  },
];

export default function AppointmentDiseases({
  className,
}: {
  className?: string;
}) {
  const isMobile = useMedia('(max-width: 480px)', false);
  const [startDate, setStartDate] = useState<Date>(new Date());
  return (
    <WidgetCard
      title="Appointment by Diseases"
      titleClassName="text-gray-700 font-normal sm:text-sm font-inter"
      headerClassName="items-center"
      className={cn(
        'flex h-full w-full flex-col justify-between @container',
        className
      )}
      action={
        <DatePicker
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          dateFormat="MMM, yyyy"
          placeholderText="Select Month"
          showMonthYearPicker
          popperPlacement="bottom-end"
          inputProps={{
            variant: 'text',
            inputClassName: 'p-0 px-1 h-auto [&_input]:text-ellipsis',
          }}
          className="w-36"
        />
      }
    >
      <div className="mb-4 mt-1 flex items-center gap-2">
        <Title as="h2" className="font-inter font-bold">
          75,095
        </Title>
        <span className="flex items-center gap-1 text-green-dark">
          <TrendingUpIcon className="h-auto w-5" />
          <span className="font-semibold leading-none"> +32.40%</span>
        </span>
      </div>

      <div className="w-full items-center justify-between gap-4 pb-4 @sm:flex @lg:pt-4 @xl:pb-0">
        <SimpleBar className="w-full @sm:w-3/5">
          <div className="flex h-80 w-full justify-center @sm:h-80">
            <ResponsiveContainer
              width="100%"
              height="100%"
              className=" [&_.recharts-default-legend]:flex [&_.recharts-default-legend]:flex-col [&_.recharts-default-legend]:flex-wrap [&_.recharts-legend-wrapper]:!static [&_.recharts-legend-wrapper]:!-mt-[22px]  [&_.recharts-legend-wrapper]:!leading-[22px] @xs:[&_.recharts-legend-wrapper]:!mt-0 @xl:[&_.recharts-legend-wrapper]:!absolute @xl:[&_.recharts-legend-wrapper]:!end-0 @xl:[&_.recharts-legend-wrapper]:!start-auto @xl:[&_.recharts-legend-wrapper]:!top-1/2 @xl:[&_.recharts-legend-wrapper]:!-translate-y-1/2 @xl:[&_.recharts-legend-wrapper]:!translate-x-0 @xl:[&_.recharts-legend-wrapper]:!leading-9"
            >
              <RadialBarChart
                innerRadius="35%"
                outerRadius="110%"
                barSize={isMobile ? 16 : 22}
                data={data}
                className="@sm:[&_>svg]:-ms-2"
              >
                <RadialBar
                  dataKey="patients"
                  className=" [&_.recharts-radial-bar-background-sector]:fill-gray-100"
                  cornerRadius={20}
                  background
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </SimpleBar>
        <CustomLegend className="shrink-0 @sm:w-36" />
      </div>
    </WidgetCard>
  );
}

function CustomLegend({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex flex-wrap gap-5 pt-5 @sm:flex-col @sm:pt-0 lg:gap-7',
        className
      )}
    >
      {data.map((item) => (
        <div
          key={item.name}
          className="relative flex w-2/5 flex-col ps-6 text-gray-500"
        >
          <span
            className="absolute start-0 top-1/2 h-3 w-3 -translate-y-1/2 rounded"
            style={{ backgroundColor: item?.fill }}
          />
          {item.name}
          <span className="font-inter text-xl font-semibold text-gray-900">
            {item.patients}+
          </span>
        </div>
      ))}
    </div>
  );
}
