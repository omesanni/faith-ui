import { fireEvent, render, screen } from '@testing-library/react';
import RadioGroup from '.';

describe('RadioGroup', () => {
  it('renders horizontal layout', () => {
    render(
      <RadioGroup
        selectedIndex={0}
        onClick={vi.fn()}
        data={[
          { content: 'Option 1' },
          { content: 'Option 2' },
          { content: 'Option 3' },
        ]}
      />
    );
  
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radiogroup')).not.toHaveClass('flex-col');
  });

  it('renders vertical layout', () => {
    render(
      <RadioGroup
        selectedIndex={1}
        orientation="vertical"
        onClick={vi.fn()}
        data={[
          { content: 'Option 1' },
          { content: 'Option 2' },
          { content: 'Option 3' },
        ]}
      />
    );
  
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radiogroup')).toHaveClass('flex-col');
  });

  it('disables all buttons', () => {
    render(
      <RadioGroup
        selectedIndex={1}
        onClick={vi.fn()}
        data={[
          { content: 'Option 1' },
          { content: 'Option 2' },
          { content: 'Option 3' },
        ]}
        disabled
      />
    );

    expect(screen.getByText('Option 1')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Option 2')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Option 3')).toHaveAttribute('aria-disabled', 'true');
  });

  it('disables some buttons', () => {
    render(
      <RadioGroup
        selectedIndex={1}
        onClick={vi.fn()}
        data={[
          { content: 'Option 1' },
          { content: 'Option 2', disabled: true },
          { content: 'Option 3', disabled: true },
        ]}
      />
    );

    expect(screen.getByText('Option 1')).toHaveAttribute('aria-disabled', 'false');
    expect(screen.getByText('Option 2')).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByText('Option 3')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should change tabs', () => {
    const onClick = vi.fn();
    render(
      <RadioGroup
        selectedIndex={1}
        onClick={onClick}
        data={[
          { content: 'Option 1' },
          { content: 'Option 2' },
          { content: 'Option 3' },
        ]}
      />
    );

    fireEvent.click(screen.getByText('Option 1'));
    expect(onClick).toHaveBeenCalledWith(0);
  });
});