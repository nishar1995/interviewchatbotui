'use client';

import { Title } from 'rizzui';
import cn from '@/utils/class-names';
import WidgetCard from '@/components/cards/widget-card';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import DropdownAction from '@/components/charts/dropdown-action';
import { useState } from 'react';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { formatNumber } from '@/utils/format-number';

const monthlyData = [
  {
    key: 'Jan',
    target: 2000,
    actual: 1000,
  },
  {
    key: 'Feb',
    target: 4200,
    actual: 3700,
  },
  {
    key: 'Mar',
    target: 3000,
    actual: 5800,
  },
  {
    key: 'Apr',
    target: 5780,
    actual: 3908,
  },
  {
    key: 'May',
    target: 4080,
    actual: 2500,
  },
  {
    key: 'Jun',
    target: 2300,
    actual: 5200,
  },
  {
    key: 'Jul',
    target: 4890,
    actual: 6500,
  },
  {
    key: 'Aug',
    target: 3780,
    actual: 4908,
  },
  {
    key: 'Sep',
    target: 5800,
    actual: 2800,
  },
  {
    key: 'Oct',
    target: 6000,
    actual: 1908,
  },
  {
    key: 'Nov',
    target: 2780,
    actual: 3908,
  },
  {
    key: 'Dec',
    target: 7500,
    actual: 3000,
  },
];

const dailyData = [
  {
    key: 'Sat',
    target: 2000,
    actual: 1000,
  },
  {
    key: 'Sun',
    target: 4200,
    actual: 3700,
  },
  {
    key: 'Mon',
    target: 3000,
    actual: 5800,
  },
  {
    key: 'Tue',
    target: 5780,
    actual: 3908,
  },
  {
    key: 'Wed',
    target: 4080,
    actual: 2500,
  },
  {
    key: 'Thu',
    target: 2300,
    actual: 5200,
  },
  {
    key: 'Fri',
    target: 4890,
    actual: 6500,
  },
];

const viewOptions = [
  {
    value: 'Daily',
    label: 'Daily',
  },
  {
    value: 'Monthly',
    label: 'Monthly',
  },
];

export default function Forecast({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 800px)', false);
  const [data, setData] = useState(dailyData);

  function handleChange(viewType: string) {
    console.log('viewType', viewType);
    if (viewType === 'Daily') {
      setData(dailyData);
    } else {
      setData(monthlyData);
    }
  }

  return (
    <WidgetCard
      title="Forecast"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={className}
      description={
        <Title as="h2" className="me-2 font-semibold">
          $105.87k
        </Title>
      }
      action={
        <div className="flex items-center justify-between gap-5">
          <Legend className="hidden @2xl:flex @3xl:hidden @5xl:flex" />
          <DropdownAction
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <Legend className="mt-2 flex @2xl:hidden @3xl:flex @5xl:hidden" />
      <SimpleBar>
        <div className="h-96 w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '700px' })}
          >
            <AreaChart
              data={data}
              margin={{
                left: -10,
              }}
              className="[&_.recharts-cartesian-axis-tick-value]:fill-gray-500 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <defs>
                <linearGradient id="target" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#eab308" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actual" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D1FF" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#00D1FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="key" axisLine={false} tickLine={false} />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return (
                    <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />
                  );
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />
              <Area
                type="monotone"
                dataKey="target"
                stroke="#eab308"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#target)"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#00D1FF"
                strokeWidth={2}
                fillOpacity={1}
                offset={10}
                fill="url(#actual)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-start gap-3 lg:gap-4', className)}>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#00D1FF]" />
        <span>Actual</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
        <span>Target</span>
      </span>
    </div>
  );
}
