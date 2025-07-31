import type { Args, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import { Tab, Tabs } from '.';
import type { Props } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;

const getTabs = (
  props: Omit<Props, 'children'> & Args,
  disabledList?: Record<string, boolean>,
  tabClassName?: string,
): React.JSX.Element => (
  <Tabs {...props}>
    <Tab
      id="tab1"
      header="Tab 1"
      className={tabClassName}
    >
      <div className="p-1">Tab 1</div>
    </Tab>
    <Tab
      id="tab2"
      header="Tab 2"
      disabled={disabledList?.tab2}
      className={tabClassName}
    >
      <div className="p-1">Tab 2</div>
    </Tab>
    <Tab
      id="tab3"
      header="Tab 3"
      className={tabClassName}
    >
      <div className="p-1">Tab 3</div>
    </Tab>
    <Tab
      id="tab4"
      header="Tab 4"
      className={tabClassName}
    >
      <div className="p-1">Tab 4</div>
    </Tab>
    <Tab
      id="tab5"
      header="Tab 5"
      disabled={disabledList?.tab5}
      className={tabClassName}
    >
      <div className="p-1">Tab 5</div>
    </Tab>
    <Tab
      id="tab6"
      header="Tab 6"
      className={tabClassName}
    >
      <div className="p-1">Tab 6</div>
    </Tab>
    <Tab
      id="tab7"
      header="Tab 7"
      className={tabClassName}
    >
      <div className="p-1">Tab 7</div>
    </Tab>
    <Tab
      id="tab8"
      header="Tab 8"
      className={tabClassName}
    >
      <div className="p-1">Tab 8</div>
    </Tab>
    <Tab
      id="tab9"
      header="Tab 9"
      className={tabClassName}
    >
      <div className="p-1">Tab 9</div>
    </Tab>
  </Tabs>
);

export const Default: StoryObj<typeof Tabs> = {
  args: {
    activeTab: 'tab2',
  },
  parameters: {
    controls: {
      exclude: ['children', 'onChange'],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [, setArgs] = useArgs();

    const onChange = (activeTab: string): void => {
      setArgs({ activeTab });
    };

    return getTabs({ ...args, onChange });
  },
};

export const PrimaryVariant: StoryObj<typeof Tabs> = {
  args: {
    activeTab: 'tab3',
  },
  parameters: {
    controls: {
      exclude: ['children', 'onChange', 'variant'],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [, setArgs] = useArgs();

    const onChange = (activeTab: string): void => {
      setArgs({ activeTab });
    };

    return getTabs({ ...args, variant: 'primary', onChange });
  },
};

export const SecondaryVariant: StoryObj<typeof Tabs> = {
  args: {
    activeTab: 'tab1',
  },
  parameters: {
    controls: {
      exclude: ['children', 'onChange', 'variant'],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [, setArgs] = useArgs();

    const onChange = (activeTab: string): void => {
      setArgs({ activeTab });
    };

    return getTabs({ ...args, variant: 'secondary', onChange });
  },
};

export const HorizontalOrientation: StoryObj<typeof Tabs> = {
  parameters: {
    controls: { include: [] },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [primaryTab, setPrimaryTab] = useState('tab1');
    const [secondaryTab, setSecondaryTab] = useState('tab1');

    return (
      <div>
        <section>
          <p className="mb-5 font-bold">
            Primary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'primary',
            activeTab: primaryTab,
            onChange: setPrimaryTab,
            orientation: 'horizontal',
          })}
        </section>
        <section className="mt-5">
          <p className="mb-5 font-bold">
            Secondary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'secondary',
            activeTab: secondaryTab,
            onChange: setSecondaryTab,
            orientation: 'horizontal',
          })}
        </section>
      </div>
    );
  },
};

export const VerticalOrientation: StoryObj<typeof Tabs> = {
  parameters: {
    controls: { include: [] },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [primaryTab, setPrimaryTab] = useState('tab1');
    const [secondaryTab, setSecondaryTab] = useState('tab1');

    return (
      <div className="flex space-x-28">
        <section>
          <p className="mb-5 font-bold">
            Primary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'primary',
            activeTab: primaryTab,
            onChange: setPrimaryTab,
            orientation: 'vertical',
          })}
        </section>
        <section>
          <p className="mb-5 font-bold">
            Secondary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'secondary',
            activeTab: secondaryTab,
            onChange: setSecondaryTab,
            orientation: 'vertical',
          })}
        </section>
      </div>
    );
  },
};

export const ScrollableOverflowButtons: StoryObj<typeof Tabs> = {
  parameters: {
    controls: {
      include: ['showScrollableButtons'],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [primaryTab, setPrimaryTab] = useState('tab1');
    const [secondaryTab, setSecondaryTab] = useState('tab1');
    const [primaryTabTwo, setPrimaryTabTwo] = useState('tab1');
    const [secondaryTabTwo, setSecondaryTabTwo] = useState('tab1');

    return (
      <div className="flex space-x-28">
        <section>
          <p className="mb-5 font-bold">
            Primary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'primary',
            activeTab: primaryTab,
            onChange: setPrimaryTab,
            orientation: 'horizontal',
            mainClassName: 'w-[300px]',
          })}
          {getTabs({
            ...args,
            variant: 'primary',
            activeTab: primaryTabTwo,
            onChange: setPrimaryTabTwo,
            orientation: 'vertical',
            mainClassName: 'mt-8 h-[280px]',
          })}
        </section>
        <section>
          <p className="mb-5 font-bold">
            Secondary Variant
          </p>
          {getTabs({
            ...args,
            variant: 'secondary',
            activeTab: secondaryTab,
            onChange: setSecondaryTab,
            orientation: 'horizontal',
            mainClassName: 'w-[300px]',
          })}
          {getTabs({
            ...args,
            variant: 'secondary',
            activeTab: secondaryTabTwo,
            onChange: setSecondaryTabTwo,
            orientation: 'vertical',
            mainClassName: 'mt-8 h-[280px]',
          })}
        </section>
      </div>
    );
  },
};

export const DisabledTabs: StoryObj<typeof Tabs> = {
  parameters: {
    controls: { include: ['orientation'] },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [primaryTab, setPrimaryTab] = useState('tab1');
    const [secondaryTab, setSecondaryTab] = useState('tab1');

    return (
      <div>
        <section>
          <p className="mb-5 font-bold">
            Primary Variant
          </p>
          {getTabs(
            {
              ...args,
              variant: 'primary',
              activeTab: primaryTab,
              onChange: setPrimaryTab,
            },
            { tab2: true, tab5: true },
          )}
        </section>
        <section className="mt-5">
          <p className="mb-5 font-bold">
            Secondary Variant
          </p>
          {getTabs(
            {
              ...args,
              variant: 'secondary',
              activeTab: secondaryTab,
              onChange: setSecondaryTab,
            },
            { tab2: true, tab5: true },
          )}
        </section>
      </div>
    );
  },
};

export const CustomClasses: StoryObj<typeof Tabs> = {
  args: {
    indicatorClassName: 'bg-orange-500',
    backwardScrollButtonClassName: 'bg-sky-50',
    forwardScrollButtonClassName: 'bg-sky-50',
    tabListClassName: `
      border-0 [&>button:not([aria-selected="true"]):hover]:text-orange-500
      [&>button.primary-tab[aria-selected="true"]]:text-orange-500
    `,
  },
  parameters: {
    controls: {
      include: [
        'orientation',
        'tabListClassName',
        'indicatorClassName',
        'forwardScrollButtonClassName',
        'backwardScrollButtonClassName',
      ],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [primaryTab, setPrimaryTab] = useState('tab1');
    const [secondaryTab, setSecondaryTab] = useState('tab1');

    return (
      <div>
        <section>
          <p className="mb-5 font-bold">
            Primary Variant
          </p>
          {getTabs(
            {
              ...args,
              variant: 'primary',
              activeTab: primaryTab,
              onChange: setPrimaryTab,
            },
            undefined,
            'primary-tab',
          )}
        </section>
        <section className="mt-5">
          <p className="mb-5 font-bold">
            Secondary Variant
          </p>
          {getTabs(
            {
              ...args,
              variant: 'secondary',
              activeTab: secondaryTab,
              onChange: setSecondaryTab,
            },
          )}
        </section>
      </div>
    );
  },
};
