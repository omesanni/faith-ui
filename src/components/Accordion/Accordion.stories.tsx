import type { Args, Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useArgs } from 'storybook/internal/preview-api';
import { Accordion, AccordionPanel } from '.';
import type { Props } from './Accordion';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
};

export default meta;

const getAccordion = (
  props: Omit<Props, 'children'> & Args,
  className = 'w-150'
): React.JSX.Element => (
  <div className={className}>
    <Accordion {...props}>
      <AccordionPanel
        id="acc1"
        header="AccordionPanel 1"
      >
        <div className="p-1">AccordionPanel 1</div>
      </AccordionPanel>
      <AccordionPanel
        id="acc2"
        header="AccordionPanel 2"
      >
        <div className="p-1">AccordionPanel 2</div>
      </AccordionPanel>
      <AccordionPanel
        id="acc3"
        header="AccordionPanel 3"
      >
        <div className="p-1">AccordionPanel 3</div>
      </AccordionPanel>
      <AccordionPanel
        id="acc4"
        header="AccordionPanel 4"
      >
        <div className="p-1">AccordionPanel 4</div>
      </AccordionPanel>
      <AccordionPanel
        id="acc5"
        header="AccordionPanel 5"
      >
        <div className="p-1">AccordionPanel 5</div>
      </AccordionPanel>
    </Accordion>
  </div>
);

export const Default: StoryObj<typeof Accordion> = {
  args: {
    activeIds: ['acc2'],
  },
  render: function Render(args: Args): React.JSX.Element {
    const [, setArgs] = useArgs();

    const onClick = (id: string): void => {
      if (args.activeIds.includes(id)) {
        setArgs({ activeIds: args.activeIds
          .filter((activeId: string) => activeId !== id) });
      } else {
        setArgs({ activeIds: [...args.activeIds, id] });
      }
    };

    return getAccordion({ ...args, onClick });
  },
};


export const FilledVariant: StoryObj<typeof Accordion> = {
  args: {
    activeIds: ['acc2'],
  },
  parameters: {
    controls: {
      exclude: ['children', 'onClick', 'variant'],
    },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [, setArgs] = useArgs();

    const onClick = (id: string): void => {
      if (args.activeIds.includes(id)) {
        setArgs({ activeIds: args.activeIds
          .filter((activeId: string) => activeId !== id) });
      } else {
        setArgs({ activeIds: [...args.activeIds, id] });
      }
    };

    return getAccordion({ ...args, variant: 'filled', onClick });
  },
};

export const SingleAndMultipleExpandablePanels: StoryObj<typeof Accordion> = {
  parameters: {
    controls: { include: [] },
  },
  render: function Render(args: Args): React.JSX.Element {
    const [singleActiveIds, setSingleActiveIds] = useState<string[]>([]);
    const [multipleActiveIds, setMultipleActiveIds] = useState<string[]>([]);

    const onClick = (id: string, single = false): void => {
      const activeIds = single ? singleActiveIds : multipleActiveIds;
      const setFn = single ? setSingleActiveIds : setMultipleActiveIds;
      if (activeIds.includes(id)) {
        setFn(activeIds.filter(
          (activeId: string) => activeId !== id)
        );
      } else {
        setFn([...(single ? [] : activeIds), id]);
      }
    };

    return (
      <div className="flex">
        <section>
          <p className="mb-5 font-bold">
            Single expandable panel
          </p>
          {getAccordion({
            ...args,
            activeIds: singleActiveIds,
            onClick: (id) => onClick(id, true),
          }, 'w-100')}
        </section>
        <section className="ml-15">
          <p className="mb-5 font-bold">
            Multiple expandable panels
          </p>
          {getAccordion({
            ...args,
            variant: 'filled',
            activeIds: multipleActiveIds,
            onClick,
          }, 'w-100')}
        </section>
      </div>
    );
  },
};
