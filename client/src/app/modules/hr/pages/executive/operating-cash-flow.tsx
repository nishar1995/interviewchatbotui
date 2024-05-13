'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import { Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';

const dailyData = [
  {
    label: 'Mon',
    income: 98,
    costOfSales: 80,
    expense: 18,
  },
  {
    label: 'Tue',
    income: 87,
    costOfSales: 49,
    expense: 16,
  },
  {
    label: 'Thu',
    income: 50,
    costOfSales: 86,
    expense: 32,
  },
  {
    label: 'Wed',
    income: 45,
    costOfSales: 68,
    expense: 12,
  },
  {
    label: 'Fri',
    income: 25,
    costOfSales: 38,
    expense: 10,
  },
  {
    label: 'Sat',
    income: 80,
    costOfSales: 59,
    expense: 12,
  },
  {
    label: 'Sun',
    income: 87,
    costOfSales: 48,
    expense: 16,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    income: 565,
    costOfSales: 454,
    expense: 320,
  },
  {
    label: 'Feb',
    income: 189,
    costOfSales: 551,
    expense: 68,
  },
  {
    label: 'Mar',
    income: 430,
    costOfSales: 300,
    expense: 150,
  },
  {
    label: 'Apr',
    income: 571,
    costOfSales: 583,
    expense: 230,
  },
  {
    label: 'May',
    income: 452,
    costOfSales: 700,
    expense: 200,
  },
  {
    label: 'Jun',
    income: 438,
    costOfSales: 268,
    expense: 160,
  },
  {
    label: 'Jul',
    income: 675,
    costOfSales: 170,
    expense: 100,
  },
  {
    label: 'Aug',
    income: 735,
    costOfSales: 541,
    expense: 200,
  },
  {
    label: 'Sep',
    income: 479,
    costOfSales: 741,
    expense: 250,
  },
  {
    label: 'Oct',
    income: 548,
    costOfSales: 421,
    expense: 110,
  },
  {
    label: 'Nov',
    income: 261,
    costOfSales: 621,
    expense: 100,
  },
  {
    label: 'Dec',
    income: 757,
    costOfSales: 661,
    expense: 80,
  },
];

const ticketStatus = [
  { name: 'Income' },
  { name: 'Cost of sales' },
  { name: 'Expense' },
];
const COLORS = ['#A5BDEC', '#F7A355', '#50535A'];

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

export default function OperatingCashFlow({
  className,
}: {
  className?: string;
}) {
  const [data, setData] = useState(monthlyData);
  const isTab = useMedia('(max-width: 768px)', false);

  function handleChange(viewType: string) {
    if (viewType === 'Daily') {
      setData(monthlyData);
    } else {
      setData(dailyData);
    }
  }

  return (
    <WidgetCard
      title="Operating Cash Flow"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={cn('min-h-[28rem]', className)}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2 font-semibold">
            $83.45k
          </Title>
          <Text className="flex items-center leading-none text-gray-500">
            <Text
              as="span"
              className={cn(
                'me-2 inline-flex items-center font-medium text-green'
              )}
            >
              <TrendingUpIcon className="me-1 h-4 w-4" />
              32.40%
            </Text>
          </Text>
        </div>
      }
      action={
        <div className="flex items-center gap-5">
          <Legend className="hidden @2xl:flex" />
          <DropdownAction
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <Legend className="mt-2 flex @2xl:hidden" />
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTab && { minWidth: '1100px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: -25,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />
              <XAxis dataKey="label" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={<CustomYAxisTick />}
              />
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />

              <defs>
                <linearGradient
                  id="incomeGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#A5BDEC" />
                  <stop offset="0.8" stopColor="#477DFF" />
                  <stop offset="1" stopColor="#477DFF" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="cosGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#FDBE60" />
                  <stop offset="0.8" stopColor="#F7A355" />
                  <stop offset="1" stopColor="#F7A355" />
                </linearGradient>
              </defs>

              <defs>
                <linearGradient
                  id="expenseGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="100%"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop offset="0" stopColor="#817E83" />
                  <stop offset="0.8" stopColor="#50535A" />
                  <stop offset="1" stopColor="#50535A" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="income"
                fill="url(#incomeGradient)"
                stroke={COLORS[0]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="costOfSales"
                fill="url(#cosGradient)"
                stroke={COLORS[1]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                type="natural"
                dataKey="expense"
                fill="url(#expenseGradient)"
                stroke={COLORS[2]}
                barSize={28}
                radius={[4, 4, 0, 0]}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

function Legend({ className }: { className?: string }) {
  return (
    <div className={cn('flex flex-wrap items-start gap-3 lg:gap-4', className)}>
      {ticketStatus.map((item, index) => (
        <div key={item.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: COLORS[index] }}
          />
          <span>{item.name}</span>
        </div>
      ))}
    </div>
  );
}
