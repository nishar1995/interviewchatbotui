import { useDirection } from '@/hooks/use-direction';
import React, { useCallback, useId, useState } from 'react';
import {
  PopoverWidth,
  usePopover,
} from '@/components/ui/menu/popover/use-popover';
import {
  FloatingPlacement,
  FloatingPosition,
  FloatingSide,
} from '@/components/ui/menu/popover/types';
import { useClickOutside } from '@/components/ui/menu/popover/use-click-outside';
import { PopoverContextProvider } from '@/components/ui/menu/popover/popover-context';
import { PopoverTrigger } from '@/components/ui/menu/popover/popover-trigger';
import { PopoverContent } from '@/components/ui/menu/popover/popover-content';

export interface PortalProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  target?: HTMLElement | string;
}

export interface PopoverMiddlewares {
  shift: boolean;
  flip: boolean;
  inline?: boolean;
  size?: boolean;
}

interface PopoverProps {
  classNames?: string;
  variant?: string;
  as?: string;
  position?: FloatingPosition;
  offset?: number;
  onPositionChange?: (position: FloatingPosition) => void;
  positionDependencies?: any[];
  onClose?: () => void;
  onOpen?: () => void;
  middlewares?: PopoverMiddlewares;
  withinPortal?: boolean;
  portalProps?: Omit<PortalProps, 'children'>;
  disabled?: boolean;
  keepMounted?: boolean;
  className?: string;
  defaultOpened?: boolean;
  opened?: boolean;
  children?: React.ReactNode;
  onChange?: (opened: boolean) => void;
  closeOnClickOutside?: boolean;
  trapFocus?: boolean;
  id?: string;
  withRoles?: boolean;
  clickOutsideEvents?: string[];
  width?: PopoverWidth;
  returnFocus?: boolean;
  closeOnEscape?: boolean;
}

/**
 * Popover component to display content in a floating box.
 * @param {PopoverProps} props - Popover component props.
 */
export default function Popover({
  classNames,
  variant,
  as = 'div',
  position = 'bottom-start',
  offset = 8,
  positionDependencies = [],
  middlewares = {
    flip: true,
    shift: true,
    inline: false,
  },
  closeOnClickOutside = true,
  withinPortal = true,
  trapFocus = false,
  withRoles = true,
  clickOutsideEvents = ['mousedown', 'touchstart'],
  onPositionChange,
  onClose,
  onOpen,
  portalProps,
  disabled,
  className,
  defaultOpened,
  keepMounted,
  opened,
  children,
  width,
  closeOnEscape = true,
  returnFocus,
  onChange,
  id,
  ...props
}: PopoverProps) {
  const [referenceNode, setReferenceNode] = useState<HTMLElement | null>(null);
  const [floatingNode, setFloatingNode] = useState<HTMLElement | null>(null);
  const { direction } = useDirection();
  const uid = useId();

  /**
   * Get the floating position based on the text direction.
   * @param {string} dir - Text direction ('rtl' or 'ltr').
   * @param {FloatingPosition} position - Original floating position.
   * @returns {FloatingPosition} - Adjusted floating position.
   */
  function getFloatingPosition(
    dir: 'rtl' | 'ltr',
    position: FloatingPosition
  ): FloatingPosition {
    if (
      dir === 'rtl' &&
      (position.includes('right') || position.includes('left'))
    ) {
      const [side, placement] = position.split('-') as [
        FloatingSide,
        FloatingPlacement,
      ];
      const flippedPosition = side === 'right' ? 'left' : 'right';
      return placement === undefined
        ? flippedPosition
        : `${flippedPosition}-${placement}`;
    }

    return position;
  }

  const popover = usePopover({
    middlewares,
    width,
    position: getFloatingPosition(
      // @ts-ignore
      direction,
      position!
    ),
    offset: offset!,
    onPositionChange,
    positionDependencies,
    opened,
    defaultOpened,
    onChange,
    onOpen,
    onClose,
  });

  useClickOutside(
    () => closeOnClickOutside && popover.onClose(),
    clickOutsideEvents,
    [referenceNode, floatingNode]
  );

  /**
   * Set the reference node for the popover.
   * @param {HTMLElement} node - Reference node.
   */
  const reference = useCallback(
    (node: HTMLElement) => {
      setReferenceNode(node);
      popover.floating.refs.setReference(node);
    },
    [popover.floating.refs]
  );

  /**
   * Set the floating node for the popover.
   * @param {HTMLElement} node - Floating node.
   */
  const floating = useCallback(
    (node: HTMLElement) => {
      setFloatingNode(node);
      popover.floating.refs.setFloating(node);
    },
    [popover.floating.refs]
  );

  return (
    <PopoverContextProvider
      value={{
        returnFocus,
        disabled,
        controlled: popover.controlled,
        reference,
        floating,
        x: popover.floating.x!,
        y: popover.floating.y!,
        opened: popover.opened,
        width,
        placement: popover.floating.placement,
        trapFocus,
        withinPortal,
        portalProps,
        onClose: popover.onClose,
        onToggle: popover.onToggle,
        getTargetId: () => `rizzui${uid}-target`,
        getDropdownId: () => `rizzui${uid}-dropdown`,
        withRoles,
        targetProps: props,
        as: as!,
        classNames,
        keepMounted,
      }}
    >
      {children}
    </PopoverContextProvider>
  );
}

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.displayName = 'Popover';
