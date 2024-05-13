import React from 'react';
import { OptionalPortal } from '@/components/Portal';
import cn from '@/utils/class-names';
import { useFocusReturn } from '@/components/ui/menu/popover/use-focus-return';
import { usePopoverContext } from '@/components/ui/menu/popover/popover-context';
import { useMergedRef } from '@/components/ui/menu/popover/use-merged-ref';

interface Options {
  active: boolean | undefined;
  onTrigger?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<any>) => void;
}

const noop = () => {};

export function closeOnEscape(
  callback?: (event: any) => void,
  options: Options = { active: true }
) {
  if (typeof callback !== 'function' || !options.active) {
    return options.onKeyDown || noop;
  }

  return (event: React.KeyboardEvent<any>) => {
    if (event.key === 'Escape') {
      callback(event);
      options.onTrigger?.();
    }
  };
}

const popoverStyle = {
  base: 'absolute z-[9999] min-w-max bg-gray-0 dark:backdrop-blur-3xl border border-gray-300',
  shadow: {
    sm: 'drop-shadow-md',
    md: 'drop-shadow-lg',
    lg: 'drop-shadow-xl',
    xl: 'drop-shadow-2xl',
    none: 'drop-shadow-none',
  },
  size: {
    sm: 'p-2.5',
    md: 'p-4',
    lg: 'p-5',
    xl: 'p-6',
  },
  rounded: {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    pill: 'rounded-full',
  },
};

export type Shadow = keyof typeof popoverStyle.shadow;
export type Size = keyof typeof popoverStyle.size;
export type Rounded = keyof typeof popoverStyle.rounded;

export interface PopoverTargetProps {
  children: React.ReactNode;
  className?: string;
  variant?: string;
  as?: React.ElementType;
  onKeyDown?: React.KeyboardEventHandler<HTMLDivElement> | undefined;
  shadow?: Shadow;
  size?: Size;
  rounded?: Rounded;
}

export const PopoverContent = React.forwardRef<
  HTMLElement,
  PopoverTargetProps & React.HTMLProps<HTMLButtonElement>
>(
  (
    {
      as = 'div',
      className,
      children,
      variant,
      shadow = 'md',
      size = 'sm',
      rounded = 'md',
      onKeyDown,
      ...props
    },
    ref
  ) => {
    const Component = as;
    const ctx = usePopoverContext();

    const returnFocus = useFocusReturn({
      opened: ctx.opened,
      shouldReturnFocus: ctx.returnFocus,
    });

    const accessibleProps = ctx.withRoles
      ? {
          'aria-labelledby': ctx.getTargetId(),
          id: ctx.getDropdownId(),
          role: 'dialog',
        }
      : {};

    const mergedRef = useMergedRef(ref, ctx.floating);

    if (ctx.disabled) {
      return null;
    }

    return (
      <OptionalPortal {...ctx.portalProps} withinPortal={ctx.withinPortal}>
        {ctx.opened && (
          <Component
            {...accessibleProps}
            {...props}
            variant={variant}
            ref={mergedRef}
            onKeyDownCapture={closeOnEscape(ctx.onClose, {
              active: ctx.closeOnEscape,
              onTrigger: returnFocus,
              onKeyDown: onKeyDown,
            })}
            data-position={ctx.placement}
            style={{
              top: ctx.y ?? 0,
              left: ctx.x ?? 0,
              width: ctx.width === 'target' ? undefined : ctx.width,
            }}
            className={cn(
              className,
              popoverStyle.base,
              popoverStyle.shadow[shadow],
              // @ts-ignore
              popoverStyle.size[size],
              popoverStyle.rounded[rounded]
            )}
          >
            {children}
          </Component>
        )}
      </OptionalPortal>
    );
  }
);

PopoverContent.displayName = 'PopoverContent';
