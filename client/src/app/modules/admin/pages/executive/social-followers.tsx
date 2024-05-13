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
import FacebookIcon from '@/components/icons/facebook';
import TwitterIcon from '@/components/icons/twitter';
import InstagramIcon from '@/components/icons/instagram';
import LinkedinIcon from '@/components/icons/linkedin';
import { useMedia } from '@/hooks/use-media';
import SimpleBar from '@/components/ui/simplebar';

const platforms = [
  {
    id: 1,
    name: 'Facebook',
    followers: '235K',
    icon: FacebookIcon,
    color: '#1877F2',
  },
  {
    id: 2,
    name: 'Twitter',
    followers: '408k',
    icon: TwitterIcon,
    color: '#88AAFC',
  },
  {
    id: 3,
    name: 'Instagram',
    followers: '379K',
    icon: InstagramIcon,
    color: '#FCB03D',
  },
  {
    id: 4,
    name: 'Linkedin',
    followers: '379K',
    icon: LinkedinIcon,
    color: '#DEEAFC',
  },
];

const data = [
  {
    day: 'Sat',
    facebook: 5000,
    twitter: 1500,
    instagram: 1500,
    linkedin: 1500,
  },
  {
    day: 'Sun',
    facebook: 8500,
    twitter: 1600,
    instagram: 5798,
    linkedin: 2000,
  },
  {
    day: 'Mon',
    facebook: 7000,
    twitter: 8300,
    instagram: 3000,
    linkedin: 1375,
  },
  {
    day: 'Tue',
    facebook: 3908,
    twitter: 1780,
    instagram: 6798,
    linkedin: 5780,
  },
  {
    day: 'Wed',
    facebook: 4890,
    twitter: 2500,
    instagram: 1500,
    linkedin: 5000,
  },
  {
    day: 'Thu',
    facebook: 8000,
    twitter: 3200,
    instagram: 7800,
    linkedin: 4890,
  },
  {
    day: 'Fri',
    facebook: 8500,
    twitter: 2500,
    instagram: 2500,
    linkedin: 4890,
  },
];

export default function SocialFollowers({ className }: { className?: string }) {
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
      title="Social Followers"
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
