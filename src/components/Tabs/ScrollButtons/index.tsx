import Button from '@/components/Button';
import { classNames } from '@/utils';
import { memo, useEffect, useRef, useState, type RefObject } from 'react';
import { ORIENTATION_CLASSES, VARIANTS } from '../constants';
import RightArrowIcon from './RightArrowIcon';

interface Props {
  isVertical: boolean;
  navRef: RefObject<HTMLElement | null>;
  variant: keyof typeof VARIANTS;
  showScrollableButtons: boolean;
  forwardButtonClassName?: string;
  backwardButtonClassName?: string;
}

const ScrollButtons = memo(({
  navRef,
  isVertical,
  variant,
  showScrollableButtons,
  forwardButtonClassName,
  backwardButtonClassName,
}: Props): React.ReactNode => {
  const prevIsVertical = useRef<boolean | undefined>(undefined);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [btnStyle, setBtnStyle] = useState({});
  const [navOverflowState, setNavOverflowState] = useState({
    moreBefore: false,
    moreAfter: false,
  });

  const { moreBefore, moreAfter } = navOverflowState;
  const shouldRenderButtons = navRef?.current && showScrollableButtons;

  useEffect(() => {
    const navReference = navRef;
    const updateNavOverflowState = (elem: HTMLElement): void => {
      const {
        scrollTop,
        scrollLeft,
        scrollWidth,
        clientWidth,
        scrollHeight,
        clientHeight,
      } = elem;

      const moreLeft = scrollLeft > 0;
      const moreRight = (scrollLeft + clientWidth) < scrollWidth;
      const moreAbove = scrollTop > 0;
      const moreBelow = scrollTop + clientHeight < scrollHeight;
      const newState = {
        moreBefore: isVertical ? moreAbove : moreLeft,
        moreAfter: isVertical ? moreBelow : moreRight,
      };

      if (JSON.stringify(newState) !== JSON.stringify(navOverflowState)) {
        setNavOverflowState(newState);
      }
    };

    const handleScroll = (e: Event): void => {
      updateNavOverflowState(e.target as HTMLElement);
    };

    if (shouldRenderButtons) {
      navReference.current?.addEventListener('scroll', handleScroll);
    }

    if (prevIsVertical.current !== isVertical) {
      updateNavOverflowState(navReference.current!);
      prevIsVertical.current = isVertical;
    }

    return (): void => {
      if (shouldRenderButtons) {
        navReference.current?.removeEventListener?.('scroll', handleScroll);
      }
    };
  }, [
    navRef,
    isVertical,
    navOverflowState,
    shouldRenderButtons,
  ]);

  useEffect(() => {
    if (btnRef?.current && shouldRenderButtons) {
      // calculate the central position of where to place the
      // scroll buttons on the tab list
      const btnWidth = btnRef.current.offsetWidth ?? 0;
      const pixelsToMidpointOfNav = (navRef.current!.offsetWidth / 2) - btnWidth;
      const leftPos = (btnWidth / 2) + pixelsToMidpointOfNav;
      const btnStyle = { left: isVertical && leftPos >= 0 ? leftPos : undefined };

      setBtnStyle(btnStyle);
    }
  }, [
    navRef,
    isVertical,
    shouldRenderButtons,
    moreBefore,
    moreAfter,
  ]);

  if (shouldRenderButtons) {
    const className = classNames(
      'absolute arrow-btn bg-white invisible flex items-center',
      'p-0 z-2 text-[24px]',
      {
        [ORIENTATION_CLASSES.scrollButton[variant]]: !isVertical,
        'px-1 bg-[#f3f3f3]': isVertical,
      },
    );

    const scrollToPosition = (pos: number): void => {
      navRef.current!.scroll({
        [isVertical ? 'top' : 'left']: (
          isVertical ? navRef.current!.scrollTop : navRef.current!.scrollLeft
        ) + pos,
        behavior: 'smooth',
      });
    };
    
    const size = isVertical ? 28 : undefined;

    return (
      <>
        {moreBefore && (
          <Button
            variant="ghost"
            style={btnStyle}
            ref={btnRef}
            data-testid="before-btn"
            className={classNames(className, backwardButtonClassName)}
            onClick={() => scrollToPosition(-100)}
          >
            <RightArrowIcon
              width={size}
              height={size}
              rotate={isVertical ? 'up' : 'left'}
            />
          </Button>
        )}
        {moreAfter && (
          <Button
            variant="ghost"
            ref={btnRef}
            style={btnStyle}
            data-testid="after-btn"
            onClick={() => scrollToPosition(100)}
            className={classNames(
              {
                'end-0': !isVertical,
                'bottom-0 self-end': isVertical,
              },
              className,
              forwardButtonClassName,
            )}
          >
            <RightArrowIcon
              width={size}
              height={size}
              rotate={isVertical ? 'down' : undefined}
            />
          </Button>
        )}
      </>
    );
  }
  return undefined;
});

export default ScrollButtons;
