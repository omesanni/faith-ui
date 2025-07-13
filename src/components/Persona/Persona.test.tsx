import { render, screen } from '@testing-library/react';
import { Persona, PersonaBadge } from '.';

describe('Persona', () => {
  it('renders without ring around image', () => {
    render(<Persona src="image" alt="image" dataTestId="persona" />);
    expect(screen.getByTestId('persona')).not.toHaveClass('border-2 p-0.5');
    expect(screen.getByAltText('image')).toBeInTheDocument();
  });

  it('renders with ring around image and ring offset', () => {
    render(<Persona src="image" dataTestId="persona" withRing />);
    expect(screen.getByTestId('persona')).toHaveClass('border-2 p-0.5');
  });

  it('renders with ring around image and no ring offset', () => {
    render(
      <Persona
        src="image"
        dataTestId="persona"
        withRingOffset={false}
        withRing
      />
    );
    expect(screen.getByTestId('persona')).toHaveClass('border-2');
    expect(screen.getByTestId('persona')).not.toHaveClass('p-0.5');
  });

  it('renders text without ring', () => {
    const { container } = render(<Persona text="OS" dataTestId="persona" />);

    expect(screen.getByTestId('persona')).not.toHaveClass('border-2 inset-ring-2 p-0.5');
    expect(screen.getByText('OS')).toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('renders text with ring and offset', () => {
    const { container } = render(
      <Persona
        text="OS"
        dataTestId="persona"
        withRing
      />
    );

    expect(screen.getByTestId('persona')).toHaveClass('border-2 inset-ring-2');
    expect(screen.getByText('OS')).toBeInTheDocument();
    expect(container.querySelector('image')).not.toBeInTheDocument();
  });

  it('renders text with ring and no offset', () => {
    const { container } = render(
      <Persona
        text="OS"
        dataTestId="persona"
        withRingOffset={false}
        withRing
      />
    );

    expect(screen.getByTestId('persona')).toHaveClass('border-2');
    expect(screen.getByTestId('persona')).not.toHaveClass('inset-ring-2');
    expect(screen.getByText('OS')).toBeInTheDocument();
    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('adds extra props to image', () => {
    render(
      <Persona
        src="image"
        size="xl"
        alt='image'
        badge={<PersonaBadge>2</PersonaBadge>}
        extraImageProps={{ loading: 'lazy'}}
      />
    );
    expect(screen.getByAltText('image')).toHaveAttribute('loading', 'lazy');
  });

  it('renders with shadow', () => {
    render(
      <Persona
        src="image"
        dataTestId="persona"
        withShadow
      />
    );
    expect(screen.getByTestId('persona')).toBeInTheDocument();
    expect(screen.getByTestId('persona')).toHaveClass(
      'shadow-[0.25rem_0.25rem_0.5rem_rgba(0,0,0,0.2)]'
    );
  });

  it('renders badge with image', () => {
    render(
      <Persona
        src="image"
        dataTestId="persona"
        badge={<PersonaBadge dataTestId="badge" />}
        withRing
      />
    );
    expect(screen.getByTestId('persona')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toBeInTheDocument();
    expect(screen.getByTestId('badge')).toHaveClass('top-[-2px] right-0');
  });
});
