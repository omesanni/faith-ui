import { render, screen } from '@testing-library/react';
import Tab from './Tab';

describe('Tab', () => {
  it('renders', () => {
    render(
      <Tab id="test" header="test tab">
        content
      </Tab>
    );
    expect(screen.getByText('content')).toBeInTheDocument();
  });
});
