import {
  fireEvent,
  render,
  screen,
  type RenderResult
} from '@testing-library/react';
import { Accordion, AccordionPanel } from '.';

describe('Accordion', () => {
  it('renders appropriate ui for `default` variant', () => {
    render(
      <Accordion activeIds={['acc2']}>
        <AccordionPanel
          id="acc1"
          header="Accordion 1"
          dataTestId="accordion-1"
        >
          Accordion 1
        </AccordionPanel>
        <AccordionPanel
          id="acc2"
          header="Accordion 2"
          dataTestId="accordion-2"
        >
          Accordion 2
        </AccordionPanel>
      </Accordion>
    );

    expect(screen.getByTestId('accordion-2')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-1')).toHaveClass('border-b border-gray-300 py-4');
    expect(screen.getByTestId('accordion-2')).toHaveClass('border-b border-gray-300 py-4');
  });

  it('renders appropriate ui for `filled` variant', () => {
    render(
      <Accordion activeIds={['acc2']} variant="filled">
        <AccordionPanel
          id="acc1"
          header="Accordion 1"
          dataTestId="accordion-1"
        >
          Accordion 1
        </AccordionPanel>
        <AccordionPanel
          id="acc2"
          header="Accordion 2"
          dataTestId="accordion-2"
        >
          Accordion 2
        </AccordionPanel>
      </Accordion>
    );

    expect(screen.getByTestId('accordion-2')).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByTestId('accordion-1')).toHaveClass('rounded-xl bg-[#F6f6f6] px-2 py-3');
    expect(screen.getByTestId('accordion-2')).toHaveClass('rounded-xl bg-[#F6f6f6] px-2 py-3');
  });

  it('should open accordion panel', () => {
    const obj: Record<string, RenderResult['rerender'] | undefined> = {
      remount: undefined,
    };

    const getComponent = (
      ids: string[],
      handleChange: (id: string) => void,
    ): React.JSX.Element => (
      <Accordion
        activeIds={ids}
        onClick={handleChange}
      >
        <AccordionPanel
          id="acc1"
          header="Accordion 1"
          dataTestId="accordion-panel1"
        >
          Accordion 1
        </AccordionPanel>
        <AccordionPanel
          id="acc2"
          header="Accordion 2"
          dataTestId="accordion-panel2"
        >
          Accordion 2
        </AccordionPanel>
      </Accordion>
    );

    const OnClick = vi.fn((id: string): void => {
      obj.remount?.(getComponent([id], OnClick));
    });
    const { rerender } = render(getComponent([], OnClick));
    obj.remount = rerender;

    expect(screen.getByTestId('accordion-panel1')).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(screen.getByTestId('accordion-panel1'));

    expect(screen.getByTestId('accordion-panel1')).toHaveAttribute('aria-expanded', 'true');
  });
});
