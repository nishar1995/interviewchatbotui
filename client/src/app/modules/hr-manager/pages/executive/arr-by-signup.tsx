'use client';

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  LabelList,
} from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import SimpleBar from '@/components/ui/simplebar';
import { useMedia } from '@/hooks/use-media';
import { formatNumber } from '@/utils/format-number';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import cn from '@/utils/class-names';

const data = [
  {
    month: 'Jan',
    sales: 1500,
    self: 1500,
  },
  {
    month: 'Feb',
    sales: 5798,
    self: 2000,
  },
  {
    month: 'Mar',
    sales: 3000,
    self: 1375,
  },
  {
    month: 'Apr',
    sales: 6798,
    self: 5780,
  },
  {
    month: 'May',
    sales: 1500,
    self: 5000,
  },
  {
    month: 'Jun',
    sales: 7800,
    self: 4890,
  },
  {
    month: 'Jul',
    sales: 2500,
    self: 4890,
  },
  {
    month: 'Aug',
    sales: 9908,
    self: 2800,
  },
  {
    month: 'Sep',
    sales: 8500,
    self: 1908,
  },
  {
    month: 'Oct',
    sales: 7208,
    self: 2780,
  },
  {
    month: 'Nov',
    sales: 2930,
    self: 1500,
  },
  {
    month: 'Dec',
    sales: 9000,
    self: 1700,
  },
];

export default function ArrBySignUp({ className }: { className?: string }) {
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTabLet = useMedia(
    '(min-width: 769px) and (max-width: 1536px)',
    false
  );

  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  function barSize() {
    if (is2XL) return 24;
    if (isLg) return 32;
    if (isTab || isMobile) return 40;
  }

  return (
    <WidgetCard
      title="New ARR by Sign Up"
      className={className}
      titleClassName="font-semibold"
      headerClassName="flex-col @2xl:flex-row @4xl:flex-col @5xl:flex-row gap-3"
      actionClassName="ps-0"
      action={
        <div className="flex items-center gap-5">
          <div className="flex flex-wrap items-start gap-3 lg:gap-4">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#5f27cd]" />
              <span>Sales Sign Up</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#DEEAFC]" />
              <span>Self Sign Up</span>
            </span>
          </div>
        </div>
      }
    >
      <SimpleBar className="mt-8">
        <div className="h-[32rem]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isMobile && { minWidth: '900px' })}
            {...(isTabLet && { minWidth: '900px' })}
          >
            <BarChart
              data={data}
              margin={{
                left: -6,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
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
              <Tooltip content={<CustomTooltip formattedNumber prefix="$" />} />

              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                  <stop offset="0" stopColor="#A5BDEC" />
                  <stop offset="0.8" stopColor="#5f27cd" />
                  <stop offset="1" stopColor="#5f27cd" />
                </linearGradient>
              </defs>
              <Bar
                stackId="a"
                fill="url(#gradient)"
                stroke="#8b5cf6" // violet-500
                strokeOpacity={0}
                dataKey="sales"
                className="text-white"
              >
                <LabelList dataKey="sales" content={renderCustomLabel} />
              </Bar>
              <Bar
                stackId="a"
                fill="#DEEAFC"
                dataKey="self"
                barSize={barSize()}
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="self"
                  className="text-gray-500"
                  content={renderCustomLabel}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

const renderCustomLabel = (props: any) => {
  const { x, y, width, height, value, className } = props;

  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2} // Adjusted to center vertically
        fill="currentColor"
        className={cn('text-xs font-semibold', className)}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        ${formatNumber(value)}
      </text>
    </g>
  );
};
