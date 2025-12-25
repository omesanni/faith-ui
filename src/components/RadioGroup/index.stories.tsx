import type { Args, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import RadioGroup from '.';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  argTypes: {
    data: {
      control: 'object',
    },
  }
};

export default meta;

export const Default: StoryObj<typeof RadioGroup> = {
  args: {
    selectedIndex: 0,
    data: [
      { content: 'Item 1' },
      { content: 'Item 2' },
      { content: 'Item 3' },
    ],
  },
  render: (args: Args): React.JSX.Element => {
    const [, setArgs] = useArgs();

    const onClick = (i: number): void => {
      setArgs({ selectedIndex: i });
    };

    return (
      <RadioGroup
        {...args}
        data={args.data}
        onClick={onClick}
      />
    );
  },
};

export const Orientation: StoryObj<typeof RadioGroup> = {
  parameters: {
    controls: { include: [] },
  },
  render: (): React.JSX.Element => {
    const [vertActiveRadio, setVertActiveRadio] = useState(1);
    const [horizActiveRadio, setHorizActiveRadio] = useState(1);

    return (
      <div className="flex space-x-28">
        <section>
          <p className="mb-5 font-bold">
            Horizontal
          </p>
          <RadioGroup
            selectedIndex={vertActiveRadio}
            onClick={setVertActiveRadio}
            orientation="horizontal"
            data={[
              { content: 'Option 1' },
              { content: 'Option 2' },
              { content: 'Option 3' },
            ]}
          />
        </section>
        <section>
          <p className="mb-5 font-bold">
            Vertical
          </p>
          <RadioGroup
            selectedIndex={horizActiveRadio}
            onClick={setHorizActiveRadio}
            orientation="vertical"
            data={[
              { content: 'Option 1' },
              { content: 'Option 2' },
              { content: 'Option 3' },
            ]}
          />
        </section>
      </div>
    );
  },
};

export const Disabled: StoryObj<typeof RadioGroup> = {
  parameters: {
    controls: { include: ['orientation'] },
  },
  render: (args: Args): React.JSX.Element => {
    const [vertActiveRadio, setVertActiveRadio] = useState(1);
    const [horizActiveRadio, setHorizActiveRadio] = useState(1);

    return (
      <div className="flex space-x-28">
        <section>
          <p className="mb-5 font-bold">
            Disable entire radio group using disabled prop
          </p>
          <RadioGroup
            {...args}
            selectedIndex={vertActiveRadio}
            onClick={setVertActiveRadio}
            data={[
              { content: 'Option 1' },
              { content: 'Option 2' },
              { content: 'Option 3' },
            ]}
            disabled
          />
        </section>
        <section>
          <p className="mb-5 font-bold">
            Disable individual radio buttons in data prop
          </p>
          <RadioGroup
            {...args}
            selectedIndex={horizActiveRadio}
            onClick={setHorizActiveRadio}
            data={[
              { content: 'Option 1', disabled: true },
              { content: 'Option 2' },
              { content: 'Option 3' },
            ]}
          />
        </section>
      </div>
    );
  },
};
