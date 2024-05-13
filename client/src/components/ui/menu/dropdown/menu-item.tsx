import { forwardRef, useRef } from 'react';
import { useMenuContext } from '@/components/ui/menu/dropdown/menu-context';
import { useMergedRef } from '@/components/ui/menu/popover/use-merged-ref';
import cn from '@/utils/class-names';
import { keydownHandler } from '@/components/ui/menu/dropdown/keyboard-handler';

export interface MenuItemProps {
  as?: React.ElementType;
  children?: React.ReactNode;
  closeMenuOnClick?: boolean;
  disabled?: boolean;
  className?: string;
  loop?: boolean | undefined;
  compound?: boolean | undefined;
}

export const MenuItem = forwardRef<
  HTMLElement,
  MenuItemProps & React.HTMLProps<HTMLButtonElement>
>(
  (
    {
      children,
      className,
      closeMenuOnClick = true,
      disabled,
      as = 'li',
      loop,
      compound = true,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const ctx = useMenuContext();
    const itemRef = useRef<HTMLButtonElement>();
    const itemIndex = ctx.getItemIndex(itemRef.current!);
    const isProps: any = props;

    const handleMouseEnter = (event: any) => {
      isProps.onMouseEnter?.(event);
      ctx.setHovered(ctx.getItemIndex(itemRef.current!));
    };

    const handleMouseLeave = (event: any) => {
      isProps.onMouseLeave?.(event);
      ctx.setHovered(-1);
    };

    const handleClick = (event?: Event) => {
      isProps.onClick?.(event);
      if (typeof closeMenuOnClick === 'boolean') {
        closeMenuOnClick && ctx.closeDropdownImmediately();
      } else {
        ctx.closeItemOnClick && ctx.closeDropdownImmediately();
      }
    };

    const handleFocus = (event?: Event) => {
      isProps.onFocus?.(event);
      ctx.setHovered(ctx.getItemIndex(itemRef.current!));
    };

    return (
      <Component
        {...props}
        tabIndex={ctx.menuItemTabIndex}
        onFocus={handleFocus}
        ref={useMergedRef(itemRef, ref)}
        role="menuitem"
        disabled={disabled}
        data-menu-item
        data-disabled={disabled || undefined}
        data-hover={ctx.hovered === itemIndex ? true : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onMouseDown={(e: any) => e.stopPropagation()}
        className={cn(
          'flex w-full items-center rounded-[4px] px-3 py-1.5 focus-visible:bg-gray-100 focus-visible:outline-0 data-[hover=true]:bg-gray-100',
          className,
          disabled && 'pointer-events-none text-gray-400'
        )}
        onKeyDown={keydownHandler({
          siblingSelector: '[data-menu-item]',
          parentSelector: '[data-menu-dropdown]',
          activateOnFocus: false,
          loop: ctx.loop,
          orientation: 'vertical',
          onKeyDown: isProps.onKeydown,
        })}
      >
        {children && children}
      </Component>
    );
  }
);

MenuItem.displayName = 'MenuItem';
