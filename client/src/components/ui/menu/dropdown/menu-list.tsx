import { forwardRef, useRef } from 'react';
import { useMenuContext } from '@/components/ui/menu/dropdown/menu-context';
import Popover from '@/components/ui/menu/popover/popover';
import { useMergedRef } from '@/components/ui/menu/popover/use-merged-ref';
import cn from '@/utils/class-names';

export type MenuListProps = {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLButtonElement>;
  shadow?: 'sm' | 'md' | 'lg' | 'xl' | 'none';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'sm' | 'md' | 'lg' | 'pill' | 'none';
};

export const MenuList = forwardRef<
  HTMLElement,
  MenuListProps & React.HTMLProps<HTMLDivElement>
>(
  (
    {
      as = 'ul',
      children,
      className,
      shadow,
      size,
      rounded,
      onMouseEnter,
      onMouseLeave,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const { trigger, openDropdown, closeDropdown } = useMenuContext();
    const wrapperRef = useRef<HTMLElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        wrapperRef.current
          ?.querySelectorAll<HTMLButtonElement>(
            '[data-menu-item]:not(:disabled)'
          )[0]
          ?.focus();
      }
    };

    const handleMouseEnter = (event?: any) => {
      onMouseEnter?.(event);
      if (trigger === 'hover' || trigger === 'click-hover') {
        openDropdown();
      }
    };

    const handleMouseLeave = (event?: any) => {
      onMouseLeave?.(event);
      if (trigger === 'hover' || trigger === 'click-hover') {
        closeDropdown();
      }
    };

    return (
      <Popover.Content
        as={Component}
        {...props}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role="menuList"
        ref={useMergedRef(ref, wrapperRef)}
        tabIndex={-1}
        data-menu-dropdown
        className={cn('w-48', className)}
        // @ts-ignore
        onKeyDown={handleKeyDown}
        shadow={shadow}
        size={size}
        rounded={rounded}
      >
        {children}
      </Popover.Content>
    );
  }
);

MenuList.displayName = 'MenuList';
