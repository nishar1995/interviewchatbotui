export function findElement(startElement: HTMLElement, selector: string) {
  let currentElement: HTMLElement | null = startElement;

  while (currentElement && !currentElement.matches(selector)) {
    currentElement = currentElement.parentElement;
  }

  return currentElement;
}

function findPreviousIndex(
  current: number,
  elements: HTMLButtonElement[],
  loop: boolean
): number {
  const disabledMap = elements.reduce<{ [key: number]: boolean }>(
    (acc, el, i) => {
      acc[i] = el.disabled;
      return acc;
    },
    {}
  );

  for (let i = current - 1; i >= 0; i--) {
    if (!disabledMap[i]) return i;
  }

  if (loop) {
    for (let i = elements.length - 1; i > current; i--) {
      if (!disabledMap[i]) return i;
    }
  }

  return current;
}

function findNextIndex(
  current: number,
  elements: HTMLButtonElement[],
  loop: boolean
): number {
  // Create lookup map
  const disabledMap = elements.reduce<{ [key: number]: boolean }>(
    (acc, el, i) => {
      acc[i] = el.disabled;
      return acc;
    },
    {}
  );

  // Find next enabled index after current
  for (let i = current + 1; i < elements.length; i++) {
    if (!disabledMap[i]) return i;
  }

  // Loop around if needed
  if (loop) {
    for (let i = 0; i < current; i++) {
      if (!disabledMap[i]) return i;
    }
  }

  return current;
}

function haveSameParent(
  target: HTMLButtonElement,
  sibling: HTMLButtonElement,
  parentSelector: string
) {
  return (
    findElement(target, parentSelector) === findElement(sibling, parentSelector)
  );
}

interface GetElementsSiblingsInput {
  parentSelector: string;
  siblingSelector: string;
  loop?: boolean;
  orientation: 'vertical' | 'horizontal';
  dir?: 'rtl' | 'ltr';
  activateOnFocus?: boolean;
  onKeyDown?: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
}

export function keydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  loop = true,
  activateOnFocus = false,
  dir = 'rtl',
  orientation,
}: GetElementsSiblingsInput) {
  return (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);

    const elements = Array.from(
      findElement(
        event.currentTarget,
        parentSelector
      )?.querySelectorAll<HTMLButtonElement>(siblingSelector) || []
    ).filter((node) =>
      haveSameParent(event.currentTarget, node, parentSelector)
    );

    const current = elements.findIndex((el) => event.currentTarget === el);
    const isNextIndex = findNextIndex(current, elements, loop);
    const isPreviousIndex = findPreviousIndex(current, elements, loop);
    const nextIndex = dir === 'rtl' ? isPreviousIndex : isNextIndex;
    const previousIndex = dir === 'rtl' ? isNextIndex : isPreviousIndex;

    if (event.key === 'ArrowRight' && orientation === 'horizontal') {
      event.stopPropagation();
      event.preventDefault();
      elements[nextIndex].focus();
      activateOnFocus && elements[nextIndex].click();
    } else if (event.key === 'ArrowLeft' && orientation === 'horizontal') {
      event.stopPropagation();
      event.preventDefault();
      elements[previousIndex].focus();
      activateOnFocus && elements[previousIndex].click();
    } else if (event.key === 'ArrowUp' && orientation === 'vertical') {
      event.stopPropagation();
      event.preventDefault();
      elements[isPreviousIndex].focus();
      activateOnFocus && elements[isPreviousIndex].click();
    } else if (event.key === 'ArrowDown' && orientation === 'vertical') {
      event.stopPropagation();
      event.preventDefault();
      elements[isNextIndex].focus();
      activateOnFocus && elements[isNextIndex].click();
    } else if (event.key === 'Home') {
      event.stopPropagation();
      event.preventDefault();
      !elements[0].disabled && elements[0].focus();
    } else if (event.key === 'End') {
      event.stopPropagation();
      event.preventDefault();
      const last = elements.length - 1;
      !elements[last].disabled && elements[last].focus();
    }
  };
}
