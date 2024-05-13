import { cloneElement, forwardRef } from 'react';
import Popover from '@/components/ui/menu/popover/popover';
import { isElement } from '@/components/ui/menu/popover/popover-trigger';
import { useMenuContext } from '@/components/ui/menu/dropdown/menu-context';

export interface MenuTargetProps {
  as?: string;
  children: React.ReactNode;
  refProp?: string;
  className?: string;
}

export const MenuTrigger = forwardRef<HTMLElement, MenuTargetProps>(
  ({ as = 'li', children, refProp = 'ref', ...props }, ref) => {
    const ctx = useMenuContext();

    if (!isElement(children)) {
      throw new Error(
        'Menu.Trigger component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
      );
    }

    const onClick = (event?: Event) => {
      children.props.onClick?.(event);
      if (ctx.trigger === 'click') {
        ctx.toggleDropdown();
      } else if (ctx.trigger === 'click-hover') {
        ctx.setOpenedViaClick(true);
        if (!ctx.opened) {
          ctx.openDropdown();
        }
      }
    };

    const onMouseEnter = (event?: Event) => {
      children.props.onMouseEnter?.(event);
      if (ctx.trigger === 'hover' || ctx.trigger === 'click-hover') {
        ctx.openDropdown();
      }
    };

    const onMouseLeave = (event?: Event) => {
      children.props.onMouseLeave?.(event);
      if (ctx.trigger === 'hover') {
        ctx.closeDropdown();
      } else if (ctx.trigger === 'click-hover' && !ctx.openedViaClick) {
        ctx.closeDropdown();
      }
    };

    return (
      <Popover.Trigger popupType="menu" refProp={refProp} ref={ref} {...props}>
        {cloneElement(children, {
          onClick,
          onMouseEnter,
          onMouseLeave,
          'data-expanded': ctx.opened ? true : undefined,
        })}
      </Popover.Trigger>
    );
  }
);

MenuTrigger.displayName = 'MenuTrigger';
