import {
  flip,
  inline,
  limitShift,
  Middleware,
  offset,
  shift,
  size,
  useFloating,
  UseFloatingReturn,
} from '@floating-ui/react';
import { useUncontrolled } from '@/components/ui/menu/dropdown/use-uncontrolled';
import {
  FloatingAxesOffsets,
  FloatingPosition,
} from '@/components/ui/menu/popover/types';
import { useFloatingAutoUpdate } from '@/components/ui/menu/popover/use-floating-auto-update';

export type PopoverWidth = 'target' | React.CSSProperties['width'];

export interface PopoverMiddlewares {
  shift: boolean;
  flip: boolean;
  inline?: boolean;
  size?: boolean;
}

interface UsePopoverOptions {
  offset: number | FloatingAxesOffsets;
  position: FloatingPosition;
  positionDependencies: any[] | undefined;
  onPositionChange?: (position: FloatingPosition) => void;
  opened: boolean | undefined;
  defaultOpened: boolean | undefined;
  onChange?: (opened: boolean) => void;
  onClose?: () => void;
  onOpen?: () => void;
  width?: PopoverWidth;
  middlewares: PopoverMiddlewares | undefined;
}

function getPopoverMiddlewares(
  options: UsePopoverOptions,
  getFloating: () => UseFloatingReturn<Element>
) {
  const middlewares: Middleware[] = [offset(options.offset)];

  if (options.middlewares?.shift) {
    middlewares.push(shift({ limiter: limitShift() }));
  }

  if (options.middlewares?.flip) {
    middlewares.push(flip());
  }

  if (options.middlewares?.inline) {
    middlewares.push(inline());
  }

  if (options.middlewares?.size || options.width === 'target') {
    middlewares.push(
      size({
        apply({ rects, availableWidth, availableHeight }) {
          const floating = getFloating();
          const styles = floating.refs.floating.current?.style ?? {};

          if (options.middlewares?.size) {
            Object.assign(styles, {
              maxWidth: `${availableWidth}px`,
              maxHeight: `${availableHeight}px`,
            });
          }

          if (options.width === 'target') {
            Object.assign(styles, {
              width: `${rects.reference.width}px`,
            });
          }
        },
      })
    );
  }

  return middlewares;
}

export function usePopover(options: UsePopoverOptions) {
  const [isOpened, setIsOpened] = useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange,
  });

  const onClose = () => {
    if (isOpened) {
      options.onClose?.();
      setIsOpened(false);
    }
  };

  const onToggle = () => {
    if (isOpened) {
      options.onClose?.();
      setIsOpened(false);
    } else {
      options.onOpen?.();
      setIsOpened(true);
    }
  };

  const floating: UseFloatingReturn<Element> = useFloating({
    placement: options.position,
    middleware: getPopoverMiddlewares(options, () => floating),
  });

  useFloatingAutoUpdate({
    opened: options.opened,
    position: options.position,
    positionDependencies: options.positionDependencies || [],
    floating,
  });

  return {
    floating,
    controlled: typeof options.opened === 'boolean',
    opened: isOpened,
    onClose,
    onToggle,
  };
}
