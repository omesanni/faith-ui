import type { Meta, StoryObj } from '@storybook/react';
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

export const Default: StoryObj<typeof Switch> = {
  args: {
    checked: false,
  },
};

export const Checked: StoryObj<typeof Switch> = {
  args: {
    checked: true,
  },
};
