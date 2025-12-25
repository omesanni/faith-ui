import { classNames } from '@/utils';
import { useEffect, useRef } from 'react';

interface RadioItem {
  /** The content to display for the radio item. */
  content: React.ReactNode;
  /** Whether the radio item is disabled. */
  disabled?: boolean;
  /** Additional CSS classes to apply to the radio item. */
  className?: string;
}

interface Props extends Omit<React.ButtonHTMLAttributes<HTMLElement>, 'onClick'> {
  /** The data for the radio group items. */
  data: RadioItem[];
  /** Whether the entire radio group is disabled. */
  disabled?: boolean;
  /** Additional CSS classes to apply to the radio group. */
  className?: string;
  /** The currently selected radio item index. */
  selectedIndex?: number;
  /** The orientation of the radio group. default is horizontal */
  orientation?: 'horizontal' | 'vertical';
  /** Callback function when a radio item is clicked. */
  onClick?: (i: number) => void;
}

function RadioGroup({
  data,
  onClick,
  disabled,
  className,
  selectedIndex = 0,
  orientation = 'horizontal',
  ...props
}: Readonly<Props>): React.JSX.Element {
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const radioRef = useRef<Record<string, HTMLButtonElement>>({});
  const isHorizontal = orientation === 'horizontal';

  useEffect((): (() => void) => {
    const radios = Object.values(radioRef.current);
    const handlersToRemove: Array<(e: KeyboardEvent) => void> = [];

    radios.forEach((radio: HTMLButtonElement, i: number): void => {
      const handleKeyDown = (e: KeyboardEvent): void => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          e.preventDefault();
          const nextIndex = (i + 1) % radios.length;
          radioRef.current[nextIndex]?.focus();
          onClick?.(nextIndex);
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          e.preventDefault();
          const prevIndex = (i - 1 + radios.length) % radios.length;
          radioRef.current[prevIndex]?.focus();
          onClick?.(prevIndex);
        }
      }
      handlersToRemove.push(handleKeyDown);
      radio.addEventListener('keydown', handleKeyDown);
    });

    return (): void => {
      radios.forEach((radio: HTMLButtonElement, i: number): void => {
        radio.removeEventListener('keydown', handlersToRemove[i]);
      });
    };
  }, [onClick]);

  useEffect((): void => {
    const currentRadio = radioRef.current[selectedIndex];
    const indicator = indicatorRef.current;

    if (currentRadio && indicator) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = currentRadio;
      indicator.style = '';

      if (isHorizontal) {
        indicator.style.left = `${offsetLeft}px`;
        indicator.style.top = '4px';
      } else {
        indicator.style.top = `${offsetTop}px`;
        indicator.style.height = `${offsetHeight}px`;
      }
      indicator.style.width = `${offsetWidth}px`;
    }
  }, [selectedIndex, isHorizontal]);

  const navClasses = classNames(
    'flex items-start px-2 py-2 relative w-[fit-content] bg-[#efefef]',
    {
      'flex-col': !isHorizontal,
      'rounded-4xl': isHorizontal,
      'rounded-2xl': !isHorizontal,
      'cursor-not-allowed opacity-50': disabled,
    },
    className,
  );

  return (
    <nav
      {...props}
      role="radiogroup"
      className={navClasses}
    >
      {data.map((r: RadioItem, i: number) => (
        <button
          key={`radio-${i}`}
          role="radio"
          type="button"
          disabled={r.disabled || disabled}
          aria-disabled={!!(r.disabled || disabled)}
          aria-checked={i === selectedIndex}
          onClick={(): void => onClick?.(i)}
          ref={(el: HTMLButtonElement): void => {
            radioRef.current[i] = el;
          }}
          className={classNames(
            'px-3 z-1 cursor-pointer outline-none disabled:cursor-not-allowed',
            'disabled:opacity-50',
            r.className,
          )}
        >
          {r.content}
        </button>
      ))}
      <div
        ref={indicatorRef}
        className="top-[4px] bg-white h-[calc(100%-8px)] absolute rounded-4xl shadow-xs transition-[left_0.51s_ease]"
      />
    </nav>
  );
}

export default RadioGroup;
