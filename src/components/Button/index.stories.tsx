import type { Args, Meta, StoryObj } from '@storybook/react';
import Button from '.';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    children: { control: 'text' },
    variant: {
      control: { type: 'select' },
    },
    disabled: { control: 'boolean' },
  },
};

export default meta;

export const Primary: StoryObj<typeof Button> = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: StoryObj<typeof Button> = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    disabled: false,
  },
};

export const Outline: StoryObj<typeof Button> = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
    disabled: false,
  },
};

export const Ghost: StoryObj<typeof Button> = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
    disabled: false,
  },
};

export const Danger: StoryObj<typeof Button> = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
    disabled: false,
  },
};

export const Disabled: StoryObj<typeof Button> = {
  args: { disabled: true },
  parameters: {
    controls: { exclude: ['variant', 'children'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex space-x-4">
      <Button {...args}>Primary Button</Button>
      <Button {...args} variant="secondary">
        Secondary Button
      </Button>
      <Button {...args} variant="outline">
        Outline Button
      </Button>
      <Button {...args} variant="ghost">
        Ghost Button
      </Button>
      <Button {...args} variant="danger">
        Danger Button
      </Button>
    </div>
  ),
};
