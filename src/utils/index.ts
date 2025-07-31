import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: ClassValue[]): string => twMerge(clsx(classes));

export const getUuid = (prefix = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
};

export const isElementInScrollView = (
  el: HTMLElement | null,
  scrollableContainer: HTMLElement | null,
): boolean => {
  if (!el || !scrollableContainer) {
    return false;
  }

  const elRect = el.getBoundingClientRect();
  const scrollableRect = scrollableContainer.getBoundingClientRect();

  return (
    elRect.top >= scrollableRect.top &&
    elRect.bottom <= scrollableRect.bottom &&
    elRect.left >= scrollableRect.left &&
    elRect.right <= scrollableRect.right
  );
};
