import { autoUpdate } from '@floating-ui/react';
import { useEffect, useState } from 'react';
import { FloatingPosition } from '@/components/ui/menu/popover/types';
import { useUpdate } from '@/components/ui/menu/popover/use-update';

interface FloatingAutoUpdateProps {
  opened: boolean | undefined;
  floating: {
    update: () => void;
    refs: {
      floating: React.MutableRefObject<any>;
      reference: React.MutableRefObject<any>;
    };
  };
  positionDependencies: any[];
  position: FloatingPosition;
}

export function useFloatingAutoUpdate({
  opened,
  floating,
  position,
  positionDependencies,
}: FloatingAutoUpdateProps) {
  const [delayedUpdate, setDelayedUpdate] = useState(0);

  useEffect(() => {
    if (floating.refs.reference.current && floating.refs.floating.current) {
      return autoUpdate(
        floating.refs.reference.current,
        floating.refs.floating.current,
        floating.update
      );
    }

    return undefined;
  }, [
    opened,
    delayedUpdate,
    position,
    floating.refs.reference,
    floating.refs.floating,
    floating.update,
  ]);

  useUpdate(() => {
    floating.update();
  }, positionDependencies);

  useUpdate(() => {
    setDelayedUpdate((c) => c + 1);
  }, [opened]);
}
