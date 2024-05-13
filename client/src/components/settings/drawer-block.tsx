import { Title } from 'rizzui';
import cn from '@/utils/class-names';

export default function DrawerBlock({
  title,
  children,
  className,
}: React.PropsWithChildren<{ title: string; className?: string }>) {
  return (
    <div className={cn('mb-10 px-0.5', className)}>
      <Title
        as="h6"
        className={cn(
          'mb-3 font-inter text-[13px] font-medium uppercase tracking-wider text-gray-500'
        )}
      >
        {title}
      </Title>
      {children}
    </div>
  );
}
