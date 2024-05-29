'use client';

import WidgetCard from '@/components/cards/widget-card';
import { toCurrency } from '@/utils/to-currency';
import { Avatar, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { formatNumber } from '@/utils/format-number';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';

const projects = [
  {
    id: 1,
    name: 'Mark Redesign task',
    budget: -85,
    color: '#FCB03D',
  },
  {
    id: 2,
    name: 'Tenco Revamp',
    budget: 253,
    color: '#11A849',
  },
  {
    id: 3,
    name: 'Alice Matro',
    budget: -40,
    color: '#FF1A1A',
  },
  {
    id: 4,
    name: 'Polly Mgt Ltd.',
    budget: -63,
    color: '#8A63D2',
  },
];

const data = [
  {
    month: 'Jan',
    totalSales: 95,
  },
  {
    month: 'Mar',
    totalSales: 70,
  },
  {
    month: 'May',
    totalSales: 113,
  },
  {
    month: 'Jul',
    totalSales: 159,
  },
  {
    month: 'Sep',
    totalSales: 105,
  },
  {
    month: 'Nov',
    totalSales: 140,
  },
];

export default function MRRReport({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="MRR Report"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={className}
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
    >
      <div className="my-8 h-[235px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              left: -20,
              bottom: 30,
            }}
          >
            <defs>
              <linearGradient
                id="totalMRR"
                x1="132.5"
                y1="10.0004"
                x2="132.5"
                y2="101.001"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.125} />
                <stop offset="95%" stopColor="#ffdadf" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="8 10"
              strokeOpacity={0.5}
              vertical={false}
            />
            <Tooltip content={<CustomTooltip />} />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={({ payload, ...rest }) => {
                const pl = {
                  ...payload,
                  value: formatNumber(Number(payload.value)),
                };
                return <CustomYAxisTick prefix={'$'} payload={pl} {...rest} />;
              }}
            />
            <Area
              type="linear"
              dataKey="totalSales"
              stroke="#eab308"
              strokeWidth={2.3}
              fillOpacity={1}
              fill="url(#totalMRR)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="  ">
        <div className="mb-4 flex items-center justify-between border-b border-muted pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
          <Text as="span" className="text-sm text-gray-600 dark:text-gray-700">
            Customer
          </Text>
          <Text as="span">MRR</Text>
        </div>
        {projects.map((item, index) => (
          <div
            key={item.id}
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <div className="flex items-center justify-start gap-2">
              <Avatar
                name={item.name}
                className="rounded-lg text-white"
                size="sm"
              />
              <Text
                as="span"
                className="font-lexend text-sm font-medium text-gray-900 dark:text-gray-700"
              >
                {item.name}
              </Text>
            </div>
            <Text as="span">{toCurrency(item.budget)}</Text>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
