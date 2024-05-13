'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import WorldMap, { type CountryContext } from 'react-svg-worldmap';
import { useElementSize } from '@/hooks/use-element-size';
import { Badge, Text, Loader } from 'rizzui';
import cn from '@/utils/class-names';
import { useMedia } from '@/hooks/use-media';

const data = [
  { country: 'cn', name: 'China', value: 5, style: 'bg-[#ffe5e5]' },
  { country: 'us', name: 'United States', value: 10, style: 'bg-[#0A3161]' },
  { country: 'ru', name: 'Russia', value: 7, style: 'bg-[#ff0000]' },
];

function createTextLabels(width: number) {
  const labels: ({ label: string } & ComponentProps<'text'>)[] = [
    { label: 'Atlantic', x: 0.37 * width, y: 0.39 * width },
    { label: 'Indian', x: 0.69 * width, y: 0.57 * width },
    { label: 'Pacific', x: 0.083 * width, y: 0.48 * width },
    {
      label: 'Arctic',
      x: 0.75 * width,
      y: 0.058 * width,
    },
  ];
  if (width < 550) {
    return labels.map((label) => ({
      ...label,
      style: { ...label.style, fontSize: '70%' },
    }));
  }
  return labels;
}

const getSCustomStyle = ({
  countryValue,
  countryCode,
  minValue,
  maxValue,
  color,
}: CountryContext) => ({
  fill: countryCode === 'US' ? '#0A3161' : color,
  fillOpacity: countryValue
    ? 0.1 + (1.5 * (countryValue - minValue)) / (maxValue - minValue)
    : 0,
  stroke: 'green',
  strokeWidth: 1,
  strokeOpacity: 0.2,
  cursor: 'pointer',
});

export default function ActiveUsers({ className }: { className?: string }) {
  const [ref, { width }] = useElementSize();
  const [isLoading, setLoading] = useState(true);
  const is4k = useMedia('(min-width: 2000px)', false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <WidgetCard
      title="Active Users"
      className={cn(
        'relative grid grid-cols-1 place-content-between gap-3',
        className
      )}
      titleClassName="font-semibold"
    >
      <div
        ref={ref}
        className="col-span-full flex flex-col [&>figure]:flex [&>figure]:items-center [&>figure]:justify-center [&_figure]:!bg-transparent [&_svg]:dark:invert"
      >
        {isLoading ? (
          <div className="m-auto">
            <Loader variant="spinner" size="lg" />
          </div>
        ) : (
          <WorldMap
            color="red"
            valueSuffix="%"
            size={is4k ? 'xl' : width}
            data={data}
            textLabelFunction={createTextLabels}
            styleFunction={getSCustomStyle}
          />
        )}
      </div>

      <div className="col-span-full -mx-5 border-t border-dashed border-muted px-5 pt-5 lg:-mx-7 lg:px-7">
        <div className="mx-auto flex w-full max-w-md flex-wrap justify-center gap-x-3 gap-y-1.5 text-center">
          {data.map((country) => (
            <div key={country.name} className="flex items-center gap-1">
              <Badge renderAsDot className={cn(country.style, 'dark:invert')} />
              <Text className="text-gray-500 dark:text-gray-600">
                {country.name}
                <Text
                  as="span"
                  className="ms-1 font-lexend font-medium text-gray-700"
                >
                  {`${country.value}%`}
                </Text>
              </Text>
            </div>
          ))}
        </div>
      </div>
    </WidgetCard>
  );
}
