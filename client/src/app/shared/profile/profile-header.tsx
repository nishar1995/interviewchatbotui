'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button, Title, Text } from 'rizzui';
import cn from '@/utils/class-names';
import { PiChatCircleText, PiUsers } from 'react-icons/pi';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
import Cookies from 'js-cookie';
export default function ProfileHeader() {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();
  const [follow, setFollow] = useState(false);
  const cookieValue: any = Cookies.get('user_details');
  const user: any = cookieValue ? JSON.parse(cookieValue) : {};
  console.log("user.....",user)
  return (
    <div
      className={cn(
        layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0',
        layout === LAYOUT_OPTIONS.BORON && '-mt-[15px] 2xl:-mt-8'
      )}
    >
      <div
        className={cn(
          '-mx-6 h-[150px] bg-gradient-to-r from-[#F8E1AF] to-[#F6CFCF] @5xl:h-[200px] 3xl:-mx-8  3xl:h-[250px] 4xl:-mx-10 4xl:h-[300px]',
          layout === LAYOUT_OPTIONS.BERYLLIUM &&
            (expandedLeft
              ? 'xl:-me-8 3xl:-ms-5 4xl:-ms-4'
              : 'xl:-me-8 4xl:-ms-6')
        )}
      />

      <div className="mx-auto w-full max-w-[1294px] @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
        <div className="flex h-auto gap-4 @5xl:gap-6">
          <div>
            <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-4 border-white bg-white shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] md:border-[6px] 3xl:w-[200px]">
              <Image
                src={
                  'https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp'
                }
                alt="profile-pic"
                fill
                priority
                sizes="(max-width: 768px) 100vw"
                className="aspect-auto"
              />
            </div>
          </div>
          <div className="pt-2.5">
            <Title
              as="h1"
              className="text-lg font-bold capitalize leading-normal text-gray-900 @3xl:!text-xl 3xl:text-2xl"
            >
              {/* {user.name || 'johan smith'} */}
            </Title>
            <Text className="text-xs text-gray-500 @3xl:text-sm 3xl:text-base">
            {user.username}
            </Text>
            {/* <ul className="mt-3 flex flex-wrap items-center gap-2 text-sm @3xl:mt-4 @3xl:gap-5 @3xl:text-base 3xl:text-lg">
              <li className="flex items-center">
                <span className="font-semibold text-gray-900">2.53k</span>
                <span className="ms-1.5 text-sm text-gray-500">Followers</span>
              </li>
              <li className="flex items-center">
                <span className="font-semibold text-gray-900">438</span>
                <span className="ms-1.5 text-sm text-gray-500">Following</span>
              </li>
            </ul> */}
          </div>
        </div>
        {/* <div className="grid grid-cols-2 pt-3 @3xl:pt-4">
          <Button variant="outline" className="font-500 text-gray-900">
            <PiChatCircleText className="h-auto w-[18px]" />
            <span className="ms-1.5 inline-block">Message</span>
          </Button>
          <Button
            color="primary"
            className="font-500 ms-3.5 text-white"
            onClick={() => setFollow(!follow)}
          >
            <PiUsers className="h-auto w-[18px]" />
            {follow ? (
              <span className="ms-1.5 inline-block">Following</span>
            ) : (
              <span className="ms-1.5 inline-block">Follow</span>
            )}
          </Button>
        </div> */}
      </div>
    </div>
  );
}
