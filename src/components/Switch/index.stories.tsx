import { useArgs } from '@storybook/preview-api';
import type { Meta, StoryObj } from '@storybook/react';
import type { Args } from 'storybook/internal/types';
import Switch from '.';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: { control: 'boolean' },
    onClick: { action: 'changed' },
  },
};

export default meta;

const Render = (args: Args): React.JSX.Element => {
  const [, setArgs] = useArgs();

  const onClick = (): void => {
    setArgs({ checked: !args.checked });
  };
  return <Switch {...args} onClick={onClick} />;
};

export const Unchecked: StoryObj<typeof Switch> = {
  args: { checked: false },
  render: Render,
};

export const Checked: StoryObj<typeof Switch> = {
  args: { checked: true},
  render: Render,
};

export const Disabled: StoryObj<typeof Switch> = {
  args: { disabled: true },
};
