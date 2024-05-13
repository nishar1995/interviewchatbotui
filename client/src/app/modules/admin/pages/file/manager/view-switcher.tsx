'use client';

import { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import { PiGridFour, PiListBullets } from 'react-icons/pi';

export default function ViewSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const layout = searchParams.get('layout');
  const isGridLayout = layout?.toLowerCase() === 'grid';
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleLayoutToggle = (view: string) => {
    router.push(`${pathname}?${createQueryString('layout', view)}`);
  };

  return (
    <div className="flex items-center gap-2 rounded-lg border border-muted p-1.5 px-1.5">
      <ActionIcon
        size="sm"
        variant="flat"
        className={cn(
          'group bg-transparent hover:enabled:bg-gray-100 dark:hover:enabled:bg-gray-200',
          !isGridLayout && 'bg-primary'
        )}
        onClick={() => handleLayoutToggle('list')}
      >
        <PiListBullets
          className={cn(
            'h-5 w-5 transition-colors group-hover:text-primary',
            !isGridLayout && 'text-primary-foreground'
          )}
        />
      </ActionIcon>
      <ActionIcon
        size="sm"
        variant="flat"
        className={cn(
          'group bg-transparent hover:enabled:bg-gray-100  dark:hover:enabled:bg-gray-200',
          isGridLayout && 'bg-primary'
        )}
        onClick={() => handleLayoutToggle('grid')}
      >
        <PiGridFour
          className={cn(
            'h-5 w-5 transition-colors group-hover:text-primary',
            isGridLayout && 'text-primary-foreground'
          )}
        />
      </ActionIcon>
    </div>
  );
}
