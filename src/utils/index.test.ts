import { vi } from 'vitest';
import { classNames, getUuid, isElementInScrollView } from '.';

describe('classNames', () => {
  it('returns appropriate class', () => {
    expect(classNames('flex', { disabled: true })).toBe('flex disabled');
  });
});

describe('getUuid', () => {
  it('returns a unique id', () => {
    const idOne = getUuid();
    const idTwo = getUuid();
    expect(idOne).not.toEqual(idTwo);
  });
});

describe('isElementInScrollView', () => {
  const scrollableElem: HTMLElement = document.createElement('div');

  it('is not in scroll view', () => {
    expect(isElementInScrollView(null, scrollableElem)).toBe(false);
  });

  it('is in scroll view', () => {
    const elem: HTMLElement = document.createElement('button');
    vi.spyOn(elem, 'getBoundingClientRect').mockReturnValue({
      top: 10, bottom: 10, left: 30, right: 30,
    } as DOMRect);
    vi.spyOn(scrollableElem, 'getBoundingClientRect').mockReturnValue({
      top: 9, bottom: 10, left: 20, right: 30,
    } as DOMRect);

    expect(isElementInScrollView(elem, scrollableElem)).toBe(true);
  });
});
