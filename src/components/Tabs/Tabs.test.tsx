import {
  fireEvent,
  render,
  screen,
  type RenderResult,
} from '@testing-library/react';
import { Tab, Tabs } from '.';

describe('Tabs', () => {
  it('renders appropriate ui for primary variant by default', () => {
    render(
      <Tabs activeTab="tab2">
        <Tab
          id="tab1"
          header="Tab 1"
          dataTestId="primary-tab1"
        >
          Tab 1
        </Tab>
        <Tab
          id="tab2"
          header="Tab 2"
          dataTestId="primary-tab2"
        >
          Tab 2
        </Tab>
      </Tabs>
    );

    expect(screen.getByTestId('primary-tab1')).toBeInTheDocument();
    expect(screen.getByTestId('primary-tab2')).toBeInTheDocument();
    expect(screen.getByTestId('indicator')).toBeInTheDocument();
    expect(screen.getByTestId('primary-tab2')).toHaveAttribute('aria-selected', 'true');
  });

  it('renders appropriate ui for secondary variant', () => {
    render(
      <Tabs activeTab="tab1" variant="secondary">
        <Tab
          id="tab1"
          header="Tab 1"
          dataTestId="secondary-tab1"
        >
          Tab 1
        </Tab>
        <Tab
          id="tab2"
          header="Tab 2"
          dataTestId="secondary-tab2"
        >
          Tab 2
        </Tab>
      </Tabs>
    );

    expect(screen.getByTestId('secondary-tab1')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-tab2')).toBeInTheDocument();
    expect(screen.queryByTestId('indicator')).not.toBeInTheDocument();
    expect(screen.getByTestId('secondary-tab1')).toHaveAttribute('aria-selected', 'true');
  });

  it('should change tabs', () => {
    const obj: Record<string, RenderResult['rerender'] | undefined> = {
      remount: undefined,
    };

    const getComponent = (
      tab: string,
      handleChange: (id: string) => void,
    ): React.JSX.Element => (
      <Tabs
        activeTab={tab}
        variant="secondary"
        onChange={handleChange}
      >
        <Tab
          id="tab1"
          header="Tab 1"
          dataTestId="secondary-tab1"
        >
          Tab 1
        </Tab>
        <Tab
          id="tab2"
          header="Tab 2"
          dataTestId="secondary-tab2"
        >
          Tab 2
        </Tab>
      </Tabs>
    );

    const onChange = vi.fn((id: string): void => {
      obj.remount?.(getComponent(id, onChange));
    });
    const { rerender } = render(getComponent('tab1', onChange));
    obj.remount = rerender;

    expect(screen.getByTestId('secondary-tab1')).toHaveAttribute('aria-selected', 'true');
    fireEvent.click(screen.getByTestId('secondary-tab2'));

    expect(screen.getByTestId('secondary-tab2')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByTestId('secondary-tab1')).not.toHaveAttribute('aria-selected', 'true');
  });
});
