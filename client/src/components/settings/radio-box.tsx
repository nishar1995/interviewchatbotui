import { AdvancedRadio, type AdvancedRadioProps } from 'rizzui';
import cn from '@/utils/class-names';

export default function RadioBox({
  value,
  children,
  className,
  ...props
}: React.PropsWithChildren<AdvancedRadioProps>) {
  return (
    <AdvancedRadio
      value={value}
      className={cn(
        'group flex h-16 w-full items-center justify-center rounded-lg text-sm font-medium capitalize text-gray-800 hover:cursor-pointer',
        className
      )}
      {...props}
    >
      {children}
    </AdvancedRadio>
  );
}
