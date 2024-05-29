'use client';

import { Text } from 'rizzui';
import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import TrendingUpIcon from '@/components/icons/trending-up';
import TrendingDownIcon from '@/components/icons/trending-down';
import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import SimpleBar from '@/components/ui/simplebar';
import { getChartColorByEngagementRate } from '@/app/shared/analytics-dashboard/website-metrics/columns';

interface StatsCardsProps {
  className?: string;
}

const filesStatData = [
  {
    id: 1,
    title: 'Total ARR',
    metric: '$16,085k',
    fill: '#3872FA',
    percentage: 32,
    increased: true,
    decreased: false,
    value: '+32.40',
    engagementRate: 70.03,
    chart: [
      {
        label: '1',
        count: 21,
      },
      {
        label: '2',
        count: 23,
      },
      {
        label: '3',
        count: 16,
      },
      {
        label: '4',
        count: 87,
      },
      {
        label: '5',
        count: 49,
      },
      {
        label: '6',
        count: 100,
      },
      {
        label: '7',
        count: 88,
      },
      {
        label: '8',
        count: 57,
      },
      {
        label: '9',
        count: 86,
      },
      {
        label: '10',
        count: 73,
      },
      {
        label: '11',
        count: 57,
      },
      {
        label: '12',
        count: 32,
      },
      {
        label: '13',
        count: 39,
      },
      {
        label: '14',
        count: 99,
      },
      {
        label: '15',
        count: 12,
      },
      {
        label: '16',
        count: 33,
      },
      {
        label: '17',
        count: 26,
      },
      {
        label: '18',
        count: 50,
      },
      {
        label: '19',
        count: 18,
      },
      {
        label: '20',
        count: 48,
      },
    ],
  },
  {
    id: 2,
    title: 'Total Sales',
    metric: '$12,402k',
    fill: '#3872FA',
    percentage: 48,
    increased: false,
    decreased: true,
    value: '-18.45',
    chart: [
      {
        label: '1',
        count: 80,
      },
      {
        label: '2',
        count: 9,
      },
      {
        label: '3',
        count: 59,
      },
      {
        label: '4',
        count: 79,
      },
      {
        label: '5',
        count: 70,
      },
      {
        label: '6',
        count: 4,
      },
      {
        label: '7',
        count: 75,
      },
      {
        label: '8',
        count: 75,
      },
      {
        label: '9',
        count: 89,
      },
      {
        label: '10',
        count: 24,
      },
      {
        label: '11',
        count: 95,
      },
      {
        label: '12',
        count: 7,
      },
      {
        label: '13',
        count: 13,
      },
      {
        label: '14',
        count: 88,
      },
      {
        label: '15',
        count: 10,
      },
      {
        label: '16',
        count: 83,
      },
      {
        label: '17',
        count: 53,
      },
      {
        label: '18',
        count: 73,
      },
      {
        label: '19',
        count: 78,
      },
      {
        label: '20',
        count: 76,
      },
    ],
  },
  {
    id: 3,
    title: 'Total Costs',
    metric: '$12,402',
    fill: '#3872FA',
    percentage: 19,
    increased: true,
    decreased: false,
    value: '+20.34',
    engagementRate: 53.95,
    chart: [
      {
        label: '1',
        count: 26,
      },
      {
        label: '2',
        count: 24,
      },
      {
        label: '3',
        count: 78,
      },
      {
        label: '4',
        count: 82,
      },
      {
        label: '5',
        count: 70,
      },
      {
        label: '6',
        count: 46,
      },
      {
        label: '7',
        count: 10,
      },
      {
        label: '8',
        count: 27,
      },
      {
        label: '9',
        count: 56,
      },
      {
        label: '10',
        count: 49,
      },
      {
        label: '11',
        count: 33,
      },
      {
        label: '12',
        count: 9,
      },
      {
        label: '13',
        count: 58,
      },
      {
        label: '14',
        count: 57,
      },
      {
        label: '15',
        count: 53,
      },
      {
        label: '16',
        count: 57,
      },
      {
        label: '17',
        count: 62,
      },
      {
        label: '18',
        count: 37,
      },
      {
        label: '19',
        count: 48,
      },
      {
        label: '20',
        count: 76,
      },
    ],
  },
  {
    id: 4,
    title: 'Total Order',
    metric: '$12,402 ',
    fill: '#3872FA',
    percentage: 54,
    increased: true,
    decreased: false,
    value: '+14.45',
    engagementRate: 67.92,
    chart: [
      {
        label: '1',
        count: 17,
      },
      {
        label: '2',
        count: 70,
      },
      {
        label: '3',
        count: 18,
      },
      {
        label: '4',
        count: 34,
      },
      {
        label: '5',
        count: 16,
      },
      {
        label: '6',
        count: 57,
      },
      {
        label: '7',
        count: 24,
      },
      {
        label: '8',
        count: 67,
      },
      {
        label: '9',
        count: 83,
      },
      {
        label: '10',
        count: 18,
      },
      {
        label: '11',
        count: 96,
      },
      {
        label: '12',
        count: 57,
      },
      {
        label: '13',
        count: 34,
      },
      {
        label: '14',
        count: 96,
      },
      {
        label: '15',
        count: 27,
      },
      {
        label: '16',
        count: 25,
      },
      {
        label: '17',
        count: 26,
      },
      {
        label: '18',
        count: 74,
      },
      {
        label: '19',
        count: 49,
      },
      {
        label: '20',
        count: 72,
      },
    ],
  },
];

export default function StatsCards({ className }: StatsCardsProps) {
  return (
    <SimpleBar>
      <div className="grid grid-cols-1 gap-5 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12 3xl:gap-8 4xl:gap-9">
        {filesStatData.map((stat: any) => {
          return (
            <MetricCard
              key={stat.id}
              title={stat.title}
              metric={stat.metric}
              metricClassName="3xl:text-[22px]"
              className={cn('w-full max-w-full justify-between', className)}
              chartClassName="w-44"
              chart={
                <div className="ms-auto h-12 w-full 4xl:h-9">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={stat.chart}
                      margin={{
                        left: -30,
                      }}
                    >
                      <defs>
                        <linearGradient
                          id={`deviceSessionsMobile-${stat.id}`}
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#F0F1FF"
                            className="[stop-opacity:0.25] dark:[stop-opacity:0.2]"
                          />
                          <stop
                            offset="95%"
                            stopColor={getChartColorByEngagementRate(
                              stat.engagementRate
                            )}
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <Area
                        type="bump"
                        dataKey="count"
                        stroke={getChartColorByEngagementRate(
                          stat.engagementRate
                        )}
                        strokeWidth={1.8}
                        fillOpacity={1}
                        fill={`url(#deviceSessionsMobile-${stat.id})`}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              }
            >
              <Text className="mt-5 flex items-center leading-none text-gray-500">
                <Text
                  as="span"
                  className={cn(
                    'me-2 inline-flex items-center font-medium',
                    stat.increased ? 'text-green' : 'text-red'
                  )}
                >
                  {stat.increased ? (
                    <TrendingUpIcon className="me-1 h-4 w-4" />
                  ) : (
                    <TrendingDownIcon className="me-1 h-4 w-4" />
                  )}
                  {stat.value}%
                </Text>
                {stat.increased ? 'Increased' : 'Decreased'} last month
              </Text>
            </MetricCard>
          );
        })}
      </div>
    </SimpleBar>
  );
}
