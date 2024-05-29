'use client';

import WidgetCard from '@/components/cards/widget-card';
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from 'recharts';
import { toCurrency } from '@/utils/to-currency';
import { Avatar, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import TrendingUpIcon from '@/components/icons/trending-up';

const bgData = [{ name: 'Total used storage', value: 78 }];
const data = [
  // { name: 'Available storage', value: 22 },
  { name: 'Budget', value: 78 },
];
const COLORS = ['#0070F3'];

const projects = [
  {
    id: 1,
    name: 'Mark Redesign task',
    budget: 1085,
    color: '#FCB03D',
  },
  {
    id: 2,
    name: 'Tenco Revamp',
    budget: 5251,
    color: '#11A849',
  },
  {
    id: 3,
    name: 'Alice Matro',
    budget: 4850,
    color: '#FF1A1A',
  },
  {
    id: 4,
    name: 'Polly Mgt Ltd.',
    budget: 1085,
    color: '#8A63D2',
  },
];

function CustomLabel(props: any) {
  const { cx, cy } = props.viewBox;
  return (
    <>
      <text
        x={cx}
        y={cy - 20}
        fill="#666666"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan fontSize="16px">Budget</tspan>
      </text>
      <text
        x={cx}
        y={cy + 20}
        fill="#111111"
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
      >
        <tspan alignmentBaseline="middle" fontSize="36px" fontWeight={700}>
          {props.value1}%
        </tspan>
      </text>
    </>
  );
}

export default function BiggestDeal({ className }: { className?: string }) {
  return (
    <WidgetCard
      title="Biggest deal this month"
      titleClassName="font-normal sm:text-sm text-gray-500 mb-2.5 font-inter"
      className={className}
      description={
        <div className="flex items-center justify-start">
          <Title as="h2" className="me-2">
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
      <div className="relative -mt-5 h-[319px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
            <Pie
              data={bgData}
              cornerRadius={40}
              innerRadius={80}
              outerRadius={100}
              // paddingAngle={10}
              fill="#BFDBFE"
              stroke="rgba(0,0,0,0)"
              dataKey="value"
              startAngle={-70}
              endAngle={250}
            />
          </PieChart>
        </ResponsiveContainer>
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="absolute inset-0"
        >
          <PieChart className="[&_.recharts-layer:focus]:outline-none [&_.recharts-sector:focus]:outline-none dark:[&_.recharts-text.recharts-label]:first-of-type:fill-white">
            <Pie
              data={data}
              cornerRadius={40}
              innerRadius={80}
              outerRadius={100}
              fill="#BFDBFE"
              stroke="rgba(0,0,0,0)"
              dataKey="value"
              startAngle={-20}
              endAngle={250}
            >
              <Label
                width={30}
                position="center"
                content={
                  <CustomLabel value1={data[0].value} value2={'Used of 100'} />
                }
              />
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="  ">
        <div className="mb-4 flex items-center justify-between border-b border-muted pb-4 last:mb-0 last:border-0 last:pb-0">
          <Text as="span" className="text-sm text-gray-600 dark:text-gray-700">
            Project Name
          </Text>
          <Text as="span">Budget</Text>
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
