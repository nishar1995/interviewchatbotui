import { createContextHook } from '@/components/ui/menu/popover/create-custom-context';

interface MenuContext {
  toggleDropdown: () => void;
  closeDropdown: () => void;
  closeDropdownImmediately: () => void;
  openDropdown: () => void;
  getItemIndex: (node: HTMLButtonElement) => number | null;
  setHovered: (index: number | null) => void;
  hovered: number | null;
  closeItemOnClick: boolean | undefined;
  trigger: 'click' | 'hover' | 'click-hover' | undefined;
  opened: boolean;
  menuItemTabIndex: -1 | 0 | undefined;
  openedViaClick: boolean;
  setOpenedViaClick: (value: boolean) => void;
  loop?: boolean | undefined;
}

export const [MenuContextProvider, useMenuContext] =
  createContextHook<MenuContext>('Menu component was not found in the tree');
