'use client';

import {
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';
import { Title } from 'rizzui';
import cn from '@/utils/class-names';

const data = [
  {
    month: 'Jan',
    growthPercentage: 55,
  },
  {
    month: 'Feb',
    growthPercentage: 87,
  },
  {
    month: 'Mar',
    growthPercentage: -30,
  },
  {
    month: 'Apr',
    growthPercentage: 37,
  },
  {
    month: 'May',
    growthPercentage: 162,
  },
  {
    month: 'Jun',
    growthPercentage: 120,
  },
  {
    month: 'Jul',
    growthPercentage: -80,
  },
  {
    month: 'Aug',
    growthPercentage: 180,
  },
  {
    month: 'Sep',
    growthPercentage: 99,
  },
  {
    month: 'Oct',
    growthPercentage: -120,
  },
  {
    month: 'Nov',
    growthPercentage: 436,
  },
  {
    month: 'Dec',
    growthPercentage: 335,
  },
];

export default function MonthlySalesGrowth({
  className,
}: {
  className?: string;
}) {
  const isTablet = useMedia('(max-width: 800px)', false);

  return (
    <WidgetCard
      title="Monthly Sales Growth"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      headerClassName="flex-col @2xl:flex-row gap-3"
      className={cn('min-h-[28rem]', className)}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2 font-semibold">
            $83.45k
          </Title>
        </div>
      }
    >
      <SimpleBar>
        <div className="h-[28rem] w-full pt-6 @lg:pt-8">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isTablet && { minWidth: '1100px' })}
          >
            <ComposedChart
              layout="vertical"
              data={data}
              margin={{
                top: 0,
                right: 0,
                bottom: 0,
                left: -30,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12"
            >
              <CartesianGrid
                vertical={false}
                strokeOpacity={0.435}
                strokeDasharray="8 10"
              />

              <XAxis
                type="number"
                tick={<CustomYAxisTick postfix="%" />}
                tickLine={false}
              />
              <YAxis
                dataKey="month"
                type="category"
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<CustomTooltip postfix="%" />} cursor={false} />
              <defs>
                <linearGradient
                  id="horizontalGradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0" stopColor="#82ccdd" />
                  <stop offset="0.8" stopColor="#706fd3" />
                  <stop offset="1" stopColor="#706fd3" />
                </linearGradient>
              </defs>

              <Bar
                dataKey="growthPercentage"
                barSize={20}
                radius={[0, 4, 4, 0]}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      entry.growthPercentage < 0
                        ? '#dd6773'
                        : 'url(#horizontalGradient)'
                    }
                  />
                ))}
                <LabelList
                  dataKey="growthPercentage"
                  className="text-gray-500"
                  content={renderCustomizedLabel}
                />
              </Bar>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value } = props;

  return (
    <text
      x={value < 0 ? x + 50 : x - 10}
      y={y + height / 2 + 5} // Adjusted to center vertically
      fill="currentColor"
      textAnchor="end"
      fontSize={12}
    >
      {value}%
    </text>
  );
};
