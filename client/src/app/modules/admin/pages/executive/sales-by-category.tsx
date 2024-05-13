'use client';

import { useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import {
  Bar,
  Cell,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import SimpleBar from '@/components/ui/simplebar';
import TrendingUpIcon from '@/components/icons/trending-up';
import { formatNumber } from '@/utils/format-number';
import { Select, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';

const data = [
  {
    category: 'Automotive',
    sales: 3500,
    target: 3700,
  },
  {
    category: 'Electronics',
    sales: 4600,
    target: 4000,
  },
  {
    category: 'Furniture',
    sales: 5900,
    target: 5000,
  },
  {
    category: 'Sports',
    sales: 5780,
    target: 6000,
  },
  {
    category: 'Jewelry',
    sales: 4890,
    target: 4300,
  },
  {
    category: 'Toys',
    sales: 8000,
    target: 6000,
  },
  {
    category: 'Office',
    sales: 4300,
    target: 4890,
  },
];

const viewOptions = [
  {
    value: 'sixMonths',
    label: 'Last Six Months',
  },
  {
    value: 'oneYear',
    label: 'Last One Year',
  },
];

export default function SalesByCategory({ className }: { className?: string }) {
  const isTablet = useMedia('(max-width: 820px)', false);
  const [view, setView] = useState<'sixMonths' | 'oneYear'>('sixMonths');

  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  function barSize() {
    if (is2XL) return 50;
    if (isLg) return 32;
    if (isTab || isMobile) return 40;
  }

  return (
    <WidgetCard
      title="Sales By Category"
      className={className}
      descriptionClassName="text-gray-500 mt-1.5"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
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
        <div className="flex items-center justify-between gap-4">
          <Legend className="hidden @2xl:flex @3xl:hidden @5xl:flex" />
          <Select
            value={view}
            options={viewOptions}
            onChange={setView}
            variant="text"
            getOptionValue={(option) => option.value}
            displayValue={(selected) =>
              viewOptions?.find((op) => op.value === selected)?.label ?? ''
            }
            dropdownClassName="!w-44 !z-0"
            placement="bottom-end"
            className={'w-auto'}
          />
        </div>
      }
    >
      <Legend className="mt-2 flex @2xl:hidden @3xl:flex @5xl:hidden" />
      <SimpleBar>
        <div className="h-[28rem] w-full pt-9">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '600px' })}
          >
            <ComposedChart
              data={data}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -15,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="category" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
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
              <Tooltip
                content={<CustomTooltip formattedNumber={true} prefix="$" />}
              />

              <defs>
                <linearGradient id="belowTarget" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0" stopColor="#ecf0f1" />
                  <stop offset="0.8" stopColor="#9c88ff" />
                  <stop offset="1" stopColor="#9c88ff" />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id="aboveTarget" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0" stopColor="#A5BDEC" />
                  <stop offset="0.8" stopColor="#273c75" />
                  <stop offset="1" stopColor="#273c75" />
                </linearGradient>
              </defs>
              <Bar
                barSize={barSize()}
                dataKey="sales"
                stroke="#273c75"
                strokeOpacity={0}
                radius={[4, 4, 0, 0]}
              >
                {data.map((item) => (
                  <Cell
                    key={item.category}
                    fill={
                      item.sales >= item.target
                        ? 'url(#aboveTarget)'
                        : 'url(#belowTarget)'
                    }
                  />
                ))}
              </Bar>
              <Line
                stroke="#eab308"
                dataKey="target"
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
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#2980b9]" />
        <span>Sales</span>
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]" />
        <span>Target</span>
      </span>
    </div>
  );
}
