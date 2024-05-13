import { useEffect, useState, RefObject } from 'react';

export function useHorizontalScrollAvailability({
  ref,
}: {
  ref: RefObject<any>;
}) {
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);

  useEffect(() => {
    const container = ref.current;

    if (container) {
      const handleScroll = () => {
        const scrollLeft = Math.abs(container.scrollLeft);
        const scrollableToLeft = scrollLeft > 5;

        const scrollableSpaceToRight =
          container.scrollWidth - container.offsetWidth - scrollLeft;

        setIsLeft(scrollableToLeft);
        setIsRight(!(scrollableSpaceToRight < 5));
      };

      container.addEventListener('scroll', handleScroll);
      handleScroll();

      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current?.scrollLeft]);
  return { isLeft, isRight };
}
