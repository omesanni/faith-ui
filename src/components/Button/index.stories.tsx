import type { Meta, StoryObj } from '@storybook/react';
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
