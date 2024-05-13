import { useState } from 'react';
import { AdvancedRadio } from 'rizzui';
import cn from '@/utils/class-names';

type ButtonGroupActionProps = {
  name?: string;
  options: string[];
  defaultActive?: string;
  onChange: (data: string) => void;
  className?: string;
  btnClassName?: string;
  activeClassName?: string;
};

export default function ButtonGroupAction({
  name = 'filter',
  options,
  onChange,
  className,
  btnClassName,
  defaultActive,
  activeClassName,
}: ButtonGroupActionProps) {
  const [state, setState] = useState(
    defaultActive ? defaultActive : options[options.length - 1]
  );
  function handleOnChange(value: string) {
    setState(() => value);
    onChange && onChange(value);
  }

  return (
    <div className={cn('flex items-center gap-1 font-medium', className)}>
      {options.map((item) => (
        <AdvancedRadio
          key={`filter-${item}`}
          name={name}
          value={item}
          onChange={(e) => handleOnChange(e.target.value)}
          contentClassName="min-w-[unset] min-h-[auto] text-center border-0 ring-0 peer-checked:ring-0 px-2"
          className={cn(
            'rounded-md transition-all duration-200 hover:cursor-pointer',
            state === item
              ? 'bg-gray-100 text-gray-900 dark:text-gray-700'
              : 'text-gray-600',
            btnClassName,
            state === item && activeClassName
          )}
        >
          {item}
        </AdvancedRadio>
      ))}
    </div>
  );
}
