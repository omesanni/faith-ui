import { render, screen } from '@testing-library/react';
import Button from '.';

describe('Button', () => {
  it('renders primary button by default', () => {
    render(<Button>primary</Button>);
    expect(screen.getByText('primary')).toHaveClass('bg-blue-600');
  });

  it('renders secondary button', () => {
    render(<Button variant="secondary">secondary</Button>);
    expect(screen.getByText('secondary')).toHaveClass('bg-[#f3f3f3]');
  });

  it('renders outline button', () => {
    render(<Button variant="outline">outline</Button>);
    expect(screen.getByText('outline')).toHaveClass('outline-1 outline-blue-600');
  });

  it('renders ghost button', () => {
    render(<Button variant="ghost">ghost</Button>);
    expect(screen.getByText('ghost')).toHaveClass('hover:enabled:bg-[#f3f3f3]');
  });

  it('renders danger button', () => {
    render(<Button variant="danger">danger</Button>);
    expect(screen.getByText('danger')).toHaveClass('bg-red-600');
  });

  it('renders disabled button', () => {
    render(<Button disabled>disabled</Button>);
    expect(screen.getByText('disabled')).toHaveClass('disabled:opacity-50');
  });
});
