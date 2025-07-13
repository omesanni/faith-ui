import type { Args, Meta, StoryObj } from '@storybook/react';
import { Persona, PersonaBadge } from '.';
import { PERSONA_BADGE_PLACEMENT, PERSONA_SIZES, RING_COLORS } from './constants';

const meta: Meta<typeof Persona> = {
  title: 'Components/Persona',
  component: Persona,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: Object.keys(PERSONA_SIZES),
    },
    ringColor: {
      control: { type: 'select' },
      options: Object.keys(RING_COLORS),
    },
    badge: { control: 'object' },
    badgePlacement: {
      control: { type: 'select' },
      options: Object.keys(PERSONA_BADGE_PLACEMENT),
    },
  },
};

export default meta;

export const WithoutRing: StoryObj<typeof Persona> = {
  args: {
    src: 'http://placebeard.it/150/150',
  },
  argTypes: {
    badge: { control: false },
    dataTestId: { control: false },
    badgePlacement: { control: false },
  },
};

export const WithRing: StoryObj<typeof Persona> = {
  args: {
    withRing: true,
  },
  parameters: {
    controls: {
      exclude: [
        'text',
        'dataTestId',
        'badge',
        'badgePlacement',
      ],
    },
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex space-x-4">
      <Persona
        {...args}
        src="http://placebeard.it/150/150"
      />
      <Persona
        {...args}
        text="JD"
        className="bg-pink-200 text-pink-700 text-2xl"
      />
    </div>
  ),
};

export const Badge: StoryObj<typeof Persona> = {
  args: {
    withRing: true,
  },
  render: (args: Args): React.JSX.Element => (
    <div className="flex space-x-4">
      <Persona
        {...args}
        src="http://placebeard.it/150/150"
        badge={<PersonaBadge />}
      />
      <Persona
        {...args}
        src="http://placebeard.it/250/250"
        ringColor="blue"
        badge={<PersonaBadge color="blue">2</PersonaBadge>}
      />
      <Persona
        {...args}
        text="JD"
        className="bg-blue-100 text-blue-800"
        ringColor="green"
        badge={<PersonaBadge color="green">2</PersonaBadge>}
      />
      <Persona
        {...args}
        text="KD"
        className="bg-red-300 text-red-800"
        ringColor="slate"
        badge={(
          <PersonaBadge
            outlineColor="gray"
            className="text-black bg-teal-100"
            isRounded={false}
          >
            4
          </PersonaBadge>
        )}
      />
    </div>
  ),
  parameters: {
    controls: {
      exclude: [
        'alt',
        'ringColor',
        'dataTestId',
        'src',
        'text',
        'badge',
      ],
    },
  },
};

export const Sizes: StoryObj<typeof Persona> = {
  render: (args: Args): React.JSX.Element => (
    <div className="flex flex-col space-y-4">
      <div className="flex space-x-4">
        <Persona
          {...args}
          src="http://placebeard.it/150/150"
          size="sm"
        />
        <Persona
          {...args}
          src="http://placebeard.it/250/250"
          size="md"
        />
        <Persona
          {...args}
          src="http://placebeard.it/350/350"
          size="lg"
        />
        <Persona
          {...args}
          src="http://placebeard.it/450/450"
          size="xl"
        />
      </div>
      <div className="flex space-x-4">
        <Persona
          {...args}
          text="JR"
          className="bg-blue-100 text-blue-800"
          size="sm"
        />
        <Persona
          {...args}
          text="OG"
          className="bg-amber-100 text-amber-800"
          size="md"
        />
        <Persona
          {...args}
          text="EA"
          className="bg-pink-100 text-pink-800"
          size="lg"
        />
        <Persona
          {...args}
          text="JJ"
          className="bg-green-100 text-green-800"
          size="xl"
        />
      </div>
    </div>
  ),
  parameters: {
    controls: {
      exclude: [
        'alt',
        'dataTestId',
        'src',
        'text',
        'size',
        'badge',
        'badgePlacement',
      ],
    },
  },
};
