import { render, screen } from '@testing-library/react';
import { PersonaBadge } from '.';

describe('PersonaBadge', () => {
  it('renders with rose background color and rounded corners by default', () => {
    render(<PersonaBadge dataTestId="badge" />);
    expect(screen.getByTestId('badge')).toHaveClass('bg-rose-500 rounded-full');
  });

  it('renders with green background color and no rounded corners', () => {
    render(
      <PersonaBadge
        color="green"
        isRounded={false}
        dataTestId="badge"
      />
    );
    expect(screen.getByTestId('badge')).toHaveClass('bg-green-600');
    expect(screen.getByTestId('badge')).not.toHaveClass('rounded-full');
  });
});
