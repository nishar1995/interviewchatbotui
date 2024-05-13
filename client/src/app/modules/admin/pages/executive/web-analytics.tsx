'use client';

import { Text } from 'rizzui';
import WidgetCard from '@/components/cards/widget-card';
import {
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  YAxis,
  BarChart,
  XAxis,
  Bar,
} from 'recharts';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { formatNumber } from '@/utils/format-number';
import { CustomYAxisTick } from '@/components/charts/custom-yaxis-tick';
import { useMedia } from '@/hooks/use-media';
import GoogleIcon from '@/components/icons/google';
import MediumIcon from '@/components/icons/medium';
import YoutubeIcon from '@/components/icons/youtube';
import SquareBoxIcon from '@/components/icons/square-box';
import SimpleBar from '@/components/ui/simplebar';

const platforms = [
  {
    id: 1,
    name: 'Google',
    followers: '235K',
    icon: GoogleIcon,
    color: '#0761D1',
  },
  {
    id: 2,
    name: 'Medium',
    followers: '408k',
    icon: MediumIcon,
    color: '#88AAFC',
  },
  {
    id: 3,
    name: 'Youtube',
    followers: '379K',
    icon: YoutubeIcon,
    color: '#FCB03D',
  },
  {
    id: 4,
    name: 'Others',
    followers: '379K',
    icon: SquareBoxIcon,
    color: '#DEEAFC',
  },
];

const data = [
  {
    day: 'Sat',
    google: 5000,
    medium: 1500,
    youtube: 1500,
    others: 1500,
  },
  {
    day: 'Sun',
    google: 8500,
    medium: 1600,
    youtube: 5798,
    others: 2000,
  },
  {
    day: 'Mon',
    google: 7000,
    medium: 8300,
    youtube: 3000,
    others: 1375,
  },
  {
    day: 'Tue',
    google: 3908,
    medium: 1780,
    youtube: 6798,
    others: 5780,
  },
  {
    day: 'Wed',
    google: 4890,
    medium: 2500,
    youtube: 1500,
    others: 5000,
  },
  {
    day: 'Thu',
    google: 8000,
    medium: 3200,
    youtube: 7800,
    others: 4890,
  },
  {
    day: 'Fri',
    google: 8500,
    medium: 2500,
    youtube: 2500,
    others: 4890,
  },
];

export default function WebAnalytics({ className }: { className?: string }) {
  const isSM = useMedia('(max-width: 640px)', false);
  const isMobile = useMedia('(max-width: 767px)', false);
  const isTab = useMedia('(min-width: 768px)', false);
  const isLg = useMedia('(min-width: 1024px)', false);
  const is2XL = useMedia('(min-width: 1780px)', false);

  function barSize() {
    if (is2XL) return 24;
    if (isLg || isMobile) return 32;
    if (isTab) return 40;
  }
  return (
    <WidgetCard
      title="Website Analytics"
      titleClassName="font-medium sm:text-lg text-gray-800 mb-2.5 font-inter"
      className={className}
    >
      <SimpleBar>
        <div className="my-8 h-[300px]">
          <ResponsiveContainer
            width="100%"
            height="100%"
            {...(isSM && { minWidth: '500px' })}
          >
            <BarChart
              data={data}
              margin={{
                left: -15,
              }}
              className="[&_.recharts-tooltip-cursor]:fill-opacity-20 dark:[&_.recharts-tooltip-cursor]:fill-opacity-10 [&_.recharts-cartesian-axis-tick-value]:fill-gray-500 [&_.recharts-cartesian-axis.yAxis]:-translate-y-3 rtl:[&_.recharts-cartesian-axis.yAxis]:-translate-x-12 [&_.recharts-cartesian-grid-vertical]:opacity-0"
            >
              <CartesianGrid strokeDasharray="8 10" strokeOpacity={0.435} />
              <XAxis dataKey="day" axisLine={false} tickLine={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={({ payload, ...rest }) => {
                  const pl = {
                    ...payload,
                    value: formatNumber(Number(payload.value)),
                  };
                  return <CustomYAxisTick payload={pl} {...rest} />;
                }}
              />
              <Tooltip content={<CustomTooltip formattedNumber />} />

              {platforms.map((platform) => (
                <Bar
                  key={platform.name}
                  barSize={barSize()}
                  dataKey={platform.name.toLowerCase()}
                  fill={platform.color}
                  stackId="a"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </SimpleBar>
      <div className="  ">
        <div className="mb-4 flex items-center justify-between border-b border-muted pb-4 font-medium last:mb-0 last:border-0 last:pb-0">
          <Text as="span" className="text-sm text-gray-600 dark:text-gray-700">
            Platform
          </Text>
          <Text as="span">Followers</Text>
        </div>
        {platforms.map((item) => (
          <div
            key={item.id}
            className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0"
          >
            <Text
              as="span"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-700"
            >
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: item.color,
                }}
              />

              <item.icon className="h-6 w-6" />

              {item.name}
            </Text>
            <Text as="span">{item.followers}</Text>
          </div>
        ))}
      </div>
    </WidgetCard>
  );
}
