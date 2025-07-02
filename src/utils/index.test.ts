import { cn } from '.';

describe('cn', () => {
  it('returns appropriate class', () => {
    expect(cn('flex', { disabled: true })).toBe('flex disabled');
  });
});
