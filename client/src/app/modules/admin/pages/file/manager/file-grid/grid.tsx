'use client';

import {
  PiCopySimple,
  PiDotsThreeOutlineVerticalFill,
  PiShareFat,
  PiTrashSimple,
} from 'react-icons/pi';
import { ActionIcon, Button, Popover, Title } from 'rizzui';
import cn from '@/utils/class-names';
import Favorite from '../favorite';

export default function Grid({
  data,
  onDeleteItem,
}: {
  data: object[];
  onDeleteItem: (id: string) => void;
}) {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-5 @md:grid-cols-2 @2xl:grid-cols-3 @3xl:grid-cols-4 @7xl:grid-cols-5">
        {data?.map((item: any, index: number) => (
          <Card item={item} key={index} onDeleteItem={onDeleteItem} />
        ))}
      </div>
    </div>
  );
}

export function Card({
  item,
  onDeleteItem,
  className,
}: {
  item: any;
  onDeleteItem: (id: string) => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
          <figure className="h-7 w-7">{item.file.image}</figure>
        </div>
        <div className="flex">
          <Favorite />
          <Popover placement="bottom-end">
            <Popover.Trigger>
              <ActionIcon title={'More Options'} variant="text">
                <PiDotsThreeOutlineVerticalFill className="h-5 w-5 text-gray-500" />
              </ActionIcon>
            </Popover.Trigger>
            <Popover.Content className="z-0 min-w-[140px] px-0 py-2 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
              {({ setOpen }) => (
                <div className="px-2 text-gray-900">
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    <PiCopySimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
                    Copy
                  </Button>
                  <Button
                    variant="text"
                    onClick={() => setOpen(false)}
                    className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                  >
                    <PiShareFat className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
                    Share
                  </Button>
                  <Button
                    variant="text"
                    className="group flex w-full items-center justify-start px-2 py-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                    onClick={() => {
                      onDeleteItem(item.id);
                      setOpen(false);
                    }}
                  >
                    <PiTrashSimple className="mr-2 h-5 w-5 text-gray-500 duration-300 group-hover:text-primary" />
                    Delete
                  </Button>
                </div>
              )}
            </Popover.Content>
          </Popover>
        </div>
      </div>
      <Title
        as="h4"
        className="mb-1 truncate text-sm font-medium text-gray-800"
      >
        {item?.file?.name}
      </Title>
      <ul className="flex list-inside list-disc gap-3.5">
        <li className="list-none text-sm text-gray-500">{item?.size}</li>
        <li className="text-sm text-gray-500">{item?.totalFiles} files</li>
      </ul>
    </div>
  );
}
