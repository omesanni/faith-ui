import { classNames } from '.';

describe('classNames', () => {
  it('returns appropriate class', () => {
    expect(classNames('flex', { disabled: true })).toBe('flex disabled');
  });
});
