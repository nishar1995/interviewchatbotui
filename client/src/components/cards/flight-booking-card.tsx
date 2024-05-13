'use client';

import Image from 'next/image';
import { Button, Text, Title, Badge, Collapse } from 'rizzui';
import cn from '@/utils/class-names';
import { PiCaretDownBold } from 'react-icons/pi';
import LuggageTwoIcon from '@/components/icons/luggage-two';
import PlaneIcon from '@/components/icons/plane';
import { FlightingCardProps } from '@/types';

export default function FlightBookingCard({
  data,
}: {
  data: FlightingCardProps;
}) {
  return (
    <>
      <div key={data.id} className="rounded-lg border border-muted">
        <AccordionContent flight={data} />

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-muted p-5 md:flex-nowrap">
          <div className="text-gray-500">
            <Text
              as="span"
              className="text-lg font-semibold text-gray-700 md:text-2xl"
            >
              {data.price}
            </Text>{' '}
            <Text as="span">/ person</Text>
          </div>
          <div className="grid w-full grid-cols-2 items-center gap-4 sm:flex sm:w-auto ">
            <Button
              size="sm"
              as="span"
              variant="text"
              className="rounded-none border-b border-primary px-0 text-xs font-medium text-primary"
            >
              View Details
            </Button>
            <Button size="sm" className="rounded-md text-xs font-medium">
              Select Flight
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

type ContentProps = {
  flight: FlightingCardProps;
};

const badgeStyle = {
  Business: {
    color: 'success',
    className: 'dark:bg-[#05361e] dark:text-green-light',
  },
  Economy: {
    color: 'secondary',
    className: 'dark:bg-[#33095e] dark:text-secondary-light',
  },
  'First Class': {
    color: 'secondary',
    className: 'dark:bg-[#07274e] dark:text-blue-light',
  },
};

function AccordionContent({ flight }: ContentProps) {
  return (
    <Collapse
      header={({ open, toggle }) => (
        <div
          onClick={toggle}
          className="flex cursor-pointer items-center justify-between gap-4 p-3 md:p-5"
        >
          <div className="flex gap-2 sm:items-center md:gap-4">
            <div className="relative aspect-square w-20">
              <Image
                src={flight.image}
                alt={flight.title}
                fill
                priority
                placeholder="blur"
                sizes="(max-width: 768px) 100vw"
                blurDataURL={`/_next/image?url=${flight.image}&w=10&q=1`}
                className="h-full w-full object-contain"
              />
            </div>
            <div className="sm:flex sm:flex-col">
              <Button
                size="sm"
                as="span"
                variant="flat"
                className="mb-2 h-6 rounded-md bg-secondary-lighter text-xs font-semibold text-secondary-dark sm:hidden dark:bg-secondary-dark dark:text-secondary-lighter"
              >
                {flight.class}
              </Button>
              <Title as="h5" className="font-semibold text-gray-900">
                {flight.title}
              </Title>
              <ul className="flex items-center divide-x">
                {flight.meta &&
                  Object.entries(flight.meta).map(([key, value]) => {
                    return (
                      <li
                        key={key}
                        className="hidden px-1.5 first:block first:ps-0 md:block"
                      >
                        {value}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge
              rounded="md"
              variant="flat"
              // FIXME: Need to fixed this type error
              // @ts-ignore
              color={badgeStyle[flight.class].color}
              className={cn(
                'hidden px-3.5 py-1 sm:block',
                // @ts-ignore
                badgeStyle[flight.class].className
              )}
            >
              {flight.class}
            </Badge>
            <div
              className={cn(
                'flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-gray-500',
                open && 'bg-gray-900 text-gray-0'
              )}
            >
              <PiCaretDownBold
                strokeWidth={3}
                className={cn(
                  'h-3 w-3 rotate-180 transition-transform duration-200 rtl:-rotate-180',
                  open && 'rotate-0 rtl:rotate-0'
                )}
              />
            </div>
          </div>
        </div>
      )}
    >
      {/* Body */}
      <div className="flex items-center justify-between gap-4 bg-gray-50 px-5 py-3 text-gray-500 dark:bg-gray-100">
        <span>Include free baggage and cabin in capacity</span>
        <ul className="flex shrink-0 grow-0 basis-auto items-center gap-4">
          {flight.bucket &&
            Object.entries(flight.bucket).map(([key, value]) => {
              return (
                <li key={key} className="flex items-center gap-1">
                  <LuggageTwoIcon className="h-4 w-4 text-gray-900" />
                  <span>{value}</span>
                </li>
              );
            })}
        </ul>
      </div>

      <div className="grid items-center gap-4 @container sm:grid-cols-2 lg:gap-6 xl:grid-cols-12">
        <div className="p-3 @xl:p-4 @2xl:p-5 xl:col-span-7">
          <div className="grid grid-cols-8">
            <div className="hidden flex-col gap-0.5 lg:col-span-2 lg:flex">
              <Text as="span" className="text-sm font-semibold text-gray-900">
                {flight.routes?.departureTime as string}
              </Text>
              <Text as="span">{flight.routes?.departureDate as string}</Text>
            </div>
            <div className="relative col-span-1 mt-1.5">
              <span className="relative mb-1.5 block h-3 w-3 rounded-full bg-gray-900 before:absolute before:-left-1.5 before:-top-1.5 before:-z-10 before:h-6 before:w-6 before:rounded-full before:bg-white dark:bg-gray-900 dark:before:bg-gray-50"></span>
              <span className="absolute left-[5px] top-[18px] block h-full w-[2px] bg-gray-200"></span>
            </div>
            <div className="col-span-7 flex flex-col pb-9 lg:col-span-5">
              <Text
                as="span"
                className="block text-xs font-semibold text-gray-900 lg:hidden lg:text-sm"
              >
                {flight.routes?.departureTime as string}
              </Text>
              <Text as="span" className="font-semibold text-gray-900">
                {flight.routes?.departureCity}
              </Text>
              <Text as="span" className="text-sm text-gray-500">
                {flight.routes?.departureTerminal}
              </Text>
            </div>
          </div>

          {flight.routes?.layover?.map((layover, index) => (
            <div key={index} className="grid grid-cols-8">
              <div className="hidden flex-col gap-0.5 lg:col-span-2 lg:flex"></div>
              <div className="relative col-span-1 mt-1.5">
                <Text
                  as="span"
                  className="relative z-10 mb-1.5 block h-3 w-3 rounded-full before:absolute before:-left-1.5 before:-top-1.5 before:-z-10 before:h-6 before:w-6 before:rounded-full before:bg-white dark:bg-gray-900 dark:before:bg-gray-50"
                >
                  <PlaneIcon className="h-3 w-3" />
                </Text>
                <Text
                  as="span"
                  className="absolute left-[5px] top-[18px] block h-full w-[2px] bg-gray-200"
                ></Text>
              </div>
              <div className="col-span-7 flex flex-col pb-9 lg:col-span-5">
                <Text as="span" className="font-semibold text-gray-900">
                  {layover?.layoverTime}
                </Text>
                <Text as="span" className="text-sm text-gray-500">
                  {layover?.layoverTerminal}
                </Text>
              </div>
            </div>
          ))}

          <div className="grid grid-cols-8">
            <div className="hidden flex-col gap-0.5 lg:col-span-2 lg:flex">
              <Text as="span" className=" font-semibold text-gray-900">
                {flight.routes?.arrivalTime as string}
              </Text>
              <Text as="span">{flight.routes?.departureDate as string}</Text>
            </div>

            <div className="relative z-10 col-span-1 mt-1.5">
              <Text
                as="span"
                className="relative -bottom-[38px] block h-3 w-3 rounded-full bg-gray-900 before:absolute before:-left-1.5 before:-top-1.5 before:-z-10 before:h-6 before:w-6 before:rounded-full before:bg-gray-0 lg:-bottom-[22px] dark:bg-gray-900 dark:before:bg-gray-50"
              ></Text>
              <Text
                as="span"
                className="absolute -top-[2px] left-[5px] -z-20 block h-full w-[2px] bg-gray-200"
              ></Text>
            </div>

            <div className="col-span-7 flex flex-col lg:col-span-5">
              <Text
                as="span"
                className="block text-xs font-semibold text-gray-900 lg:hidden lg:text-sm"
              >
                {flight.routes?.arrivalTime as string}
              </Text>
              <Text as="span" className=" font-semibold text-gray-900">
                {flight.routes?.arrivalCity as string}
              </Text>
              <Text as="span" className="text-sm text-gray-500">
                {flight.routes?.arrivalTerminal as string}
              </Text>
            </div>
          </div>
        </div>

        <div className="relative hidden h-[228px] @2xl:block xl:col-span-5">
          <Image
            src="/map.webp"
            alt="Qatar Logo"
            fill
            priority
            quality={100}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw"
            blurDataURL={`/_next/image?url="/map.webp"&w=10&q=1`}
            className="dark:opacity-[0.2]"
          />
        </div>
      </div>
    </Collapse>
  );
}
