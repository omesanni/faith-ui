import { classNames } from '@/utils';
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
    <div className="flex items-center justify-center bg-gray-200 p-4">
      <PersonaBadge {...args} />
    </div>
  ),
};

export const BackgroundColor: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['color', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex relative w-30 items-center justify-center bg-gray-200 p-4 space-x-4">
      <PersonaBadge
        {...args}
        color="orange"
        className={classNames('left-[4px]', args.className)}
      >
        2
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="blue"
        className={classNames('left-[30px]', args.className)}
      >
        300
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="lime"
        className={classNames('left-[70px]', args.className)} 
      />
      <PersonaBadge
        {...args}
        color="purple"
        className={classNames('left-[95px]', args.className)}
      />
    </div>
  ),
};

export const OutlineColor: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['color', 'outlineColor', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex relative w-30 items-center justify-center bg-gray-200 p-4 space-x-4">
      <PersonaBadge
        {...args}
        color="orange"
        outlineColor="rose"
        className={classNames('left-[8px]', args.className)}
      >
        4
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="blue"
        outlineColor="sky"
        className={classNames('left-[37px]', args.className)}
      > 
        10
      </PersonaBadge>
      <PersonaBadge
        {...args}
        color="lime"
        outlineColor="green"
        className={classNames('left-[71px]', args.className)} 
      />
      <PersonaBadge
        {...args}
        color="sky"
        outlineColor="orange"
        className={classNames('left-[96px]', args.className)}
      />
    </div>
  ),
};

export const SquareBadge: StoryObj<typeof PersonaBadge> = {
  parameters: {
    controls: { exclude: ['isRounded', 'dataTestId'] },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="relative flex items-center justify-center w-20 bg-gray-200 p-4">
      <PersonaBadge
        {...args}
        isRounded={false}
        className="left-[12px]"
      />
      <PersonaBadge
        {...args}
        isRounded={false}
        className="left-[36px]"
      >
        20
      </PersonaBadge>
    </div>
  ),
};
