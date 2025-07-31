import { act, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { vi } from 'vitest';
import ScrollButtons from '.';
import { VARIANTS } from '../constants';

vi.mock('react', { spy: true });

describe('ScrollButtons', () => {
  const navRef = { current: document.createElement('nav') };

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('does not render buttons and attach listeners', () => {
    const spy = vi.spyOn(navRef.current, 'addEventListener');

    render(
      <ScrollButtons
        navRef={navRef}
        variant={VARIANTS.primary}
        showScrollableButtons={false}
        isVertical={false}
      />
    );

    expect(spy).not.toHaveBeenCalled();
  });

  it('renders buttons', () => {
    const addEventListenerSpy = vi.spyOn(navRef.current, 'addEventListener');
    vi.spyOn(navRef.current, 'scrollLeft', 'get').mockImplementation(() => 10);
    vi.spyOn(navRef.current, 'clientWidth', 'get').mockImplementation(() => 10);
    vi.spyOn(navRef.current, 'scrollWidth', 'get').mockImplementation(() => 40);

    render(
      <ScrollButtons
        navRef={navRef}
        isVertical={false}
        variant={VARIANTS.primary}
        showScrollableButtons
      />
    );

    act(() => {
      fireEvent.scroll(navRef.current, { target: {} });
    });

    expect(screen.getByTestId('before-btn')).toBeInTheDocument();
    expect(screen.getByTestId('after-btn')).toBeInTheDocument();
    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  describe('scroll', () => {
    const scrollSpy = vi.spyOn(navRef.current, 'scroll');

    it('scrolls to new position for vertical orientation', () => {
      vi.spyOn(navRef.current, 'scrollTop', 'get').mockImplementation(() => 10);
      vi.spyOn(navRef.current, 'clientHeight', 'get').mockImplementation(() => 10);
      vi.spyOn(navRef.current, 'scrollHeight', 'get').mockImplementation(() => 40);

      render(
        <ScrollButtons
          navRef={navRef}
          variant={VARIANTS.primary}
          showScrollableButtons
          isVertical
        />
      );

      act(() => {
        fireEvent.scroll(navRef.current, { target: {} });
      });

      fireEvent.click(screen.getByTestId('before-btn'));
      expect(scrollSpy).toHaveBeenCalledWith({
        top: -90,
        behavior: 'smooth',
      });

      fireEvent.click(screen.getByTestId('after-btn'));
      expect(scrollSpy).toHaveBeenCalledWith({
        top: 110,
        behavior: 'smooth',
      });

      expect(screen.getByTestId('after-btn')).toBeInTheDocument();
    });

    it('scrolls to new position for horizontal orientation', () => {
      vi.spyOn(navRef.current, 'scrollLeft', 'get').mockImplementation(() => 40);
      vi.spyOn(navRef.current, 'clientWidth', 'get').mockImplementation(() => 40);
      vi.spyOn(navRef.current, 'scrollWidth', 'get').mockImplementation(() => 90);

      render(
        <ScrollButtons
          navRef={navRef}
          isVertical={false}
          variant={VARIANTS.primary}
          showScrollableButtons
        />
      );

      act(() => {
        fireEvent.scroll(navRef.current, { target: {} });
      });

      fireEvent.click(screen.getByTestId('before-btn'));
      expect(scrollSpy).toHaveBeenCalledWith({
        left: -60,
        behavior: 'smooth',
      });

      fireEvent.click(screen.getByTestId('after-btn'));
      expect(scrollSpy).toHaveBeenCalledWith({
        left: 140,
        behavior: 'smooth',
      });

      expect(screen.getByTestId('after-btn')).toBeInTheDocument();
    });
  });

  it('should update nav overflow state and remove event listener', () => {
    const setNavOverflowState = vi.fn();
    const removeSpy = vi.spyOn(navRef.current, 'removeEventListener');
    vi.spyOn(React, 'useState').mockReturnValue([{}, setNavOverflowState]);

    const { rerender } = render(
      <ScrollButtons
        navRef={navRef}
        isVertical={false}
        variant={VARIANTS.primary}
        showScrollableButtons
      />
    );

    rerender(
      <ScrollButtons
        navRef={navRef}
        variant={VARIANTS.primary}
        showScrollableButtons
        isVertical
      />
    );

    expect(removeSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    expect(setNavOverflowState).toHaveBeenCalledWith({
      moreAfter: false,
      moreBefore: false,
    });
  });
});
