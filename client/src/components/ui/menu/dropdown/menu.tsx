import React, { useState } from 'react';
import { useUncontrolled } from '@/components/ui/menu/dropdown/use-uncontrolled';
import { useDelayedHover } from '@/components/ui/menu/dropdown/use-delay-hover';
import { MenuContextProvider } from '@/components/ui/menu/dropdown/menu-context';
import Popover from '@/components/ui/menu/popover/popover';
import { MenuTrigger } from '@/components/ui/menu/dropdown/menu-trigger';
import { MenuList } from '@/components/ui/menu/dropdown/menu-list';
import { MenuItem } from '@/components/ui/menu/dropdown/menu-item';
import { FloatingPosition } from '@/components/ui/menu/popover/types';
import cn from '@/utils/class-names';
import { useHovered } from '@/components/ui/menu/dropdown/use-hover';
import { useUpdate } from '@/components/ui/menu/popover/use-update';

interface MenuProps {
  className?: string;
  placement?: FloatingPosition;
  children?: React.ReactNode;
  defaultOpened?: boolean;
  opened?: boolean;
  trapFocus?: boolean;
  withinPortal?: boolean;
  onChange?: (opened: boolean) => void;
  onOpen?: () => void;
  onClose?: () => void;
  closeItemOnClick?: boolean;
  trigger?: 'click' | 'hover' | 'click-hover';
  openDelay?: number;
  closeDelay?: number;
  loop?: boolean;
  closeOnEscape?: boolean;
  closeOnClickOutside?: boolean;
  clickOutsideEvents?: string[];
  id?: string;
  menuItemTabIndex?: -1 | 0;
  offset?: number;
}

export default function Menu({
  placement,
  offset,
  children,
  defaultOpened,
  opened,
  onChange,
  onOpen,
  onClose,
  closeItemOnClick = true,
  closeOnEscape,
  trapFocus,
  withinPortal,
  trigger = 'click',
  openDelay = 0,
  closeDelay = 100,
  closeOnClickOutside,
  clickOutsideEvents = ['mousedown', 'touchstart', 'keydown'],
  loop = true,
  id,
  menuItemTabIndex = -1,
  className,
  ...props
}: MenuProps) {
  const [openedViaClick, setOpenedViaClick] = useState(false);
  const [hovered, { setHovered, resetHovered }] = useHovered();

  const [isOpened, setIsOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange,
  });

  function close() {
    setIsOpened(false);
    setOpenedViaClick(false);
    isOpened && onClose?.();
  }

  const open = () => {
    setIsOpened(true);
    !isOpened && onOpen?.();
  };

  const toggleDropdown = () => {
    isOpened ? close() : open();
  };

  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    closeDelay,
    openDelay,
  });

  function findElement(element: HTMLElement, selector: string) {
    let isElement: HTMLElement | null = element;
    while (
      (isElement = isElement.parentElement) &&
      !isElement.matches(selector)
    );
    return isElement;
  }

  function getItemIndex(node: HTMLButtonElement) {
    if (!node) {
      return null;
    }

    return Array.from(
      findElement(node, '[data-menu-dropdown]')?.querySelectorAll(
        '[data-menu-item]'
      ) || []
    ).findIndex((element) => element === node);
  }

  useUpdate(() => {
    resetHovered();
  }, [isOpened]);

  return (
    <MenuContextProvider
      value={{
        opened: isOpened,
        toggleDropdown,
        getItemIndex,
        hovered,
        setHovered,
        openedViaClick,
        setOpenedViaClick,
        closeItemOnClick,
        closeDropdown: trigger === 'click' ? close : closeDropdown,
        openDropdown: trigger === 'click' ? open : openDropdown,
        closeDropdownImmediately: close,
        loop,
        trigger,
        menuItemTabIndex,
      }}
    >
      <Popover
        classNames={cn(className)}
        position={placement}
        opened={isOpened}
        onChange={toggleDropdown}
        defaultOpened={defaultOpened}
        closeOnEscape={closeOnEscape}
        trapFocus={trapFocus}
        offset={offset}
        {...props}
      >
        {children}
      </Popover>
    </MenuContextProvider>
  );
}

Menu.displayName = 'Menu';
Menu.Trigger = MenuTrigger;
Menu.List = MenuList;
Menu.Item = MenuItem;
