'use client';

import { PiAlignLeft, PiAlignRight } from 'react-icons/pi';
import { RadioGroup } from 'rizzui';
import { useDirection } from '@/hooks/use-direction';
import RadioBox from '@/components/settings/radio-box';
import DrawerBlock from '@/components/settings/drawer-block';

const directionOptions = ['ltr', 'rtl'];

export default function AppDirection() {
  const { direction, setDirection } = useDirection();

  return (
    <DrawerBlock title="Direction">
      <RadioGroup
        value={direction ?? 'ltr'}
        // @ts-ignore
        setValue={setDirection}
        className="grid grid-cols-2 gap-4"
      >
        {directionOptions.map((item) => (
          <RadioBox
            key={item}
            value={item}
            className="mt-1 h-auto"
            contentClassName="w-full hover:border-muted bg-gray-50 dark:bg-gray-200/70 border border-muted ring-0 peer-checked:ring-2 ring-offset-4 ring-primary peer-checked:border-muted ring-offset-gray-0 duration-0 dark:ring-offset-gray-100 peer-checked:text-primary"
          >
            <span className="radio-active flex h-[38px] w-full items-center justify-center border-0  uppercase">
              {item === 'ltr' ? (
                <PiAlignLeft className="me-2 h-auto w-6 text-gray-400" />
              ) : null}
              <span>{item}</span>
              {item === 'rtl' ? (
                <PiAlignRight className="ms-2 h-auto w-6 text-gray-400" />
              ) : null}
            </span>
          </RadioBox>
        ))}
      </RadioGroup>
    </DrawerBlock>
  );
}
