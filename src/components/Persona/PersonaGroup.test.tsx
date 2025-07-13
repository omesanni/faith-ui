import { render, screen } from '@testing-library/react';
import { Persona, PersonaGroup } from '.';

describe('PersonaGroup', () => {
  it('renders all three personas', () => {
    render(
      <PersonaGroup dataTestId="pGroup">
        <Persona text="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
      </PersonaGroup>
    );
    expect(screen.getAllByTestId('persona')).toHaveLength(3);
  });

  it('renders only certain number of Personas when max is specified', () => {
    render(
      <PersonaGroup max={2}>
        <Persona text="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
      </PersonaGroup>
    );
    expect(screen.getAllByTestId('persona')).toHaveLength(2);
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('allows rendering of custom max element', () => {
    render(
      <PersonaGroup
        max={2}
        renderMaxElement={() => <span>custom</span>}
      >
        <Persona text="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
        <Persona src="Test" dataTestId="persona" />
      </PersonaGroup>
    );
    expect(screen.getAllByTestId('persona')).toHaveLength(2);
    expect(screen.getByText('custom')).toBeInTheDocument();
  });

  it('renders one persona with no peer class', () => {
    render(
      <PersonaGroup stacked={false}>
        <Persona text="Test" dataTestId="persona" />
      </PersonaGroup>
    );
    expect(screen.getByTestId('persona')).not.toHaveClass('peer');
  });
});