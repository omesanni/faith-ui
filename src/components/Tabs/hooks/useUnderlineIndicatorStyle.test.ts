import * as utils from '@/utils';
import { renderHook } from '@testing-library/react';
import { vi } from 'vitest';
import useUnderlineIndicatorStyle from './useUnderlineIndicatorStyle';

describe('useUnderlineIndicatorStyle', () => {
  const tabsRef = { current: {} };
  const navRef = { current: null };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('returns default indicator style', () => {
    const { result } = renderHook(() => useUnderlineIndicatorStyle(
      '',
      tabsRef,
      navRef,
      false,
      false,
    ));

    expect(result.current).toEqual(undefined);
  });

  describe('Primary variant', () => {
    const tabsRef = { current: { tab: document.createElement('button') } };
    const navRef = { current: document.createElement('nav') };

    it('returns style for horizontal orientation', () => {
      const { result } = renderHook(() => useUnderlineIndicatorStyle(
        'tab',
        tabsRef,
        navRef,
        false,
        true,
      ));

      expect(result.current).toEqual({
        height: undefined,
        left: 0,
        right: undefined,
        top: undefined,
        width: 0,
      });
    });

    it('returns style for vertical orientation', () => {
      const { result } = renderHook(() => useUnderlineIndicatorStyle(
        'tab',
        tabsRef,
        navRef,
        true,
        true,
      ));

      expect(result.current).toEqual({
        height: 0,
        left: undefined,
        right: 0,
        top: 0,
        width: undefined,
      });
    });

    it('should scroll into view if active tab element is not in view', () => {
      vi.spyOn(utils, 'isElementInScrollView').mockReturnValue(false);
      const scrollIntoViewSpy = vi.spyOn(tabsRef.current.tab, 'scrollIntoView');

      renderHook(() => useUnderlineIndicatorStyle(
        'tab',
        tabsRef,
        navRef,
        true,
        true,
      ));

      expect(scrollIntoViewSpy).toHaveBeenCalled();
    });
  });
});
