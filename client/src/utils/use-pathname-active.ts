'use client';
import { usePathname } from 'next/navigation';

import type {
  DropdownItemType,
  SubMenuItemType,
} from '@/layouts/lithium/lithium-menu-items';

export function useActivePathname() {
  const pathname = usePathname();

  /**
   * Checks if a given pathname is active.
   * @param {string | DropdownItemType[]} belongsTo - The value to compare the pathname against of an href array
   * @return {boolean} Returns true if the pathname is active, false otherwise.
   */
  function isActive(belongsTo: string | DropdownItemType[]): boolean {
    let isActive: boolean = false;
    if (typeof belongsTo === 'string') {
      isActive = pathname === belongsTo;
    } else {
      isActive = belongsTo?.some(
        (item) =>
          item?.href === pathname ||
          item?.subMenuItems?.some(
            (subItem: SubMenuItemType) => subItem.href === pathname
          )
      );
    }
    return isActive;
  }

  return {
    isActive,
  };
}
