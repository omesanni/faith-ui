import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const classNames = (...classes: ClassValue[]): string => twMerge(clsx(classes));
