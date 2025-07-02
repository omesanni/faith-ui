import { render, screen } from '@testing-library/react';
import Switch from '.';

describe('Switch', () => {
  it('renders unchecked', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toHaveClass('bg-[#dddddd]');
  });

  it('renders checked', () => {
    render(<Switch checked />);
    expect(screen.getByRole('switch')).toHaveClass('bg-blue-600');
  });

  it('renders disabled', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toHaveClass('disabled:opacity-50');
  });
});
