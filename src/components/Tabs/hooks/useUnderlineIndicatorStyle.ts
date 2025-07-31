import { isElementInScrollView } from '@/utils';
import { useEffect, useState, type RefObject } from 'react';
import { DEFAULT_INDICATOR_STYLE } from '../constants';

interface IndicatorStyle {
  top?: number;
  left?: number;
  right?: number;
  width?: number;
  height?: number;
}

function useUnderlineIndicatorStyle(
  activeTab: string,
  tabsRef: RefObject<Record<string, HTMLButtonElement>>,
  navRef: RefObject<HTMLElement | null>,
  isVerticalView: boolean,
  isPrimaryVariant: boolean,
): IndicatorStyle | undefined{
  const [indicatorStyle, setIndicatorStyle] = useState<IndicatorStyle>();

  useEffect((): void => {
    const elem = tabsRef.current[activeTab];

    if (elem) {
      const { offsetLeft, offsetHeight, offsetWidth } = elem;
      const getOffsetTopRelativeToNavElement = (
        el: HTMLElement | null, 
        navContainer: HTMLElement | null,
      ): number => {
        let offsetTop = 0;
        let currentElement = el;

        while (currentElement && currentElement !== navContainer) {
          offsetTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent as HTMLElement;
        }

        return offsetTop;
      };
      
      if (!isPrimaryVariant) {
        setIndicatorStyle(DEFAULT_INDICATOR_STYLE);
      } else {
        setIndicatorStyle({
          left: !isVerticalView && offsetLeft >= 0 ? offsetLeft : undefined,
          width: !isVerticalView && offsetWidth >= 0 ? offsetWidth : undefined,
          right: isVerticalView ? 0 : undefined,
          height: isVerticalView && offsetHeight >= 0 ? offsetHeight : undefined,
          top: isVerticalView
            ? getOffsetTopRelativeToNavElement(elem, navRef.current)
            : undefined,
        });
      }

      if (navRef.current && !isElementInScrollView(elem, navRef.current)) {
        elem.scrollIntoView();
      }
    }
  }, [
    navRef,
    tabsRef,
    activeTab,
    isVerticalView,
    isPrimaryVariant,
  ]);

  return indicatorStyle;
}

export default useUnderlineIndicatorStyle;
