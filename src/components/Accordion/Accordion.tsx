import { classNames } from '@/utils';
import {
  Children,
  memo,
  useMemo,
  type ReactElement
} from 'react';
import type { Props as AccPanelProps } from './AccordionPanel';
import ChevronDownIcon from './ChevronDownIcon';

export type Props = Readonly<{
  variant?: 'filled' | 'default';
  /** The content displayed inside the Accordion. */
  children: ReactElement<AccPanelProps> | ReactElement<AccPanelProps>[];
  /** Accordion panels that are open. */
  activeIds?: string[];
  /** Accordion click event handler. */
  onClick?: (accId: string) => void;
  /** Additional class names for the Accordion. */
  className?: string;
}>;

const Accordion = memo(({
  children,
  activeIds = [],
  onClick,
  className,
  variant,
}: Props): React.JSX.Element => {
  const accordions = useMemo((): React.JSX.Element[] => Children.map(
    children,
    ({ props }: ReactElement<AccPanelProps>, i: number): React.JSX.Element => {
      const isOpen = activeIds.includes(props.id);
      const isFilled = variant === 'filled';

      return (
        <>
          <button
            id={props.id}
            key={`${props.id}-${i}`}
            type="button"
            data-testid={props.dataTestId}
            aria-controls={`panel-${props.id}`}
            aria-expanded={isOpen}
            aria-disabled={props.disabled}
            onClick={onClick && (() => onClick(props.id))}
            disabled={props.disabled}
            className={classNames(
              'flex justify-between items-center w-full hover:cursor-pointer',
              { 'border-b border-gray-300 py-4': !isFilled },
              { 'rounded-xl bg-[#F6f6f6] px-2 py-3': isFilled },
              { 'mt-2': !!i && isFilled },
            )}
          >
            <span>{props.header}</span>
            <ChevronDownIcon
              className={classNames('transition-all duration-300', {
                'rotate-180': isOpen,
              })}
            />
          </button>
          <section
            id={`panel-${props.id}`}
            aria-hidden={!isOpen}
            aria-labelledby={props.id}
            className={classNames(
              { hidden: !isOpen },
            )}
          >
            {props.children}
          </section>
        </>
      );
    },
  ), [
    children,
    variant,
    activeIds,
    onClick,
  ]);

  return (
    <div className={className}>
      {accordions}
    </div>
  );
});

export default Accordion;
