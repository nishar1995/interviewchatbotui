'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import {
  Bar,
  Line,
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
import { formatNumber } from '@/utils/format-number';

const dailyData = [
  {
    label: 'Mon',
    newSales: 117183,
    upgrades: 326942,
    Resellers: 326538,
    churn: -30667,
    totalExpenses: -23246,
    profit: 162076,
  },
  {
    label: 'Tue',
    newSales: 488268,
    upgrades: 373223,
    Resellers: 234067,
    churn: -31389,
    totalExpenses: -51920,
    profit: 437065,
  },
  {
    label: 'Wed',
    newSales: 219238,
    upgrades: 70002,
    Resellers: 210151,
    churn: -4311,
    totalExpenses: -89000,
    profit: 370684,
  },
  {
    label: 'Thu',
    newSales: 382627,
    upgrades: 27321,
    Resellers: 89336,
    churn: -27373,
    totalExpenses: -89437,
    profit: 255492,
  },
  {
    label: 'Fri',
    newSales: 389746,
    upgrades: 330836,
    Resellers: 33400,
    churn: -45807,
    totalExpenses: -31882,
    profit: 287664,
  },
  {
    label: 'Sat',
    newSales: 338199,
    upgrades: 177541,
    Resellers: 97451,
    churn: -18413,
    totalExpenses: -40210,
    profit: 254410,
  },
  {
    label: 'Sun',
    newSales: 467342,
    upgrades: 356321,
    Resellers: 314370,
    churn: -3711,
    totalExpenses: -43275,
    profit: 318518,
  },
];

const monthlyData = [
  {
    label: 'Jan',
    newSales: 93579,
    upgrades: 421955,
    Resellers: 86413,
    churn: -27276,
    totalExpenses: -88296,
    profit: 184139,
  },
  {
    label: 'Feb',
    newSales: 373833,
    upgrades: 211623,
    Resellers: 233277,
    churn: -14584,
    totalExpenses: -13761,
    profit: 154288,
  },
  {
    label: 'Mar',
    newSales: 474797,
    upgrades: 362113,
    Resellers: 43880,
    churn: -15421,
    totalExpenses: -15464,
    profit: 253182,
  },
  {
    label: 'Apr',
    newSales: 248607,
    upgrades: 327673,
    Resellers: 185429,
    churn: -49085,
    totalExpenses: -50205,
    profit: 238652,
  },
  {
    label: 'May',
    newSales: 192817,
    upgrades: 353038,
    Resellers: 144741,
    churn: -5373,
    totalExpenses: -18674,
    profit: 259086,
  },
  {
    label: 'Jun',
    newSales: 41641,
    upgrades: 226221,
    Resellers: 255823,
    churn: -10737,
    totalExpenses: -33277,
    profit: 350530,
  },
  {
    label: 'Jul',
    newSales: 358606,
    upgrades: 442117,
    Resellers: 5838,
    churn: -49777,
    totalExpenses: -83361,
    profit: 141861,
  },
  {
    label: 'Aug',
    newSales: 411455,
    upgrades: 86190,
    Resellers: 285542,
    churn: -35192,
    totalExpenses: -21917,
    profit: 44129,
  },
  {
    label: 'Sep',
    newSales: 331478,
    upgrades: 307179,
    Resellers: 141886,
    churn: -28260,
    totalExpenses: -72617,
    profit: 5085,
  },
  {
    label: 'Oct',
    newSales: 377530,
    upgrades: 163558,
    Resellers: 15763,
    churn: -28297,
    totalExpenses: -11570,
    profit: 269180,
  },
  {
    label: 'Nov',
    newSales: 483495,
    upgrades: 161239,
    Resellers: 296693,
    churn: -33113,
    totalExpenses: -13872,
    profit: 142251,
  },
  {
    label: 'Dec',
    newSales: 375607,
    upgrades: 351517,
    Resellers: 158027,
    churn: -25577,
    totalExpenses: -28273,
    profit: 302096,
  },
];

const bars = [
  { name: 'New Sales', value: 'newSales', color: '#2563eb' }, // cyan-600
  { name: 'Upgrades', value: 'upgrades', color: '#60a5fa' }, // cyan-500
  { name: 'Resellers', value: 'Resellers', color: '#93c5fd' }, // sky-200
  { name: 'Churn', value: 'churn', color: '#dd6773' },
  { name: 'Total Expenses', value: 'totalExpenses', color: '#f88e99' },
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

export default function TotalProfitLoss({ className }: { className?: string }) {
  const [data, setData] = useState(dailyData);
  const isTablet = useMedia('(max-width: 800px)', false);

  function handleChange(viewType: string) {
    if (viewType === 'Daily') {
      setData(dailyData);
    } else {
      setData(monthlyData);
    }
  }

  return (
    <WidgetCard
      title="Total Profit/Loss"
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
        <div className="flex items-center gap-5 md:justify-between">
          <Legend className="hidden @3xl:flex" />
          <DropdownAction
            options={viewOptions}
            onChange={handleChange}
            dropdownClassName="!z-0"
          />
        </div>
      }
    >
      <Legend className="mt-2 flex @3xl:hidden" />
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '1100px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                left: 5,
              }}
              barGap={0}
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
                dataKey="newSales"
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

              {bars.map((bar) => (
                <Bar
                  key={bar.value}
                  dataKey={bar.value}
                  fill={bar.color}
                  barSize={28}
                  radius={[4, 4, 0, 0]}
                />
              ))}
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#eab308"
                strokeWidth={2}
                dot={false}
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
      {bars.map((bar, index) => (
        <div key={bar.name} className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: bar.color }}
          />
          <span>{bar.name}</span>
        </div>
      ))}
    </div>
  );
}
