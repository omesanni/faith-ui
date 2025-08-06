import { classNames, getUuid } from '@/utils';
import {
  Children,
  memo,
  useCallback,
  useMemo,
  useRef,
  type ReactElement
} from 'react';
import { ORIENTATION, ORIENTATION_CLASSES, VARIANTS } from './constants';
import useUnderlineIndicatorStyle from './hooks/useUnderlineIndicatorStyle';
import ScrollButtons from './ScrollButtons';
import type { Props as TabProps } from './Tab';

export type Props = Readonly<{
  /** The tab content displayed inside Tabs. */
  children: ReactElement<TabProps> | ReactElement<TabProps>[];
  /** Current selected tab. */
  activeTab?: string;
  /** The direction of the tab display. default is horizontal */
  orientation?: keyof typeof ORIENTATION;
  /** Tab change event handler. */
  onChange?: (tabId: string) => void;
  /** Alternative text for assistive technologies e.g. screen readers. */
  ariaLabel?: string;
  /** References another element to define its accessible name */
  ariaLabelledBy?: string;
  /** Extra CSS classes to apply to the main tabs container. */
  mainClassName?: string;
  /** Extra CSS classes to apply to the active tab indicator underline. */
  indicatorClassName?: string;
  /** Extra CSS classes to apply to the tab list nav container. */
  tabListClassName?: string;
  /** Enables different visual styles. default is primary. */
  variant?: keyof typeof VARIANTS;
  /** 
   * Determines if scroll buttons should be displayed when
   * tabs overflow their container
  */
  showScrollableButtons?: boolean;
  /** Extra CSS classes to apply to the forward scroll button. */
  forwardScrollButtonClassName?: string;
  /** Extra CSS classes to apply to the backward scroll button. */
  backwardScrollButtonClassName?: string;
}>;

const Tabs = memo(({
  children,
  activeTab = '',
  onChange,
  ariaLabel,
  ariaLabelledBy,
  mainClassName,
  tabListClassName,
  indicatorClassName,
  forwardScrollButtonClassName,
  backwardScrollButtonClassName,
  variant = VARIANTS.primary,
  orientation = ORIENTATION.horizontal,
  showScrollableButtons = true,
}: Props): React.JSX.Element => {
  const navRef = useRef<HTMLElement>(null);
  const tabsRef = useRef<Record<string, HTMLButtonElement>>({});
  const isPrimary = variant === VARIANTS.primary;
  const isActive = useCallback(
    (id: string): boolean => id === activeTab,
    [activeTab],
  );

  const tabList = useMemo((): React.JSX.Element[] => Children.map(
    children,
    ({ props }: ReactElement<TabProps>, i: number): React.JSX.Element => {
      const isSelected = isActive(props.id);
      const { tab } = ORIENTATION_CLASSES;
      const { border, active, [orientation]: orient } = tab[variant];
      const classes = classNames(
        'disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap',
        orient.padding,
        border,
        { [tab.enabled]: !props.disabled, [active]: isSelected },
        props.className,
      );

      const id = getUuid(props.id);

      return (
        <button
          id={id}
          key={`${props.id}-${i}`}
          role="tab"
          type="button"
          className={classes}
          data-testid={props.dataTestId}
          aria-controls={`panel-${id}`}
          aria-selected={isSelected}
          aria-disabled={props.disabled}
          onClick={onChange && (() => onChange(props.id))}
          disabled={props.disabled}
          ref={(el: HTMLButtonElement): void => {
            tabsRef.current[props.id] = el;
          }}
        >
          {props.header}
        </button>
      );
    },
  ), [
    isActive,
    children,
    tabsRef,
    onChange,
    variant,
    orientation,
  ]);

  const isVertical = orientation === ORIENTATION.vertical;
  const indicatorStyle = useUnderlineIndicatorStyle(
    activeTab,
    tabsRef,
    navRef,
    isVertical,
    isPrimary,
  );
  
  return (
    <div className={classNames(
      'flex relative [&:has(nav:hover)>.arrow-btn]:visible',
      '[&:has(.arrow-btn:hover)>.arrow-btn]:visible',
      ORIENTATION_CLASSES.main[orientation],
      mainClassName,
    )}>
      <nav
        role="tablist"
        ref={navRef}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-orientation={orientation}
        className={classNames(
          'relative flex items-start overflow-auto',
          '[&::-webkit-scrollbar]:h-0 [&::-webkit-scrollbar]:w-0',
          ORIENTATION_CLASSES.navList[variant][orientation],
          tabListClassName,
        )}
      >
        {tabList}
        {isPrimary && (
          <div
            style={indicatorStyle}
            role="presentation"
            data-testid="indicator"
            className={classNames(
              'absolute bg-blue-600 transition-all duration-300',
              ORIENTATION_CLASSES.indicator[orientation],
              { 'opacity-30': tabsRef.current[activeTab]?.disabled },
              indicatorClassName,
            )}
          />
        )}
      </nav>
      {navRef?.current && (
        <ScrollButtons
          navRef={navRef}
          variant={variant}
          isVertical={isVertical}
          showScrollableButtons={showScrollableButtons}
          backwardButtonClassName={backwardScrollButtonClassName}
          forwardButtonClassName={forwardScrollButtonClassName}
        />
      )}
      {Children.map(
        children,
        ({ props }: ReactElement<TabProps>, i: number): ReactElement => (
          <section
            role="tabpanel"
            id={tabList[i].props['aria-controls']}
            aria-hidden={!isActive(props.id)}
            aria-labelledby={tabList[i].props.id}
            className={classNames({
              hidden: !isActive(props.id),
            })}
          >
            {props.children}
          </section>
        ),
      )}
    </div>
  );
});

export default Tabs;
