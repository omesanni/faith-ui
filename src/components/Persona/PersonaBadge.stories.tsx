import type { Args, Meta, StoryObj } from '@storybook/react';
import { PersonaBadge } from '.';

const meta: Meta<typeof PersonaBadge> = {
  title: 'Components/PersonaBadge',
  component: PersonaBadge,
  argTypes: {
    children: { control: 'text' },
  },
};

export default meta;

export const Default: StoryObj<typeof PersonaBadge> = {
  render: (args: Args): React.JSX.Element => (
    <div className="flex w-10 items-center justify-center bg-gray-200 p-4">
      <PersonaBadge {...args} />
    </div>
  ),
};

export const BackgroundColor: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['color', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex w-50 relative items-center justify-center bg-gray-200 p-4 space-x-4">
      <PersonaBadge {...args} color="orange">
        2
      </PersonaBadge>
      <PersonaBadge {...args} color="blue">
        300
      </PersonaBadge>
      <PersonaBadge {...args} color="lime" />
      <PersonaBadge {...args} color="purple" />
    </div>
  ),
};

export const OutlineColor: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['color', 'outlineColor', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex w-50 relative items-center justify-center bg-gray-200 p-4 space-x-4">
      <PersonaBadge
        {...args}
        color="orange"
        outlineColor="purple"
      >
        4
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="blue"
        outlineColor="sky"
      > 
        10
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="lime"
        outlineColor="green"
      />
      <PersonaBadge
        {...args}
        color="sky"
        outlineColor="orange"
      />
    </div>
  ),
};

export const SquareBadge: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['isRounded', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="space-x-4 w-28 flex items-center justify-center bg-gray-200 p-4">
      <PersonaBadge {...args} isRounded={false} />
      <PersonaBadge {...args} isRounded={false}>
        20
      </PersonaBadge>
    </div>
  ),
};
