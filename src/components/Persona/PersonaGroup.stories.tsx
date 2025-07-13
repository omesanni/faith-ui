import type { Args, Meta, StoryObj } from '@storybook/react';
import { Persona, PersonaGroup } from '.';

const getGroup = (args: Args): React.JSX.Element => (
  <PersonaGroup {...args}>
    <Persona
      src="http://placebeard.it/150/150"
      withRingOffset={false}
      ringColor="white"
      withRing
    />
    <Persona
      src="http://placebeard.it/250/250"
      withRingOffset={false}
      ringColor="white"
      withRing
    />
    <Persona
      src="http://placebeard.it/350/350"
      withRingOffset={false}
      ringColor="white"
      withRing
    />
    <Persona
      src="http://placebeard.it/450/450"
      withRingOffset={false}
      ringColor="white"
      withRing
    />
  </PersonaGroup>
);

const meta: Meta<typeof PersonaGroup> = {
  title: 'Components/PersonaGroup',
  component: PersonaGroup,
};

export default meta;

export const StackedByDefault: StoryObj<typeof PersonaGroup> = {
  render: getGroup,
};

export const StackSpacing: StoryObj<typeof PersonaGroup> = {
  parameters: {
    controls: {
      exclude: [
        'stacked',
        'children',
        'dataTestId',
        'stackSpacing',
        'renderMaxElement'
      ],
    },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <span>md:</span>
        {getGroup(args)}
      </div>
      <div className="flex space-x-4">
        <span>sm:</span>
        {getGroup({ ...args, stackSpacing: 'sm' })}
      </div>
      <div className="flex space-x-4">
        <span>xs:</span>
        {getGroup({ ...args, stackSpacing: 'xs' })}
      </div>
    </div>
  ),
};

export const NoStacking: StoryObj<typeof PersonaGroup> = {
  parameters: {
    controls: {
      exclude: ['renderMaxElement', 'children', 'dataTestId'],
    },
  },
  render: (args: Args): React.JSX.Element => getGroup({
    ...args,
    stacked: false,
  }),
};

export const Max: StoryObj<typeof PersonaGroup> = {
  args: { max: 3 },
  parameters: {
    controls: {
      exclude: ['renderMaxElement', 'children', 'dataTestId'],
    },
  },
  render: getGroup
};

export const CustomMaxElement: StoryObj<typeof PersonaGroup> = {
  args: {
    max: 3,
    stacked: true,
    stackSpacing: 'sm',
  },
  parameters: {
    controls: {
      exclude: ['renderMaxElement', 'children', 'dataTestId'],
    },
  },
  render: (args: Args): React.JSX.Element => getGroup({
    ...args,
    renderMaxElement: (remainder: React.JSX.Element[]): React.JSX.Element => (
      <Persona
        text={`+${remainder.length}`}
        className="bg-amber-100 text-amber-800"
        withRingOffset={false}
        ringColor="white"
        withRing
      />
    ),
  }),
};
