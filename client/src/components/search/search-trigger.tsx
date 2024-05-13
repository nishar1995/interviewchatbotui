import { PiCommand, PiMagnifyingGlassBold } from 'react-icons/pi';
import cn from '@/utils/class-names';

type SearchTriggerProps = {
  placeholderClassName?: string;
  icon?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function SearchTrigger({
  icon,
  className,
  placeholderClassName,
  ...props
}: SearchTriggerProps) {
  return (
    <button
      aria-label="Search"
      className={cn(
        'group inline-flex items-center focus:outline-none active:translate-y-px xl:h-10 xl:w-full xl:max-w-sm xl:rounded-lg xl:border xl:border-muted xl:py-2 xl:pe-2 xl:ps-3.5 xl:shadow-sm xl:backdrop-blur-md xl:transition-colors xl:duration-200 xl:hover:border-gray-900 xl:hover:outline-double xl:hover:outline-[0.5px] xl:hover:outline-gray-900 xl:focus-visible:border-gray-900 xl:focus-visible:outline-double xl:focus-visible:outline-[0.5px] xl:focus-visible:outline-gray-900',
        className
      )}
      {...props}
    >
      {icon ? (
        icon
      ) : (
        <PiMagnifyingGlassBold className="magnifying-glass me-2 h-[18px] w-[18px]" />
      )}
      <span
        className={cn(
          'placeholder-text hidden text-sm text-gray-600 group-hover:text-gray-900 xl:inline-flex',
          placeholderClassName
        )}
      >
        Search your page...
      </span>
      <span className="search-command ms-auto hidden items-center text-sm text-gray-600 lg:flex lg:rounded-md lg:bg-primary lg:px-1.5 lg:py-1 lg:text-xs lg:font-semibold lg:text-primary-foreground xl:justify-normal">
        <PiCommand strokeWidth={1.3} className="h-[15px] w-[15px]" />K
      </span>
    </button>
  );
}
